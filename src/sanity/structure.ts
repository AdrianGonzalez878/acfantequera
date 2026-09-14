import type { StructureResolver } from "sanity/structure";

/** Panel lateral del Studio en español, separando videos de episodios de audio. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenido")
    .items([
      S.listItem()
        .title("Videos")
        .child(
          S.documentTypeList("recurso")
            .title("Videos")
            .filter('_type == "recurso" && formato == "video"')
            .defaultOrdering([{ field: "fecha", direction: "desc" }])
            .initialValueTemplates([
              S.initialValueTemplateItem("recurso-video"),
            ]),
        ),
      S.listItem()
        .title("Podcast")
        .child(
          S.documentTypeList("recurso")
            .title("Episodios de podcast")
            .filter('_type == "recurso" && formato == "podcast"')
            .defaultOrdering([{ field: "fecha", direction: "desc" }])
            .initialValueTemplates([
              S.initialValueTemplateItem("recurso-podcast"),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Todos los recursos")
        .child(
          S.documentTypeList("recurso")
            .title("Todos los recursos")
            .defaultOrdering([{ field: "fecha", direction: "desc" }]),
        ),
      S.documentTypeListItem("tema").title("Temas"),
    ]);
