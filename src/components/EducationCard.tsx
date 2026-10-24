import { cn } from "@/lib/cn";
import { DrawLine } from "@/components/motion/DrawLine";
import { PopDot } from "@/components/motion/PopDot";
import type { Education } from "@/data/career";

type EducationCardProps = {
  item: Education;
  isLast: boolean;
  delay?: number;
};

export function EducationCard({ item, isLast, delay = 0 }: EducationCardProps) {
  return (
    <article className={cn("relative pl-7", !isLast && "pb-9")}>
      <PopDot delay={delay} className="absolute left-0 top-[0.4rem]" />
      {isLast ? null : (
        <DrawLine
          vertical
          delay={delay + 0.15}
          className="absolute bottom-0 left-[3.5px] top-6 !h-auto w-px"
        />
      )}

      <p className="label-mono text-[0.625rem] text-muted">
        {item.period ?? "—"}
      </p>
      <h4 className="mt-2 font-display text-lg font-bold uppercase leading-tight tracking-[-0.02em] text-paper">
        {item.program}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {item.institution}
      </p>
      {item.status ? (
        <p className="label-mono mt-3 inline-block border border-line px-2.5 py-1.5 text-[0.625rem] leading-snug text-orange">
          {item.status}
        </p>
      ) : null}
    </article>
  );
}
