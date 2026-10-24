"use client";

import { ArrowUpRight } from "lucide-react";
import { DrawLine } from "@/components/motion/DrawLine";
import { MaskText } from "@/components/motion/MaskText";
import { Reveal } from "@/components/motion/Reveal";
import { externalLinkProps } from "@/lib/cn";
import { links } from "@/data/site";
import { useLocale } from "@/i18n/provider";

/** Compact editorial band that connects the personal portfolio with NTK Solutions. */
export function NTKSection() {
  const { t } = useLocale();

  return (
    <section
      aria-labelledby="ntk-title"
      className="relative bg-black py-[clamp(3.5rem,8vw,6.5rem)]"
    >
      <div className="shell">
        <div className="relative">
          <DrawLine
            tone="orange"
            duration={1.4}
            className="absolute inset-x-0 top-0 z-10 !h-[2px]"
          />
          <div className="grid gap-10 border-x border-b border-line px-6 py-12 sm:px-10 md:grid-cols-12 md:items-end md:gap-8 md:py-16">
            <div className="md:col-span-8">
              <Reveal>
                <p className="label-mono text-orange">{t.ntk.kicker}</p>
              </Reveal>
              <h2
                id="ntk-title"
                className="mt-5 font-display text-[clamp(1.75rem,4.3vw,4rem)] font-semiwide font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-paper"
              >
                <MaskText inView>{t.ntk.line1}</MaskText>
                <MaskText inView delay={0.12}>
                  <span className="text-orange">{t.ntk.line2a}</span>
                  {t.ntk.line2b}
                </MaskText>
              </h2>
              <Reveal delay={0.2}>
                <p className="mt-6 max-w-[34rem] text-pretty text-base leading-relaxed text-muted sm:text-lg">
                  {t.ntk.body}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.3} className="md:col-span-4 md:justify-self-end">
              <a
                href={links.ntk.href}
                {...externalLinkProps}
                className="group inline-flex min-h-14 w-full items-center justify-between gap-8 bg-orange px-7 font-mono text-xs font-medium tracking-[0.18em] text-black transition-colors duration-300 hover:bg-paper md:w-auto"
              >
                {t.ntk.cta}
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
                <span className="sr-only"> ({t.newTab})</span>
              </a>
              <p className="label-mono mt-3 text-[0.625rem] text-muted md:text-right">
                {links.ntk.display}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
