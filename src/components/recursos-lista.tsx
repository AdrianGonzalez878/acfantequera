"use client";

import { useMemo, useState } from "react";

import { RecursoCard } from "@/components/recurso-card";
import { useI18n } from "@/components/locale-provider";
import type { RecursoCard as Recurso } from "@/sanity/queries";
import { cn } from "@/lib/utils";

type Filtro = "todos" | "video" | "podcast";

export function RecursosLista({ recursos }: { recursos: Recurso[] }) {
  const { locale, dict } = useI18n();
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const etiquetas: Record<Filtro, string> = {
    todos: dict.resources.all,
    video: dict.resources.videos,
    podcast: dict.resources.podcast,
  };

  const disponibles = useMemo(() => {
    const formatos = new Set(recursos.map((recurso) => recurso.formato));
    return (["todos", "video", "podcast"] as Filtro[]).filter(
      (opcion) => opcion === "todos" || formatos.has(opcion),
    );
  }, [recursos]);

  const visibles = useMemo(
    () =>
      filtro === "todos"
        ? recursos
        : recursos.filter((recurso) => recurso.formato === filtro),
    [filtro, recursos],
  );

  return (
    <>
      {disponibles.length > 2 && (
        <div
          role="tablist"
          aria-label={dict.resources.filterLabel}
          className="flex flex-wrap gap-2 border-b border-hairline pb-5"
        >
          {disponibles.map((opcion) => (
            <button
              key={opcion}
              type="button"
              role="tab"
              aria-selected={filtro === opcion}
              onClick={() => setFiltro(opcion)}
              className={cn(
                "px-4 py-2 text-[13.5px] font-bold transition-colors",
                filtro === opcion
                  ? "bg-navy-900 text-white"
                  : "bg-mist-50 text-ink-500 hover:text-navy-900",
              )}
            >
              {etiquetas[opcion]}
            </button>
          ))}
        </div>
      )}

      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:gap-6 lg:grid-cols-3 lg:gap-8">
        {visibles.map((recurso) => (
          <RecursoCard
            key={recurso._id}
            recurso={recurso}
            locale={locale}
            videoLabel={dict.resources.video}
            podcastLabel={dict.resources.podcast}
          />
        ))}
      </div>
    </>
  );
}
