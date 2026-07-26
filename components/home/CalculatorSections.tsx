import { Section, SectionIntro } from "../ui/Section";
import { EmiCalculatorWidget } from "../calculators/EmiCalculatorWidget";
import { EligibilityCalculatorWidget } from "../calculators/EligibilityCalculatorWidget";
import { LoanReadinessWidget } from "../calculators/LoanReadinessWidget";

export function EmiCalculatorSection() {
  return (
    <Section id="emi-calculator">
      <SectionIntro eyebrow="EMI Calculator" title="Know your monthly payment upfront" subtitle="Adjust the sliders to see your EMI, total interest, and full repayment schedule instantly." />
      <EmiCalculatorWidget />
    </Section>
  );
}

export function EligibilityCalculatorSection() {
  return (
    <Section id="eligibility-calculator" className="bg-ink-900/30">
      <SectionIntro eyebrow="Eligibility Calculator" title="See how much you might qualify for" subtitle="A quick, indicative estimate based on your income and existing obligations." />
      <EligibilityCalculatorWidget />
    </Section>
  );
}

export function LoanReadinessSection() {
  return (
    <Section id="loan-readiness">
      <SectionIntro eyebrow="Loan Readiness" title="Check your Loan Readiness Score" subtitle="An estimate — not an official credit bureau score — to help you understand where you stand." />
      <LoanReadinessWidget />
    </Section>
  );
}
