import { DrawLine } from "@/components/motion/DrawLine";
import { Reveal } from "@/components/motion/Reveal";
import type { Certification } from "@/data/career";

/** Compact list with hairline dividers: name + issuer (+ year when verified). */
export function CertificationsList({
  items,
  delay = 0,
}: {
  items: readonly Certification[];
  delay?: number;
}) {
  return (
    <ol role="list">
      {items.map((item, i) => (
        <Reveal as="li" key={item.id} delay={delay + i * 0.08} y={14}>
          <DrawLine delay={delay + i * 0.08} />
          <div className="group flex items-baseline gap-4 py-4">
            <span className="label-mono pt-1 text-[0.625rem] text-orange">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-base font-bold leading-snug tracking-[-0.01em] text-paper">
                {item.name}
              </p>
              <p className="label-mono mt-1.5 text-[0.625rem] text-muted">
                {item.issuer}
                {item.year ? ` · ${item.year}` : ""}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
      <li aria-hidden="true">
        <DrawLine delay={delay + items.length * 0.08} />
      </li>
    </ol>
  );
}
