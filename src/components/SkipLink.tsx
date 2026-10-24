"use client";

import { useLocale } from "@/i18n/provider";

export function SkipLink() {
  const { t } = useLocale();
  return (
    <a
      href="#proyectos"
      className="sr-only z-[100] bg-orange px-4 py-3 font-mono text-xs tracking-[0.14em] text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      {t.skip}
    </a>
  );
}
