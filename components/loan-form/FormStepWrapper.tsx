"use client";

import { motion } from "framer-motion";

export function FormStepWrapper({ children, direction = 1 }: { children: React.ReactNode; direction?: 1 | -1 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 * direction }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 * direction }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
