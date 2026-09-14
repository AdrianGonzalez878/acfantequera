import { stats } from "@/data/site";

export function StatsBand() {
  return (
    <section className="bg-navy-950">
      <div
        data-reveal-stagger="zoom"
        className="container-acf grid grid-cols-2 gap-y-9 py-12 lg:flex lg:justify-between lg:py-[50px]"
      >
        {stats.map((stat) => (
          <div key={stat.label} className="text-center lg:flex-1">
            <p className="font-serif text-[30px] text-white lg:text-[34px]">
              {stat.value}
            </p>
            <p className="mx-auto mt-1.5 max-w-[190px] text-[11.5px] uppercase tracking-[0.06em] text-white/60">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
