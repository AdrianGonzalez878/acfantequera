import { createClient, type SanityClient } from "next-sanity";

import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // En producción el CDN es más rápido; en local iría por detrás de lo
      // que acabas de publicar en el Studio.
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published",
    })
  : null;
