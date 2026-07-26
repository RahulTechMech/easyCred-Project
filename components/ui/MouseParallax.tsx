"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Wrap a decorative background element (blob, glow, illustration) in this
 * to make it subtly track the mouse for a premium parallax feel. Ignored
 * entirely on touch devices since there's no mouse to track.
 */
export function MouseParallax({ children, strength = 20 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });
  const translateX = useTransform(springX, [-1, 1], [-strength, strength]);
  const translateY = useTransform(springY, [-1, 1], [-strength, strength]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relX * 2);
    y.set(relY * 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="h-full w-full">
      <motion.div style={{ x: translateX, y: translateY }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
