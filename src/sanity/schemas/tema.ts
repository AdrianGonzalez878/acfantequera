import { defineField, defineType } from "sanity";

export const tema = defineType({
  name: "tema",
  title: "Tema",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      description: 'Por ejemplo: "SAT", "Facturación electrónica", "Nómina".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "titulo", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "descripcion",
      title: "Descripción",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: { title: "titulo", subtitle: "descripcion" },
  },
});
