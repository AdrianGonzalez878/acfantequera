import type { Metadata } from "next";
import Link from "next/link";

import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { MediaEmbed } from "@/components/media-embed";
import { PageHero } from "@/components/page-hero";
import { RecursosLista } from "@/components/recursos-lista";
import { company } from "@/data/site";
import { parseMediaUrl } from "@/lib/media";
import { breadcrumbJsonLd } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { isSanityConfigured } from "@/sanity/env";
import { getRecursos } from "@/sanity/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Videos y podcast sobre el SAT, impuestos y contabilidad",
  description:
    "Explicaciones en video y podcast sobre el SAT, obligaciones fiscales y contabilidad, a cargo del equipo de ACF Asesores y Consultores en Oaxaca y Puebla.",
  alternates: { canonical: "/recursos" },
  keywords: [
    "podcast impuestos México",
    "videos SAT",
    "explicación fiscal",
    "obligaciones fiscales empresas",
  ],
  openGraph: {
    title: "Videos y podcast fiscales | ACF Antequera",
    description:
      "Contenido del despacho sobre el SAT, impuestos y contabilidad para empresas.",
    url: "/recursos",
    type: "website",
  },
};

export default async function RecursosPage() {
  const recursos = await getRecursos();
  const destacado = recursos.find((recurso) => recurso.destacado) ?? recursos[0];
  const resto = destacado
    ? recursos.filter((recurso) => recurso._id !== destacado._id)
    : [];
  const media = destacado ? parseMediaUrl(destacado.url) : null;

  return (
    <>
      <PageHero
        eyebrow="Videos y podcast"
        title="El SAT, explicado sin rodeos."
        lead="Publicamos videos y episodios de podcast donde revisamos cambios fiscales, obligaciones y dudas frecuentes de nuestros clientes."
      />

      {recursos.length === 0 ? (
        <section className="section bg-white">
          <div className="container-acf">
            <div className="max-w-[680px]" data-reveal="left">
              <h2 className="section-title">
                {isSanityConfigured
                  ? "Aún no hay videos ni episodios publicados"
                  : "Estamos preparando esta sección"}
              </h2>
              <p className="mt-5 body-lg">
                {isSanityConfigured
                  ? "El CMS ya está conectado. Cada publicación es un enlace de YouTube, Spotify u otra plataforma: el sitio arma el reproductor solo."
                  : "Muy pronto encontrará aquí videos y episodios de podcast sobre temas fiscales y contables. Mientras tanto, escríbanos si tiene una duda concreta: la respondemos directamente."}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {isSanityConfigured ? (
                  <Link href="/studio" className="btn-primary">
                    Abrir el Studio
                  </Link>
                ) : (
                  <Link href="/#contacto" className="btn-primary">
                    Enviar una pregunta
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
                className="container-acf grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12"
              >
                <MediaEmbed media={media} titulo={destacado.titulo} />
                <div className="flex flex-col justify-center">
                  <p className="eyebrow">
                    {destacado.formato === "podcast"
                      ? "Episodio destacado"
                      : "Video destacado"}
                  </p>
                  <h2 className="mt-3.5 font-serif text-[26px] leading-snug text-navy-900">
                    {destacado.titulo}
                  </h2>
                  <p className="mt-4 text-[15.5px] leading-[1.7] text-ink-500">
                    {destacado.resumen}
                  </p>
                  <p className="mt-5 text-[13px] text-ink-400">
                    {formatDate(destacado.fecha)}
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
                    Ver la ficha completa <span aria-hidden="true">→</span>
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
        title="¿Tiene una duda que merece su propio video?"
        lead="Escríbanos el tema y lo consideramos para una próxima publicación. Si su caso requiere atención inmediata, agendamos una consulta."
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Inicio", path: "/" },
          { name: "Videos y podcast", path: "/recursos" },
        ])}
      />
    </>
  );
}
