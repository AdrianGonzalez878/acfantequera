import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

const componentes: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 text-[16px] leading-[1.8] text-ink-700">{children}</p>
    ),
    h3: ({ children }) => (
      <h3 className="mt-9 font-serif text-[20px] text-navy-900">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 space-y-2.5">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-2.5 text-[15.5px] leading-[1.7] text-ink-700">
        <span aria-hidden="true" className="bullet" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="text-brand-600 underline decoration-1 underline-offset-2"
      >
        {children}
      </a>
    ),
  },
};

/** Notas del episodio escritas como texto enriquecido en Sanity. */
export function NotasRecurso({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={componentes} />;
}
