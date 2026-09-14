import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { company } from "@/data/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.shortName} · ${company.name}`,
    template: `%s · ${company.shortName} Asesores y Consultores`,
  },
  description: company.description,
  applicationName: company.shortName,
  authors: [{ name: company.name }],
  keywords: [
    "contador Oaxaca",
    "despacho contable Oaxaca",
    "auditoría Oaxaca",
    "asesoría fiscal Puebla",
    "dictamen fiscal",
    "SAT",
    "RSM Bogarín",
    "ACF Antequera",
  ],
  icons: {
    icon: [
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: `${company.shortName} Asesores y Consultores`,
    title: `${company.shortName} · ${company.name}`,
    description: company.description,
    url: company.url,
    images: [{ url: "/icon-512.png", width: 512, height: 512, alt: "ACF" }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B1B3F" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1B3F" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-MX" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <noscript>
          <style>{`[data-reveal],[data-reveal-stagger]>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
