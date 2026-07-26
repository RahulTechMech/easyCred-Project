import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { EmiCalculatorWidget } from "@/components/calculators/EmiCalculatorWidget";

export const metadata: Metadata = {
  title: "EMI Calculator",
  description: "Calculate your personal loan EMI instantly. Adjust loan amount, interest rate, and tenure to see your monthly payment and full amortization schedule.",
  alternates: { canonical: "/emi-calculator" },
};

export default function EmiCalculatorPage() {
  return (
    <div>
      <section className="relative overflow-hidden pb-10 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-grad-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-8">
          <Reveal direction="up">
            <Eyebrow>EMI Calculator</Eyebrow>
            <h1 className="mt-5 font-display text-3xl font-bold text-frost-50 sm:text-4xl">
              Know your monthly payment upfront
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm text-frost-400 sm:text-base">
              Adjust the sliders below to see your EMI, total interest, and complete repayment schedule instantly.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0">
        <EmiCalculatorWidget />
      </Section>
    </div>
  );
}
