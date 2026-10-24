"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT, IN_VIEW } from "./easing";

type DrawLineProps = {
  vertical?: boolean;
  delay?: number;
  duration?: number;
  /** Divider colour: neutral grey (default) or the brand orange. */
  tone?: "line" | "orange";
  className?: string;
};

/** A 1px divider that draws itself (scale transform) when it enters the viewport. */
export function DrawLine({
  vertical = false,
  delay = 0,
  duration = 1.1,
  tone = "line",
  className,
}: DrawLineProps) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "mo block",
        tone === "orange" ? "bg-orange" : "bg-line",
        vertical ? "h-full w-px origin-top" : "h-px w-full origin-left",
        className,
      )}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={IN_VIEW}
      transition={{ duration, delay, ease: EASE_OUT }}
    />
  );
}
