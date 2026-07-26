"use client";

import { motion } from "framer-motion";

type TimelineEntry = {
  type: string;
  description: string;
  author?: string;
  createdAt: string;
};

const TYPE_ICONS: Record<string, string> = {
  status_change: "🔄",
  note: "📝",
  assignment: "👤",
  follow_up: "📅",
  call_outcome: "📞",
  system: "⚙️",
};

export function TimelinePanel({ timeline }: { timeline: TimelineEntry[] }) {
  const sorted = [...timeline].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="rounded-xl2 border border-hairline/10 bg-ink-800/30 p-5">
      <p className="mb-4 text-sm font-semibold text-frost-50">Activity Timeline</p>
      {sorted.length === 0 ? (
        <p className="text-sm text-frost-400">No activity yet.</p>
      ) : (
        <div className="max-h-96 space-y-4 overflow-y-auto thin-scroll pr-1">
          {sorted.map((entry, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.3) }}
              className="flex gap-3"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink-700/60 text-xs">
                {TYPE_ICONS[entry.type] || "•"}
              </span>
              <div className="flex-1 border-b border-hairline/5 pb-3">
                <p className="text-sm text-frost-100">{entry.description}</p>
                <p className="mt-0.5 text-[11px] text-frost-400">
                  {new Date(entry.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  {entry.author ? ` • ${entry.author}` : ""}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
