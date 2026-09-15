import Link from "next/link";

import { BrandLogo } from "@/components/brand-logo";
import { company, offices } from "@/data/site";
import { localizedServices, navItems, officeLabel } from "@/i18n/content";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/get-locale";

export async function SiteFooter() {
  const dict = getDictionary(await getLocale());
  const nav = navItems(dict);
  const serviceList = localizedServices(dict);

  return (
    <footer className="bg-navy-900 text-white/70">
      <div className="container-acf grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="inline-flex bg-white px-3 py-2">
            <BrandLogo height={40} />
          </div>
          <p className="mt-5 max-w-xs text-[14px] leading-[1.7]">
            {company.name}
          </p>
          <p className="mt-3 text-[13px] text-white/45">RFC: {company.rfc}</p>
        </div>

        <div>
          <h2 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-400">
            {dict.nav.services}
          </h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {serviceList.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/servicios#${service.slug}`}
                  className="transition-colors hover:text-white"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-400">
            {dict.footer.sections}
          </h2>
          <ul className="mt-5 space-y-2.5 text-[14px]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-400">
            {dict.nav.offices}
          </h2>
          <ul className="mt-5 space-y-5 text-[14px] leading-[1.65]">
            {offices.map((office) => (
              <li key={office.city}>
                <p className="font-semibold text-white">
                  {office.city}
                  <span className="font-normal text-white/45">
                    {" "}
                    · {officeLabel(dict, office.city, office.label)}
                  </span>
                </p>
                <p className="mt-1">{office.address}</p>
                <a
                  href={`tel:${office.phoneHref}`}
                  className="mt-1 inline-block transition-colors hover:text-white"
                >
                  {dict.offices.tel} {office.phone}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${company.email}`}
                className="transition-colors hover:text-white"
              >
                {company.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-navy-950">
        <div className="container-acf flex flex-col gap-2 py-7 text-[12.5px] text-white/45 sm:flex-row sm:items-center sm:justify-between sm:pr-40">
          <p>
            © {new Date().getFullYear()} {company.name}
          </p>
          <p>Oaxaca · Puebla</p>
          <p>
            {dict.footer.developed}{" "}
            <a
              href="https://argaweb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 transition-colors hover:text-white"
            >
              argaweb.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
