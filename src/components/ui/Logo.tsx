import { cn } from "@/lib/cn";

/**
 * NK (orange, extra-wide black) + nikogulam (white, condensed).
 * Size is controlled by the parent's font-size.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-[0.28em] font-display leading-none",
        className,
      )}
    >
      <span className="font-wide font-black tracking-[-0.02em] text-orange">
        NK
      </span>
      <span className="font-narrow text-[0.92em] font-semibold tracking-[0.01em] text-paper">
        nikogulam
      </span>
    </span>
  );
}
