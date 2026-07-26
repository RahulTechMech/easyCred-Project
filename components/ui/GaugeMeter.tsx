"use client";

import { motion } from "framer-motion";

export function GaugeMeter({ score, label }: { score: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, score));
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  const color = clamped >= 70 ? "rgb(var(--mint-500))" : clamped >= 40 ? "rgb(var(--amber-500))" : "#ef4444";

  return (
    <div className="relative mx-auto flex h-48 w-48 items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180" className="-rotate-90">
        <circle cx="90" cy="90" r={radius} fill="none" stroke="rgb(var(--ink-700))" strokeWidth="14" />
        <motion.circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-3xl font-bold text-frost-50">{Math.round(clamped)}</span>
        <span className="text-xs text-frost-400">{label}</span>
      </div>
    </div>
  );
}
