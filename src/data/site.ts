/**
 * Fuente única de contenido institucional del sitio.
 * El contenido editorial (videos y podcast) vive en Sanity; esto es lo estable.
 */

export const FOUNDED_YEAR = 2004;

/** Años de trayectoria calculados en tiempo de render, para que no se queden viejos. */
export const yearsActive = new Date().getFullYear() - FOUNDED_YEAR;

export const company = {
  name: "Asesores y Consultores Fiscales de Antequera, S.C.",
  shortName: "ACF",
  tagline: "Auditoría · Impuestos · Consultoría",
  rfc: "ACF040422AL5",
  email: "antequerasc04@hotmail.com",
  description:
    "Despacho de auditoría, impuestos y consultoría con más de dos décadas acompañando a empresas e instituciones en Oaxaca y Puebla.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://acfdeantequera.com",
} as const;

/**
 * WhatsApp usa el celular del socio director: el 951 516 5554 es línea fija
 * de oficina y no puede tener cuenta.
 */
export const whatsapp = {
  number: "5219515470881",
  display: "951 547 0881",
  message:
    "Hola, vi el sitio de ACF Asesores y Consultores y quisiera hacer una consulta.",
} as const;

export function whatsappUrl(message: string = whatsapp.message): string {
  return `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Mensaje prellenado cuando alguien envía el formulario de contacto. */
export function whatsappConsultaMessage(fields: {
  nombre: string;
  empresa?: string;
  email: string;
  telefono?: string;
  mensaje: string;
}): string {
  const lineas = [
    "Hola, les escribo desde el sitio de ACF.",
    `Nombre: ${fields.nombre}`,
  ];
  if (fields.empresa) lineas.push(`Empresa: ${fields.empresa}`);
  lineas.push(`Correo: ${fields.email}`);
  if (fields.telefono) lineas.push(`Teléfono: ${fields.telefono}`);
  lineas.push("", fields.mensaje);
  return lineas.join("\n");
}

export type NavItem = {
  label: string;
  href: string;
  /** id de la sección en la portada; null cuando el enlace es una página. */
  section: string | null;
};

/**
 * El sitio es una landing: la navegación son anclas de la portada, salvo
 * Servicios y Recursos, que sí tienen página propia (profundidad y SEO en el
 * primer caso, URL compartible por video en el segundo).
 */
export const nav: NavItem[] = [
  { label: "Servicios", href: "/#servicios", section: "servicios" },
  { label: "Nosotros", href: "/#nosotros", section: "nosotros" },
  { label: "Alianzas", href: "/#alianzas", section: "alianzas" },
  { label: "Clientes", href: "/#clientes", section: "clientes" },
  { label: "Recursos", href: "/recursos", section: null },
  { label: "Oficinas", href: "/#oficinas", section: "oficinas" },
  { label: "Contacto", href: "/#contacto", section: "contacto" },
];

export type Office = {
  city: string;
  label: string;
  address: string;
  phone: string;
  phoneHref: string;
  mapsUrl: string;
  /** Iframe de Google Maps: el modo `output=embed` no requiere llave de API. */
  mapEmbedUrl: string;
};

const mapsQuery = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const mapsEmbed = (query: string) =>
  `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;

export const offices: Office[] = [
  {
    city: "Oaxaca",
    label: "Oficina central",
    address:
      "Fray Bernardino #102, Fracc. El Fraile, Oaxaca de Juárez, Oax.",
    phone: "951 516 5554",
    phoneHref: "+529515165554",
    mapsUrl: mapsQuery(
      "Fray Bernardino 102, Fracc. El Fraile, Oaxaca de Juárez, Oaxaca",
    ),
    mapEmbedUrl: mapsEmbed(
      "Fray Bernardino 102, Fracc. El Fraile, Oaxaca de Juárez, Oaxaca",
    ),
  },
  {
    city: "Puebla",
    label: "Sucursal",
    address:
      "Av. Lateral Vía Atlixcáyotl #5210, San Bernardino Tlaxcalancingo, San Andrés Cholula, Pue. CP 72820",
    phone: "(229) 945 4010",
    phoneHref: "+522299454010",
    mapsUrl: mapsQuery(
      "Av. Lateral Vía Atlixcáyotl 5210, San Bernardino Tlaxcalancingo, San Andrés Cholula, Puebla",
    ),
    mapEmbedUrl: mapsEmbed(
      "Av. Lateral Vía Atlixcáyotl 5210, San Bernardino Tlaxcalancingo, San Andrés Cholula, Puebla",
    ),
  },
];

export type Service = {
  num: string;
  slug: string;
  title: string;
  summary: string;
  items: string[];
};

export const services: Service[] = [
  {
    num: "01",
    slug: "auditoria",
    title: "Auditoría y Atestiguamiento",
    summary:
      "Opinión independiente sobre su información financiera y el cumplimiento de sus obligaciones.",
    items: [
      "Auditoría de estados financieros",
      "Auditoría de sistemas de información",
      "Auditoría sobre el cumplimiento de obligaciones",
      "Dictámenes para efectos del IMSS e INFONAVIT",
      "Dictámenes sobre enajenación de acciones",
      "Revisiones limitadas con procedimientos convenidos",
    ],
  },
  {
    num: "02",
    slug: "impuestos",
    title: "Impuestos",
    summary:
      "Estrategia fiscal sustentada y defensa técnica frente a las autoridades.",
    items: [
      "Planeación fiscal estratégica",
      "Definición del marco legal y estructura fiscal",
      "Impuestos internacionales y precios de transferencia",
      "Defensa ante autoridades fiscales",
      "Identificación de estímulos fiscales",
      "Compensaciones y devoluciones",
    ],
  },
  {
    num: "03",
    slug: "contabilidad",
    title: "Servicios Integrados y de Contabilidad",
    summary:
      "Operación contable, fiscal y de nómina para que usted se concentre en su negocio.",
    items: [
      "Puesta en marcha de negocios",
      "Registro contable y declaraciones fiscales",
      "Nóminas de personal",
      "Diseño e implantación de sistemas contables",
      "Reorganización contable y depuración de cuentas",
      "Información financiera periódica",
    ],
  },
  {
    num: "04",
    slug: "riesgos",
    title: "Consultoría en Riesgos",
    summary:
      "Control interno, prevención de fraude y cumplimiento en materia de PLD.",
    items: [
      "Revisión de información financiera",
      "Revisión operativa y administrativa",
      "Auditoría interna",
      "Prevención de lavado de dinero",
      "Prevención y detección de fraude y auditoría forense",
      "Gestión del riesgo empresarial",
    ],
  },
  {
    num: "05",
    slug: "negocios",
    title: "Consultoría de Negocios",
    summary:
      "Diagnóstico, procesos y gobierno corporativo para crecer con orden.",
    items: [
      "Análisis y diagnóstico integral de negocios",
      "Planeación estratégica",
      "Mejoramiento de sistemas y procesos",
      "Gobierno corporativo",
      "Consultoría de facturación electrónica",
      "Procesos de entrega y recepción",
    ],
  },
  {
    num: "06",
    slug: "gobierno",
    title: "Entidades Gubernamentales",
    summary:
      "Experiencia específica con gobiernos estatales y municipales.",
    items: [
      "Auditoría de estados financieros de gobiernos estatales y municipales",
      "Armonización de la contabilidad gubernamental",
      "Revisiones con procedimientos previamente convenidos",
      "Consultoría y asesoría de riesgos",
    ],
  },
];

export const clients: string[] = [
  "La Luz, S.A. de C.V.",
  "Universidad del Mar",
  "Niedax de México, S.A. de C.V.",
  "Proyecto Heifer Internacional Incorporado",
  "Gilber Tex, S.A. de C.V.",
  "Free and Green, S.A. de C.V.",
  "Regenerados Tlaxcala, S.A. de C.V.",
];

export const sectors: string[] = [
  "Industria y manufactura",
  "Comercio y distribución",
  "Instituciones educativas",
  "Organizaciones sin fines de lucro",
  "Entidades gubernamentales",
  "Agroindustria",
];

export type Alliance = {
  name: string;
  kind: string;
  desc: string;
};

export const alliances: Alliance[] = [
  {
    name: "RSM Bogarín",
    kind: "Firma nacional · red internacional RSM",
    desc: "Colaboramos con RSM Bogarín, firma mexicana integrante de la red internacional RSM. La alianza amplía nuestra capacidad técnica y nos permite atender operaciones con alcance global en auditoría y consultoría.",
  },
  {
    name: "ECF · Estrategas Contables y Fiscales",
    kind: "Alianza nacional — Puebla",
    desc: "Trabajo conjunto con el despacho nacional ECF de Puebla, que refuerza nuestra cobertura de servicios fiscales y contables en el centro del país.",
  },
];

export const leadPartner = {
  initials: "DR",
  name: "C.P. Domingo Ramón González Olivera",
  role: "Representante Legal · Socio, Director General y Auditor Principal",
  photo: {
    src: "/ramon-gonzalez.jpg",
    width: 870,
    height: 1155,
    alt: "Retrato del C.P. Domingo Ramón González Olivera, socio director de ACF",
  },
  bio: "Supervisa y firma los trabajos de auditoría de estados financieros, fiscal y gubernamental. Asesora a empresas e instituciones en materia fiscal, contable, de negocios y de prevención de lavado de dinero (PLD).",
  phone: "951 547 0881",
  phoneHref: "+529515470881",
  officePhone: "951 516 5554",
  officePhoneHref: "+529515165554",
  email: "rago@prodigy.net.mx",
  credentials: [
    "Contador Público — Instituto Tecnológico Autónomo de México (ITAM)",
    "Maestría en Impuestos — Universidad Autónoma Benito Juárez de Oaxaca (UABJO)",
    "Maestría en Derecho Fiscal — Universidad Da Vinci, A.C.",
    "Certificado por el Instituto Mexicano de Contadores Públicos (IMCP), desde 2002",
    "Certificación en Prevención de Lavado de Dinero y Anticorrupción",
    "Socio y ex presidente del Colegio de Contadores Públicos del Estado de Oaxaca, A.C.",
    "Presidente de la Comisión de Prevención de Lavado de Dinero del Colegio",
    "Registro 5811 para Dictaminar Estados Financieros — SHCP",
    "Registro 3159-21-00 para Dictaminar — IMSS",
    "Registro Nacional 6009 para Dictaminar — INFONAVIT",
    "Registro 20278 para formular dictámenes en materia de contribuciones estatales",
  ],
} as const;

/**
 * Los años de trayectoria no van aquí: el hero ya los muestra en grande y
 * repetirlos en la banda deja dos veces el mismo dato en pantalla.
 */
export const stats = [
  { value: String(offices.length), label: "Oficinas" },
  { value: String(services.length), label: "Áreas de servicio" },
  { value: String(clients.length), label: "Clientes activos" },
  { value: "RSM", label: "Alianza internacional" },
];
