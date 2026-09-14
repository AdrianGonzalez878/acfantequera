import Link from "next/link";
import Image from "next/image";

import { ContactForm } from "@/components/contact-form";
import { OfficesGrid } from "@/components/offices-grid";
import { RecursoCard } from "@/components/recurso-card";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { StatsBand } from "@/components/stats-band";
import {
  alliances,
  clients,
  company,
  leadPartner,
  offices,
  sectors,
  services,
  yearsActive,
} from "@/data/site";
import { getRecursos } from "@/sanity/queries";

export const revalidate = 300;

export default async function InicioPage() {
  const recursos = (await getRecursos()).slice(0, 3);

  return (
    <>
      {/* Hero partido: texto a la izquierda, gradiente a la derecha */}
      <section className="grid lg:grid-cols-[1fr_1.15fr]">
        <div className="flex items-center bg-white px-6 py-16 sm:px-10 lg:py-24 xl:pl-16">
          <div className="hero-enter-left w-full max-w-[620px] lg:ml-auto lg:pr-12">
            <p className="eyebrow">
              Despacho de auditoría · impuestos · consultoría
            </p>
            <h1 className="mt-5 display-title">
              Su despacho de confianza en auditoría, impuestos y consultoría.
            </h1>
            <p className="mt-6 body-lg">
              Más de dos décadas de experiencia, presencia en Oaxaca y Puebla, y
              alianza con RSM Bogarín, firma integrante de la red internacional
              RSM.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link href="#contacto" className="btn-primary">
                Agendar una consulta
              </Link>
              <Link href="#servicios" className="btn-link">
                Ver servicios <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-navy relative flex min-h-[340px] items-center justify-center overflow-hidden lg:min-h-[560px]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="hero-mesh absolute inset-0" />
            <Image
              src="/logo-acf.png"
              alt=""
              width={1400}
              height={903}
              priority
              className="absolute -left-[20%] -top-[24%] h-[118%] w-auto max-w-none opacity-45 mix-blend-multiply"
            />
            <span className="absolute -left-10 top-1/2 -translate-y-1/2 font-serif text-[180px] font-bold leading-none text-white/[0.07] sm:text-[240px] lg:text-[280px]">
              ACF
            </span>
            <span className="absolute right-10 top-10 hidden size-[150px] rotate-[20deg] border border-white/25 lg:block" />
            <span className="absolute right-24 top-24 hidden size-[88px] rotate-[20deg] border border-brand-400/50 lg:block" />
            <span className="absolute bottom-[72px] left-10 hidden h-1.5 w-[180px] bg-brand-400 lg:block" />
          </div>
          <div className="hero-enter-right relative mx-6 border border-white/20 bg-navy-950/45 px-10 py-8 text-center text-white sm:px-12 sm:py-10">
            <p className="font-serif text-[56px] leading-none lg:text-[72px]">
              {yearsActive}
            </p>
            <p className="mt-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white/80">
              Años de experiencia
            </p>
            <p className="mt-3 text-[12.5px] text-white/50">Oaxaca · Puebla</p>
          </div>
        </div>
      </section>

      <StatsBand />

      {/* Servicios */}
      <section id="servicios" className="section-lg bg-white">
        <div className="container-acf" data-reveal="up">
          <SectionHeading
            align="center"
            eyebrow="Servicios"
            title="Seis áreas de especialización"
            lead="Acompañamos a empresas, instituciones educativas y entidades gubernamentales en todo su ciclo contable y fiscal."
          />
          <div
            data-reveal-stagger="alternate"
            className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10"
          >
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link href="/servicios" className="btn-outline">
              Ver el detalle de cada servicio{" "}
              <span aria-hidden="true">→</span>
            </Link>
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
            <p className="eyebrow">Quiénes somos</p>
            <h2 className="mt-3.5 section-title">Consolidados desde 2004</h2>
          </div>
          <div className="lg:max-w-[620px] lg:flex-1">
            <p className="body-lg">
              {company.name} ({company.shortName}) es un despacho dedicado a
              ofrecer servicios de calidad en materia fiscal, contable,
              financiera, administrativa y de auditoría, con personal accesible,
              receptivo y adaptable a las necesidades de cada cliente.
            </p>
            <dl className="mt-8 grid gap-5 border-t border-hairline pt-7 sm:grid-cols-2">
              <div>
                <dt className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-ink-400">
                  Razón social
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
          <figure data-reveal="left" className="flex-none">
            <div className="flex max-w-[280px] lg:max-w-[300px]">
              <div aria-hidden="true" className="bar-gradient w-2 flex-none" />
              <Image
                src={leadPartner.photo.src}
                alt={leadPartner.photo.alt}
                width={leadPartner.photo.width}
                height={leadPartner.photo.height}
                className="w-full bg-white object-cover object-top"
                sizes="300px"
              />
            </div>
          </figure>
          <div data-reveal="right" className="lg:pt-1">
            <p className="eyebrow">Representante legal</p>
            <h3 className="mt-3 font-serif text-[24px] leading-snug text-navy-900 lg:text-[26px]">
              {leadPartner.name}
            </h3>
            <p className="mt-1.5 text-[14.5px] font-semibold text-brand-600">
              {leadPartner.role}
            </p>
            <p className="mt-5 max-w-[620px] text-[15.5px] leading-[1.7] text-ink-700">
              {leadPartner.bio}
            </p>
            <ul className="mt-6 space-y-2">
              {leadPartner.credentials.map((credential) => (
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
              Cel.{" "}
              <a
                className="transition-colors hover:text-brand-600"
                href={`tel:${leadPartner.phoneHref}`}
              >
                {leadPartner.phone}
              </a>
              <span className="px-2">·</span>
              Ofic.{" "}
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
            eyebrow="Alianzas"
            title="Alianzas estratégicas"
            lead="Mantenemos el trato directo de un despacho local con el respaldo técnico de firmas de alcance nacional e internacional."
          />
          <div
            data-reveal-stagger="alternate"
            className="mx-auto mt-12 grid max-w-[920px] gap-px bg-hairline sm:grid-cols-2"
          >
            {alliances.map((alliance) => (
              <div key={alliance.name} className="bg-white p-8 lg:p-9">
                <h3 className="font-serif text-[21px] text-navy-900">
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
            eyebrow="Clientes"
            title="Empresas e instituciones que confían en nosotros"
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
            Algunos clientes no aparecen listados por acuerdos de
            confidencialidad. Podemos compartir referencias específicas de su
            sector durante una primera reunión.
          </p>

          <div className="mt-14 border-t border-white/15 pt-12">
            <p className="eyebrow-light">Sectores atendidos</p>
            <h3 className="mt-3.5 section-title max-w-[620px] text-white">
              Experiencia en los sectores donde opera su empresa
            </h3>
            <ul className="mt-9 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
              {sectors.map((sector) => (
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
              eyebrow="Videos y podcast"
              title="Lo último sobre el SAT y su empresa"
              lead={
                recursos.length === 0
                  ? "Explicaciones en video y episodios de podcast. Cada pieza se publica desde el panel y tiene su propia página para compartir."
                  : undefined
              }
              className="max-w-[560px]"
            />
            <Link href="/recursos" className="btn-link">
              {recursos.length > 0
                ? "Ver todos los recursos"
                : "Ir a Recursos"}{" "}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {recursos.length > 0 ? (
            <div
              data-reveal-stagger="alternate"
              className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {recursos.map((recurso) => (
                <RecursoCard key={recurso._id} recurso={recurso} />
              ))}
            </div>
          ) : (
            <p className="mt-10 max-w-[560px] text-[15px] leading-[1.7] text-ink-500">
              Todavía no hay publicaciones. Cuando Ramón suba el primer enlace
              en el Studio, aparecerá aquí y en{" "}
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
            eyebrow="Oficinas"
            title="Dónde encontrarnos"
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
            <p className="eyebrow-light">Contacto</p>
            <h2 className="mt-3.5 section-title text-white">
              Hablemos de su negocio
            </h2>
            <p className="mt-4 max-w-[480px] text-[16px] leading-[1.75] text-white/75">
              Llene el formulario y se abrirá WhatsApp con su consulta lista
              para enviar. Un especialista de ACF le responde por ese mismo
              chat.
            </p>

            <dl className="mt-10 space-y-7">
              <div>
                <dt className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-brand-400">
                  Correo
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
                    {office.city} · {office.label}
                  </dt>
                  <dd className="mt-2 text-[15px] leading-[1.65] text-white/75">
                    {office.address}
                    <br />
                    <a
                      className="text-white transition-colors hover:text-brand-400"
                      href={`tel:${office.phoneHref}`}
                    >
                      Tel. {office.phone}
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
