"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT, IN_VIEW } from "./easing";

type ClipRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Image mask reveal: the box opens upwards (clip-path) while fading in.
 * With `prefers-reduced-motion`, the `mo-clip` rule in globals.css drops the
 * clip-path so only the opacity transition remains.
 */
export function ClipReveal({ children, delay = 0, className }: ClipRevealProps) {
  return (
    <motion.div
      className={cn("mo mo-clip", className)}
      initial={{ opacity: 0, clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={IN_VIEW}
      transition={{ duration: 1.1, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
