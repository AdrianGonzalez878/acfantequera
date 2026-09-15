import type { NavItem, Service } from "@/data/site";
import { alliances as allianceSource, services as serviceSource } from "@/data/site";

import type { Dictionary } from "./dictionary";

export function navItems(dict: Dictionary): NavItem[] {
  return [
    { label: dict.nav.services, href: "/#servicios", section: "servicios" },
    { label: dict.nav.about, href: "/#nosotros", section: "nosotros" },
    { label: dict.nav.alliances, href: "/#alianzas", section: "alianzas" },
    { label: dict.nav.clients, href: "/#clientes", section: "clientes" },
    { label: dict.nav.resources, href: "/recursos", section: null },
    { label: dict.nav.offices, href: "/#oficinas", section: "oficinas" },
    { label: dict.nav.contact, href: "/#contacto", section: "contacto" },
  ];
}

export function localizedServices(dict: Dictionary): Service[] {
  return serviceSource.map((service) => {
    const copy = dict.services.items[service.slug as keyof typeof dict.services.items];
    return {
      ...service,
      title: copy.title,
      summary: copy.summary,
      items: [...copy.items],
    };
  });
}

export function localizedAlliances(dict: Dictionary) {
  return allianceSource.map((alliance) => {
    const key = alliance.name.startsWith("RSM") ? "rsm" : "ecf";
    const copy = dict.alliances.items[key];
    return {
      ...alliance,
      kind: copy.kind,
      desc: copy.desc,
    };
  });
}

export function officeLabel(dict: Dictionary, city: string, fallback: string) {
  if (city === "Oaxaca") return dict.offices.hq;
  if (city === "Puebla") return dict.offices.branch;
  return fallback;
}
