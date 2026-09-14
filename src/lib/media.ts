/**
 * Resolución de enlaces de video/audio.
 *
 * El contador todavía no decide en qué plataforma publicará, así que el CMS
 * sólo guarda un enlace. Aquí lo interpretamos y derivamos, si se puede, un
 * embed y una miniatura; si la plataforma no se reconoce, el sitio degrada a
 * una tarjeta con botón "Ver en el sitio original".
 */

export type MediaProvider =
  | "youtube"
  | "vimeo"
  | "spotify"
  | "apple-podcasts"
  | "soundcloud"
  | "facebook"
  | "otro";

export type ParsedMedia = {
  provider: MediaProvider;
  providerLabel: string;
  /** URL lista para un <iframe>, o null si la plataforma no permite incrustar. */
  embedUrl: string | null;
  /** Miniatura derivada del proveedor, o null si hay que usar una propia. */
  thumbnailUrl: string | null;
  /** Enlace original, para abrir en la plataforma. */
  watchUrl: string;
  /** Los reproductores de audio usan una caja baja, no 16:9. */
  isAudio: boolean;
};

const PROVIDER_LABELS: Record<MediaProvider, string> = {
  youtube: "YouTube",
  vimeo: "Vimeo",
  spotify: "Spotify",
  "apple-podcasts": "Apple Podcasts",
  soundcloud: "SoundCloud",
  facebook: "Facebook",
  otro: "Enlace externo",
};

export function providerLabel(provider: MediaProvider): string {
  return PROVIDER_LABELS[provider];
}

/** Segundos de inicio a partir de parámetros tipo `t=1h2m3s` o `t=90`. */
function parseStartSeconds(value: string | null): number | null {
  if (!value) return null;
  if (/^\d+$/.test(value)) return Number(value);
  const match = value.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match) return null;
  const [, h, m, s] = match;
  const total = Number(h ?? 0) * 3600 + Number(m ?? 0) * 60 + Number(s ?? 0);
  return total > 0 ? total : null;
}

function youtubeId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host === "youtu.be") return url.pathname.slice(1).split("/")[0] || null;
  const v = url.searchParams.get("v");
  if (v) return v;
  const segments = url.pathname.split("/").filter(Boolean);
  if (segments.length >= 2 && ["embed", "shorts", "live", "v"].includes(segments[0])) {
    return segments[1];
  }
  return null;
}

const FALLBACK: Omit<ParsedMedia, "watchUrl"> = {
  provider: "otro",
  providerLabel: PROVIDER_LABELS.otro,
  embedUrl: null,
  thumbnailUrl: null,
  isAudio: false,
};

export function parseMediaUrl(rawUrl: string | null | undefined): ParsedMedia | null {
  if (!rawUrl) return null;

  let url: URL;
  try {
    url = new URL(rawUrl.trim());
  } catch {
    return null;
  }

  const watchUrl = url.toString();
  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  const fallback: ParsedMedia = { ...FALLBACK, watchUrl };

  // --- YouTube -------------------------------------------------------------
  if (host === "youtu.be" || host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
    const id = youtubeId(url);
    if (!id) return fallback;
    const start = parseStartSeconds(url.searchParams.get("t") ?? url.searchParams.get("start"));
    const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
    embed.searchParams.set("rel", "0");
    embed.searchParams.set("modestbranding", "1");
    if (start) embed.searchParams.set("start", String(start));
    return {
      provider: "youtube",
      providerLabel: PROVIDER_LABELS.youtube,
      embedUrl: embed.toString(),
      thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      watchUrl,
      isAudio: false,
    };
  }

  // --- Vimeo ---------------------------------------------------------------
  if (host.endsWith("vimeo.com")) {
    const segments = url.pathname.split("/").filter(Boolean);
    const idIndex = segments.findLastIndex((segment) => /^\d+$/.test(segment));
    if (idIndex === -1) return fallback;
    const id = segments[idIndex];
    /**
     * Los videos "unlisted" traen un hash justo después del ID (/ID/HASH).
     * Descartamos los segmentos puramente numéricos: el propio ID es hex válido
     * y de otro modo se confundiría con el hash.
     */
    const siguiente = segments[idIndex + 1];
    const hash =
      siguiente && /^[0-9a-f]{6,}$/i.test(siguiente) && !/^\d+$/.test(siguiente)
        ? siguiente
        : undefined;
    const embed = new URL(`https://player.vimeo.com/video/${id}`);
    if (hash) embed.searchParams.set("h", hash);
    return {
      provider: "vimeo",
      providerLabel: PROVIDER_LABELS.vimeo,
      embedUrl: embed.toString(),
      thumbnailUrl: `https://vumbnail.com/${id}.jpg`,
      watchUrl,
      isAudio: false,
    };
  }

  // --- Spotify -------------------------------------------------------------
  if (host.endsWith("spotify.com")) {
    const segments = url.pathname.split("/").filter(Boolean);
    const kindIndex = segments.findIndex((s) =>
      ["episode", "show", "playlist", "track", "album"].includes(s),
    );
    if (kindIndex === -1 || !segments[kindIndex + 1]) return fallback;
    const kind = segments[kindIndex];
    const id = segments[kindIndex + 1];
    return {
      provider: "spotify",
      providerLabel: PROVIDER_LABELS.spotify,
      embedUrl: `https://open.spotify.com/embed/${kind}/${id}`,
      thumbnailUrl: null,
      watchUrl,
      isAudio: true,
    };
  }

  // --- Apple Podcasts ------------------------------------------------------
  if (host.endsWith("podcasts.apple.com") || host.endsWith("music.apple.com")) {
    const embed = new URL(watchUrl);
    embed.hostname = `embed.${host}`;
    return {
      provider: "apple-podcasts",
      providerLabel: PROVIDER_LABELS["apple-podcasts"],
      embedUrl: embed.toString(),
      thumbnailUrl: null,
      watchUrl,
      isAudio: true,
    };
  }

  // --- SoundCloud ----------------------------------------------------------
  if (host.endsWith("soundcloud.com")) {
    const embed = new URL("https://w.soundcloud.com/player/");
    embed.searchParams.set("url", watchUrl);
    embed.searchParams.set("color", "#1e4fd8");
    embed.searchParams.set("hide_related", "true");
    return {
      provider: "soundcloud",
      providerLabel: PROVIDER_LABELS.soundcloud,
      embedUrl: embed.toString(),
      thumbnailUrl: null,
      watchUrl,
      isAudio: true,
    };
  }

  // --- Facebook ------------------------------------------------------------
  if (host.endsWith("facebook.com") || host === "fb.watch") {
    const embed = new URL("https://www.facebook.com/plugins/video.php");
    embed.searchParams.set("href", watchUrl);
    embed.searchParams.set("show_text", "false");
    return {
      provider: "facebook",
      providerLabel: PROVIDER_LABELS.facebook,
      embedUrl: embed.toString(),
      thumbnailUrl: null,
      watchUrl,
      isAudio: false,
    };
  }

  return fallback;
}
