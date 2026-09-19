import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { localizedServices } from "@/i18n/content";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/get-locale";
import { breadcrumbJsonLd, servicesJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return {
    title: dict.seo.servicesTitle,
    description: dict.seo.servicesDescription,
    alternates: { canonical: "/servicios" },
    openGraph: {
      title: dict.seo.servicesOgTitle,
      description: dict.seo.servicesOgDescription,
      url: "/servicios",
      type: "website",
    },
  };
}

export default async function ServiciosPage() {
  const dict = getDictionary(await getLocale());
  const serviceList = localizedServices(dict);

  return (
    <>
      <PageHero
        eyebrow={dict.services.eyebrow}
        title={dict.services.pageTitle}
        lead={dict.services.pageLead}
      />

      <nav
        aria-label={dict.services.indexLabel}
        className="border-b border-hairline bg-mist-50"
      >
        <ul className="container-acf flex flex-wrap gap-x-6 gap-y-2 py-5 text-[13.5px] font-semibold">
          {serviceList.map((service) => (
            <li key={service.slug}>
              <Link
                href={`#${service.slug}`}
                className="text-ink-500 transition-colors hover:text-brand-600"
              >
                <span className="text-brand-600">{service.num}</span>{" "}
                {service.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <section className="section-lg bg-white">
        <div
          data-reveal-stagger="alternate"
          className="container-acf grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
        >
          {serviceList.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-mist-50 py-14">
        <div
          data-reveal="left"
          className="container-acf flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-[620px] text-[16px] leading-[1.7] text-ink-700">
            {dict.services.missing}
          </p>
          <Link href="/#contacto" className="btn-outline flex-none">
            {dict.services.caseCta}
          </Link>
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.resources.homeCrumb, path: "/" },
          { name: dict.nav.services, path: "/servicios" },
        ])}
      />
      <JsonLd data={servicesJsonLd()} />
    </>
  );
}
