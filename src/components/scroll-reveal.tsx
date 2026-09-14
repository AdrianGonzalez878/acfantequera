"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Animaciones al entrar en vista. Usa IntersectionObserver + opacity/transform
 * (capas de GPU) y evita APIs que Safari aún no cubre bien: animation-timeline,
 * blur, clip-path animado o transformar un ancestro de position:fixed.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const nodes = [
      ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
      ...document.querySelectorAll<HTMLElement>("[data-reveal-stagger] > *"),
    ];
    if (nodes.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") {
      for (const el of nodes) el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    );

    for (const el of nodes) observer.observe(el);
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
