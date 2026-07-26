import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { CONTACT_DETAILS } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with EasyCred — call, WhatsApp, or send us a message and a loan advisor will reach out.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div>
      <section className="relative overflow-hidden pb-10 pt-16 sm:pt-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[360px] bg-grad-radial-glow" aria-hidden />
        <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-8">
          <Reveal direction="up">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-5 font-display text-3xl font-bold text-frost-50 sm:text-4xl">Talk to a loan advisor</h1>
            <p className="mx-auto mt-4 max-w-lg text-sm text-frost-400 sm:text-base">
              Have a question before applying? Reach out and we&apos;ll get back to you shortly.
            </p>
          </Reveal>
        </div>
      </section>

      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal direction="left">
            <div className="space-y-5">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label} className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
                  <p className="text-xs font-medium text-signal-300">{item.label}</p>
                  <p className="mt-1 text-sm text-frost-100">{item.value}</p>
                </div>
              ))}
              <div className="overflow-hidden rounded-xl2 border border-hairline/10">
                <iframe
                  title="EasyCred office location"
                  src="https://www.google.com/maps?q=Bengaluru,Karnataka&output=embed"
                  className="h-56 w-full grayscale"
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <ContactForm />
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
