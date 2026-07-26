import mongoose, { Schema, model, models, type Document } from "mongoose";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/crm/constants";

export interface ITimelineEntry {
  type: "status_change" | "note" | "assignment" | "follow_up" | "call_outcome" | "system";
  description: string;
  author?: string;
  createdAt: Date;
}

export interface INote {
  text: string;
  author: string;
  createdAt: Date;
}

export interface IFollowUp {
  date?: string;
  time?: string;
  completed: boolean;
}

export interface ILoanApplication extends Document {
  leadId: string;
  status: LeadStatus;

  // CRM fields — additive to the original applicant-submitted data below.
  assignedEmployee?: string;
  notes: INote[];
  timeline: ITimelineEntry[];
  followUp: IFollowUp;
  lastContactedAt?: Date;
  callOutcome?: string;
  customerInterested?: boolean;
  loanReadinessScore?: number;

  personal: {
    fullName: string;
    mobileNumber: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    panNumber: string;
    aadhaarNumber?: string;
    currentAddress: string;
    city: string;
    state: string;
    pinCode: string;
    maritalStatus: string;
  };

  employment: {
    employmentType: string;
    companyName?: string;
    employeeId?: string;
    joiningDate?: string;
    jobTitle?: string;
    businessName?: string;
    gstNumber?: string;
    annualTurnover?: number;
    businessVintageYears?: number;
    workExperienceYears: number;
    monthlySalary: number;
    annualIncome?: number;
    salaryBank: string;
    officeAddress: string;
  };

  loan: {
    requiredLoanAmount: number;
    loanPurpose: string;
    preferredTenureMonths: number;
    expectedInterestRateMax?: number;
  };

  existingLoans: {
    activeLoanCount: number;
    hasPersonalLoan: boolean;
    hasHomeLoan: boolean;
    hasCarLoan: boolean;
    hasGoldLoan: boolean;
    hasCreditCardEmi: boolean;
    creditCardOutstanding?: number;
    loanDetails: Array<{
      bankName: string;
      loanType: string;
      outstandingAmount: number;
      emiAmount: number;
    }>;
    previousLoanRejections: boolean;
    existingMonthlyDebt: number;
    monthlyHouseholdExpenses: number;
  };

  additional: {
    isPropertyOwner: boolean;
    isVehicleOwner: boolean;
    hasGuarantor: boolean;
    guarantorName?: string;
    guarantorRelation?: string;
    preferredContactTime: string;
    remarks?: string;
    consentGiven: boolean;
  };

  submittedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ExistingLoanDetailSchema = new Schema(
  {
    bankName: { type: String, required: true },
    loanType: { type: String, required: true },
    outstandingAmount: { type: Number, required: true },
    emiAmount: { type: Number, required: true },
  },
  { _id: false }
);

const NoteSchema = new Schema(
  {
    text: { type: String, required: true },
    author: { type: String, required: true },
    createdAt: { type: Date, default: () => new Date() },
  },
  { _id: false }
);

const TimelineEntrySchema = new Schema(
  {
    type: {
      type: String,
      enum: ["status_change", "note", "assignment", "follow_up", "call_outcome", "system"],
      required: true,
    },
    description: { type: String, required: true },
    author: String,
    createdAt: { type: Date, default: () => new Date() },
  },
  { _id: false }
);

const FollowUpSchema = new Schema(
  {
    date: String,
    time: String,
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const LoanApplicationSchema = new Schema<ILoanApplication>(
  {
    leadId: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "New",
    },

    assignedEmployee: String,
    notes: { type: [NoteSchema], default: [] },
    timeline: { type: [TimelineEntrySchema], default: [] },
    followUp: { type: FollowUpSchema, default: () => ({ completed: false }) },
    lastContactedAt: Date,
    callOutcome: String,
    customerInterested: Boolean,
    loanReadinessScore: Number,

    personal: {
      fullName: { type: String, required: true },
      mobileNumber: { type: String, required: true, index: true },
      email: { type: String, required: true },
      dateOfBirth: { type: String, required: true },
      gender: { type: String, required: true },
      panNumber: { type: String, required: true },
      aadhaarNumber: { type: String },
      currentAddress: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pinCode: { type: String, required: true },
      maritalStatus: { type: String, required: true },
    },

    employment: {
      employmentType: { type: String, required: true },
      companyName: String,
      employeeId: String,
      joiningDate: String,
      jobTitle: String,
      businessName: String,
      gstNumber: String,
      annualTurnover: Number,
      businessVintageYears: Number,
      workExperienceYears: { type: Number, required: true },
      monthlySalary: { type: Number, required: true },
      annualIncome: Number,
      salaryBank: { type: String, required: true },
      officeAddress: { type: String, required: true },
    },

    loan: {
      requiredLoanAmount: { type: Number, required: true },
      loanPurpose: { type: String, required: true },
      preferredTenureMonths: { type: Number, required: true },
      expectedInterestRateMax: Number,
    },

    existingLoans: {
      activeLoanCount: { type: Number, default: 0 },
      hasPersonalLoan: { type: Boolean, default: false },
      hasHomeLoan: { type: Boolean, default: false },
      hasCarLoan: { type: Boolean, default: false },
      hasGoldLoan: { type: Boolean, default: false },
      hasCreditCardEmi: { type: Boolean, default: false },
      creditCardOutstanding: Number,
      loanDetails: { type: [ExistingLoanDetailSchema], default: [] },
      previousLoanRejections: { type: Boolean, default: false },
      existingMonthlyDebt: { type: Number, default: 0 },
      monthlyHouseholdExpenses: { type: Number, default: 0 },
    },

    additional: {
      isPropertyOwner: { type: Boolean, default: false },
      isVehicleOwner: { type: Boolean, default: false },
      hasGuarantor: { type: Boolean, default: false },
      guarantorName: String,
      guarantorRelation: String,
      preferredContactTime: { type: String, required: true },
      remarks: String,
      consentGiven: { type: Boolean, required: true },
    },

    submittedAt: { type: Date, default: () => new Date() },
  },
  { timestamps: true }
);

// Avoid model overwrite errors in Next.js dev hot-reload
export const LoanApplication =
  (models.LoanApplication as mongoose.Model<ILoanApplication>) ||
  model<ILoanApplication>("LoanApplication", LoanApplicationSchema);
