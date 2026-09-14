import type { MetadataRoute } from "next";

import { company } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: "ACF",
    description: company.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0B1B3F",
    theme_color: "#0B1B3F",
    lang: "es-MX",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
