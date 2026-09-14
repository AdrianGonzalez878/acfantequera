import type { MediaProvider, ParsedMedia } from "@/lib/media";
import { cn } from "@/lib/utils";

/** Alturas recomendadas por cada reproductor de audio. */
const AUDIO_HEIGHT: Partial<Record<MediaProvider, string>> = {
  spotify: "h-[232px]",
  "apple-podcasts": "h-[175px]",
  soundcloud: "h-[166px]",
};

type Props = {
  media: ParsedMedia | null;
  titulo: string;
  className?: string;
};

export function MediaEmbed({ media, titulo, className }: Props) {
  if (!media) return null;

  // Plataforma no reconocida: enviamos al sitio original en lugar de fallar.
  if (!media.embedUrl) {
    return (
      <div
        className={cn(
          "bg-gradient-navy flex flex-col items-start gap-5 p-8 sm:p-10",
          className,
        )}
      >
        <p className="max-w-[440px] text-[15px] leading-[1.7] text-white/80">
          Este contenido está publicado en una plataforma que no permite
          incrustarlo aquí. Ábralo en su sitio original:
        </p>
        <a
          href={media.watchUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-light"
        >
          Ver contenido <span aria-hidden="true">↗</span>
        </a>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden bg-navy-950 min-w-0",
        media.isAudio
          ? (AUDIO_HEIGHT[media.provider] ?? "h-[232px]")
          : "aspect-video",
        className,
      )}
    >
      <iframe
        src={media.embedUrl}
        title={titulo}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="size-full border-0"
      />
    </div>
  );
}
