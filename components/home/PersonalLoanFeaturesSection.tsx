"use client";

import { motion } from "framer-motion";
import { Section, SectionIntro } from "../ui/Section";

const FEATURES = [
  { title: "₹10K – ₹1Cr Loan Range", desc: "From small personal needs to large expenses, we help you find the right size." },
  { title: "Rates from ~10.5% p.a.*", desc: "Indicative starting rate across our partner network. *Subject to lender approval." },
  { title: "Approval in as fast as 24-48 hrs", desc: "For eligible profiles with complete documentation, subject to lender timelines." },
  { title: "Tenure up to 7 Years", desc: "Spread repayments comfortably across up to 84 months." },
];

export function PersonalLoanFeaturesSection() {
  return (
    <Section>
      <SectionIntro eyebrow="Personal Loan" title="Built around your needs" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-xl2 border border-hairline/10 bg-gradient-to-br from-signal-500/10 to-transparent p-6"
          >
            <p className="font-mono text-lg font-bold text-frost-50 sm:text-xl">{f.title}</p>
            <p className="mt-2 text-sm text-frost-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
