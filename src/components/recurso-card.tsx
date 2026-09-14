import Image from "next/image";
import Link from "next/link";

import { parseMediaUrl } from "@/lib/media";
import { formatDate } from "@/lib/utils";
import { imageUrl } from "@/sanity/image";
import type { RecursoCard as Recurso } from "@/sanity/queries";

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" />
    </svg>
  );
}

function WaveGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g fill="currentColor">
        <rect x="3" y="10" width="2" height="4" />
        <rect x="7" y="7" width="2" height="10" />
        <rect x="11" y="4" width="2" height="16" />
        <rect x="15" y="8" width="2" height="8" />
        <rect x="19" y="11" width="2" height="2" />
      </g>
    </svg>
  );
}

export function RecursoCard({ recurso }: { recurso: Recurso }) {
  const media = parseMediaUrl(recurso.url);
  const cover =
    imageUrl(recurso.portada, 800, 450) ?? media?.thumbnailUrl ?? null;
  const esPodcast = recurso.formato === "podcast";

  return (
    <article className="group flex flex-col border border-hairline bg-white transition-shadow hover:shadow-[0_14px_40px_rgba(11,27,63,0.12)]">
      <Link
        href={`/recursos/${recurso.slug}`}
        className="relative block aspect-video overflow-hidden bg-navy-900"
        tabIndex={-1}
        aria-hidden="true"
      >
        {cover ? (
          <Image
            src={cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <span className="bg-gradient-navy absolute inset-0 flex items-center justify-center font-serif text-[64px] font-bold text-white/10">
            ACF
          </span>
        )}
        <span className="absolute bottom-3 left-3 flex size-11 items-center justify-center bg-brand-600 text-white">
          {esPodcast ? (
            <WaveGlyph className="size-5" />
          ) : (
            <PlayGlyph className="size-5" />
          )}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11.5px] font-bold uppercase tracking-[0.12em] text-brand-600">
          <span>{esPodcast ? "Podcast" : "Video"}</span>
          {media && (
            <>
              <span className="text-hairline" aria-hidden="true">
                ·
              </span>
              <span className="font-semibold normal-case tracking-normal text-ink-400">
                {media.providerLabel}
              </span>
            </>
          )}
          {recurso.duracion && (
            <>
              <span className="text-hairline" aria-hidden="true">
                ·
              </span>
              <span className="font-semibold normal-case tracking-normal text-ink-400">
                {recurso.duracion}
              </span>
            </>
          )}
        </div>

        <h3 className="mt-3 font-serif text-[19px] leading-snug text-navy-900">
          <Link
            href={`/recursos/${recurso.slug}`}
            className="transition-colors hover:text-brand-600"
          >
            {recurso.titulo}
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-3 text-[14px] leading-[1.65] text-ink-500">
          {recurso.resumen}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
          {recurso.temas?.map((tema) => (
            <span
              key={tema.slug}
              className="bg-mist-50 px-2.5 py-1 text-[11.5px] font-semibold text-navy-800"
            >
              {tema.titulo}
            </span>
          ))}
        </div>

        <p className="mt-auto pt-5 text-[12.5px] text-ink-400">
          {formatDate(recurso.fecha)}
        </p>
      </div>
    </article>
  );
}
