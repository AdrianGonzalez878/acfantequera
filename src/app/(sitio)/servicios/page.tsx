import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { services } from "@/data/site";
import { breadcrumbJsonLd, servicesJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Auditoría, impuestos y dictámenes fiscales en Oaxaca y Puebla",
  description:
    "Seis áreas de servicio: auditoría y atestiguamiento, impuestos, contabilidad, consultoría en riesgos y PLD, consultoría de negocios y entidades gubernamentales.",
  alternates: { canonical: "/servicios" },
  keywords: [
    "auditoría de estados financieros Oaxaca",
    "dictamen IMSS INFONAVIT",
    "planeación fiscal Puebla",
    "prevención de lavado de dinero",
    "contabilidad gubernamental",
    "precios de transferencia México",
  ],
  openGraph: {
    title: "Servicios de auditoría, impuestos y consultoría | ACF",
    description:
      "Auditoría, impuestos, dictámenes, PLD y consultoría para empresas e instituciones en Oaxaca y Puebla.",
    url: "/servicios",
    type: "website",
  },
};

export default function ServiciosPage() {
  return (
    <>
      <PageHero
        eyebrow="Servicios"
        title="Seis áreas de especialización, un solo equipo responsable."
        lead="Trabajamos con empresas, instituciones educativas y entidades gubernamentales. Cada servicio se define con usted antes de empezar."
      />

      {/* Índice rápido */}
      <nav
        aria-label="Índice de servicios"
        className="border-b border-hairline bg-mist-50"
      >
        <ul className="container-acf flex flex-wrap gap-x-6 gap-y-2 py-5 text-[13.5px] font-semibold">
          {services.map((service) => (
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
          className="container-acf grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
        >
          {services.map((service) => (
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
            ¿No encuentra el servicio que necesita? Muchos trabajos combinan
            varias áreas. Cuéntenos su caso y le proponemos el alcance adecuado.
          </p>
          <Link href="/#contacto" className="btn-outline flex-none">
            Plantear mi caso
          </Link>
        </div>
      </section>

      <CtaBand />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
        ])}
      />
      <JsonLd data={servicesJsonLd()} />
    </>
  );
}
