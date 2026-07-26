export type EligibilityInput = {
  age: number;
  employmentType: "Salaried" | "Self Employed" | "Business Owner" | "Government Employee";
  monthlyIncome: number;
  existingEmi: number;
  requiredAmount: number;
  city: string;
};

export type EligibilityResult = {
  eligibleAmount: number;
  estimatedEmi: number;
  monthlyBurdenPercent: number;
  readinessLabel: "Low" | "Moderate" | "Good" | "Excellent";
  assumedAnnualRate: number;
  assumedTenureMonths: number;
};

// Indicative FOIR (Fixed Obligation to Income Ratio) caps lenders commonly use.
const FOIR_CAP: Record<EligibilityInput["employmentType"], number> = {
  Salaried: 0.5,
  "Government Employee": 0.55,
  "Self Employed": 0.45,
  "Business Owner": 0.45,
};

const ASSUMED_ANNUAL_RATE = 14;
const ASSUMED_TENURE_MONTHS = 36;

export function estimateEligibility(input: EligibilityInput): EligibilityResult {
  const foirCap = FOIR_CAP[input.employmentType] ?? 0.45;
  const maxAffordableEmi = Math.max(input.monthlyIncome * foirCap - input.existingEmi, 0);

  const monthlyRate = ASSUMED_ANNUAL_RATE / 12 / 100;
  const eligibleAmount =
    maxAffordableEmi > 0
      ? (maxAffordableEmi * (Math.pow(1 + monthlyRate, ASSUMED_TENURE_MONTHS) - 1)) /
        (monthlyRate * Math.pow(1 + monthlyRate, ASSUMED_TENURE_MONTHS))
      : 0;

  const estimatedEmi =
    input.requiredAmount > 0
      ? (input.requiredAmount * monthlyRate * Math.pow(1 + monthlyRate, ASSUMED_TENURE_MONTHS)) /
        (Math.pow(1 + monthlyRate, ASSUMED_TENURE_MONTHS) - 1)
      : 0;

  const monthlyBurdenPercent =
    input.monthlyIncome > 0 ? ((estimatedEmi + input.existingEmi) / input.monthlyIncome) * 100 : 0;

  let readinessLabel: EligibilityResult["readinessLabel"] = "Low";
  if (input.age >= 21 && input.age <= 60 && monthlyBurdenPercent > 0 && monthlyBurdenPercent <= 40) {
    readinessLabel = "Excellent";
  } else if (monthlyBurdenPercent <= 55) {
    readinessLabel = "Good";
  } else if (monthlyBurdenPercent <= 70) {
    readinessLabel = "Moderate";
  }

  return {
    eligibleAmount: Math.round(eligibleAmount),
    estimatedEmi: Math.round(estimatedEmi),
    monthlyBurdenPercent: Math.round(monthlyBurdenPercent),
    readinessLabel,
    assumedAnnualRate: ASSUMED_ANNUAL_RATE,
    assumedTenureMonths: ASSUMED_TENURE_MONTHS,
  };
}
