"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT, IN_VIEW } from "./easing";

const tags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  p: motion.p,
  section: motion.section,
} as const;

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof tags;
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
  className?: string;
};

/**
 * Fade + short rise when the element enters the viewport (runs once).
 * The `mo` class lets the <noscript> rule in the layout keep it visible
 * when JavaScript is unavailable.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  className,
}: RevealProps) {
  const Component = tags[as];
  return (
    <Component
      className={cn("mo", className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.8, delay, ease: EASE_OUT }}
    >
      {children}
    </Component>
  );
}
