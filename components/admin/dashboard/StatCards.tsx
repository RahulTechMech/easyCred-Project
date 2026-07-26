"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export type DashboardCards = {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  pending: number;
  contacted: number;
  documentsPending: number;
  approved: number;
  rejected: number;
  disbursed: number;
};

const CARD_DEFS: { key: keyof DashboardCards; label: string; accent: string }[] = [
  { key: "total", label: "Total Leads", accent: "text-frost-50" },
  { key: "today", label: "Today's Leads", accent: "text-signal-300" },
  { key: "thisWeek", label: "This Week", accent: "text-signal-300" },
  { key: "thisMonth", label: "This Month", accent: "text-signal-300" },
  { key: "pending", label: "Pending (New)", accent: "text-frost-100" },
  { key: "contacted", label: "Contacted", accent: "text-amber-500" },
  { key: "documentsPending", label: "Documents Pending", accent: "text-purple-300" },
  { key: "approved", label: "Approved", accent: "text-mint-500" },
  { key: "rejected", label: "Rejected", accent: "text-red-400" },
  { key: "disbursed", label: "Disbursed", accent: "text-signal-200" },
];

export function DashboardStatCards({ cards }: { cards: DashboardCards }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {CARD_DEFS.map((def, i) => (
        <motion.div
          key={def.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
          className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5"
        >
          <p className="text-xs text-frost-400">{def.label}</p>
          <AnimatedCounter value={cards[def.key]} className={`mt-2 block font-mono text-2xl font-bold ${def.accent}`} />
        </motion.div>
      ))}
    </div>
  );
}
