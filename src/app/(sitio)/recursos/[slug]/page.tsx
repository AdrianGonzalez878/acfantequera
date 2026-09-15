import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { MediaEmbed } from "@/components/media-embed";
import { NotasRecurso } from "@/components/notas-recurso";
import { RecursoCard } from "@/components/recurso-card";
import { company, leadPartner } from "@/data/site";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/get-locale";
import { parseMediaUrl } from "@/lib/media";
import { absoluteUrl, breadcrumbJsonLd, durationToIso8601 } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { imageUrl } from "@/sanity/image";
import {
  getRecurso,
  getRecursoSlugs,
  getRecursosRelacionados,
} from "@/sanity/queries";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getRecursoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recurso = await getRecurso(slug);
  if (!recurso) return { title: getDictionary(await getLocale()).seo.missingContent };

  const media = parseMediaUrl(recurso.url);
  const imagen =
    imageUrl(recurso.portada, 1200, 630) ?? media?.thumbnailUrl ?? undefined;

  return {
    title: recurso.titulo,
    description: recurso.resumen,
    alternates: { canonical: `/recursos/${recurso.slug}` },
    authors: [{ name: leadPartner.name }],
    openGraph: {
      type: "article",
      title: recurso.titulo,
      description: recurso.resumen,
      publishedTime: recurso.fecha,
      url: `/recursos/${recurso.slug}`,
      images: imagen ? [{ url: imagen, alt: recurso.titulo }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: recurso.titulo,
      description: recurso.resumen,
      images: imagen ? [imagen] : undefined,
    },
  };
}

export default async function RecursoPage({ params }: Props) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const recurso = await getRecurso(slug);
  if (!recurso) notFound();

  const relacionados = await getRecursosRelacionados(slug);
  const media = parseMediaUrl(recurso.url);
  const esPodcast = recurso.formato === "podcast";
  const imagen =
    imageUrl(recurso.portada, 1200, 630) ?? media?.thumbnailUrl ?? undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": esPodcast ? "PodcastEpisode" : "VideoObject",
    name: recurso.titulo,
    description: recurso.resumen,
    uploadDate: recurso.fecha,
    datePublished: recurso.fecha,
    thumbnailUrl: imagen,
    embedUrl: media?.embedUrl ?? undefined,
    duration: durationToIso8601(recurso.duracion),
    inLanguage: "es-MX",
    url: absoluteUrl(`/recursos/${recurso.slug}`),
    publisher: {
      "@type": "Organization",
      name: company.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo-acf.png") },
    },
    author: { "@type": "Person", name: leadPartner.name },
    mainEntityOfPage: absoluteUrl(`/recursos/${recurso.slug}`),
  };

  const breadcrumbs = breadcrumbJsonLd([
    { name: dict.resources.homeCrumb, path: "/" },
    { name: dict.resources.eyebrow, path: "/recursos" },
    { name: recurso.titulo, path: `/recursos/${recurso.slug}` },
  ]);

  return (
    <>
      <article>
        <header className="bg-gradient-navy">
          <div className="container-acf py-12 lg:py-14">
            <Link
              href="/recursos"
              className="text-[13px] font-semibold text-white/60 transition-colors hover:text-white"
            >
              <span aria-hidden="true">←</span> {dict.resources.back}
            </Link>
            <p className="eyebrow-light mt-6">
              {esPodcast ? dict.resources.podcast : dict.resources.video}
              {media && (
                <>
                  <span className="px-2 text-white/25">·</span>
                  <span className="font-semibold normal-case tracking-normal text-white/60">
                    {media.providerLabel}
                  </span>
                </>
              )}
            </p>
            <h1 className="mt-3.5 max-w-[820px] font-serif text-[clamp(1.65rem,3.6vw,2.15rem)] leading-[1.2] text-white">
              {recurso.titulo}
            </h1>
            <p className="mt-4 text-[13.5px] text-white/55">
              {formatDate(recurso.fecha, locale)}
              {recurso.duracion && (
                <>
                  <span className="px-2 text-white/25">·</span>
                  {recurso.duracion}
                </>
              )}
            </p>
          </div>
        </header>

        <div className="bg-mist-50 pb-14 pt-10 lg:pb-16">
          <div className="container-acf">
            <MediaEmbed
              media={media}
              titulo={recurso.titulo}
              className="mx-auto max-w-[900px]"
            />
          </div>
        </div>

        <div className="section bg-white">
          <div className="container-acf grid gap-12 lg:grid-cols-[1fr_280px] lg:gap-16">
            <div className="max-w-[700px]">
              <p className="text-[17px] font-semibold leading-[1.65] text-navy-900">
                {recurso.resumen}
              </p>
              {recurso.notas && recurso.notas.length > 0 && (
                <div className="mt-8 border-t border-hairline pt-2">
                  <NotasRecurso value={recurso.notas} />
                </div>
              )}
            </div>

            <aside className="lg:pt-1">
              {recurso.temas && recurso.temas.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-[11.5px] font-bold uppercase tracking-[0.14em] text-ink-400">
                    {dict.resources.topics}
                  </h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {recurso.temas.map((tema) => (
                      <span
                        key={tema.slug}
                        className="bg-mist-50 px-2.5 py-1.5 text-[12.5px] font-semibold text-navy-800"
                      >
                        {tema.titulo}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {media && (
                <a
                  href={media.watchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-outline w-full"
                >
                  {dict.resources.watchOn} {media.providerLabel}{" "}
                  <span aria-hidden="true">↗</span>
                </a>
              )}

              <div className="mt-8 border-t border-hairline pt-6">
                <p className="text-[14.5px] leading-[1.7] text-ink-500">
                  {dict.resources.needReview}
                </p>
                <Link
                  href="/#contacto"
                  className="btn mt-3 text-brand-600 hover:text-navy-900"
                >
                  {dict.hero.cta} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {relacionados.length > 0 && (
        <section className="section bg-mist-50">
          <div className="container-acf">
            <h2 className="section-title">{dict.resources.more}</h2>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3 lg:gap-8">
              {relacionados.map((item) => (
                <RecursoCard
                  key={item._id}
                  recurso={item}
                  locale={locale}
                  videoLabel={dict.resources.video}
                  podcastLabel={dict.resources.podcast}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}
