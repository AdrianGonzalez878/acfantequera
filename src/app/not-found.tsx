import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="bg-gradient-navy">
        <div className="container-acf py-24 lg:py-32">
          <p className="eyebrow-light">Error 404</p>
          <h1 className="mt-4 max-w-[620px] font-serif text-[clamp(1.8rem,4vw,2.4rem)] leading-[1.2] text-white">
            No encontramos la página que buscaba.
          </h1>
          <p className="mt-5 max-w-[520px] text-[16px] leading-[1.75] text-white/75">
            Puede que el enlace haya cambiado. Vuelva al inicio o escríbanos y le
            ayudamos a encontrar lo que necesita.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/" className="btn-light">
              Ir al inicio
            </Link>
            <Link href="/#contacto" className="btn-outline-light">
              Contactar al despacho
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
