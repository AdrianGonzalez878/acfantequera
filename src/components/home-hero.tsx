import Image from "next/image";
import Link from "next/link";

export type HomeHeroCopy = {
  eyebrow: string;
  title: string;
  lead: string;
  cta: string;
  services: string;
  years: string;
  photoAlt: string;
};

export function HomeHero({
  copy,
  yearsActive,
}: {
  copy: HomeHeroCopy;
  yearsActive: number;
}) {
  return (
    <section className="relative min-h-[28rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[42.5rem]">
      <Image
        src="/hero/reunion.jpg"
        alt={copy.photoAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_36%] sm:object-[60%_38%] lg:object-[72%_38%]"
      />
      {/* Móvil: velo claro para ver la reunión y seguir leyendo el texto. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-navy-950/50 sm:hidden"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-gradient-to-r from-navy-950 via-navy-950/82 to-navy-950/25 sm:block"
      />
      <div className="relative flex min-h-[28rem] items-center sm:min-h-[34rem] lg:min-h-[42.5rem]">
        <div className="container-acf w-full py-12 sm:py-16 lg:py-20">
          <div className="hero-enter max-w-[640px] text-white">
            <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-brand-400">
              {copy.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-[clamp(1.85rem,7vw,3.15rem)] leading-[1.15] sm:mt-5">
              {copy.title}
            </h1>
            <p className="mt-5 max-w-[520px] text-[15.5px] leading-[1.7] text-white/80 sm:mt-6 sm:text-[16.5px] sm:leading-[1.75] sm:text-white/75">
              {copy.lead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center sm:gap-x-7">
              <Link href="#contacto" className="btn-light w-full sm:w-auto">
                {copy.cta}
              </Link>
              <Link
                href="#servicios"
                className="btn-link self-center text-white hover:text-brand-400"
              >
                {copy.services} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <p className="mt-8 flex flex-wrap items-baseline gap-x-3 border-t border-white/20 pt-5 text-[13px] tracking-[0.08em] text-white/70 sm:mt-12">
            <span className="font-serif text-[22px] text-white">{yearsActive}</span>
            <span className="uppercase">{copy.years}</span>
            <span className="text-white/30">·</span>
            <span>Oaxaca · Puebla</span>
          </p>
        </div>
      </div>
    </section>
  );
}
