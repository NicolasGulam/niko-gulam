export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "es";

export const LOCALE_COOKIE = "nk-lang";

export type Localized = { es: string; en: string };

export function isLocale(value: unknown): value is Locale {
  return value === "es" || value === "en";
}

export function tx(locale: Locale, value: Localized | string): string {
  return typeof value === "string" ? value : value[locale];
}

export function parseLocale(value: FormDataEntryValue | string | null | undefined): Locale {
  return value === "en" ? "en" : "es";
}
