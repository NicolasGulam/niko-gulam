"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { Logo } from "@/components/ui/Logo";
import { EASE_OUT } from "@/components/motion/easing";
import { cn, externalLinkProps } from "@/lib/cn";
import { externalNav, sectionNav } from "@/data/site";
import { useLocale } from "@/i18n/provider";

const SECTION_IDS = sectionNav.map((item) => item.href.slice(1));
/** Navbar height (h-16) — keep in sync with `scroll-padding-top` in globals.css. */
const NAV_OFFSET = 64;

/** Returns the id of the section currently under the reading line. */
function useActiveSection(): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(SECTION_IDS[SECTION_IDS.length - 1]);
        return;
      }
      const line = NAV_OFFSET + window.innerHeight * 0.35;
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}

export function Navbar() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const labels: Record<(typeof sectionNav)[number]["key"], string> = {
    projects: t.nav.projects,
    career: t.nav.career,
    about: t.nav.about,
    contact: t.nav.contact,
  };

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && close();
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onChange);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onChange);
    };
  }, [open, close]);

  return (
    <motion.header
      className="mo sticky top-0 z-50 border-b border-line bg-black"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:gap-6">
        <div className="flex min-w-0 items-center gap-5">
          <a
            href="#inicio"
            aria-label={t.logoHome}
            className="text-[1.375rem]"
          >
            <Logo />
          </a>
          <span
            aria-hidden="true"
            className="label-mono hidden h-4 items-center border-l border-line pl-5 text-[0.625rem] text-muted xl:inline-flex"
          >
            {t.portfolio}
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label={t.nav.primary} className="hidden lg:block">
            <ul className="flex items-center gap-3">
              {sectionNav.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "group relative block whitespace-nowrap px-3 py-2 font-mono text-xs tracking-[0.14em] transition-colors duration-300",
                        isActive ? "text-paper" : "text-muted hover:text-paper",
                      )}
                    >
                      {labels[item.key]}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3 bottom-1 h-px origin-left bg-orange transition-transform duration-500 ease-out-expo",
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
              <li className="ml-4">
                <a
                  href={externalNav.href}
                  {...externalLinkProps}
                  className="group flex items-center gap-2 whitespace-nowrap border border-line px-3.5 py-2 font-mono text-xs tracking-[0.14em] text-paper transition-colors duration-300 hover:border-orange hover:text-orange"
                >
                  {t.nav.ntk}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                  <span className="sr-only"> ({t.newTab})</span>
                </a>
              </li>
            </ul>
          </nav>

          <LanguageSwitch />

          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.close : t.nav.open}
            onClick={() => setOpen((value) => !value)}
            className="-mr-2 flex size-12 items-center justify-center text-paper transition-colors hover:text-orange lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="size-6" />
            ) : (
              <Menu aria-hidden="true" className="size-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="scrim"
              aria-hidden="true"
              className="fixed inset-x-0 bottom-0 top-16 bg-black/70 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => close()}
            />
            <motion.nav
              key="panel"
              id="mobile-menu"
              aria-label={t.nav.mobile}
              className="absolute inset-x-0 top-full border-b border-line bg-black lg:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <ul className="shell py-2">
                {sectionNav.map((item, i) => (
                  <li key={item.href} className="border-b border-line">
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={() => close()}
                      className="group flex min-h-16 items-center justify-between font-display text-2xl font-bold tracking-[-0.02em] text-paper transition-colors hover:text-orange"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="label-mono text-orange">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {labels[item.key]}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={externalNav.href}
                    {...externalLinkProps}
                    className="group flex min-h-16 items-center justify-between font-mono text-sm tracking-[0.14em] text-orange"
                  >
                    {t.nav.ntk}
                    <ArrowUpRight aria-hidden="true" className="size-5" />
                    <span className="sr-only"> ({t.newTab})</span>
                  </a>
                </li>
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
