"use client";

import { motion, type Variants } from "framer-motion";

type RevealDirection = "up" | "down" | "left" | "right" | "scale" | "blur";

const DISTANCE = 28;

const variantsByDirection: Record<RevealDirection, Variants> = {
  up: {
    hidden: { opacity: 0, y: DISTANCE },
    visible: { opacity: 1, y: 0 },
  },
  down: {
    hidden: { opacity: 0, y: -DISTANCE },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: DISTANCE },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: -DISTANCE },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 12 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
};

/**
 * Generic scroll-triggered reveal. Wrap any section/element in this to get
 * a fade/slide/scale/blur-in animation the first time it enters the viewport.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = motion[Tag as "div"];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variantsByDirection[direction]}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggers its children in one-by-one using Reveal-compatible variants.
 * Give each direct child a `revealVariant` via Stagger.Item, or just pass
 * plain elements — they'll inherit the fade-up default.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  direction?: RevealDirection;
}) {
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger } },
  };
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={container} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div key={i} variants={variantsByDirection[direction]} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  );
}
