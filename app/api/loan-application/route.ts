import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connectDB";
import { LoanApplication } from "@/models/LoanApplication";
import { fullLoanApplicationSchema } from "@/lib/validation/loanApplicationSchema";
import { generateLeadId } from "@/lib/utils/generateLeadId";
import { appendLeadToExcel } from "@/lib/excel/appendLeadToExcel";
import { emailService, applicationReceivedEmail, adminNewLeadEmail } from "@/lib/services/email";
import { estimateLoanReadiness } from "@/lib/calculators/loanReadiness";

// --- very small in-memory rate limiter (per server instance) -------------
// For production, replace with a shared store (e.g. Redis) so limits hold
// across multiple server instances / restarts.
const submissionLog = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many submissions. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // --- Basic honeypot spam check -----------------------------------
    // The client form includes a hidden field named "companyWebsite" that
    // real users never see or fill in. Bots that auto-fill every field
    // will trip it.
    if (body.companyWebsite) {
      return NextResponse.json({ success: false, message: "Submission rejected." }, { status: 400 });
    }

    // --- Server-side validation (never trust the client) ---------------
    const parsed = fullLoanApplicationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Validation failed", errors: parsed.error.flatten() },
        { status: 422 }
      );
    }

    const data = parsed.data;
    await connectDB();

    const leadId = generateLeadId();

    // Compute an initial Loan Readiness Score for the CRM from the data the
    // applicant already provided. The form doesn't separately ask for
    // self-declared repayment history, so we use a simple, documented
    // heuristic here; an admin can refine this later from the lead detail
    // page as more information comes in through follow-up calls.
    const age = Math.floor(
      (Date.now() - new Date(data.dateOfBirth).getTime()) / (1000 * 60 * 60 * 24 * 365.25)
    );
    const readiness = estimateLoanReadiness({
      monthlyIncome: data.monthlySalary,
      existingEmiTotal: data.existingMonthlyDebt,
      activeLoanCount: data.activeLoanCount,
      employmentType: data.employmentType,
      workExperienceYears: data.workExperienceYears,
      age,
      previousLoanRejections: data.previousLoanRejections,
      selfDeclaredRepaymentHistory: data.activeLoanCount > 0 ? "Always on time" : "No prior loans",
    });

    const application = await LoanApplication.create({
      leadId,
      status: "New",
      loanReadinessScore: readiness.score,
      timeline: [
        {
          type: "system",
          description: "Application submitted via website",
          createdAt: new Date(),
        },
      ],
      personal: {
        fullName: data.fullName,
        mobileNumber: data.mobileNumber,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        panNumber: data.panNumber,
        aadhaarNumber: data.aadhaarNumber,
        currentAddress: data.currentAddress,
        city: data.city,
        state: data.state,
        pinCode: data.pinCode,
        maritalStatus: data.maritalStatus,
      },
      employment: {
        employmentType: data.employmentType,
        companyName: data.companyName,
        employeeId: data.employeeId,
        joiningDate: data.joiningDate,
        jobTitle: data.jobTitle,
        businessName: data.businessName,
        gstNumber: data.gstNumber,
        annualTurnover: data.annualTurnover,
        businessVintageYears: data.businessVintageYears,
        workExperienceYears: data.workExperienceYears,
        monthlySalary: data.monthlySalary,
        annualIncome: data.annualIncome,
        salaryBank: data.salaryBank,
        officeAddress: data.officeAddress,
      },
      loan: {
        requiredLoanAmount: data.requiredLoanAmount,
        loanPurpose: data.loanPurpose,
        preferredTenureMonths: data.preferredTenureMonths,
        expectedInterestRateMax: data.expectedInterestRateMax,
      },
      existingLoans: {
        activeLoanCount: data.activeLoanCount,
        hasPersonalLoan: data.hasPersonalLoan,
        hasHomeLoan: data.hasHomeLoan,
        hasCarLoan: data.hasCarLoan,
        hasGoldLoan: data.hasGoldLoan,
        hasCreditCardEmi: data.hasCreditCardEmi,
        creditCardOutstanding: data.creditCardOutstanding,
        loanDetails: data.loanDetails,
        previousLoanRejections: data.previousLoanRejections,
        existingMonthlyDebt: data.existingMonthlyDebt,
        monthlyHouseholdExpenses: data.monthlyHouseholdExpenses,
      },
      additional: {
        isPropertyOwner: data.isPropertyOwner,
        isVehicleOwner: data.isVehicleOwner,
        hasGuarantor: data.hasGuarantor,
        guarantorName: data.guarantorName,
        guarantorRelation: data.guarantorRelation,
        preferredContactTime: data.preferredContactTime,
        remarks: data.remarks,
        consentGiven: data.consentGiven,
      },
      submittedAt: new Date(),
    });

    // Append the lightweight follow-up row to the shared Excel sheet.
    // This must never block or fail the applicant's submission — log and
    // continue if it errors, since the full record is already safe in Mongo.
    try {
      await appendLeadToExcel(application);
    } catch (excelErr) {
      console.error("[loan-application] Failed to append lead to Excel export:", excelErr);
    }

    // Fire-and-forget email notifications via the pluggable email service.
    // Uses MockEmailService until SMTP_* env vars + NodemailerEmailService
    // are wired in (see lib/services/email/mockEmailService.ts).
    try {
      const receivedEmail = applicationReceivedEmail(data.fullName, leadId);
      await emailService.send({ ...receivedEmail, to: data.email });
      await emailService.send(adminNewLeadEmail(leadId, data.fullName, data.mobileNumber));
    } catch (emailErr) {
      console.error("[loan-application] Failed to send notification emails:", emailErr);
    }

    return NextResponse.json({ success: true, leadId }, { status: 201 });
  } catch (err) {
    console.error("[loan-application] Submission error:", err);
    return NextResponse.json(
      { success: false, message: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
