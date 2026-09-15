import { JsonLd } from "@/components/json-ld";
import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/get-locale";
import { firmJsonLd } from "@/lib/seo";

export default async function SitioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = getDictionary(await getLocale());

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-[14px] focus:font-bold focus:text-navy-900"
      >
        {dict.skip}
      </a>
      <SiteHeader />
      <main id="contenido" className="overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <ScrollReveal />
      <JsonLd data={firmJsonLd()} />
    </>
  );
}
