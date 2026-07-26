export type EmiBreakdownRow = {
  month: number;
  principal: number;
  interest: number;
  balance: number;
};

export type EmiResult = {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  schedule: EmiBreakdownRow[];
};

export function calculateEmi(principal: number, annualRatePercent: number, tenureMonths: number): EmiResult {
  if (principal <= 0 || tenureMonths <= 0) {
    return { emi: 0, totalInterest: 0, totalPayment: 0, schedule: [] };
  }

  const monthlyRate = annualRatePercent / 12 / 100;

  const emi =
    monthlyRate === 0
      ? principal / tenureMonths
      : (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  let balance = principal;
  const schedule: EmiBreakdownRow[] = [];

  for (let month = 1; month <= tenureMonths; month++) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = emi - interestForMonth;
    balance = Math.max(balance - principalForMonth, 0);
    schedule.push({
      month,
      principal: principalForMonth,
      interest: interestForMonth,
      balance,
    });
  }

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return { emi, totalInterest, totalPayment, schedule };
}

export function formatINR(value: number, opts: { compact?: boolean } = {}): string {
  if (opts.compact) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value);
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}
