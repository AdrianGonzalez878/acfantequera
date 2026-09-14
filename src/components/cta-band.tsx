import Link from "next/link";

import { company, offices } from "@/data/site";

type Props = {
  title?: string;
  lead?: string;
};

export function CtaBand({
  title = "Hablemos de su negocio",
  lead = "Escríbanos y un especialista de ACF se pondrá en contacto para entender sus necesidades fiscales, contables o de auditoría.",
}: Props) {
  return (
    <section className="bg-gradient-navy">
      <div
        data-reveal="zoom"
        className="container-acf flex flex-col gap-10 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20"
      >
        <div className="max-w-[560px]">
          <p className="eyebrow-light">Contacto</p>
          <h2 className="mt-3.5 section-title text-white">{title}</h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-white/75">{lead}</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/#contacto" className="btn-primary w-full sm:w-auto">
              Agendar una consulta
            </Link>
            <a href={`mailto:${company.email}`} className="btn-outline-light w-full sm:w-auto">
              Escribir por correo
            </a>
          </div>
          <div className="space-y-1 text-[14px] text-white/70">
            {offices.map((office) => (
              <p key={office.city}>
                {office.city}:{" "}
                <a
                  href={`tel:${office.phoneHref}`}
                  className="text-white transition-colors hover:text-brand-400"
                >
                  {office.phone}
                </a>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
