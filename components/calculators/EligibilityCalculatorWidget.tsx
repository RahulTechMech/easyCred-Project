"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { estimateEligibility, type EligibilityInput } from "@/lib/calculators/eligibility";
import { formatINR } from "@/lib/calculators/emi";

const EMPLOYMENT_TYPES: EligibilityInput["employmentType"][] = [
  "Salaried",
  "Self Employed",
  "Business Owner",
  "Government Employee",
];

export function EligibilityCalculatorWidget() {
  const [age, setAge] = useState(28);
  const [employmentType, setEmploymentType] = useState<EligibilityInput["employmentType"]>("Salaried");
  const [monthlyIncome, setMonthlyIncome] = useState(45000);
  const [existingEmi, setExistingEmi] = useState(5000);
  const [requiredAmount, setRequiredAmount] = useState(300000);
  const [city, setCity] = useState("");

  const result = useMemo(
    () => estimateEligibility({ age, employmentType, monthlyIncome, existingEmi, requiredAmount, city }),
    [age, employmentType, monthlyIncome, existingEmi, requiredAmount, city]
  );

  const readinessColor =
    result.readinessLabel === "Excellent"
      ? "text-mint-500"
      : result.readinessLabel === "Good"
      ? "text-signal-300"
      : result.readinessLabel === "Moderate"
      ? "text-amber-500"
      : "text-red-400";

  const inputCls =
    "w-full rounded-xl border border-hairline/10 bg-ink-800/60 px-4 py-2.5 text-sm text-frost-50 outline-none focus:border-signal-400";

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="glass-panel space-y-4 rounded-xl2 p-6 shadow-card sm:p-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-frost-200">Age</label>
            <input type="number" className={inputCls} value={age} onChange={(e) => setAge(Number(e.target.value))} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-frost-200">Employment Type</label>
            <select
              className={inputCls}
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value as EligibilityInput["employmentType"])}
            >
              {EMPLOYMENT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-ink-800">
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-frost-200">Monthly Income (₹)</label>
          <input
            type="number"
            className={inputCls}
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-frost-200">Existing Monthly EMI (₹)</label>
          <input
            type="number"
            className={inputCls}
            value={existingEmi}
            onChange={(e) => setExistingEmi(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-frost-200">Loan Amount Required (₹)</label>
          <input
            type="number"
            className={inputCls}
            value={requiredAmount}
            onChange={(e) => setRequiredAmount(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-frost-200">City</label>
          <input type="text" className={inputCls} placeholder="e.g. Bengaluru" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>
      </div>

      <div className="glass-panel rounded-xl2 p-6 shadow-card sm:p-8">
        <p className="text-xs font-medium uppercase tracking-wider text-signal-300">Estimated Eligibility</p>
        <motion.p
          key={result.eligibleAmount}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 font-mono text-3xl font-bold text-frost-50"
        >
          {formatINR(result.eligibleAmount)}
        </motion.p>
        <p className="mt-1 text-xs text-frost-400/70">Indicative maximum, based on the details provided</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-ink-800/40 p-3">
            <p className="text-[11px] text-frost-400">Estimated EMI</p>
            <p className="font-mono text-sm font-semibold text-frost-100">{formatINR(result.estimatedEmi)}</p>
          </div>
          <div className="rounded-lg bg-ink-800/40 p-3">
            <p className="text-[11px] text-frost-400">Monthly Burden</p>
            <p className="font-mono text-sm font-semibold text-frost-100">{result.monthlyBurdenPercent}%</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-xl border border-hairline/10 bg-ink-800/30 px-4 py-3">
          <span className="text-sm text-frost-300">Loan Readiness</span>
          <span className={`text-sm font-semibold ${readinessColor}`}>{result.readinessLabel}</span>
        </div>

        <p className="mt-4 text-[11px] leading-relaxed text-frost-400/70">
          This is an indicative estimate only (assumes ~{result.assumedAnnualRate}% p.a. over{" "}
          {result.assumedTenureMonths} months), not a loan offer. Actual eligibility, amount, and rate are
          determined by our partner banks/NBFCs after reviewing your full application.
        </p>
      </div>
    </div>
  );
}
