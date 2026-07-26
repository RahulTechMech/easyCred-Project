"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type Testimonial = {
  name: string;
  city: string;
  rating: number;
  review: string;
  initials: string;
};

export function TestimonialSlider({ testimonials }: { testimonials: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  function go(delta: 1 | -1) {
    setDirection(delta);
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  }

  const current = testimonials[index];

  return (
    <div className="relative mx-auto max-w-2xl">
      <div className="glass-panel relative min-h-[260px] overflow-hidden rounded-xl2 p-8 shadow-card sm:p-10">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 * direction }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 flex gap-1 text-amber-500" aria-label={`${current.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < current.rating ? "currentColor" : "none"} stroke="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" strokeWidth="1" />
                </svg>
              ))}
            </div>
            <p className="text-base leading-relaxed text-frost-100 sm:text-lg">&ldquo;{current.review}&rdquo;</p>
            <div className="mt-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-grad-signal font-display text-sm font-semibold text-white">
                {current.initials}
              </span>
              <div>
                <p className="text-sm font-semibold text-frost-50">{current.name}</p>
                <p className="text-xs text-frost-400">{current.city}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline/10 text-frost-200 transition-colors hover:border-signal-400/40 hover:text-signal-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex gap-1.5">
          {testimonials.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-signal-400" : "w-1.5 bg-hairline/20"}`} />
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next testimonial"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline/10 text-frost-200 transition-colors hover:border-signal-400/40 hover:text-signal-300"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
