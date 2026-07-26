import type { Metadata } from "next";
import { LoanApplicationForm } from "@/components/loan-form/LoanApplicationForm";

export const metadata: Metadata = {
  title: "Apply for a Personal Loan",
  description: "Apply for personal loan assistance with EasyCred in about 5 minutes. Compare offers from partner banks and financial institutions.",
  alternates: { canonical: "/apply" },
};

export default function ApplyPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink-950 px-4 pb-24 pt-14 sm:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-grad-radial-glow" aria-hidden />

      <div className="relative mx-auto mb-12 max-w-6xl text-center">
        <span className="inline-block rounded-full border border-signal-400/30 bg-signal-500/10 px-3 py-1 text-xs font-medium text-signal-300">
          Loan Assistance Application
        </span>
        <h1 className="mt-4 font-display text-3xl font-bold text-frost-50 sm:text-4xl">
          Let&apos;s find the right personal loan for you
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-frost-400 sm:text-base">
          Takes about 5 minutes. EasyCred connects you with partner banks and financial institutions —
          we don&apos;t lend directly.
        </p>
      </div>

      <div className="relative">
        <LoanApplicationForm />
      </div>
    </div>
  );
}
