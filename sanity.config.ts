import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schemaTypes } from "@/sanity/schemas";
import { structure } from "@/sanity/structure";

export default defineConfig({
  name: "acf-studio",
  title: "ACF Asesores y Consultores",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    /** Plantillas para que el botón "Nuevo" ya llegue con el formato correcto. */
    templates: (prev) => [
      ...prev,
      {
        id: "recurso-video",
        title: "Video",
        schemaType: "recurso",
        value: { formato: "video" },
      },
      {
        id: "recurso-podcast",
        title: "Episodio de podcast",
        schemaType: "recurso",
        value: { formato: "podcast" },
      },
    ],
  },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
});
