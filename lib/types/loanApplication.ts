export type EmploymentType = "Salaried" | "Self Employed" | "Business Owner" | "Government Employee";

export type Gender = "Male" | "Female" | "Other" | "Prefer not to say";

export type MaritalStatus = "Single" | "Married" | "Divorced" | "Widowed";

export type LoanPurpose =
  | "Medical Emergency"
  | "Wedding"
  | "Travel"
  | "Home Renovation"
  | "Education"
  | "Debt Consolidation"
  | "Business Expansion"
  | "Other";

export type ContactTimeSlot = "Morning (9AM - 12PM)" | "Afternoon (12PM - 4PM)" | "Evening (4PM - 8PM)" | "Anytime";

export type LoanStatus = "New" | "Contacted" | "Documents Pending" | "Under Review" | "Approved" | "Rejected";

export const STEP_KEYS = [
  "personal",
  "employment",
  "loan",
  "existingLoans",
  "additional",
  "review",
] as const;

export type StepKey = (typeof STEP_KEYS)[number];
