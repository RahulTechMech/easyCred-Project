import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { FAQS } from "@/lib/content/faqs";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about EasyCred's personal loan assistance, eligibility, documents, and process.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="relative overflow-hidden pb-10 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-grad-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-8">
          <Reveal direction="up">
            <Eyebrow>FAQs</Eyebrow>
            <h1 className="mt-5 font-display text-3xl font-bold text-frost-50 sm:text-4xl">Frequently Asked Questions</h1>
            <p className="mx-auto mt-4 max-w-lg text-sm text-frost-400 sm:text-base">
              Everything you need to know about applying for a personal loan through EasyCred.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0">
        <div className="mx-auto max-w-2xl">
          <Accordion items={FAQS} />
        </div>
      </Section>
    </div>
  );
}
