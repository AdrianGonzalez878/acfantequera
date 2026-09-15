import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { LocaleProvider } from "@/components/locale-provider";
import { company } from "@/data/site";
import { htmlLang } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/get-locale";
import { seo } from "@/lib/seo";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: seo.titleDefault,
    template: seo.titleTemplate,
  },
  description: seo.description,
  applicationName: `${company.shortName} Asesores y Consultores`,
  authors: [{ name: company.name, url: company.url }],
  creator: company.name,
  publisher: company.name,
  category: "finance",
  keywords: [...seo.keywords],
  alternates: {
    canonical: "/",
    languages: { "es-MX": "/", es: "/", en: "/" },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      {
        url: "/android-chrome-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/android-chrome-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon-180x180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon-precomposed.png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "ACF",
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: `${company.shortName} Asesores y Consultores`,
    title: seo.titleDefault,
    description: seo.description,
    url: company.url,
  },
  twitter: {
    card: "summary_large_image",
    title: seo.titleDefault,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "MX-OAX",
    "geo.placename": "Oaxaca de Juárez",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0B1B3F" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1B3F" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <html
      lang={htmlLang(locale)}
      className={inter.variable}
      data-scroll-behavior="smooth"
    >
      <body>
        <noscript>
          <style>{`[data-reveal],[data-reveal-stagger]>*{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <LocaleProvider locale={locale} dict={dict}>
          {children}
        </LocaleProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
