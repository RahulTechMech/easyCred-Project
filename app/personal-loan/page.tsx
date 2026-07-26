import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionIntro, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PersonalLoanFeaturesSection } from "@/components/home/PersonalLoanFeaturesSection";
import { DocumentsSection } from "@/components/home/DocumentsSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { FaqSection } from "@/components/home/FaqSection";

export const metadata: Metadata = {
  title: "Personal Loan",
  description: "Explore personal loan assistance from EasyCred — flexible amounts, tenures, and minimal documentation.",
  alternates: { canonical: "/personal-loan" },
};

const USE_CASES = [
  "Medical Emergency",
  "Wedding Expenses",
  "Travel & Vacation",
  "Home Renovation",
  "Higher Education",
  "Debt Consolidation",
  "Business Expansion",
  "Other Personal Needs",
];

export default function PersonalLoanPage() {
  return (
    <div>
      <section className="relative overflow-hidden pb-16 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grad-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-8">
          <Reveal direction="up">
            <Eyebrow>Personal Loan</Eyebrow>
            <h1 className="mt-5 font-display text-3xl font-bold text-frost-50 sm:text-4xl md:text-5xl">
              A personal loan for whatever life brings
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-sm text-frost-400 sm:text-base">
              Unsecured, flexible, and matched to your needs — through our network of partner banks and NBFCs.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/apply" className="rounded-xl bg-grad-signal px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]">
                Apply Now
              </Link>
              <Link href="/eligibility-calculator" className="rounded-xl border border-hairline/15 bg-ink-800/40 px-6 py-3.5 text-sm font-semibold text-frost-100 transition-colors hover:border-signal-400/40">
                Check Eligibility
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <PersonalLoanFeaturesSection />

      <Section className="bg-ink-900/30">
        <SectionIntro eyebrow="Use Cases" title="What can a personal loan be used for?" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {USE_CASES.map((use) => (
            <div key={use} className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-4 text-center text-sm font-medium text-frost-200">
              {use}
            </div>
          ))}
        </div>
      </Section>

      <DocumentsSection />
      <HowItWorksSection />
      <FaqSection />
    </div>
  );
}
