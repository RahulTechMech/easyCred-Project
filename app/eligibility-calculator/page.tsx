import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EligibilityCalculatorWidget } from "@/components/calculators/EligibilityCalculatorWidget";

export const metadata: Metadata = {
  title: "Loan Eligibility Calculator",
  description: "Estimate how much personal loan you may qualify for based on your income, employment, and existing obligations.",
  alternates: { canonical: "/eligibility-calculator" },
};

export default function EligibilityCalculatorPage() {
  return (
    <div>
      <section className="relative overflow-hidden pb-10 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-grad-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-8">
          <Reveal direction="up">
            <Eyebrow>Eligibility Calculator</Eyebrow>
            <h1 className="mt-5 font-display text-3xl font-bold text-frost-50 sm:text-4xl">
              See how much you might qualify for
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm text-frost-400 sm:text-base">
              A quick, indicative estimate based on your income and existing obligations — not a final offer.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0">
        <EligibilityCalculatorWidget />
      </Section>
    </div>
  );
}
