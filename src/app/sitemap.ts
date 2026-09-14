import type { MetadataRoute } from "next";

import { company } from "@/data/site";
import { getRecursos } from "@/sanity/queries";

/**
 * El sitio es una landing: las secciones son anclas de la portada y no rutas
 * propias, así que sólo se listan las páginas reales.
 */
const rutas = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/servicios", changeFrequency: "monthly", priority: 0.8 },
  { path: "/recursos", changeFrequency: "weekly", priority: 0.8 },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = company.url.replace(/\/$/, "");
  const ahora = new Date();

  const paginas: MetadataRoute.Sitemap = rutas.map((ruta) => ({
    url: `${base}${ruta.path === "/" ? "" : ruta.path}`,
    lastModified: ahora,
    changeFrequency: ruta.changeFrequency,
    priority: ruta.priority,
  }));

  const recursos = await getRecursos();
  const fichas: MetadataRoute.Sitemap = recursos.map((recurso) => ({
    url: `${base}/recursos/${recurso.slug}`,
    lastModified: new Date(recurso.fecha),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...paginas, ...fichas];
}
