import Link from "next/link";

import { company, offices } from "@/data/site";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/get-locale";

type Props = {
  title?: string;
  lead?: string;
};

export async function CtaBand({ title, lead }: Props) {
  const dict = getDictionary(await getLocale());

  return (
    <section className="bg-gradient-navy">
      <div
        data-reveal="zoom"
        className="container-acf flex flex-col gap-10 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20"
      >
        <div className="max-w-[560px]">
          <p className="eyebrow-light">{dict.contact.eyebrow}</p>
          <h2 className="mt-3.5 section-title text-white">
            {title ?? dict.contact.title}
          </h2>
          <p className="mt-4 text-[16px] leading-[1.75] text-white/75">
            {lead ?? dict.contact.ctaLead}
          </p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/#contacto" className="btn-primary w-full sm:w-auto">
              {dict.hero.cta}
            </Link>
            <a
              href={`mailto:${company.email}`}
              className="btn-outline-light w-full sm:w-auto"
            >
              {dict.contact.writeEmail}
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
