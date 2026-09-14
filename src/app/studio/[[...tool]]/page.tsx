import type { Metadata, Viewport } from "next";

import { isSanityConfigured } from "@/sanity/env";

import StudioClient from "./studio-client";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "ACF · Studio de contenido",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
};

function SinConfigurar() {
  return (
    <main className="container-acf py-20">
      <p className="eyebrow">Sanity</p>
      <h1 className="mt-3 section-title">Studio sin conectar</h1>
      <p className="mt-5 max-w-[560px] body-lg">
        Falta la variable <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>. Crea el
        proyecto en{" "}
        <a
          href="https://www.sanity.io/manage"
          className="font-semibold text-brand-600 underline"
        >
          sanity.io/manage
        </a>
        , copia el ID del proyecto a <code>.env.local</code> y reinicia el
        servidor.
      </p>
      <pre className="mt-7 max-w-[560px] overflow-x-auto bg-mist-50 p-5 text-[13px] text-navy-900">
        {`NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production`}
      </pre>
    </main>
  );
}

export default function StudioPage() {
  if (!isSanityConfigured) return <SinConfigurar />;
  return <StudioClient />;
}
