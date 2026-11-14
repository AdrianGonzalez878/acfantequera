"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { LanguageSwitch } from "@/components/language-switch";
import { useI18n } from "@/components/locale-provider";
import type { NavItem } from "@/data/site";
import { navItems } from "@/i18n/content";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const { dict } = useI18n();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const onLanding = pathname === "/";
  const nav = navItems(dict);

  const sectionIds = useMemo(
    () =>
      nav
        .map((item) => item.section)
        .filter((section): section is string => section !== null),
    [nav],
  );
  const activeSection = useActiveSection(sectionIds, onLanding);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY.current;
      lastY.current = y;

      if (open || y < 16) {
        setHidden(false);
        return;
      }

      if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  function isActive(item: NavItem): boolean {
    if (item.section === null) return pathname.startsWith(item.href);
    return onLanding && activeSection === item.section;
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-transform duration-300 ease-out",
        hidden && !open && "-translate-y-[calc(100%+2px)]",
      )}
    >
      <div className="bg-navy-900">
        <div className="container-acf flex h-16 items-center justify-between gap-6">
          <div className="flex h-full min-w-0 items-center gap-6 xl:gap-8">
            <Link
              href="/"
              className="flex-none bg-white px-2.5 py-1.5"
              aria-label={dict.nav.homeAria}
            >
              <BrandLogo
                height={36}
                className="!h-7 !w-auto sm:!h-9"
                priority
              />
            </Link>

            <nav
              aria-label={dict.nav.mainNav}
              className="hidden h-full items-center gap-5 xl:flex"
            >
              {nav.map((item) => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "true" : undefined}
                    className={cn(
                      "flex h-full items-center border-b-2 text-[13.5px] font-semibold transition-colors",
                      active
                        ? "border-brand-400 text-white"
                        : "border-transparent text-white/70 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <LanguageSwitch />
            <Link
              href="/#contacto"
              className="hidden bg-brand-600 px-5 py-2.5 text-[12.5px] font-bold text-white transition-colors hover:bg-brand-500 sm:inline-flex"
            >
              {dict.nav.book}
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="-mr-2 inline-flex size-11 items-center justify-center text-white xl:hidden"
            >
              <span className="sr-only">
                {open ? dict.nav.closeMenu : dict.nav.openMenu}
              </span>
              {open ? (
                <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true">
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    fill="none"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="menu-movil" className="bg-navy-950 xl:hidden">
          <nav aria-label={dict.nav.mainNav} className="container-acf py-2 pb-4">
            {nav.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between border-b border-white/10 py-3.5 text-[15px] font-semibold",
                    active ? "text-brand-400" : "text-white/85",
                  )}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-white/25">
                    →
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
