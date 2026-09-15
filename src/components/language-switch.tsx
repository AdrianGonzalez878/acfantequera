"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { setLocale } from "@/app/actions/locale";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/config";
import { useI18n } from "@/components/locale-provider";

export function LanguageSwitch({ className }: { className?: string }) {
  const { locale, dict } = useI18n();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function select(next: Locale) {
    if (next === locale || pending) return;
    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label={dict.nav.language}
      className={cn("flex items-center gap-1.5 text-[12px] font-bold tracking-[0.08em]", className)}
    >
      <button
        type="button"
        onClick={() => select("es")}
        aria-pressed={locale === "es"}
        className={cn(
          "transition-colors",
          locale === "es" ? "text-white" : "text-white/45 hover:text-white",
        )}
      >
        ES
      </button>
      <span aria-hidden="true" className="text-white/25">
        |
      </span>
      <button
        type="button"
        onClick={() => select("en")}
        aria-pressed={locale === "en"}
        className={cn(
          "transition-colors",
          locale === "en" ? "text-white" : "text-white/45 hover:text-white",
        )}
      >
        EN
      </button>
    </div>
  );
}
