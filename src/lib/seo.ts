import {
  company,
  FOUNDED_YEAR,
  leadPartner,
  offices,
  services,
  whatsapp,
} from "@/data/site";

const base = () => company.url.replace(/\/$/, "");

export function absoluteUrl(path: string = "/"): string {
  if (!path || path === "/") return base();
  return `${base()}${path.startsWith("/") ? path : `/${path}`}`;
}

export const seo = {
  titleDefault:
    "Despacho contable y fiscal en Oaxaca y Puebla | ACF Antequera",
  titleTemplate: "%s | ACF Asesores y Consultores",
  description:
    "ACF Asesores y Consultores Fiscales de Antequera, S.C.: auditoría, impuestos, dictámenes IMSS e INFONAVIT, PLD y consultoría. Oficinas en Oaxaca de Juárez y Puebla. Más de 20 años de experiencia.",
  keywords: [
    "despacho contable Oaxaca",
    "contador público Oaxaca",
    "asesoría fiscal Puebla",
    "auditoría de estados financieros Oaxaca",
    "dictamen fiscal IMSS INFONAVIT",
    "consultoría fiscal SAT",
    "prevención de lavado de dinero PLD",
    "despacho de auditoría Puebla",
    "ACF Antequera",
    "Asesores y Consultores Fiscales de Antequera",
    "RSM Bogarín",
    "C.P.C. Domingo Ramón González Olivera",
  ],
} as const;

export function durationToIso8601(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  const parts = value
    .trim()
    .split(":")
    .map((part) => Number.parseInt(part, 10));
  if (parts.some((part) => Number.isNaN(part))) return undefined;
  if (parts.length === 2) {
    const [minutes, seconds] = parts;
    return `PT${minutes}M${seconds}S`;
  }
  if (parts.length === 3) {
    const [hours, minutes, seconds] = parts;
    return `PT${hours}H${minutes}M${seconds}S`;
  }
  return undefined;
}

export function firmJsonLd() {
  const url = base();
  const firmaId = `${url}#firma`;
  const socioId = `${url}#socio-director`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: `${company.shortName} Asesores y Consultores`,
        alternateName: company.name,
        inLanguage: "es-MX",
        publisher: { "@id": firmaId },
      },
      {
        "@type": ["AccountingService", "ProfessionalService", "LocalBusiness"],
        "@id": firmaId,
        name: company.name,
        legalName: company.name,
        alternateName: [
          `${company.shortName} Asesores y Consultores`,
          "ACF de Antequera",
        ],
        description: seo.description,
        url,
        email: company.email,
        taxID: company.rfc,
        vatID: company.rfc,
        foundingDate: String(FOUNDED_YEAR),
        logo: absoluteUrl("/logo-acf.png"),
        image: [
          absoluteUrl("/logo-acf.png"),
          absoluteUrl(leadPartner.photo.src),
        ],
        telephone: offices[0]?.phoneHref,
        areaServed: [
          { "@type": "AdministrativeArea", name: "Oaxaca" },
          { "@type": "AdministrativeArea", name: "Puebla" },
          { "@type": "Country", name: "México" },
        ],
        knowsLanguage: ["es-MX"],
        currenciesAccepted: "MXN",
        priceRange: "$$",
        slogan: company.tagline,
        address: {
          "@type": "PostalAddress",
          streetAddress: offices[0]?.address,
          addressLocality: "Oaxaca de Juárez",
          addressRegion: "Oaxaca",
          addressCountry: "MX",
        },
        location: offices.map((office, index) => ({
          "@type": "LocalBusiness",
          "@id": `${url}#oficina-${office.city.toLowerCase()}`,
          name: `${company.shortName} ${office.city}`,
          parentOrganization: { "@id": firmaId },
          telephone: office.phoneHref,
          address: {
            "@type": "PostalAddress",
            streetAddress: office.address,
            addressLocality: office.city,
            addressRegion: office.city,
            addressCountry: "MX",
          },
          url: index === 0 ? url : `${url}/#oficinas`,
        })),
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: leadPartner.phoneHref,
            email: company.email,
            areaServed: "MX",
            availableLanguage: ["es-MX"],
          },
          {
            "@type": "ContactPoint",
            contactType: "WhatsApp",
            telephone: `+${whatsapp.number}`,
            areaServed: "MX",
            availableLanguage: ["es-MX"],
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicios de ACF",
          itemListElement: services.map((service, index) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.summary,
              url: absoluteUrl(`/servicios#${service.slug}`),
              areaServed: ["Oaxaca", "Puebla", "México"],
              provider: { "@id": firmaId },
            },
            position: index + 1,
          })),
        },
        employee: { "@id": socioId },
        founder: { "@id": socioId },
      },
      {
        "@type": "Person",
        "@id": socioId,
        name: leadPartner.name,
        jobTitle: leadPartner.role,
        email: leadPartner.email,
        telephone: leadPartner.phoneHref,
        image: absoluteUrl(leadPartner.photo.src),
        worksFor: { "@id": firmaId },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "Instituto Tecnológico Autónomo de México" },
          {
            "@type": "CollegeOrUniversity",
            name: "Universidad Autónoma Benito Juárez de Oaxaca",
          },
        ],
        hasCredential: leadPartner.credentials.map((credential) => ({
          "@type": "EducationalOccupationalCredential",
          credentialCategory: credential,
        })),
        knowsAbout: [
          "Auditoría de estados financieros",
          "Impuestos",
          "Dictamen fiscal",
          "Prevención de lavado de dinero",
          "Contabilidad gubernamental",
        ],
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function servicesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Servicios de ACF Asesores y Consultores",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      description: service.summary,
      url: absoluteUrl(`/servicios#${service.slug}`),
    })),
  };
}
