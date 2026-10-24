"use client";

import type { ReactNode } from "react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/data/site";
import { useLocale } from "@/i18n/provider";

export function FooterBar({ year }: { year: ReactNode }) {
  const { t } = useLocale();

  return (
    <footer className="border-t border-line bg-carbon">
      <div className="shell flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <a
          href="#inicio"
          aria-label={t.logoHome}
          className="text-2xl"
        >
          <Logo />
        </a>
        <p className="label-mono flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.625rem] text-muted">
          <span>
            © {year} {site.name}
          </span>
          <span aria-hidden="true" className="hidden h-3 w-px bg-line sm:block" />
          <span>{t.hero.country}</span>
        </p>
      </div>
    </footer>
  );
}
