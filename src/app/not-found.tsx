import type { Metadata } from "next";
import Link from "next/link";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/get-locale";

export async function generateMetadata(): Promise<Metadata> {
  const dict = getDictionary(await getLocale());
  return {
    title: dict.notFound.title,
    robots: { index: false, follow: false },
  };
}

export default async function NotFound() {
  const dict = getDictionary(await getLocale());

  return (
    <>
      <SiteHeader />
      <main className="bg-gradient-navy">
        <div className="container-acf py-24 lg:py-32">
          <p className="eyebrow-light">Error 404</p>
          <h1 className="mt-4 max-w-[620px] font-serif text-[clamp(1.8rem,4vw,2.4rem)] leading-[1.2] text-white">
            {dict.notFound.heading}
          </h1>
          <p className="mt-5 max-w-[520px] text-[16px] leading-[1.75] text-white/75">
            {dict.notFound.lead}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/" className="btn-light">
              {dict.notFound.home}
            </Link>
            <Link href="/#contacto" className="btn-outline-light">
              {dict.notFound.contact}
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
