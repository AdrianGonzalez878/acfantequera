import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Webhook de Sanity: al publicar un recurso, invalida la caché del sitio.
 * Configúralo en sanity.io/manage → API → Webhooks apuntando a
 * https://<dominio>/api/revalidate con el mismo secreto.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: "Falta SANITY_REVALIDATE_SECRET." },
      { status: 501 },
    );
  }

  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      request,
      secret,
    );

    if (!isValidSignature) {
      return NextResponse.json({ message: "Firma inválida." }, { status: 401 });
    }

    // El listado y las fichas comparten la etiqueta "recurso".
    revalidateTag("recurso", "max");
    if (body?._type && body._type !== "recurso") {
      revalidateTag(body._type, "max");
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.error("[revalidate]", error);
    return NextResponse.json(
      { message: "No se pudo procesar el webhook." },
      { status: 500 },
    );
  }
}
