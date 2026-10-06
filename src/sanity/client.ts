import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // Sin CDN: si no, al publicar un video Sanity puede devolver la versión
      // vieja hasta un minuto y el sitio parece que no se actualiza.
      useCdn: false,
      perspective: "published",
    })
  : null;
