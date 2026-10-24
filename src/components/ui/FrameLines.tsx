/**
 * Two hairlines framing the page on wide screens (from the original sketch).
 * Purely decorative, fixed, and never intercepts the pointer.
 */
export function FrameLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-1/2 z-10 hidden w-full max-w-[92rem] -translate-x-1/2 px-[calc(clamp(1.25rem,4vw,3rem)/2)] lg:block"
    >
      <div className="h-full border-x border-paper/[0.07]" />
    </div>
  );
}
