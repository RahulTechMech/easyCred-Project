"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-4 text-center">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[400px] bg-grad-radial-glow" aria-hidden />

      <motion.span
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative font-display text-7xl font-bold text-transparent bg-grad-signal bg-clip-text sm:text-8xl"
      >
        404
      </motion.span>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative mt-4 font-display text-xl font-semibold text-frost-50 sm:text-2xl"
      >
        This page took a wrong turn
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative mt-2 max-w-sm text-sm text-frost-400"
      >
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative mt-8 flex flex-wrap justify-center gap-3"
      >
        <Link href="/" className="rounded-xl bg-grad-signal px-6 py-3 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03]">
          Back to Home
        </Link>
        <Link href="/contact" className="rounded-xl border border-hairline/15 bg-ink-800/40 px-6 py-3 text-sm font-semibold text-frost-100 transition-colors hover:border-signal-400/40">
          Contact Support
        </Link>
      </motion.div>
    </div>
  );
}
