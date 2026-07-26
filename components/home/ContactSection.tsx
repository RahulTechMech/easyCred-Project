import { Section, SectionIntro } from "../ui/Section";
import { ContactForm } from "../contact/ContactForm";
import { Reveal } from "../ui/Reveal";

const CONTACT_DETAILS = [
  { label: "Office Address", value: "4th Floor, Prestige Business Park, Bengaluru, Karnataka 560001" },
  { label: "Phone", value: "+91 12345 67890" },
  { label: "Email", value: "support@easycred.example" },
  { label: "Business Hours", value: "Mon - Sat, 9:00 AM - 7:00 PM IST" },
];

export function ContactSection() {
  return (
    <Section className="bg-ink-900/30">
      <SectionIntro eyebrow="Get in Touch" title="Talk to a loan advisor" subtitle="Have a question before applying? Send us a message." />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal direction="left">
          <div className="space-y-5">
            {CONTACT_DETAILS.map((item) => (
              <div key={item.label} className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
                <p className="text-xs font-medium text-signal-300">{item.label}</p>
                <p className="mt-1 text-sm text-frost-100">{item.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal direction="right">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

export { CONTACT_DETAILS };
