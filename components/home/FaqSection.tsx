import Link from "next/link";
import { Section, SectionIntro } from "../ui/Section";
import { Accordion } from "../ui/Accordion";
import { FAQS } from "@/lib/content/faqs";

export function FaqSection() {
  return (
    <Section>
      <SectionIntro eyebrow="FAQs" title="Frequently asked questions" />
      <div className="mx-auto max-w-2xl">
        <Accordion items={FAQS.slice(0, 6)} />
        <div className="mt-6 text-center">
          <Link href="/faqs" className="text-sm font-medium text-signal-300 hover:text-signal-200">
            View all {FAQS.length} FAQs →
          </Link>
        </div>
      </div>
    </Section>
  );
}
