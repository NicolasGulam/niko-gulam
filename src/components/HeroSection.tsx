"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { EASE_OUT } from "@/components/motion/easing";
import { MaskText } from "@/components/motion/MaskText";
import { useLocale } from "@/i18n/provider";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

/** Entrance helper: fade + short rise, sequenced by `delay`. */
const enter = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE_OUT },
});

export function HeroSection() {
  const { t } = useLocale();
  const [cueVisible, setCueVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => setCueVisible(window.scrollY < 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-black"
    >
      {/* Background: orange diagonal bands drifting slowly.
          Only `transform` is animated; the radial mask keeps the lockup readable. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:radial-gradient(ellipse_80%_70%_at_50%_48%,transparent_18%,#000_88%)]"
      >
        <div className="bg-stripes animate-stripe-drift absolute inset-y-0 -left-[120px] right-0 will-change-transform motion-reduce:animate-none" />
      </div>

      <div className="shell flex flex-1 items-center justify-center py-20 pb-28 text-center sm:py-28 sm:pb-32">
        <div>
          {/* Lockup: extra-wide NK + small condensed wordmark stacked beside it */}
          <h1
            id="hero-title"
            aria-label={site.name}
            className="font-display leading-none"
          >
            <span className="flex items-center justify-center gap-[0.1em] text-[clamp(4.5rem,24vw,8rem)] md:text-[clamp(6rem,14vw,9rem)] lg:text-[clamp(6.5rem,10vw,11rem)]">
              <MaskText
                delay={0.15}
                innerClassName="font-wide font-black leading-[0.8] tracking-[-0.045em] text-orange"
              >
                NK
              </MaskText>
              <span className="font-narrow flex flex-col text-left text-[0.4em] font-semibold leading-[0.88] tracking-[-0.005em] text-paper">
                <MaskText delay={0.32} bleed={0.14}>
                  niko
                </MaskText>
                <MaskText delay={0.4} bleed={0.24}>
                  gulam
                </MaskText>
              </span>
            </span>
          </h1>

          <p
            className="mo label-mono mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[0.75rem] tracking-[0.2em] text-paper sm:mt-12"
            aria-label={t.hero.tagline.join(" · ")}
          >
            {t.hero.tagline.map((word, i) => (
              <Fragment key={word}>
                {i > 0 ? (
                  <motion.span
                    aria-hidden="true"
                    className="mo text-orange"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.6 + i * 0.1,
                      ease: EASE_OUT,
                    }}
                  >
                    ·
                  </motion.span>
                ) : null}
                <motion.span
                  aria-hidden="true"
                  className="mo"
                  {...enter(0.55 + i * 0.07)}
                >
                  {word}
                </motion.span>
              </Fragment>
            ))}
          </p>

          <motion.p
            className="mo label-mono mt-4 text-muted"
            {...enter(0.9)}
          >
            {t.hero.country}
          </motion.p>
        </div>
      </div>

      <motion.a
        href="#proyectos"
        aria-label={t.hero.scroll}
        className={cn(
          "absolute inset-x-0 bottom-5 z-10 mx-auto flex w-fit flex-col items-center gap-1.5 px-4 py-2 text-muted transition-opacity duration-500 hover:text-paper sm:bottom-7",
          cueVisible ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        tabIndex={cueVisible ? undefined : -1}
        {...enter(1.05)}
      >
        <span className="label-mono text-[0.625rem] tracking-[0.2em]">
          {t.hero.scroll}
        </span>
        <ChevronDown
          aria-hidden="true"
          className="size-5 animate-cue text-orange motion-reduce:animate-none"
        />
      </motion.a>
    </section>
  );
}
