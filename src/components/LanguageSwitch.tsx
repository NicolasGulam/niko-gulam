"use client";

import { LOCALES, type Locale } from "@/i18n/locale";
import { useLocale } from "@/i18n/provider";
import { cn } from "@/lib/cn";

export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t.lang.group}
      className={cn("flex items-center", className)}
    >
      {LOCALES.map((code: Locale, i) => {
        const active = locale === code;
        return (
          <span key={code} className="flex items-center">
            {i > 0 ? (
              <span aria-hidden="true" className="px-0.5 text-line">
                /
              </span>
            ) : null}
            <button
              type="button"
              lang={code}
              aria-pressed={active}
              aria-label={t.lang[code]}
              onClick={() => setLocale(code)}
              className={cn(
                "min-h-11 min-w-9 px-1.5 font-mono text-[0.6875rem] tracking-[0.16em] transition-colors duration-300",
                active ? "text-orange" : "text-muted hover:text-paper",
              )}
            >
              {code.toUpperCase()}
            </button>
          </span>
        );
      })}
    </div>
  );
}
