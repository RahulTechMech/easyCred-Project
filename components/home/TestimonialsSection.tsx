import { Section, SectionIntro } from "../ui/Section";
import { TestimonialSlider } from "../ui/TestimonialSlider";
import { TESTIMONIALS } from "@/lib/content/testimonials";

export function TestimonialsSection() {
  return (
    <Section className="bg-ink-900/30">
      <SectionIntro eyebrow="Testimonials" title="What our customers say" />
      <TestimonialSlider testimonials={TESTIMONIALS} />
    </Section>
  );
}
