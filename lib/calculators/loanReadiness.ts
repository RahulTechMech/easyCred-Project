export type LoanReadinessInput = {
  monthlyIncome: number;
  existingEmiTotal: number;
  activeLoanCount: number;
  employmentType: "Salaried" | "Self Employed" | "Business Owner" | "Government Employee";
  workExperienceYears: number;
  age: number;
  previousLoanRejections: boolean;
  selfDeclaredRepaymentHistory: "Always on time" | "Occasionally late" | "Frequently late" | "No prior loans";
};

export type LoanReadinessResult = {
  score: number; // 0-100, an ESTIMATE only — not an official credit score
  band: "Needs Work" | "Fair" | "Good" | "Excellent";
  suggestions: string[];
};

/**
 * Produces an indicative "Loan Readiness Score" from user-provided inputs.
 * This is NOT a CIBIL/Experian/Equifax/CRIF score and must always be labeled
 * as an estimate in the UI. If/when an official bureau API is integrated
 * (with user consent), that score should be shown instead/alongside this one,
 * clearly attributed to the bureau.
 */
export function estimateLoanReadiness(input: LoanReadinessInput): LoanReadinessResult {
  let score = 50;
  const suggestions: string[] = [];

  // Debt-to-income ratio (existing EMIs vs income)
  const dti = input.monthlyIncome > 0 ? input.existingEmiTotal / input.monthlyIncome : 1;
  if (dti <= 0.2) score += 15;
  else if (dti <= 0.4) score += 5;
  else {
    score -= 15;
    suggestions.push("Reducing your existing EMI-to-income ratio below 40% can meaningfully improve your readiness.");
  }

  // Active loan count
  if (input.activeLoanCount === 0) score += 10;
  else if (input.activeLoanCount <= 2) score += 2;
  else {
    score -= 10;
    suggestions.push("Consider closing or consolidating some existing loans before applying for a new one.");
  }

  // Employment stability
  if (input.employmentType === "Government Employee") score += 10;
  else if (input.employmentType === "Salaried") score += 7;
  else score += 3;

  if (input.workExperienceYears >= 3) score += 8;
  else if (input.workExperienceYears >= 1) score += 3;
  else {
    suggestions.push("A longer work/business tenure generally improves lender confidence — 2-3 years is a common threshold.");
  }

  // Age band (typical sweet spot for repayment capacity)
  if (input.age >= 25 && input.age <= 50) score += 8;
  else if (input.age >= 21 && input.age <= 60) score += 3;

  // Rejections
  if (input.previousLoanRejections) {
    score -= 12;
    suggestions.push("Past rejections can impact new applications — check your bureau report for errors before reapplying.");
  }

  // Self-declared repayment history
  if (input.selfDeclaredRepaymentHistory === "Always on time") score += 12;
  else if (input.selfDeclaredRepaymentHistory === "No prior loans") score += 4;
  else if (input.selfDeclaredRepaymentHistory === "Occasionally late") {
    score -= 5;
    suggestions.push("Setting up auto-pay for existing EMIs/credit cards helps avoid late payments going forward.");
  } else {
    score -= 15;
    suggestions.push("Frequent late payments weigh heavily on lender decisions — prioritize catching up before applying.");
  }

  score = Math.max(0, Math.min(100, Math.round(score)));

  let band: LoanReadinessResult["band"] = "Needs Work";
  if (score >= 80) band = "Excellent";
  else if (score >= 60) band = "Good";
  else if (score >= 40) band = "Fair";

  if (suggestions.length === 0) {
    suggestions.push("You're in a strong position — keep your existing EMIs current and avoid new debt before applying.");
  }

  return { score, band, suggestions };
}
