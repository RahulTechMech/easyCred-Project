"use client";

import { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import {
  fullLoanApplicationSchema,
  type FullLoanApplicationValues,
} from "@/lib/validation/loanApplicationSchema";
import { StepProgressRail, STEPS } from "./StepProgressRail";
import { LoanSnapshotCard } from "./LoanSnapshotCard";
import { FormStepWrapper } from "./FormStepWrapper";
import { PersonalInfoStep } from "./steps/PersonalInfoStep";
import { EmploymentStep } from "./steps/EmploymentStep";
import { LoanInfoStep } from "./steps/LoanInfoStep";
import { ExistingLoansStep } from "./steps/ExistingLoansStep";
import { AdditionalDetailsStep } from "./steps/AdditionalDetailsStep";
import { ReviewStep } from "./steps/ReviewStep";

// Fields validated before allowing the user to move to the next step.
const STEP_FIELDS: Record<number, (keyof FullLoanApplicationValues)[]> = {
  1: [
    "fullName",
    "mobileNumber",
    "otpVerified",
    "email",
    "dateOfBirth",
    "gender",
    "panNumber",
    "aadhaarNumber",
    "currentAddress",
    "city",
    "state",
    "pinCode",
    "maritalStatus",
  ],
  2: [
    "employmentType",
    "companyName",
    "employeeId",
    "joiningDate",
    "jobTitle",
    "businessName",
    "gstNumber",
    "annualTurnover",
    "businessVintageYears",
    "workExperienceYears",
    "monthlySalary",
    "salaryBank",
    "officeAddress",
  ],
  3: ["requiredLoanAmount", "loanPurpose", "preferredTenureMonths", "expectedInterestRateMax"],
  4: [
    "activeLoanCount",
    "hasPersonalLoan",
    "hasHomeLoan",
    "hasCarLoan",
    "hasGoldLoan",
    "hasCreditCardEmi",
    "creditCardOutstanding",
    "loanDetails",
    "previousLoanRejections",
    "existingMonthlyDebt",
    "monthlyHouseholdExpenses",
  ],
  5: ["isPropertyOwner", "isVehicleOwner", "hasGuarantor", "guarantorName", "guarantorRelation", "preferredContactTime", "remarks", "consentGiven"],
};

const defaultValues: Partial<FullLoanApplicationValues> = {
  otpVerified: false,
  gender: undefined,
  maritalStatus: undefined,
  employmentType: undefined,
  loanPurpose: undefined,
  activeLoanCount: 0,
  hasPersonalLoan: false,
  hasHomeLoan: false,
  hasCarLoan: false,
  hasGoldLoan: false,
  hasCreditCardEmi: false,
  loanDetails: [],
  previousLoanRejections: false,
  existingMonthlyDebt: 0,
  monthlyHouseholdExpenses: 0,
  isPropertyOwner: false,
  isVehicleOwner: false,
  hasGuarantor: false,
  preferredContactTime: undefined,
  consentGiven: false,
};

type SubmitState = "idle" | "submitting" | "success" | "error";

export function LoanApplicationForm() {
  const [step, setStep] = useState(1);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");
  const [leadId, setLeadId] = useState("");

  const methods = useForm<FullLoanApplicationValues>({
    resolver: zodResolver(fullLoanApplicationSchema),
    defaultValues,
    mode: "onBlur",
  });

  const { trigger, handleSubmit, watch } = methods;

  async function goNext() {
    const fields = STEP_FIELDS[step];
    const valid = fields ? await trigger(fields as any) : true;
    if (!valid) return;
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  }

  function jumpToStep(target: number) {
    setDirection(target > step ? 1 : -1);
    setStep(target);
  }

  const onSubmit = handleSubmit(async (data) => {
    setSubmitState("submitting");
    setSubmitError("");
    try {
      const res = await axios.post("/api/loan-application", {
        ...data,
        companyWebsite: honeypotRef.current?.value || "",
      });
      setLeadId(res.data.leadId);
      setSubmitState("success");
    } catch (err) {
      setSubmitState("error");
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setSubmitError(err.response.data.message);
      } else {
        setSubmitError("Something went wrong. Please try again in a moment.");
      }
    }
  });

  const loanAmount = watch("requiredLoanAmount");
  const tenure = watch("preferredTenureMonths");
  const income = watch("monthlySalary");
  const existingDebt = watch("existingMonthlyDebt");

  if (submitState === "success") {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 16 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mint-500/15 text-mint-500"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <h2 className="font-display text-2xl font-semibold text-frost-50">Application Received!</h2>
        <p className="mt-2 text-frost-400">
          Your reference ID is <span className="font-mono text-frost-100">{leadId}</span>. One of our loan advisors
          will call you shortly to guide you through the next steps.
        </p>
        <p className="mt-4 text-xs text-frost-400/70">
          EasyCred is a loan assistance platform, not a lender. Final approval, interest rate and terms are decided
          by our partner banks/NBFCs.
        </p>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-[220px_1fr_320px]">
        <div className="lg:pt-2">
          <StepProgressRail currentStep={step} />
        </div>

        <form onSubmit={onSubmit} noValidate>
          {/* Honeypot field — hidden from real users, bots often fill it */}
          <input type="text" tabIndex={-1} autoComplete="off" className="hidden" ref={honeypotRef} name="companyWebsite" />

          <div className="glass-panel rounded-xl2 p-6 shadow-card sm:p-8">
            <AnimatePresence mode="wait" custom={direction}>
              <FormStepWrapper key={step} direction={direction}>
                {step === 1 && <PersonalInfoStep />}
                {step === 2 && <EmploymentStep />}
                {step === 3 && <LoanInfoStep />}
                {step === 4 && <ExistingLoansStep />}
                {step === 5 && <AdditionalDetailsStep />}
                {step === 6 && <ReviewStep onEditStep={jumpToStep} />}
              </FormStepWrapper>
            </AnimatePresence>

            {submitState === "error" && (
              <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{submitError}</p>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-hairline/10 pt-6">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 1}
                className="rounded-xl px-5 py-2.5 text-sm font-medium text-frost-300 transition-colors hover:text-frost-50 disabled:opacity-0"
              >
                Back
              </button>

              {step < STEPS.length ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="rounded-xl bg-grad-signal px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="rounded-xl bg-grad-signal px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                >
                  {submitState === "submitting" ? "Submitting..." : "Submit Application"}
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="hidden lg:block">
          <LoanSnapshotCard
            loanAmount={Number(loanAmount) || undefined}
            tenureMonths={Number(tenure) || undefined}
            monthlyIncome={Number(income) || undefined}
            existingEmi={Number(existingDebt) || undefined}
          />
        </div>
      </div>
    </FormProvider>
  );
}
