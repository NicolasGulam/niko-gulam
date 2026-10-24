import { cn } from "@/lib/cn";
import { DrawLine } from "@/components/motion/DrawLine";
import { PopDot } from "@/components/motion/PopDot";
import type { Experience } from "@/data/career";

type ExperienceCardProps = {
  item: Experience;
  /** The last item of a list doesn't need the connecting rail. */
  isLast: boolean;
  delay?: number;
};

export function ExperienceCard({ item, isLast, delay = 0 }: ExperienceCardProps) {
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
      <h4 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-[-0.02em] text-paper">
        {item.organization}
      </h4>
      <p className="label-mono mt-2 text-[0.625rem] leading-relaxed text-orange">
        {item.role}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-muted">{item.summary}</p>
    </article>
  );
}
