import { Section, SectionIntro } from "../ui/Section";
import { Reveal } from "../ui/Reveal";

const BENEFITS = [
  {
    title: "No Collateral Required",
    desc: "Personal loans through our partners are typically unsecured — no need to pledge assets.",
  },
  {
    title: "Flexible End-Use",
    desc: "Use the funds for medical needs, weddings, travel, education, or debt consolidation.",
  },
  {
    title: "Flexible Tenure Options",
    desc: "Choose a repayment period between 3 to 84 months to match your budget.",
  },
  {
    title: "Digital-First Process",
    desc: "Apply, upload documents, and track status online — minimal paperwork, minimal branch visits.",
  },
];

export function LoanBenefitsSection() {
  return (
    <Section className="bg-ink-900/30">
      <SectionIntro eyebrow="Loan Benefits" title="Why a personal loan might be right for you" align="left" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {BENEFITS.map((b, i) => (
          <Reveal key={b.title} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.05}>
            <div className="flex gap-4 rounded-xl2 border border-hairline/10 bg-ink-800/30 p-6">
              <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mint-500/10 text-mint-500">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p className="font-display text-base font-semibold text-frost-50">{b.title}</p>
                <p className="mt-1.5 text-sm text-frost-400">{b.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
