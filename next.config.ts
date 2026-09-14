import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Sin esto Turbopack sube hasta el home buscando el lockfile y toma
   * ~/ como raíz del proyecto.
   */
  turbopack: { root: import.meta.dirname },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.vimeocdn.com" },
      { protocol: "https", hostname: "vumbnail.com" },
    ],
  },
};

export default nextConfig;
