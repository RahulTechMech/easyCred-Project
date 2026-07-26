import { Reveal } from "./Reveal";
import { Eyebrow, Section } from "./Section";

export type LegalSection = { heading: string; body: string[] };

export function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  intro,
  sections,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <div>
      <section className="relative overflow-hidden pb-8 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[300px] bg-grad-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-8">
          <Reveal direction="up">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="mt-5 font-display text-3xl font-bold text-frost-50 sm:text-4xl">{title}</h1>
            <p className="mt-3 text-xs text-frost-400/70">Last updated: {lastUpdated}</p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0">
        <div className="mx-auto max-w-2xl">
          {intro && <p className="mb-8 text-sm leading-relaxed text-frost-400 sm:text-base">{intro}</p>}
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-lg font-semibold text-frost-50">{section.heading}</h2>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-frost-400">
                  {section.body.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
