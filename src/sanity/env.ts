export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";

/**
 * El sitio arranca sin credenciales de Sanity: la sección de recursos muestra
 * un estado vacío y /studio explica cómo conectarlo. Así se puede desplegar
 * antes de que exista el proyecto en Sanity.
 */
export const isSanityConfigured = projectId.trim().length > 0;
