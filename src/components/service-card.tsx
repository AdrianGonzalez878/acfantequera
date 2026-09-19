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
    <article id={service.slug} className="bg-mist-50">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full cursor-pointer items-start gap-4 p-7 text-left lg:p-[30px]"
      >
        <div className="min-w-0 flex-1">
          <p className="font-serif text-[30px] leading-none text-brand-600">
            {service.num}
          </p>
          <h3 className="mt-2.5 card-title">{service.title}</h3>
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "mt-2 flex size-8 flex-none items-center justify-center border border-hairline text-brand-600 transition-transform duration-200",
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
        className="border-t border-hairline px-7 pb-7 lg:px-[30px] lg:pb-[30px]"
      >
        <p className="pt-5 text-[14px] leading-[1.6] text-ink-700">
          {service.summary}
        </p>
        <ul className="mt-4 space-y-1">
          {service.items.map((item) => (
            <li key={item} className="text-[13.5px] leading-[1.7] text-ink-500">
              — {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
