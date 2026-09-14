import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Un "recurso" es un video o un episodio de podcast publicado en cualquier
 * plataforma externa. El sitio sólo necesita el enlace: el reproductor y la
 * miniatura se derivan de él (ver src/lib/media.ts).
 */
export const recurso = defineType({
  name: "recurso",
  title: "Video o podcast",
  type: "document",
  groups: [
    { name: "contenido", title: "Contenido", default: true },
    { name: "publicacion", title: "Publicación" },
  ],
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      group: "contenido",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      group: "contenido",
      description: "Se genera del título. Define la dirección: /recursos/mi-video",
      options: { source: "titulo", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "formato",
      title: "Formato",
      type: "string",
      group: "contenido",
      initialValue: "video",
      options: {
        list: [
          { title: "Video", value: "video" },
          { title: "Podcast / audio", value: "podcast" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Enlace del video o episodio",
      type: "url",
      group: "contenido",
      description:
        "Pega la dirección donde ya está publicado: YouTube, Vimeo, Spotify, Apple Podcasts, SoundCloud o Facebook. Si la plataforma se reconoce, el reproductor se incrusta en el sitio.",
      validation: (rule) =>
        rule
          .required()
          .uri({ scheme: ["http", "https"] })
          .custom((value) => {
            if (!value) return true;
            const conocidas = [
              "youtube.com",
              "youtu.be",
              "vimeo.com",
              "spotify.com",
              "podcasts.apple.com",
              "soundcloud.com",
              "facebook.com",
              "fb.watch",
            ];
            try {
              const host = new URL(value).hostname.replace(/^www\./, "");
              if (conocidas.some((c) => host === c || host.endsWith(`.${c}`))) {
                return true;
              }
            } catch {
              return "El enlace no es una dirección válida.";
            }
            // Advertencia, no error: el sitio sigue funcionando con un botón externo.
            return "Plataforma no reconocida: el sitio mostrará un botón para abrir el enlace en lugar del reproductor.";
          })
          .warning(),
    }),
    defineField({
      name: "resumen",
      title: "Resumen",
      type: "text",
      rows: 3,
      group: "contenido",
      description: "Dos o tres líneas. Es lo que se lee en las tarjetas y en buscadores.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "notas",
      title: "Notas del episodio",
      type: "array",
      group: "contenido",
      description: "Opcional: puntos tratados, referencias, fundamentos legales.",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Párrafo", value: "normal" },
            { title: "Subtítulo", value: "h3" },
          ],
          lists: [{ title: "Lista", value: "bullet" }],
          marks: {
            decorators: [
              { title: "Negrita", value: "strong" },
              { title: "Cursiva", value: "em" },
            ],
          },
        }),
      ],
    }),
    defineField({
      name: "portada",
      title: "Portada propia",
      type: "image",
      group: "publicacion",
      options: { hotspot: true },
      description:
        "Opcional. Si se deja vacía, se usa la miniatura de YouTube o Vimeo cuando esté disponible.",
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          description: "Describe la imagen para lectores de pantalla.",
        }),
      ],
    }),
    defineField({
      name: "fecha",
      title: "Fecha de publicación",
      type: "datetime",
      group: "publicacion",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "duracion",
      title: "Duración",
      type: "string",
      group: "publicacion",
      description: 'Formato mm:ss o h:mm:ss. Por ejemplo: 18:42',
      validation: (rule) =>
        rule.regex(/^(\d+:)?\d{1,2}:\d{2}$/, {
          name: "duración",
          invert: false,
        }).warning("Usa el formato mm:ss o h:mm:ss."),
    }),
    defineField({
      name: "temas",
      title: "Temas",
      type: "array",
      group: "publicacion",
      of: [defineArrayMember({ type: "reference", to: [{ type: "tema" }] })],
    }),
    defineField({
      name: "destacado",
      title: "Destacar en la portada de Recursos",
      type: "boolean",
      group: "publicacion",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Más reciente primero",
      name: "fechaDesc",
      by: [{ field: "fecha", direction: "desc" }],
    },
    {
      title: "Más antiguo primero",
      name: "fechaAsc",
      by: [{ field: "fecha", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "titulo",
      formato: "formato",
      fecha: "fecha",
      media: "portada",
    },
    prepare({ title, formato, fecha, media }) {
      const etiqueta = formato === "podcast" ? "Podcast" : "Video";
      const fechaTexto = fecha
        ? new Date(fecha as string).toLocaleDateString("es-MX", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })
        : "sin fecha";
      return {
        title: title as string,
        subtitle: `${etiqueta} · ${fechaTexto}`,
        media,
      };
    },
  },
});
