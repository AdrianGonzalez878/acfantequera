import { ScrollReveal } from "@/components/scroll-reveal";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { company, leadPartner, offices } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AccountingService",
      "@id": `${company.url}#firma`,
      name: company.name,
      alternateName: `${company.shortName} Asesores y Consultores`,
      description: company.description,
      url: company.url,
      email: company.email,
      taxID: company.rfc,
      foundingDate: "2004",
      logo: `${company.url}/logo-acf.png`,
      image: `${company.url}/logo-acf.png`,
      areaServed: ["Oaxaca", "Puebla", "México"],
      address: offices.map((office) => ({
        "@type": "PostalAddress",
        streetAddress: office.address,
        addressRegion: office.city,
        addressCountry: "MX",
      })),
      telephone: offices.map((office) => office.phoneHref),
      knowsLanguage: ["es-MX"],
      employee: { "@id": `${company.url}#socio-director` },
    },
    {
      "@type": "Person",
      "@id": `${company.url}#socio-director`,
      name: leadPartner.name,
      jobTitle: leadPartner.role,
      email: leadPartner.email,
      telephone: leadPartner.phoneHref,
      image: `${company.url}${leadPartner.photo.src}`,
      worksFor: { "@id": `${company.url}#firma` },
    },
  ],
};

export default function SitioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-[14px] focus:font-bold focus:text-navy-900"
      >
        Saltar al contenido
      </a>
      <SiteHeader />
      <main id="contenido" className="overflow-x-clip">
        {children}
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <ScrollReveal />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
