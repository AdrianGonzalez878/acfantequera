import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

import { client } from "./client";

export type Portada = (SanityImageSource & { alt?: string | null }) | null;

export type Tema = { titulo: string; slug: string };

export type RecursoCard = {
  _id: string;
  titulo: string;
  slug: string;
  formato: "video" | "podcast";
  url: string;
  resumen: string;
  fecha: string;
  duracion: string | null;
  destacado: boolean;
  portada: Portada;
  temas: Tema[] | null;
};

export type RecursoDetalle = RecursoCard & {
  notas: PortableTextBlock[] | null;
};

const CARD_FIELDS = /* groq */ `
  _id,
  titulo,
  "slug": slug.current,
  formato,
  url,
  resumen,
  fecha,
  duracion,
  destacado,
  portada,
  "temas": temas[]->{ titulo, "slug": slug.current }
`;

const RECURSOS_QUERY = /* groq */ `
  *[_type == "recurso" && defined(slug.current)] | order(fecha desc) {
    ${CARD_FIELDS}
  }
`;

const RECURSO_QUERY = /* groq */ `
  *[_type == "recurso" && slug.current == $slug][0] {
    ${CARD_FIELDS},
    notas
  }
`;

const RELACIONADOS_QUERY = /* groq */ `
  *[_type == "recurso" && slug.current != $slug && defined(slug.current)]
    | order(fecha desc)[0...3] {
    ${CARD_FIELDS}
  }
`;

const SLUGS_QUERY = /* groq */ `
  *[_type == "recurso" && defined(slug.current)].slug.current
`;

/**
 * Envoltura tolerante a fallos: si Sanity no está configurado o la consulta
 * falla, el sitio institucional sigue funcionando con un estado vacío.
 */
async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown>,
  fallback: T,
): Promise<T> {
  if (!client) return fallback;
  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: process.env.NODE_ENV === "development" ? 0 : 60,
        tags: ["recurso"],
      },
    });
  } catch (error) {
    console.error("[sanity] consulta fallida:", error);
    return fallback;
  }
}

export function getRecursos(): Promise<RecursoCard[]> {
  return sanityFetch<RecursoCard[]>(RECURSOS_QUERY, {}, []);
}

export function getRecurso(slug: string): Promise<RecursoDetalle | null> {
  return sanityFetch<RecursoDetalle | null>(RECURSO_QUERY, { slug }, null);
}

export function getRecursosRelacionados(slug: string): Promise<RecursoCard[]> {
  return sanityFetch<RecursoCard[]>(RELACIONADOS_QUERY, { slug }, []);
}

export function getRecursoSlugs(): Promise<string[]> {
  return sanityFetch<string[]>(SLUGS_QUERY, {}, []);
}
