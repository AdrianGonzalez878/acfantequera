import { offices } from "@/data/site";
import { officeLabel } from "@/i18n/content";
import { getDictionary } from "@/i18n/dictionary";
import { getLocale } from "@/i18n/get-locale";
import { cn } from "@/lib/utils";

export async function OfficesGrid({ className }: { className?: string }) {
  const dict = getDictionary(await getLocale());

  return (
    <div
      className={cn(
        "mx-auto grid max-w-[1000px] gap-8 sm:grid-cols-2 lg:gap-10",
        className,
      )}
    >
      {offices.map((office) => (
        <div key={office.city} className="flex min-w-0">
          <div aria-hidden="true" className="bar-gradient w-2 flex-none" />
          <div className="min-w-0 flex-1 overflow-hidden">
            <iframe
              src={office.mapEmbedUrl}
              title={dict.offices.mapTitle.replace("{city}", office.city)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[200px] w-full max-w-full border-0 bg-mist-100 sm:h-[220px]"
            />
            <div className="bg-mist-50 p-5 sm:p-7">
              <h3 className="font-serif text-[19px] text-navy-900">
                {office.city}
                <span className="ml-2 align-middle text-[11.5px] font-bold uppercase tracking-[0.1em] text-brand-600">
                  {officeLabel(dict, office.city, office.label)}
                </span>
              </h3>
              <p className="mt-3 text-[14px] leading-[1.6] text-ink-500">
                {office.address}
              </p>
              <p className="mt-3 text-[14px] font-bold text-navy-900">
                {dict.offices.tel}{" "}
                <a
                  className="transition-colors hover:text-brand-600"
                  href={`tel:${office.phoneHref}`}
                >
                  {office.phone}
                </a>
              </p>
              <a
                href={office.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand-600 transition-colors hover:text-navy-900"
              >
                {dict.offices.maps}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
