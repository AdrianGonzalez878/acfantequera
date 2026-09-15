import { offices, services, clients } from "@/data/site";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/get-locale";

export async function StatsBand() {
  const dict = getDictionary(await getLocale());
  const items = [
    { value: String(offices.length), label: dict.stats.offices },
    { value: String(services.length), label: dict.stats.areas },
    { value: String(clients.length), label: dict.stats.clients },
    { value: "RSM", label: dict.stats.alliance },
  ];

  return (
    <section className="bg-navy-950">
      <div
        data-reveal-stagger="zoom"
        className="container-acf grid grid-cols-2 gap-y-9 py-12 lg:flex lg:justify-between lg:py-[50px]"
      >
        {items.map((stat) => (
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
