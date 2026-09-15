"use client";

import { createContext, useContext, type ReactNode } from "react";

import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

const LocaleContext = createContext<{
  locale: Locale;
  dict: Dictionary;
} | null>(null);

export function LocaleProvider({
  locale,
  dict,
  children,
}: {
  locale: Locale;
  dict: Dictionary;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={{ locale, dict }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(LocaleContext);
  if (!value) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return value;
}
