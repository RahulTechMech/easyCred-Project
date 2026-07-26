"use client";

import { motion } from "framer-motion";
import { Section, SectionIntro } from "../ui/Section";

const REASONS = [
  { title: "Fast Processing", desc: "Streamlined application flow gets your details to lenders quickly." },
  { title: "Expert Loan Advisors", desc: "A dedicated advisor guides you from application to disbursal." },
  { title: "Lowest Possible Interest Options", desc: "We compare across partners to surface competitive offers." },
  { title: "Minimal Documentation", desc: "Just PAN, Aadhaar, salary slips and bank statements to start." },
  { title: "Quick Callback", desc: "Hear from an advisor within hours of applying, not days." },
  { title: "Multiple Bank Partners", desc: "25+ partner banks and NBFCs mean more options for you." },
  { title: "Transparent Process", desc: "Clear timelines and status updates — no black-box waiting." },
];

export function WhyChooseSection() {
  return (
    <Section>
      <SectionIntro eyebrow="Why EasyCred" title="Loan assistance, done right" subtitle="Everything about applying for a personal loan, made simpler and more transparent." />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REASONS.map((reason, i) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -4 }}
            className="group rounded-xl2 border border-hairline/10 bg-ink-800/30 p-6 transition-colors hover:border-signal-400/30"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-grad-signal font-mono text-sm font-bold text-white shadow-glow transition-transform group-hover:scale-110">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="mt-4 font-display text-base font-semibold text-frost-50">{reason.title}</p>
            <p className="mt-1.5 text-sm text-frost-400">{reason.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
