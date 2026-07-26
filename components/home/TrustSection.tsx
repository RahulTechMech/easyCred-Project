import { Section } from "../ui/Section";
import { StaggerGroup } from "../ui/Reveal";

const TRUST_ITEMS = [
  {
    title: "Secure Application",
    desc: "Bank-grade encryption protects your data at every step.",
    icon: (
      <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5l-8-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    ),
  },
  {
    title: "Data Privacy",
    desc: "Your information is never sold and only shared with matching lenders.",
    icon: <path d="M12 15v3M6 10V7a6 6 0 1 1 12 0v3M5 10h14v10H5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  },
  {
    title: "Trusted Loan Advisors",
    desc: "Real experts guide you — not just an algorithm.",
    icon: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  },
  {
    title: "Multiple Lending Partners",
    desc: "Compare offers across 25+ banks and NBFCs in one place.",
    icon: <path d="M4 20V10l8-6 8 6v10M9 20v-6h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  },
  {
    title: "Transparent Process",
    desc: "No hidden fees, no surprises — every step is explained clearly.",
    icon: <path d="M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: "Fast Response",
    desc: "Our advisors typically call back within a few hours.",
    icon: <path d="M12 6v6l4 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

export function TrustSection() {
  return (
    <Section className="py-12 sm:py-16">
      <StaggerGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" stagger={0.06}>
        {TRUST_ITEMS.map((item) => (
          <div key={item.title} className="flex flex-col items-center rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5 text-center">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-signal-500/10 text-signal-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                {item.icon}
              </svg>
            </span>
            <p className="text-xs font-semibold text-frost-50 sm:text-sm">{item.title}</p>
            <p className="mt-1 hidden text-[11px] leading-relaxed text-frost-400 sm:block">{item.desc}</p>
          </div>
        ))}
      </StaggerGroup>
    </Section>
  );
}
