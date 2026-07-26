"use client";

import { motion } from "framer-motion";
import { Section, SectionIntro } from "../ui/Section";

const DOCUMENTS = [
  { title: "PAN Card", icon: "🪪" },
  { title: "Aadhaar Card", icon: "📇" },
  { title: "Salary Slip", icon: "🧾" },
  { title: "Bank Statement", icon: "🏦" },
  { title: "Employee ID", icon: "💼" },
  { title: "Passport Size Photo", icon: "📷" },
];

export function DocumentsSection() {
  return (
    <Section>
      <SectionIntro eyebrow="Documents" title="What you'll need to apply" subtitle="Minimal paperwork — most applicants only need these six documents." />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {DOCUMENTS.map((doc, i) => (
          <motion.div
            key={doc.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className="flex flex-col items-center gap-2 rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5 text-center"
          >
            <span className="text-2xl">{doc.icon}</span>
            <p className="text-xs font-medium text-frost-100 sm:text-sm">{doc.title}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
