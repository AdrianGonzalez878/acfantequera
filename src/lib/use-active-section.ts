"use client";

import { useEffect, useState } from "react";

/**
 * Resalta el enlace de la sección visible mientras se hace scroll.
 * Devuelve null fuera de la portada, donde no hay secciones que observar.
 */
export function useActiveSection(sectionIds: string[], enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        // Gana la sección con mayor superficie visible.
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      {
        // Descuenta la altura del header pegajoso para que el cambio
        // coincida con lo que el visitante realmente ve.
        rootMargin: "-96px 0px -45% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, sectionIds]);

  // Se deriva en lugar de limpiarse dentro del efecto: así el valor rezagado
  // de una visita anterior a la portada no se filtra a las páginas internas.
  return enabled ? active : null;
}
