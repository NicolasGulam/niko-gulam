import type { ReactNode } from "react";
import { DrawLine } from "@/components/motion/DrawLine";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";

type SectionHeaderProps = {
  /** id applied to the <h2> (used by aria-labelledby on the section). */
  id: string;
  eyebrow: string;
  title: string;
  /** Optional right-aligned content (section number, short note…). */
  aside?: ReactNode;
};

export function SectionHeader({ id, eyebrow, title, aside }: SectionHeaderProps) {
  return (
    <header>
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0">
          <Reveal>
            <p className="label-mono text-orange">{eyebrow}</p>
          </Reveal>
          <h2
            id={id}
            className="mt-3 flex items-center gap-4 font-display text-[clamp(1.75rem,4.2vw,3.5rem)] font-semiwide font-extrabold uppercase leading-[1] tracking-[-0.03em] text-paper"
          >
            <span
              aria-hidden="true"
              className="h-[3px] w-6 shrink-0 bg-orange sm:w-9"
            />
            <MaskText inView>{title}</MaskText>
          </h2>
        </div>
        {aside ? (
          <Reveal
            delay={0.2}
            className="hidden shrink-0 whitespace-nowrap pb-1 sm:block"
          >
            {aside}
          </Reveal>
        ) : null}
      </div>
      <DrawLine className="mt-6 sm:mt-7" />
    </header>
  );
}
