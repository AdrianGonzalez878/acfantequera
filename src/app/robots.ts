import type { MetadataRoute } from "next";

import { company } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const base = company.url.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base.replace(/^https?:\/\//, ""),
  };
}
