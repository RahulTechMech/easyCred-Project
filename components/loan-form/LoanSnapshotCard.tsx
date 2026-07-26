"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";

/**
 * Signature element for the form: a sticky card that recalculates an
 * estimated EMI live as the applicant fills in loan amount / tenure /
 * income, so the number they eventually submit never feels like a black
 * box. Uses a flat estimate (assumed rate) purely for orientation —
 * the real, accurate EMI comes from the dedicated EMI Calculator page.
 */
export function LoanSnapshotCard({
  loanAmount,
  tenureMonths,
  monthlyIncome,
  existingEmi,
}: {
  loanAmount?: number;
  tenureMonths?: number;
  monthlyIncome?: number;
  existingEmi?: number;
}) {
  const ASSUMED_ANNUAL_RATE = 14; // indicative only, clearly labeled as such

  const estimate = useMemo(() => {
    if (!loanAmount || !tenureMonths || loanAmount <= 0 || tenureMonths <= 0) return null;
    const monthlyRate = ASSUMED_ANNUAL_RATE / 12 / 100;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    const totalPayment = emi * tenureMonths;
    const totalInterest = totalPayment - loanAmount;
    return { emi, totalPayment, totalInterest };
  }, [loanAmount, tenureMonths]);

  const burdenRatio = useMemo(() => {
    if (!estimate || !monthlyIncome || monthlyIncome <= 0) return null;
    return ((estimate.emi + (existingEmi || 0)) / monthlyIncome) * 100;
  }, [estimate, monthlyIncome, existingEmi]);

  const formatINR = (n: number) =>
    n.toLocaleString("en-IN", { maximumFractionDigits: 0, style: "currency", currency: "INR" });

  return (
    <div className="glass-panel sticky top-6 rounded-xl2 p-6 shadow-card">
      <p className="text-xs font-medium uppercase tracking-wider text-signal-300">Live Loan Snapshot</p>
      <p className="mt-1 text-xs text-frost-400">Updates instantly as you fill the form</p>

      <div className="mt-5 space-y-4">
        <div>
          <p className="text-xs text-frost-400">Estimated Monthly EMI</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={estimate ? Math.round(estimate.emi) : "empty"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-2xl font-semibold text-frost-50"
            >
              {estimate ? formatINR(estimate.emi) : "—"}
            </motion.p>
          </AnimatePresence>
          <p className="mt-0.5 text-[11px] text-frost-400/70">
            Indicative at ~{ASSUMED_ANNUAL_RATE}% p.a. — not your final offer
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-hairline/[0.03] p-3">
            <p className="text-[11px] text-frost-400">Total Interest</p>
            <p className="font-mono text-sm text-frost-100">{estimate ? formatINR(estimate.totalInterest) : "—"}</p>
          </div>
          <div className="rounded-lg bg-hairline/[0.03] p-3">
            <p className="text-[11px] text-frost-400">Total Payment</p>
            <p className="font-mono text-sm text-frost-100">{estimate ? formatINR(estimate.totalPayment) : "—"}</p>
          </div>
        </div>

        {burdenRatio !== null && (
          <div>
            <div className="mb-1.5 flex items-center justify-between text-[11px] text-frost-400">
              <span>Monthly Burden vs Income</span>
              <span className={burdenRatio > 50 ? "text-amber-500" : "text-mint-500"}>{burdenRatio.toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-hairline/10">
              <motion.div
                className={burdenRatio > 50 ? "h-full bg-amber-500" : "h-full bg-mint-500"}
                initial={false}
                animate={{ width: `${Math.min(burdenRatio, 100)}%` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              />
            </div>
            {burdenRatio > 50 && (
              <p className="mt-1.5 text-[11px] text-amber-500/90">
                Lenders generally prefer this under 50% of your income.
              </p>
            )}
          </div>
        )}
      </div>

      <p className="mt-5 border-t border-hairline/10 pt-4 text-[11px] leading-relaxed text-frost-400/70">
        EasyCred is a loan assistance platform, not a lender. Your actual EMI, interest rate and
        approval are determined by our partner banks/NBFCs after review.
      </p>
    </div>
  );
}
