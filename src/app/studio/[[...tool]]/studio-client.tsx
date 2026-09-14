"use client";

import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

/**
 * El Studio vive detrás de un límite de cliente a propósito: si `sanity.config`
 * se importa desde un Server Component, el paquete `sanity` se resuelve en la
 * capa RSC y algunas de sus dependencias (swr) no exponen `default` ahí.
 */
export default function StudioClient() {
  return <NextStudio config={config} />;
}
