import { Section, SectionIntro } from "../ui/Section";
import { HowItWorksTimeline } from "../ui/HowItWorksTimeline";

export function HowItWorksSection() {
  return (
    <Section className="bg-ink-900/30">
      <SectionIntro eyebrow="Process" title="How It Works" subtitle="Six simple steps from application to disbursal." />
      <HowItWorksTimeline />
    </Section>
  );
}
