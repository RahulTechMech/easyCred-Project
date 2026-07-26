"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

const STEPS = [
  { key: "personal", label: "Personal Info", hint: "Who you are" },
  { key: "employment", label: "Employment", hint: "Where you work" },
  { key: "loan", label: "Loan Details", hint: "What you need" },
  { key: "existingLoans", label: "Existing Loans", hint: "Current obligations" },
  { key: "additional", label: "Additional Info", hint: "A few last details" },
  { key: "review", label: "Review & Submit", hint: "Confirm & send" },
] as const;

export function StepProgressRail({ currentStep }: { currentStep: number }) {
  return (
    <>
      {/* Desktop: vertical rail */}
      <nav aria-label="Application progress" className="hidden lg:block">
        <ol className="relative space-y-8 pl-1">
          <div className="absolute left-[15px] top-2 h-[calc(100%-1rem)] w-px bg-hairline/10" aria-hidden />
          {STEPS.map((step, idx) => {
            const stepNum = idx + 1;
            const isActive = stepNum === currentStep;
            const isDone = stepNum < currentStep;
            return (
              <li key={step.key} className="relative flex items-start gap-3">
                <span
                  className={clsx(
                    "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold font-mono transition-colors duration-300",
                    isDone && "border-mint-500 bg-mint-500 text-ink-950",
                    isActive && "border-signal-400 bg-signal-500 text-white shadow-glow",
                    !isDone && !isActive && "border-hairline/15 bg-ink-900 text-frost-400"
                  )}
                >
                  {isDone ? (
                    <motion.svg initial={{ scale: 0 }} animate={{ scale: 1 }} width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  ) : (
                    stepNum
                  )}
                </span>
                <div className="pt-1">
                  <p className={clsx("text-sm font-medium transition-colors", isActive ? "text-frost-50" : "text-frost-400")}>
                    {step.label}
                  </p>
                  <p className="text-xs text-frost-400/70">{step.hint}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      {/* Mobile: horizontal progress bar */}
      <div className="lg:hidden">
        <div className="mb-2 flex items-center justify-between text-xs text-frost-400">
          <span>
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="font-medium text-frost-200">{STEPS[currentStep - 1]?.label}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-hairline/10">
          <motion.div
            className="h-full rounded-full bg-grad-signal"
            initial={false}
            animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>
      </div>
    </>
  );
}

export { STEPS };
