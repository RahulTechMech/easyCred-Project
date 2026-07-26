"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container, Eyebrow } from "../ui/Section";
import { MouseParallax } from "../ui/MouseParallax";
import { AnimatedCounter } from "../ui/AnimatedCounter";

const STATS = [
  { value: 50000, suffix: "+", label: "Applications Assisted" },
  { value: 25, suffix: "+", label: "Partner Banks & NBFCs" },
  { value: 4, prefix: "", suffix: ".8/5", label: "Average Customer Rating" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-14 sm:pb-28 sm:pt-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-grad-radial-glow" aria-hidden />

      <MouseParallax strength={14}>
        <div
          className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-signal-500/20 blur-[100px] sm:h-96 sm:w-96"
          aria-hidden
        />
      </MouseParallax>
      <MouseParallax strength={10}>
        <div
          className="pointer-events-none absolute -left-16 top-52 h-56 w-56 rounded-full bg-mint-500/10 blur-[90px]"
          aria-hidden
        />
      </MouseParallax>

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Eyebrow>Trusted Loan Assistance Platform</Eyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-5 font-display text-4xl font-bold leading-tight text-frost-50 sm:text-5xl lg:text-6xl"
            >
              Get Personal Loan Assistance with{" "}
              <span className="bg-grad-signal bg-clip-text text-transparent">Fast Processing</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-base text-frost-400 sm:text-lg"
            >
              Compare offers from leading banks and financial institutions with expert guidance —
              all in one simple, secure application.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link
                href="/apply"
                className="rounded-xl bg-grad-signal px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98]"
              >
                Apply Now
              </Link>
              <Link
                href="/eligibility-calculator"
                className="rounded-xl border border-hairline/15 bg-ink-800/40 px-6 py-3.5 text-sm font-semibold text-frost-100 backdrop-blur transition-colors hover:border-signal-400/40"
              >
                Check Eligibility
              </Link>
              <Link
                href="/contact"
                className="rounded-xl px-6 py-3.5 text-sm font-semibold text-frost-300 transition-colors hover:text-frost-50"
              >
                Talk to Expert →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-14 grid grid-cols-3 gap-6 border-t border-hairline/10 pt-8"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="font-mono text-xl font-bold text-frost-50 sm:text-2xl"
                  />
                  <p className="mt-1 text-xs text-frost-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-md"
          >
            <div className="glass-panel relative rounded-xl2 p-6 shadow-card sm:p-8">
              <p className="text-xs font-medium uppercase tracking-wider text-signal-300">Sample Estimate</p>
              <p className="mt-4 font-mono text-4xl font-bold text-frost-50">₹8,45,000</p>
              <p className="mt-1 text-sm text-frost-400">Estimated eligible amount</p>

              <div className="mt-6 space-y-3">
                {[
                  { label: "Monthly EMI", value: "₹18,240" },
                  { label: "Interest Rate", value: "~13.5% p.a." },
                  { label: "Tenure", value: "48 months" },
                ].map((row, i) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex items-center justify-between rounded-lg bg-ink-800/40 px-4 py-3"
                  >
                    <span className="text-sm text-frost-400">{row.label}</span>
                    <span className="font-mono text-sm font-semibold text-frost-100">{row.value}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 -top-6 flex items-center gap-2 rounded-xl bg-mint-500 px-3 py-2 text-xs font-semibold text-ink-950 shadow-card"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Pre-qualified
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
