import type { ReactNode } from "react";
import Image from "next/image";

import { clients } from "@/data/site";
import type { Dictionary } from "@/i18n/dictionary";

type GovernmentSector = Dictionary["sectors"]["government"];
type PrivateSector = Dictionary["sectors"]["private"];

function SectorBanner({
  src,
  alt,
  kicker,
  title,
}: {
  src: string;
  alt: string;
  kicker: string;
  title: string;
}) {
  return (
    <div className="relative h-[220px] overflow-hidden sm:h-[280px] lg:h-[320px]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-950/45 to-navy-950/15"
      />
      <div className="relative flex h-full items-center">
        <div className="container-acf py-8 sm:py-10">
          <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-400">
            {kicker}
          </p>
          <h3 className="mt-2 font-serif text-[clamp(1.75rem,4vw,2.35rem)] leading-[1.15] text-white">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

function DotList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-3 border-t border-hairline pt-3 text-[15px] leading-[1.55] text-ink-700"
        >
          <span
            aria-hidden="true"
            className="mt-[8px] size-[6px] flex-none bg-brand-500"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SectorBody({
  sector,
  extra,
}: {
  sector: GovernmentSector | PrivateSector;
  extra?: ReactNode;
}) {
  const groups = "groups" in sector ? sector.groups : undefined;
  const industries = "industries" in sector ? sector.industries : undefined;
  const listTitle = "listTitle" in sector ? sector.listTitle : undefined;

  return (
    <div className="container-acf py-12 sm:py-14 lg:py-16">
      <p className="max-w-[640px] text-[16px] leading-[1.75] text-ink-500">
        {sector.lead}
      </p>
      {groups ? (
        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-12">
          {groups.map((group) => (
            <div key={group.title}>
              <h4 className="font-serif text-[22px] leading-[1.25] text-navy-900">
                {group.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-[15px] leading-[1.6] text-ink-700"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[8px] size-[6px] flex-none bg-brand-500"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : null}
      {industries && listTitle ? (
        <>
          <h4 className="mt-10 font-serif text-[22px] leading-[1.25] text-navy-900">
            {listTitle}
          </h4>
          <DotList items={industries} />
        </>
      ) : null}
      {extra}
    </div>
  );
}

export function SectorsBand({ dict }: { dict: Dictionary }) {
  const { sectors } = dict;

  return (
    <section id="sectores" className="bg-white">
      <div className="container-acf section pb-10 sm:pb-12" data-reveal="up">
        <p className="eyebrow">{sectors.eyebrow}</p>
        <h2 className="mt-3.5 section-title max-w-[620px]">{sectors.title}</h2>
        <p className="mt-5 max-w-[560px] text-[16px] leading-[1.75] text-ink-500">
          {sectors.lead}
        </p>
      </div>

      <div id="gubernamental" data-reveal="up">
        <SectorBanner
          src="/sectors/gubernamental.jpg"
          alt={sectors.government.photoAlt}
          kicker={sectors.kicker}
          title={sectors.government.title}
        />
        <SectorBody sector={sectors.government} />
      </div>

      <div id="privado" className="border-t border-hairline" data-reveal="up">
        <SectorBanner
          src="/sectors/privado.jpg"
          alt={sectors.private.photoAlt}
          kicker={sectors.kicker}
          title={sectors.private.title}
        />
        <SectorBody
          sector={sectors.private}
          extra={
            <div id="clientes" className="mt-14 border-t border-hairline pt-12">
              <p className="eyebrow">{dict.clients.eyebrow}</p>
              <h4 className="mt-3.5 max-w-[560px] font-serif text-[22px] leading-[1.25] text-navy-900">
                {dict.clients.title}
              </h4>
              <div className="mt-8 grid gap-px bg-hairline sm:grid-cols-2 lg:grid-cols-4">
                {clients.map((client) => (
                  <div
                    key={client}
                    className="bg-white px-5 py-6 text-[13px] font-bold uppercase leading-[1.5] tracking-[0.04em] text-navy-900"
                  >
                    {client}
                  </div>
                ))}
                <div aria-hidden="true" className="hidden bg-white sm:block" />
              </div>
              <p className="mt-8 max-w-[620px] text-[14px] leading-[1.7] text-ink-500">
                {dict.clients.note}
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
}
