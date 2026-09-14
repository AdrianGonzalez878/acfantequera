import type { Service } from "@/data/site";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <article id={service.slug} className="bg-mist-50 p-7 lg:p-[30px]">
      <p className="font-serif text-[30px] leading-none text-brand-600">
        {service.num}
      </p>
      <h3 className="mt-2.5 card-title">{service.title}</h3>
      <p className="mt-3 text-[14px] leading-[1.6] text-ink-700">
        {service.summary}
      </p>
      <ul className="mt-4 space-y-1 border-t border-hairline pt-4">
        {service.items.map((item) => (
          <li key={item} className="text-[13.5px] leading-[1.7] text-ink-500">
            — {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
