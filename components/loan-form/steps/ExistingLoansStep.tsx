"use client";

import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHeading, TextInput, SelectInput, ToggleField } from "../fields";
import type { FullLoanApplicationValues } from "@/lib/validation/loanApplicationSchema";

export function ExistingLoansStep() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<FullLoanApplicationValues>();

  const activeLoanCount = useWatch({ control, name: "activeLoanCount" });
  const hasCreditCardEmi = useWatch({ control, name: "hasCreditCardEmi" });
  const hasPersonalLoan = useWatch({ control, name: "hasPersonalLoan" });
  const hasHomeLoan = useWatch({ control, name: "hasHomeLoan" });
  const hasCarLoan = useWatch({ control, name: "hasCarLoan" });
  const hasGoldLoan = useWatch({ control, name: "hasGoldLoan" });
  const previousLoanRejections = useWatch({ control, name: "previousLoanRejections" });

  const { fields, append, remove } = useFieldArray({ control, name: "loanDetails" });

  const showLoanDetails = Number(activeLoanCount) > 0;

  return (
    <div>
      <SectionHeading
        title="Existing Loan Information"
        subtitle="Banks require this to assess your repayment capacity — please answer accurately"
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <TextInput
          label="How many active loans do you currently have?"
          type="number"
          min={0}
          placeholder="0"
          error={errors.activeLoanCount}
          {...register("activeLoanCount")}
        />
        <TextInput
          label="Total Existing Monthly Debt (₹)"
          type="number"
          placeholder="Sum of all current EMIs"
          error={errors.existingMonthlyDebt}
          {...register("existingMonthlyDebt")}
        />
        <TextInput
          label="Monthly Household Expenses (₹)"
          type="number"
          placeholder="Rent, groceries, utilities etc."
          error={errors.monthlyHouseholdExpenses}
          {...register("monthlyHouseholdExpenses")}
        />
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-medium text-frost-200">Do you currently have any of the following?</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ToggleField label="Personal Loan" checked={!!hasPersonalLoan} onChange={(v) => setValue("hasPersonalLoan", v)} />
          <ToggleField label="Home Loan" checked={!!hasHomeLoan} onChange={(v) => setValue("hasHomeLoan", v)} />
          <ToggleField label="Car Loan" checked={!!hasCarLoan} onChange={(v) => setValue("hasCarLoan", v)} />
          <ToggleField label="Gold Loan" checked={!!hasGoldLoan} onChange={(v) => setValue("hasGoldLoan", v)} />
          <ToggleField
            label="Credit Card EMI"
            checked={!!hasCreditCardEmi}
            onChange={(v) => setValue("hasCreditCardEmi", v)}
          />
          <ToggleField
            label="Any Previous Loan Rejections?"
            checked={!!previousLoanRejections}
            onChange={(v) => setValue("previousLoanRejections", v)}
          />
        </div>
      </div>

      <AnimatePresence>
        {hasCreditCardEmi && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-5 overflow-hidden"
          >
            <TextInput
              label="Credit Card Outstanding Amount (₹)"
              type="number"
              placeholder="Current outstanding balance"
              error={errors.creditCardOutstanding}
              {...register("creditCardOutstanding")}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLoanDetails && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6 overflow-hidden">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-medium text-frost-200">Existing Loan Details</p>
              <button
                type="button"
                onClick={() => append({ bankName: "", loanType: "Personal Loan", outstandingAmount: 0, emiAmount: 0 })}
                className="rounded-lg border border-signal-400/40 px-3 py-1.5 text-xs font-medium text-signal-300 transition-colors hover:bg-signal-500/10"
              >
                + Add Loan
              </button>
            </div>

            {errors.loanDetails?.message && <p className="mb-3 text-xs text-red-400">{errors.loanDetails.message as string}</p>}

            <div className="space-y-4">
              {fields.map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="relative rounded-xl border border-hairline/10 bg-ink-800/40 p-4"
                >
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute right-3 top-3 text-xs text-frost-400 transition-colors hover:text-red-400"
                    aria-label="Remove loan"
                  >
                    Remove
                  </button>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <TextInput label="Bank Name" placeholder="e.g. ICICI Bank" {...register(`loanDetails.${index}.bankName` as const)} />
                    <SelectInput
                      label="Loan Type"
                      options={["Personal Loan", "Home Loan", "Car Loan", "Gold Loan", "Credit Card EMI", "Other"]}
                      {...register(`loanDetails.${index}.loanType` as const)}
                    />
                    <TextInput
                      label="Outstanding Amount (₹)"
                      type="number"
                      {...register(`loanDetails.${index}.outstandingAmount` as const)}
                    />
                    <TextInput label="Current EMI (₹)" type="number" {...register(`loanDetails.${index}.emiAmount` as const)} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
