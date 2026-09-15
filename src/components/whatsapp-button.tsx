"use client";

import { useI18n } from "@/components/locale-provider";
import { whatsapp, whatsappUrl } from "@/data/site";

export function WhatsAppButton() {
  const { dict } = useI18n();
  const href = whatsappUrl(dict.contact.waDefault);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="wa-enter group fixed bottom-28 right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(11,27,63,0.28)] transition-colors hover:bg-[#1EBE5B] sm:bottom-10 sm:right-5 sm:size-auto sm:gap-2.5 sm:py-3 sm:pl-3 sm:pr-4"
      aria-label={dict.wa.aria.replace("{phone}", whatsapp.display)}
    >
      <svg viewBox="0 0 32 32" className="size-7 flex-none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 3.2c-7.06 0-12.79 5.73-12.79 12.79 0 2.26.59 4.47 1.71 6.42L3.2 28.8l6.56-1.72a12.74 12.74 0 0 0 6.28 1.6h.01c7.05 0 12.79-5.74 12.79-12.79 0-3.42-1.33-6.63-3.75-9.04a12.7 12.7 0 0 0-9.05-3.65Zm0 23.02h-.01c-1.94 0-3.85-.52-5.52-1.51l-.4-.24-4.11 1.08 1.1-4.01-.26-.42a10.6 10.6 0 0 1-1.62-5.65c0-5.87 4.78-10.64 10.65-10.64 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.11 7.53c0 5.87-4.78 10.64-10.46 10.64Zm5.84-7.97c-.32-.16-1.97-.97-2.27-1.08-.31-.11-.53-.17-.75.16-.22.32-.86 1.08-1.06 1.3-.19.22-.39.24-.71.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.91-1.79-2.23-.19-.32-.02-.5.14-.66.15-.15.32-.39.48-.58.16-.19.21-.33.32-.55.11-.22.05-.41-.03-.57-.08-.16-.72-1.81-.99-2.47-.26-.65-.53-.56-.72-.57l-.62-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.65 0 1.56 1.14 3.07 1.3 3.28.16.22 2.2 3.44 5.34 4.7.75.3 1.33.48 1.78.62.75.24 1.44.2 1.98.12.6-.09 1.97-.8 2.25-1.58.28-.78.28-1.44.2-1.58-.08-.14-.29-.22-.61-.38Z"
        />
      </svg>
      <span className="hidden text-[13.5px] font-bold leading-tight sm:inline">
        {dict.wa.line1}
        <span className="block text-[11px] font-semibold text-white/85">
          {dict.wa.line2}
        </span>
      </span>
    </a>
  );
}
