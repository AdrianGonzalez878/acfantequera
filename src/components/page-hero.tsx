type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
};

/** Encabezado de las páginas interiores: banda con gradiente y marca de agua. */
export function PageHero({ eyebrow, title, lead }: Props) {
  return (
    <section className="bg-gradient-navy relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -left-6 top-1/2 -translate-y-1/2 font-serif text-[180px] font-bold leading-none text-white/[0.055] sm:text-[260px]">
          ACF
        </span>
        <span className="absolute right-16 top-12 hidden size-[160px] rotate-[20deg] border-2 border-white/20 lg:block" />
        <span className="absolute bottom-8 right-12 hidden h-2 w-[220px] bg-brand-400 lg:block" />
      </div>

      <div className="hero-enter-left container-acf relative py-16 sm:py-20 lg:py-[92px]">
        <p className="eyebrow-light">{eyebrow}</p>
        <h1 className="mt-4 max-w-[760px] font-serif text-[clamp(1.9rem,4.6vw,2.5rem)] leading-[1.18] text-white">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-[620px] text-[16.5px] leading-[1.75] text-white/75">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
