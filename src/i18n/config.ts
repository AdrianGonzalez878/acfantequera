export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const localeCookie = "acf-locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "es" || value === "en";
}

export function htmlLang(locale: Locale): string {
  return locale === "en" ? "en" : "es-MX";
}
