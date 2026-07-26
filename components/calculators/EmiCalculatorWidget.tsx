"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateEmi, formatINR } from "@/lib/calculators/emi";

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  display,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-frost-200">{label}</span>
        <span className="font-mono text-sm font-semibold text-signal-300">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink-700 accent-signal-500"
      />
    </div>
  );
}

function PieChart({ principal, interest }: { principal: number; interest: number }) {
  const total = principal + interest || 1;
  const principalPct = (principal / total) * 100;
  const circumference = 2 * Math.PI * 60;
  const principalOffset = circumference - (principalPct / 100) * circumference;

  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <svg width="140" height="140" viewBox="0 0 140 140" className="-rotate-90">
        <circle cx="70" cy="70" r="60" fill="none" stroke="rgb(var(--amber-500))" strokeWidth="16" opacity={0.35} />
        <motion.circle
          cx="70"
          cy="70"
          r="60"
          fill="none"
          stroke="rgb(var(--signal-400))"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: principalOffset }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-[10px] text-frost-400">Principal</span>
        <span className="font-mono text-sm font-semibold text-frost-50">{principalPct.toFixed(0)}%</span>
      </div>
    </div>
  );
}

export function EmiCalculatorWidget({ showTable = true }: { showTable?: boolean }) {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(13.5);
  const [tenure, setTenure] = useState(36);
  const [showFullTable, setShowFullTable] = useState(false);

  const result = useMemo(() => calculateEmi(amount, rate, tenure), [amount, rate, tenure]);
  const visibleRows = showFullTable ? result.schedule : result.schedule.slice(0, 6);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
      <div className="glass-panel space-y-7 rounded-xl2 p-6 shadow-card sm:p-8">
        <SliderField
          label="Loan Amount"
          value={amount}
          onChange={setAmount}
          min={10000}
          max={5000000}
          step={5000}
          display={formatINR(amount, { compact: true })}
        />
        <SliderField
          label="Interest Rate (p.a.)"
          value={rate}
          onChange={setRate}
          min={5}
          max={30}
          step={0.1}
          display={`${rate.toFixed(1)}%`}
        />
        <SliderField
          label="Tenure"
          value={tenure}
          onChange={setTenure}
          min={3}
          max={84}
          step={1}
          display={`${tenure} months`}
        />
      </div>

      <div className="glass-panel rounded-xl2 p-6 shadow-card sm:p-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs text-frost-400">Monthly EMI</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={Math.round(result.emi)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="font-mono text-3xl font-bold text-frost-50"
              >
                {formatINR(result.emi)}
              </motion.p>
            </AnimatePresence>
          </div>
          <PieChart principal={amount} interest={result.totalInterest} />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-ink-800/40 p-3">
            <p className="text-[11px] text-frost-400">Total Interest</p>
            <p className="font-mono text-sm font-semibold text-frost-100">{formatINR(result.totalInterest)}</p>
          </div>
          <div className="rounded-lg bg-ink-800/40 p-3">
            <p className="text-[11px] text-frost-400">Total Payment</p>
            <p className="font-mono text-sm font-semibold text-frost-100">{formatINR(result.totalPayment)}</p>
          </div>
        </div>

        {showTable && (
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-frost-200">Amortization Schedule</p>
              <button type="button" onClick={() => setShowFullTable((v) => !v)} className="text-xs font-medium text-signal-300 hover:text-signal-200">
                {showFullTable ? "Show less" : "Show all months"}
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto thin-scroll rounded-lg border border-hairline/10">
              <table className="w-full text-left text-xs">
                <thead className="sticky top-0 bg-ink-800/90 backdrop-blur">
                  <tr className="text-frost-400">
                    <th className="px-3 py-2 font-medium">Month</th>
                    <th className="px-3 py-2 font-medium">Principal</th>
                    <th className="px-3 py-2 font-medium">Interest</th>
                    <th className="px-3 py-2 font-medium">Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline/5 font-mono">
                  {visibleRows.map((row) => (
                    <tr key={row.month} className="text-frost-200">
                      <td className="px-3 py-2">{row.month}</td>
                      <td className="px-3 py-2">{formatINR(row.principal, { compact: true })}</td>
                      <td className="px-3 py-2">{formatINR(row.interest, { compact: true })}</td>
                      <td className="px-3 py-2">{formatINR(row.balance, { compact: true })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
