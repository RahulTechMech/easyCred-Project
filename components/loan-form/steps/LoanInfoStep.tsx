"use client";

import { useFormContext } from "react-hook-form";
import { SectionHeading, TextInput, SelectInput } from "../fields";
import type { FullLoanApplicationValues } from "@/lib/validation/loanApplicationSchema";

export function LoanInfoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FullLoanApplicationValues>();

  return (
    <div>
      <SectionHeading title="Loan Information" subtitle="Tell us what you're looking for" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextInput
          label="Required Loan Amount (₹)"
          type="number"
          placeholder="e.g. 500000"
          error={errors.requiredLoanAmount}
          {...register("requiredLoanAmount")}
        />
        <SelectInput
          label="Purpose of Loan"
          options={[
            "Medical Emergency",
            "Wedding",
            "Travel",
            "Home Renovation",
            "Education",
            "Debt Consolidation",
            "Business Expansion",
            "Other",
          ]}
          error={errors.loanPurpose}
          {...register("loanPurpose")}
        />
        <TextInput
          label="Preferred Tenure (months)"
          type="number"
          placeholder="e.g. 36"
          error={errors.preferredTenureMonths}
          {...register("preferredTenureMonths")}
        />
        <TextInput
          label="Expected Interest Rate — max (%, optional)"
          type="number"
          step="0.1"
          placeholder="e.g. 14"
          error={errors.expectedInterestRateMax}
          {...register("expectedInterestRateMax")}
        />
      </div>
    </div>
  );
}
