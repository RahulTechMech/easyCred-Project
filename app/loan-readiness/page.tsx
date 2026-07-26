import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LoanReadinessWidget } from "@/components/calculators/LoanReadinessWidget";

export const metadata: Metadata = {
  title: "Loan Readiness Score",
  description: "Get an estimated Loan Readiness Score based on your income, obligations, and repayment history — not an official credit bureau score.",
  alternates: { canonical: "/loan-readiness" },
};

export default function LoanReadinessPage() {
  return (
    <div>
      <section className="relative overflow-hidden pb-10 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-grad-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-8">
          <Reveal direction="up">
            <Eyebrow>Loan Readiness</Eyebrow>
            <h1 className="mt-5 font-display text-3xl font-bold text-frost-50 sm:text-4xl">
              Check your Loan Readiness Score
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm text-frost-400 sm:text-base">
              An estimate based on the details you provide — not an official credit score from CIBIL, Experian,
              Equifax, or CRIF.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0">
        <LoanReadinessWidget />
      </Section>
    </div>
  );
}
