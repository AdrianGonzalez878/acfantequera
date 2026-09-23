import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { HomeHero } from "@/components/home-hero";
import { OfficesGrid } from "@/components/offices-grid";
import { RecursoCard } from "@/components/recurso-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { StatsBand } from "@/components/stats-band";
import {
  clients,
  company,
  leadPartner,
  offices,
  yearsActive,
} from "@/data/site";
import { localizedAlliances, localizedServices, officeLabel } from "@/i18n/content";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/get-locale";
import { getRecursos } from "@/sanity/queries";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return {
    title: { absolute: dict.seo.homeTitle },
    description: dict.seo.homeDescription,
    alternates: { canonical: "/" },
    openGraph: {
      title: dict.seo.homeTitle,
      description: dict.seo.homeDescription,
      url: "/",
      type: "website",
    },
  };
}

export default async function InicioPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const serviceList = localizedServices(dict);
  const allianceList = localizedAlliances(dict);
  const todos = await getRecursos();
  const destacado = todos.find((recurso) => recurso.destacado) ?? todos[0];
  const recursos = destacado
    ? [destacado, ...todos.filter((recurso) => recurso._id !== destacado._id)].slice(
        0,
        5,
      )
    : [];
  const resto = destacado
    ? recursos.filter((recurso) => recurso._id !== destacado._id)
    : [];

  return (
    <>
      <HomeHero copy={dict.hero} yearsActive={yearsActive} />

      <StatsBand />

      {/* Servicios */}
      <section id="servicios" className="section-lg bg-white">
        <div className="container-acf" data-reveal="up">
          <SectionHeading
            align="center"
            eyebrow={dict.services.eyebrow}
            title={dict.services.title}
            lead={dict.services.lead}
          />
          <div
            data-reveal-stagger="alternate"
            className="mt-14 grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          >
            {serviceList.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Nosotros */}
      <section id="nosotros" className="section bg-mist-50">
        <div
          data-reveal="left"
          className="container-acf flex flex-col gap-10 lg:flex-row lg:gap-[70px]"
        >
          <div className="lg:w-[260px] lg:flex-none">
            <p className="eyebrow">{dict.about.eyebrow}</p>
            <h2 className="mt-3.5 section-title">{dict.about.title}</h2>
          </div>
          <div className="lg:max-w-[620px] lg:flex-1">
            <p className="body-lg">
              {dict.about.body
                .replace("{name}", company.name)
                .replace("{short}", company.shortName)}
            </p>
            <dl className="mt-8 grid gap-5 border-t border-hairline pt-7 sm:grid-cols-2">
              <div>
                <dt className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink-400">
                  {dict.about.legalName}
                </dt>
                <dd className="mt-1.5 text-[15px] text-navy-900">
                  {company.name}
                </dd>
              </div>
              <div>
                <dt className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink-400">
                  RFC
                </dt>
                <dd className="mt-1.5 text-[15px] text-navy-900">
                  {company.rfc}
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Socio director: la señal de confianza más fuerte del despacho */}
        <div className="container-acf mt-14 flex flex-col gap-10 border-t border-hairline pt-14 lg:flex-row lg:items-start lg:gap-14">
          <figure data-reveal="left" className="flex-none self-start">
            <div className="size-[200px] overflow-hidden rounded-full bg-mist-100 ring-1 ring-hairline lg:size-[220px]">
              <Image
                src={leadPartner.photo.src}
                alt={dict.about.photoAlt}
                width={leadPartner.photo.width}
                height={leadPartner.photo.height}
                className="size-full object-cover object-[center_12%]"
                sizes="220px"
              />
            </div>
          </figure>
          <div data-reveal="right" className="lg:pt-1">
            <p className="eyebrow">{dict.about.legalEyebrow}</p>
            <h3 className="mt-3 font-serif text-[24px] leading-snug text-navy-900 lg:text-[26px]">
              {leadPartner.name}
            </h3>
            <p className="mt-1.5 text-[14.5px] font-semibold text-brand-600">
              {dict.about.role}
            </p>
            <p className="mt-5 max-w-[620px] text-[15.5px] leading-[1.7] text-ink-700">
              {dict.about.bio}
            </p>
            <ul className="mt-6 space-y-2">
              {dict.about.credentials.map((credential) => (
                <li
                  key={credential}
                  className="flex max-w-[640px] gap-2.5 text-[14.5px] leading-[1.7] text-ink-700"
                >
                  <span aria-hidden="true" className="bullet" />
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[13.5px] text-ink-400">
              {dict.about.cell}{" "}
              <a
                className="transition-colors hover:text-brand-600"
                href={`tel:${leadPartner.phoneHref}`}
              >
                {leadPartner.phone}
              </a>
              <span className="px-2">·</span>
              {dict.about.office}{" "}
              <a
                className="transition-colors hover:text-brand-600"
                href={`tel:${leadPartner.officePhoneHref}`}
              >
                {leadPartner.officePhone}
              </a>
              <span className="px-2">·</span>
              <a
                className="transition-colors hover:text-brand-600"
                href={`mailto:${leadPartner.email}`}
              >
                {leadPartner.email}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Alianzas */}
      <section id="alianzas" className="section bg-white">
        <div className="container-acf" data-reveal="down">
          <SectionHeading
            align="center"
            eyebrow={dict.alliances.eyebrow}
            title={dict.alliances.title}
            lead={dict.alliances.lead}
          />
          <div
            data-reveal-stagger="alternate"
            className="mx-auto mt-12 grid max-w-[920px] gap-px bg-hairline sm:grid-cols-2"
          >
            {allianceList.map((alliance) => (
              <div key={alliance.name} className="bg-white p-8 lg:p-9">
                <a
                  href={alliance.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={alliance.name}
                  className="inline-flex h-14 items-center transition-opacity hover:opacity-80"
                >
                  <Image
                    src={alliance.logo.src}
                    alt={alliance.name}
                    width={alliance.logo.width}
                    height={alliance.logo.height}
                    className="h-12 w-auto max-w-[220px] object-contain object-left"
                  />
                </a>
                <h3 className="mt-6 font-serif text-[21px] text-navy-900">
                  {alliance.name}
                </h3>
                <p className="mt-2 text-[11.5px] font-bold uppercase tracking-[0.1em] text-brand-600">
                  {alliance.kind}
                </p>
                <p className="mt-3.5 text-[14.5px] leading-[1.65] text-ink-500">
                  {alliance.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clientes y sectores */}
      <section id="clientes" className="section bg-navy-900">
        <div className="container-acf" data-reveal="zoom">
          <SectionHeading
            align="center"
            tone="onDark"
            eyebrow={dict.clients.eyebrow}
            title={dict.clients.title}
          />
          <div className="mt-12 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {clients.map((client) => (
              <div
                key={client}
                className="flex items-center bg-navy-900 px-5 py-7 text-[13px] font-bold uppercase leading-[1.5] tracking-[0.04em] text-white"
              >
                {client}
              </div>
            ))}
            <div aria-hidden="true" className="hidden bg-navy-900 sm:block" />
          </div>
          <p className="mt-8 max-w-[620px] text-[14px] leading-[1.7] text-white/55">
            {dict.clients.note}
          </p>

          <div className="mt-14 border-t border-white/15 pt-12">
            <p className="eyebrow-light">{dict.clients.sectorsEyebrow}</p>
            <h3 className="mt-3.5 section-title max-w-[620px] text-white">
              {dict.clients.sectorsTitle}
            </h3>
            <ul className="mt-9 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {dict.clients.sectors.map((sector) => (
                <li
                  key={sector}
                  className="flex items-start gap-3 border-t border-white/15 pt-4 text-[15px] text-white/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[9px] size-[6px] flex-none bg-brand-400"
                  />
                  <span>{sector}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Recursos: adelanto en la landing; el archivo completo vive en /recursos */}
      <section id="recursos" className="section bg-mist-50">
        <div className="container-acf" data-reveal="left">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow={dict.resources.eyebrow}
              title={dict.resources.homeTitle}
              lead={
                recursos.length === 0 ? dict.resources.homeEmptyLead : undefined
              }
              className="max-w-[560px]"
            />
            <Link href="/recursos" className="btn-link">
              {recursos.length > 0
                ? dict.resources.seeAll
                : dict.resources.goTo}{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {recursos.length > 0 ? (
            <div className="mt-10 sm:mt-12">
              {destacado && (
                <div data-reveal="up" className="min-w-0">
                  <RecursoCard
                    recurso={destacado}
                    destacado
                    locale={locale}
                    videoLabel={dict.resources.video}
                    podcastLabel={dict.resources.podcast}
                  />
                </div>
              )}
              {resto.length > 0 && (
                <div
                  data-reveal-stagger="alternate"
                  className="mt-3 grid grid-cols-2 gap-3 sm:mt-6 sm:gap-6 lg:grid-cols-3 lg:gap-8"
                >
                  {resto.map((recurso) => (
                    <RecursoCard
                      key={recurso._id}
                      recurso={recurso}
                      locale={locale}
                      videoLabel={dict.resources.video}
                      podcastLabel={dict.resources.podcast}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="mt-10 max-w-[560px] text-[15px] leading-[1.7] text-ink-500">
              {dict.resources.none}{" "}
              <Link
                href="/recursos"
                className="font-semibold text-brand-600 hover:text-navy-900"
              >
                /recursos
              </Link>
              .
            </p>
          )}
        </div>
      </section>

      {/* Oficinas */}
      <section id="oficinas" className="section bg-white">
        <div className="container-acf" data-reveal="up">
          <SectionHeading
            align="center"
            eyebrow={dict.offices.eyebrow}
            title={dict.offices.title}
          />
          <OfficesGrid className="mt-12" />
        </div>
      </section>

      {/* Contacto */}
      <section
        id="contacto"
        className="bg-gradient-navy relative overflow-hidden"
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="absolute -left-6 top-16 font-serif text-[180px] font-bold leading-none text-white/[0.055] sm:text-[260px]">
            ACF
          </span>
          <span className="absolute bottom-24 right-14 hidden h-2 w-[220px] bg-brand-400 lg:block" />
        </div>

        <div className="container-acf relative grid gap-12 py-16 lg:grid-cols-[1fr_420px] lg:gap-[70px] lg:py-20">
          <div data-reveal="left">
            <p className="eyebrow-light">{dict.contact.eyebrow}</p>
            <h2 className="mt-3.5 section-title text-white">
              {dict.contact.title}
            </h2>
            <p className="mt-4 max-w-[480px] text-[16px] leading-[1.75] text-white/75">
              {dict.contact.lead}
            </p>

            <dl className="mt-10 space-y-7">
              <div>
                <dt className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-400">
                  {dict.contact.email}
                </dt>
                <dd className="mt-2 text-[15.5px]">
                  <a
                    className="text-white transition-colors hover:text-brand-400"
                    href={`mailto:${company.email}`}
                  >
                    {company.email}
                  </a>
                </dd>
              </div>

              {offices.map((office) => (
                <div key={office.city}>
                  <dt className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-400">
                    {office.city} · {officeLabel(dict, office.city, office.label)}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-[1.65] text-white/75">
                    {office.address}
                    <br />
                    <a
                      className="text-white transition-colors hover:text-brand-400"
                      href={`tel:${office.phoneHref}`}
                    >
                      {dict.offices.tel} {office.phone}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:pt-1" data-reveal="right">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
