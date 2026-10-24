"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { EASE_OUT, IN_VIEW } from "./easing";

/** Small square orange marker that pops in when it enters the viewport. */
export function PopDot({
  delay = 0,
  className,
}: {
  delay?: number;
  className?: string;
}) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn("mo block size-2 bg-orange", className)}
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={IN_VIEW}
      transition={{ duration: 0.5, delay, ease: EASE_OUT }}
    />
  );
}
