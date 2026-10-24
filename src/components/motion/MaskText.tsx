"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT, IN_VIEW } from "./easing";

type MaskTextProps = {
  children: ReactNode;
  delay?: number;
  /** Reveal on scroll instead of on mount. */
  inView?: boolean;
  /** Classes for the clipping wrapper (e.g. font size). */
  className?: string;
  /** Classes for the sliding inner element. */
  innerClassName?: string;
  /** Extra clip room above/below the text, in em (protects descenders). */
  bleed?: number;
};

const slide: Variants = {
  hidden: { y: "115%" },
  visible: { y: "0%" },
};

/**
 * Typographic mask reveal: the text slides up from behind a clipping edge.
 *
 * The *wrapper* is what gets observed (an element fully clipped by an
 * `overflow-hidden` ancestor never intersects the viewport), and the inner
 * element follows through variant propagation. Wrapper padding is paired with
 * an equal negative margin so the clip box never cuts ascenders/descenders
 * and the layout stays unchanged.
 */
export function MaskText({
  children,
  delay = 0,
  inView = false,
  className,
  innerClassName,
  bleed = 0.1,
}: MaskTextProps) {
  const trigger = inView
    ? { whileInView: "visible" as const, viewport: IN_VIEW }
    : { animate: "visible" as const };

  return (
    <motion.span
      className={cn("block overflow-hidden", className)}
      style={{ paddingBlock: `${bleed}em`, marginBlock: `${-bleed}em` }}
      initial="hidden"
      {...trigger}
    >
      <motion.span
        className={cn("mo block", innerClassName)}
        variants={slide}
        transition={{ duration: 1, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.span>
    </motion.span>
  );
}
