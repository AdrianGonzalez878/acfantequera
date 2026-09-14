"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { BrandLogo } from "@/components/brand-logo";
import { company, nav, offices, type NavItem } from "@/data/site";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onLanding = pathname === "/";

  const sectionIds = useMemo(
    () =>
      nav
        .map((item) => item.section)
        .filter((section): section is string => section !== null),
    [],
  );
  const activeSection = useActiveSection(sectionIds, onLanding);

  function isActive(item: NavItem): boolean {
    if (item.section === null) return pathname.startsWith(item.href);
    return onLanding && activeSection === item.section;
  }

  return (
    <header className="sticky top-0 z-50">
      {/* Franja de contacto directo */}
      <div className="hidden bg-navy-950 md:block">
        <div className="container-acf flex items-center justify-between py-2 text-[11.5px] tracking-[0.02em] text-white/60">
          <p>
            {offices.map((office, index) => (
              <span key={office.city}>
                {index > 0 && <span className="px-2 text-white/25">·</span>}
                {office.city}{" "}
                <a
                  className="transition-colors hover:text-white"
                  href={`tel:${office.phoneHref}`}
                >
                  {office.phone}
                </a>
              </span>
            ))}
          </p>
          <a
            className="transition-colors hover:text-white"
            href={`mailto:${company.email}`}
          >
            {company.email}
          </a>
        </div>
      </div>

      {/* Barra principal */}
      <div className="bg-navy-900">
        <div className="container-acf flex h-16 items-center justify-between gap-6">
          <div className="flex h-full min-w-0 items-center gap-6 xl:gap-8">
            <Link
              href="/"
              className="flex-none bg-white px-2.5 py-1.5"
              aria-label={`${company.shortName} — inicio`}
            >
              <BrandLogo
                height={36}
                className="!h-7 !w-auto sm:!h-9"
                priority
              />
            </Link>

            <nav
              aria-label="Navegación principal"
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

          <div className="flex items-center gap-2">
            <Link
              href="/#contacto"
              className="hidden bg-brand-600 px-5 py-2.5 text-[12.5px] font-bold text-white transition-colors hover:bg-brand-500 sm:inline-flex"
            >
              Agendar consulta
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-movil"
              className="-mr-2 inline-flex size-11 items-center justify-center text-white xl:hidden"
            >
              <span className="sr-only">
                {open ? "Cerrar menú" : "Abrir menú"}
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

      {/* Menú móvil */}
      {open && (
        <div id="menu-movil" className="bg-navy-950 xl:hidden">
          <nav aria-label="Navegación principal" className="container-acf py-2">
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
            <div className="space-y-1 py-5 text-[13.5px] text-white/60">
              {offices.map((office) => (
                <p key={office.city}>
                  {office.city}:{" "}
                  <a className="text-white/85" href={`tel:${office.phoneHref}`}>
                    {office.phone}
                  </a>
                </p>
              ))}
              <p>
                <a className="text-white/85" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
              </p>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
