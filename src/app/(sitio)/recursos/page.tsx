import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { MediaEmbed } from "@/components/media-embed";
import { PageHero } from "@/components/page-hero";
import { RecursosLista } from "@/components/recursos-lista";
import { company } from "@/data/site";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/get-locale";
import { parseMediaUrl } from "@/lib/media";
import { breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { isSanityConfigured } from "@/sanity/env";
import { getRecursos } from "@/sanity/queries";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return {
    title: dict.seo.resourcesTitle,
    description: dict.seo.resourcesDescription,
    alternates: { canonical: "/recursos" },
    openGraph: {
      title: dict.seo.resourcesOgTitle,
      description: dict.seo.resourcesOgDescription,
      url: "/recursos",
      type: "website",
    },
  };
}

export default async function RecursosPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const recursos = await getRecursos();
  const destacado = recursos.find((recurso) => recurso.destacado) ?? recursos[0];
  const resto = destacado
    ? recursos.filter((recurso) => recurso._id !== destacado._id)
    : [];
  const media = destacado ? parseMediaUrl(destacado.url) : null;

  return (
    <>
      <PageHero
        eyebrow={dict.resources.eyebrow}
        title={dict.resources.pageTitle}
        lead={dict.resources.pageLead}
      />

      {recursos.length === 0 ? (
        <section className="section bg-white">
          <div className="container-acf">
            <div className="max-w-[680px]" data-reveal="left">
              <h2 className="section-title">
                {isSanityConfigured
                  ? dict.resources.emptyConfigured
                  : dict.resources.emptyUnconfigured}
              </h2>
              <p className="mt-5 body-lg">
                {isSanityConfigured
                  ? dict.resources.emptyConfiguredLead
                  : dict.resources.emptyUnconfiguredLead}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {isSanityConfigured ? (
                  <Link href="/studio" className="btn-primary">
                    {dict.resources.openStudio}
                  </Link>
                ) : (
                  <Link href="/#contacto" className="btn-primary">
                    {dict.resources.askQuestion}
                  </Link>
                )}
                <a href={`mailto:${company.email}`} className="btn-outline">
                  {company.email}
                </a>
              </div>
              {process.env.NODE_ENV === "development" && !isSanityConfigured && (
                <p className="mt-10 border-l-[3px] border-brand-600 bg-mist-50 p-4 text-[13.5px] leading-[1.7] text-navy-900">
                  <strong>Nota para el desarrollo:</strong> falta{" "}
                  <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> en{" "}
                  <code>.env.local</code>. Cree el proyecto en{" "}
                  <a
                    className="font-semibold text-brand-600 underline"
                    href="https://www.sanity.io/manage"
                  >
                    sanity.io/manage
                  </a>{" "}
                  o inicie sesión con el CLI y reinicie el servidor.
                </p>
              )}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Destacado */}
          {destacado && (
            <section className="bg-mist-50 py-14 lg:py-16">
              <div
                data-reveal="zoom"
                className="container-acf grid min-w-0 gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12"
              >
                <MediaEmbed media={media} titulo={destacado.titulo} />
                <div className="flex flex-col justify-center">
                  <p className="eyebrow">
                    {destacado.formato === "podcast"
                      ? dict.resources.featuredPodcast
                      : dict.resources.featuredVideo}
                  </p>
                  <h2 className="mt-3.5 font-serif text-[26px] leading-snug text-navy-900">
                    {destacado.titulo}
                  </h2>
                  <p className="mt-4 text-[15.5px] leading-[1.7] text-ink-500">
                    {destacado.resumen}
                  </p>
                  <p className="mt-5 text-[13px] text-ink-400">
                    {formatDate(destacado.fecha, locale)}
                    {destacado.duracion && (
                      <>
                        <span className="px-2">·</span>
                        {destacado.duracion}
                      </>
                    )}
                    {media && (
                      <>
                        <span className="px-2">·</span>
                        {media.providerLabel}
                      </>
                    )}
                  </p>
                  <Link
                    href={`/recursos/${destacado.slug}`}
                    className="btn mt-7 self-start text-brand-600 hover:text-navy-900"
                  >
                    {dict.resources.fullFile} <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </section>
          )}

          {resto.length > 0 && (
            <section className="section bg-white">
              <div className="container-acf">
                <RecursosLista recursos={resto} />
              </div>
            </section>
          )}
        </>
      )}

      <CtaBand
        title={dict.resources.ctaTitle}
        lead={dict.resources.ctaLead}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: dict.resources.homeCrumb, path: "/" },
          { name: dict.resources.eyebrow, path: "/recursos" },
        ])}
      />
    </>
  );
}
