"use client";

import { useEffect, useId, useState } from "react";

import type { Service } from "@/data/site";
import { cn } from "@/lib/utils";

export function ServiceCard({ service }: { service: Service }) {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function syncFromHash() {
      if (window.location.hash === `#${service.slug}`) {
        setOpen(true);
      }
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [service.slug]);

  return (
    <article
      id={service.slug}
      className={cn(
        "border-t border-hairline last:border-b",
        open && "bg-mist-50/70",
      )}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="group grid w-full cursor-pointer grid-cols-[auto_1fr_auto] items-start gap-x-5 py-8 text-left sm:gap-x-8 lg:grid-cols-[5.75rem_1fr_auto] lg:py-10"
      >
        <span className="font-serif text-[26px] leading-none text-brand-600 lg:text-[28px]">
          {service.num}
        </span>
        <span className="min-w-0">
          <h3 className="font-serif text-[20px] leading-snug text-navy-900 sm:text-[22px] lg:text-[24px]">
            {service.title}
          </h3>
          <p className="mt-2.5 max-w-[560px] text-[15px] leading-[1.7] text-ink-500">
            {service.summary}
          </p>
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "mt-0.5 flex size-8 flex-none items-center justify-center border border-hairline text-brand-600 transition-transform duration-200 group-hover:border-brand-600",
            open ? "rotate-45" : "rotate-0",
          )}
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.8"
            />
          </svg>
        </span>
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="pb-8 lg:pb-10 lg:pl-[5.75rem]"
      >
        <ul className="grid gap-x-12 gap-y-2 sm:grid-cols-2">
          {service.items.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-[14.5px] leading-[1.7] text-ink-700"
            >
              <span aria-hidden="true" className="bullet" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
