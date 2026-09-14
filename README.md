# ACF Asesores y Consultores — sitio web

Sitio del despacho **Asesores y Consultores Fiscales de Antequera, S.C.** (Oaxaca y
Puebla), con una sección de videos y podcast que el contador administra desde un
CMS sin tocar código.

Diseño: dirección **1c** del mockup de exploración — ejecutivo multipágina,
gradientes navy, títulos en serif.

## Stack

| Pieza | Elección | Por qué |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) | Rutas reales por sección e ISR para el contenido del CMS |
| Lenguaje | TypeScript estricto | — |
| Estilos | Tailwind CSS v4 | Tokens de la paleta en `src/app/globals.css` |
| CMS | Sanity v6 (Studio embebido en `/studio`) | El contador publica videos/podcast pegando un enlace |
| Contacto | WhatsApp (`wa.me`) | El formulario abre un chat con el mensaje ya armado; sin costo ni API |
| Analítica | Vercel Analytics + Speed Insights | Tráfico y Core Web Vitals, sin cookies de terceros |

## Arrancar

```bash
npm install
cp .env.example .env.local   # completar variables
npm run dev                  # http://localhost:3000
```

El sitio **funciona sin configurar nada**: sin credenciales de Sanity, la sección
`/recursos` muestra un estado vacío y `/studio` explica qué falta. Eso permite
publicar el sitio institucional antes de tener el CMS listo.

Comandos: `npm run dev`, `npm run build`, `npm start`, `npm run lint`,
`npm run typecheck`.

## Estructura

El sitio es una **landing**: casi todo vive en la portada como secciones con
ancla (`/#servicios`, `/#nosotros`, `/#alianzas`, `/#clientes`, `/#oficinas`,
`/#contacto`) y el header resalta la sección visible con `IntersectionObserver`.

Sólo dos cosas tienen página propia:

- **`/servicios`**: las 6 áreas con sus ~36 conceptos. Justifica una URL por
  profundidad y por posicionamiento local ("dictamen IMSS Oaxaca", etc.).
- **`/recursos` y `/recursos/[slug]`**: cada video o podcast necesita URL
  compartible, vista previa propia y marcado `VideoObject`/`PodcastEpisode`.
  Esto **no** puede colapsarse dentro del scroll.

```
src/
  app/
    (sitio)/            Páginas públicas (comparten header y footer)
      page.tsx            Landing completa: hero, servicios, nosotros,
                          representante legal, alianzas, clientes y sectores,
                          recursos recientes, oficinas con mapa y contacto
      servicios/          Las 6 áreas, con anclas por servicio
      recursos/           Listado de videos y podcast + ficha [slug]
    studio/[[...tool]]/  Sanity Studio embebido
    api/revalidate/      Webhook de Sanity para refrescar la caché
  components/           Header, footer, formulario (WhatsApp), reproductor
  data/site.ts          TODO el contenido institucional (editar aquí)
  lib/media.ts          Interpreta enlaces de video/audio por plataforma
  lib/use-active-section.ts  Resalta la sección visible en el header
```

Al agregar o quitar secciones hay que actualizar `nav` en `src/data/site.ts`
(el `section` debe coincidir con el `id` del `<section>` en la portada) y, si es
una ruta nueva, `src/app/sitemap.ts`.
  sanity/               Cliente, consultas GROQ, schemas y estructura del Studio
```

### Contenido institucional

Servicios, clientes, sectores, oficinas, alianzas y credenciales viven en
**`src/data/site.ts`**, tipados. Los años de trayectoria se calculan desde
`FOUNDED_YEAR = 2004`, así que no envejecen solos.

El botón flotante de WhatsApp usa `whatsapp.number` del mismo archivo. Está
puesto el **celular** del socio director porque el teléfono de oficina es línea
fija y no puede tener cuenta de WhatsApp.

Los mapas de las oficinas son iframes de Google Maps en modo `output=embed`, que
no requiere llave de API: se generan desde la dirección en `offices[].mapEmbedUrl`.

## Videos y podcast

El contador aún no decide plataforma, así que el CMS **sólo guarda el enlace** y
el sitio deduce el resto:

| Plataforma | Reproductor incrustado | Miniatura automática |
| --- | --- | --- |
| YouTube (watch, youtu.be, shorts, live) | Sí, vía `youtube-nocookie` | Sí |
| Vimeo (incluye videos *unlisted* con hash) | Sí | Sí |
| Spotify (episodio o programa) | Sí, reproductor de audio | No |
| Apple Podcasts | Sí, reproductor de audio | No |
| SoundCloud | Sí, reproductor de audio | No |
| Facebook / fb.watch | Sí | No |
| Cualquier otra | No: botón "Ver contenido" al sitio original | No |

Cuando no hay miniatura automática se usa la **portada** que se suba en el CMS y,
si tampoco existe, una placa con la marca de agua ACF. Migrar de plataforma más
adelante sólo implica cambiar el enlace del documento.

La lógica está en `src/lib/media.ts` (`parseMediaUrl`).

## Conectar Sanity

El Studio vive en **`/studio`**. El esquema (videos, podcast y temas) ya está en
el código; lo que falta es un proyecto en la nube de Sanity.

1. Inicia sesión (abre el navegador):

   ```bash
   yarn sanity:login
   ```

2. Crea el proyecto, el dataset `production` y CORS para localhost:

   ```bash
   yarn sanity:setup
   ```

   Eso escribe `NEXT_PUBLIC_SANITY_PROJECT_ID` en `.env.local`.

3. Reinicia `yarn dev` y entra a [http://localhost:3000/studio](http://localhost:3000/studio).

4. En el panel, **Videos → nuevo**: pega el enlace de YouTube/Spotify/etc., un
   resumen y publica. El sitio arma el reproductor solo.

Si prefieres crearlo a mano: [sanity.io/manage](https://www.sanity.io/manage),
copia el Project ID a `.env.local` y en *API → CORS origins* agrega
`http://localhost:3000` **con credenciales**.

### Qué ve el contador en el Studio

El panel está en español y separa **Videos** de **Podcast**. Cada entrada tiene:

- **Título**, **slug** (se genera solo) y **formato** (video o podcast).
- **Enlace** de la publicación. Si la plataforma no se reconoce, avisa —sin
  bloquear— que se mostrará un botón externo en lugar del reproductor.
- **Resumen** (obligatorio, máx. 280 caracteres): se usa en tarjetas y buscadores.
- **Notas del episodio** (opcional): texto con subtítulos y listas.
- **Portada** propia, **fecha**, **duración**, **temas** y **destacado**.

`Temas` es un tipo aparte para poder etiquetar por asunto (SAT, nómina, etc.).

### Refresco al publicar

Las páginas revalidan cada 60 segundos. Para que la publicación se refleje al
instante, crear un webhook en *sanity.io/manage → API → Webhooks*:

- URL: `https://<dominio>/api/revalidate`
- Dataset: `production`, disparadores: create/update/delete
- Secret: el mismo valor de `SANITY_REVALIDATE_SECRET`

## Formulario de contacto

`src/components/contact-form.tsx` valida con Zod y abre WhatsApp (`wa.me`)
hacia el celular del socio director (`whatsapp` en `src/data/site.ts`). El
mensaje va prellenado con nombre, empresa, correo, teléfono y la consulta.
El visitante sólo pulsa Enviar en WhatsApp.

No hace falta API ni clave. El correo institucional sigue visible en la
sección de contacto por si alguien prefiere escribir por ahí.

## Pendientes antes de publicar

- [x] Dominio: `https://acfdeantequera.com` (`NEXT_PUBLIC_SITE_URL`).
- [ ] Crear el proyecto de Sanity y publicar los primeros videos.
- [ ] Confirmar el teléfono de Puebla: el mockup trae `(229) 945 4010` y el
      currículum `(229) 94 590 10`. El 229 es lada de Veracruz; la de Puebla
      es `(222)`.
- [ ] Confirmar la dirección de Puebla: el mockup cita Atlixcáyotl en San Andrés
      Cholula; el pie del currículum cita 53 Poniente 724-201, Prados Agua Azul.
- [ ] Revisar textos y datos de `src/data/site.ts` con el despacho.
