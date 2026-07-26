"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { estimateLoanReadiness, type LoanReadinessInput } from "@/lib/calculators/loanReadiness";
import { GaugeMeter } from "../ui/GaugeMeter";

const EMPLOYMENT_TYPES: LoanReadinessInput["employmentType"][] = [
  "Salaried",
  "Self Employed",
  "Business Owner",
  "Government Employee",
];

const REPAYMENT_OPTIONS: LoanReadinessInput["selfDeclaredRepaymentHistory"][] = [
  "Always on time",
  "Occasionally late",
  "Frequently late",
  "No prior loans",
];

const inputCls =
  "w-full rounded-xl border border-hairline/10 bg-ink-800/60 px-4 py-2.5 text-sm text-frost-50 outline-none focus:border-signal-400";

export function LoanReadinessWidget() {
  const [monthlyIncome, setMonthlyIncome] = useState(45000);
  const [existingEmiTotal, setExistingEmiTotal] = useState(5000);
  const [activeLoanCount, setActiveLoanCount] = useState(1);
  const [employmentType, setEmploymentType] = useState<LoanReadinessInput["employmentType"]>("Salaried");
  const [workExperienceYears, setWorkExperienceYears] = useState(3);
  const [age, setAge] = useState(28);
  const [previousLoanRejections, setPreviousLoanRejections] = useState(false);
  const [repaymentHistory, setRepaymentHistory] = useState<LoanReadinessInput["selfDeclaredRepaymentHistory"]>(
    "Always on time"
  );

  const result = useMemo(
    () =>
      estimateLoanReadiness({
        monthlyIncome,
        existingEmiTotal,
        activeLoanCount,
        employmentType,
        workExperienceYears,
        age,
        previousLoanRejections,
        selfDeclaredRepaymentHistory: repaymentHistory,
      }),
    [monthlyIncome, existingEmiTotal, activeLoanCount, employmentType, workExperienceYears, age, previousLoanRejections, repaymentHistory]
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="glass-panel space-y-4 rounded-xl2 p-6 shadow-card sm:p-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-frost-200">Age</label>
            <input type="number" className={inputCls} value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-frost-200">Work Experience (yrs)</label>
            <input
              type="number"
              className={inputCls}
              value={workExperienceYears}
              onChange={(e) => setWorkExperienceYears(Number(e.target.value))}
            />
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-frost-200">Employment Type</label>
          <select className={inputCls} value={employmentType} onChange={(e) => setEmploymentType(e.target.value as any)}>
            {EMPLOYMENT_TYPES.map((t) => (
              <option key={t} value={t} className="bg-ink-800">
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-frost-200">Monthly Income (₹)</label>
            <input type="number" className={inputCls} value={monthlyIncome} onChange={(e) => setMonthlyIncome(Number(e.target.value))} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-frost-200">Existing EMIs (₹)</label>
            <input type="number" className={inputCls} value={existingEmiTotal} onChange={(e) => setExistingEmiTotal(Number(e.target.value))} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-frost-200">Active Loans</label>
            <input type="number" className={inputCls} value={activeLoanCount} onChange={(e) => setActiveLoanCount(Number(e.target.value))} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-frost-200">Repayment History</label>
            <select className={inputCls} value={repaymentHistory} onChange={(e) => setRepaymentHistory(e.target.value as any)}>
              {REPAYMENT_OPTIONS.map((r) => (
                <option key={r} value={r} className="bg-ink-800">
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex cursor-pointer items-center gap-2.5 pt-1">
          <input
            type="checkbox"
            checked={previousLoanRejections}
            onChange={(e) => setPreviousLoanRejections(e.target.checked)}
            className="h-4 w-4 rounded border-hairline/20 bg-ink-800 text-signal-500"
          />
          <span className="text-sm text-frost-300">I&apos;ve had a loan application rejected before</span>
        </label>
      </div>

      <div className="glass-panel flex flex-col items-center rounded-xl2 p-6 text-center shadow-card sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-signal-300">Loan Readiness Score (Estimate)</p>
        <div className="mt-4">
          <GaugeMeter score={result.score} label={result.band} />
        </div>

        <div className="mt-6 w-full space-y-2 text-left">
          {result.suggestions.slice(0, 3).map((tip, i) => (
            <motion.div
              key={tip}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex gap-2.5 rounded-lg bg-ink-800/40 p-3"
            >
              <span className="mt-0.5 text-signal-300">•</span>
              <p className="text-xs text-frost-300">{tip}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-5 text-[11px] leading-relaxed text-frost-400/70">
          This score is an internal estimate based on the details you entered — it is{" "}
          <strong className="text-frost-300">not</strong> an official credit score from CIBIL, Experian, Equifax
          or CRIF. Ask an advisor about a formal bureau check if you&apos;d like an official report.
        </p>
      </div>
    </div>
  );
}
