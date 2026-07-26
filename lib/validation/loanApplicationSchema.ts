import { z } from "zod";

/**
 * Each step of the multi-step form has its own schema so React Hook Form
 * can validate only the fields visible on the current step. The full
 * `loanApplicationSchema` at the bottom is the union used on final submit
 * (and on the server) and includes cross-field / conditional rules.
 */

const MOBILE_REGEX = /^[6-9]\d{9}$/; // Indian mobile numbers
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const AADHAAR_REGEX = /^\d{12}$/;
const PIN_REGEX = /^\d{6}$/;

// ---------------------------------------------------------------------
// Step 1 — Personal Information
// ---------------------------------------------------------------------
export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Enter your full name as per PAN/Aadhaar")
    .max(80, "Name looks too long"),
  mobileNumber: z.string().regex(MOBILE_REGEX, "Enter a valid 10-digit mobile number"),
  otpVerified: z.boolean().refine((v) => v === true, "Please verify your mobile number with OTP"),
  email: z.string().trim().email("Enter a valid email address"),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((val) => {
      const dob = new Date(val);
      const age = (Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
      return age >= 21 && age <= 65;
    }, "Applicant age must be between 21 and 65 years"),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
  panNumber: z
    .string()
    .trim()
    .toUpperCase()
    .regex(PAN_REGEX, "Enter a valid PAN (e.g. ABCDE1234F)"),
  aadhaarNumber: z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || AADHAAR_REGEX.test(val), "Aadhaar number must be exactly 12 digits"),
  currentAddress: z.string().trim().min(10, "Enter your complete current address"),
  city: z.string().trim().min(2, "City is required"),
  state: z.string().trim().min(2, "State is required"),
  pinCode: z.string().trim().regex(PIN_REGEX, "Enter a valid 6-digit PIN code"),
  maritalStatus: z.enum(["Single", "Married", "Divorced", "Widowed"]),
});

export type PersonalInfoValues = z.infer<typeof personalInfoSchema>;

// ---------------------------------------------------------------------
// Step 2 — Employment Details (fields shown depend on employmentType)
// ---------------------------------------------------------------------
export const employmentSchema = z
  .object({
    employmentType: z.enum(["Salaried", "Self Employed", "Business Owner", "Government Employee"]),

    // Salaried / Government Employee fields
    companyName: z.string().trim().optional(),
    employeeId: z.string().trim().optional(),
    joiningDate: z.string().optional(),
    jobTitle: z.string().trim().optional(),

    // Self Employed / Business Owner fields
    businessName: z.string().trim().optional(),
    gstNumber: z.string().trim().optional(),
    annualTurnover: z.coerce.number().optional(),
    businessVintageYears: z.coerce.number().optional(),

    // Common fields
    workExperienceYears: z.coerce
      .number({ invalid_type_error: "Enter work experience in years" })
      .min(0, "Cannot be negative")
      .max(50, "Check the value entered"),
    monthlySalary: z.coerce
      .number({ invalid_type_error: "Enter your monthly income" })
      .min(1000, "Monthly income seems too low")
      .max(10000000, "Check the value entered"),
    annualIncome: z.coerce.number().min(0).optional(),
    salaryBank: z.string().trim().min(2, "Bank name is required"),
    officeAddress: z.string().trim().min(5, "Office/business address is required"),
  })
  .superRefine((data, ctx) => {
    const salariedTypes = ["Salaried", "Government Employee"];
    if (salariedTypes.includes(data.employmentType)) {
      if (!data.companyName || data.companyName.length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["companyName"], message: "Company name is required" });
      }
      if (!data.employeeId || data.employeeId.length < 1) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["employeeId"], message: "Employee ID is required" });
      }
      if (!data.joiningDate) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["joiningDate"], message: "Joining date is required" });
      }
      if (!data.jobTitle || data.jobTitle.length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["jobTitle"], message: "Job title is required" });
      }
    }

    const businessTypes = ["Self Employed", "Business Owner"];
    if (businessTypes.includes(data.employmentType)) {
      if (!data.businessName || data.businessName.length < 2) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["businessName"], message: "Business name is required" });
      }
      if (!data.annualTurnover || data.annualTurnover <= 0) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["annualTurnover"], message: "Annual turnover is required" });
      }
      if (data.businessVintageYears === undefined || data.businessVintageYears < 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["businessVintageYears"],
          message: "Business vintage is required",
        });
      }
      // GST is optional but if provided, do a light format check
      if (data.gstNumber && data.gstNumber.length > 0 && data.gstNumber.length !== 15) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["gstNumber"], message: "GST number must be 15 characters" });
      }
    }
  });

export type EmploymentValues = z.infer<typeof employmentSchema>;

// ---------------------------------------------------------------------
// Step 3 — Loan Information
// ---------------------------------------------------------------------
export const loanInfoSchema = z.object({
  requiredLoanAmount: z.coerce
    .number({ invalid_type_error: "Enter the loan amount you need" })
    .min(10000, "Minimum loan amount is ₹10,000")
    .max(10000000, "Maximum loan amount is ₹1,00,00,000"),
  loanPurpose: z.enum([
    "Medical Emergency",
    "Wedding",
    "Travel",
    "Home Renovation",
    "Education",
    "Debt Consolidation",
    "Business Expansion",
    "Other",
  ]),
  preferredTenureMonths: z.coerce.number().min(3, "Minimum tenure is 3 months").max(84, "Maximum tenure is 84 months"),
  expectedInterestRateMax: z.coerce.number().min(1).max(50).optional(),
});

export type LoanInfoValues = z.infer<typeof loanInfoSchema>;

// ---------------------------------------------------------------------
// Step 4 — Existing Loan Information (mandatory pre-screening questions)
// ---------------------------------------------------------------------
const existingLoanDetailSchema = z.object({
  bankName: z.string().trim().min(2, "Bank name is required"),
  loanType: z.enum(["Personal Loan", "Home Loan", "Car Loan", "Gold Loan", "Credit Card EMI", "Other"]),
  outstandingAmount: z.coerce.number().min(0, "Enter the outstanding amount"),
  emiAmount: z.coerce.number().min(0, "Enter the current EMI amount"),
});

export const existingLoansSchema = z
  .object({
    activeLoanCount: z.coerce.number().min(0).max(20),
    hasPersonalLoan: z.boolean().default(false),
    hasHomeLoan: z.boolean().default(false),
    hasCarLoan: z.boolean().default(false),
    hasGoldLoan: z.boolean().default(false),
    hasCreditCardEmi: z.boolean().default(false),
    creditCardOutstanding: z.coerce.number().min(0).optional(),
    loanDetails: z.array(existingLoanDetailSchema).default([]),
    previousLoanRejections: z.boolean().default(false),
    existingMonthlyDebt: z.coerce.number().min(0, "Enter total existing monthly debt (0 if none)"),
    monthlyHouseholdExpenses: z.coerce
      .number({ invalid_type_error: "Enter approximate monthly household expenses" })
      .min(0, "Cannot be negative"),
  })
  .superRefine((data, ctx) => {
    if (data.activeLoanCount > 0 && data.loanDetails.length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["loanDetails"],
        message: "Add details for at least one existing loan",
      });
    }
    if (data.hasCreditCardEmi && (data.creditCardOutstanding === undefined || data.creditCardOutstanding < 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["creditCardOutstanding"],
        message: "Enter your credit card outstanding amount",
      });
    }
  });

export type ExistingLoansValues = z.infer<typeof existingLoansSchema>;
export type ExistingLoanDetail = z.infer<typeof existingLoanDetailSchema>;

// ---------------------------------------------------------------------
// Step 5 — Additional Details & Consent
// ---------------------------------------------------------------------
export const additionalDetailsSchema = z.object({
  isPropertyOwner: z.boolean().default(false),
  isVehicleOwner: z.boolean().default(false),
  hasGuarantor: z.boolean().default(false),
  guarantorName: z.string().trim().optional(),
  guarantorRelation: z.string().trim().optional(),
  preferredContactTime: z.enum(["Morning (9AM - 12PM)", "Afternoon (12PM - 4PM)", "Evening (4PM - 8PM)", "Anytime"]),
  remarks: z.string().trim().max(500, "Keep remarks under 500 characters").optional(),
  consentGiven: z
    .boolean()
    .refine((v) => v === true, "You must authorize EasyCred to contact you to submit this application"),
});

export type AdditionalDetailsValues = z.infer<typeof additionalDetailsSchema>;

// ---------------------------------------------------------------------
// Full application — merges every step, used for final submit + server
// ---------------------------------------------------------------------
export const fullLoanApplicationSchema = personalInfoSchema
  .and(employmentSchema)
  .and(loanInfoSchema)
  .and(existingLoansSchema)
  .and(additionalDetailsSchema);

export type FullLoanApplicationValues = z.infer<typeof fullLoanApplicationSchema>;

export const stepSchemas = {
  personal: personalInfoSchema,
  employment: employmentSchema,
  loan: loanInfoSchema,
  existingLoans: existingLoansSchema,
  additional: additionalDetailsSchema,
} as const;
