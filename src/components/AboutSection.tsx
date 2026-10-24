"use client";

import { DrawLine } from "@/components/motion/DrawLine";
import { PopDot } from "@/components/motion/PopDot";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAbout } from "@/data/about";
import { useLocale } from "@/i18n/provider";

export function AboutSection() {
  const { locale, t } = useLocale();
  const about = getAbout(locale);

  return (
    <section
      id="sobre-mi"
      aria-labelledby="sobre-mi-title"
      className="section-y relative overflow-hidden bg-carbon"
    >
      <div className="shell relative">
        <SectionHeader
          id="sobre-mi-title"
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          aside={
            <p className="label-mono text-muted">
              <span className="text-orange">03</span> / {t.about.aside}
            </p>
          }
        />

        <div className="mt-10 grid gap-12 sm:mt-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 lg:pr-10">
            <Reveal>
              <p className="text-pretty font-display text-[clamp(1.4rem,2.6vw,2.125rem)] font-medium leading-[1.25] tracking-[-0.02em] text-paper">
                {about.paragraphs[0]}
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-[38rem] text-pretty text-base leading-relaxed text-muted sm:text-lg">
                {about.paragraphs[1]}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <aside
              aria-label={t.about.tech}
              className="border border-line bg-black"
            >
              <p className="label-mono border-b border-line px-6 py-4 text-paper sm:px-7">
                {t.about.stack}
              </p>
              <div className="divide-y divide-line">
                {about.stack.map((group) => (
                  <div key={group.id} className="px-6 py-5 sm:px-7">
                    <p className="label-mono flex items-center gap-2.5 text-[0.625rem] text-orange">
                      <PopDot className="size-1.5" />
                      {group.label}
                    </p>
                    <ul className="mt-3.5 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="label-mono border border-line px-2.5 py-1.5 text-[0.625rem] text-paper transition-colors duration-300 hover:border-orange hover:text-orange"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="px-6 py-5 sm:px-7">
                  <p className="label-mono flex items-center gap-2.5 text-[0.625rem] text-orange">
                    <PopDot className="size-1.5" />
                    {t.about.languages}
                  </p>
                  <ul className="mt-3.5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs tracking-[0.04em] text-muted">
                    {about.languages.map((lang) => (
                      <li key={lang.label}>
                        <span className="text-paper">{lang.label}</span> ·{" "}
                        {lang.level}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px sm:mt-20 md:grid-cols-2 md:gap-0">
          {about.specializations.map((spec, i) => (
            <Reveal
              key={spec.id}
              delay={i * 0.12}
              className={i === 0 ? "md:pr-10" : "mt-12 md:mt-0 md:border-l md:border-line md:pl-10"}
            >
              <DrawLine delay={i * 0.12} />
              <div className="pt-6">
                <p className="label-mono text-orange">{spec.index}</p>
                <h3 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold uppercase leading-[1.02] tracking-[-0.03em] text-paper">
                  {spec.title}
                </h3>
                <p className="mt-4 max-w-[34rem] text-pretty text-[0.9375rem] leading-relaxed text-muted">
                  {spec.description}
                </p>
                <ul
                  aria-label={`${t.about.focus}: ${spec.title}`}
                  className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs tracking-[0.06em] text-muted"
                >
                  {spec.focus.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span aria-hidden="true" className="size-1 bg-orange" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
