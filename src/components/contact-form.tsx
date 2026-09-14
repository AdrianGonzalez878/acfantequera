"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";

import { whatsapp, whatsappConsultaMessage, whatsappUrl } from "@/data/site";
import { cn } from "@/lib/utils";

const schema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "Escriba su nombre.")
    .max(80, "El nombre es demasiado largo."),
  empresa: z.string().trim().max(120, "El nombre es demasiado largo.").optional(),
  email: z.email("Revise el correo electrónico."),
  telefono: z.string().trim().max(30, "El teléfono es demasiado largo.").optional(),
  mensaje: z
    .string()
    .trim()
    .min(10, "Cuéntenos brevemente en qué podemos ayudar.")
    .max(2000, "El mensaje es demasiado largo."),
  sitio: z.string().max(0),
});

type FieldErrors = Partial<
  Record<"nombre" | "empresa" | "email" | "telefono" | "mensaje", string>
>;

const inputClass =
  "w-full border border-[rgba(11,27,63,0.2)] bg-white px-3.5 py-3 text-[14px] text-navy-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[12.5px] font-semibold text-[#B3261E]">
      {message}
    </p>
  );
}

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string>();
  const [enviado, setEnviado] = useState(false);
  const [waUrl, setWaUrl] = useState(whatsappUrl());

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(undefined);

    const data = new FormData(event.currentTarget);
    const parsed = schema.safeParse({
      nombre: data.get("nombre") ?? "",
      empresa: data.get("empresa") ?? "",
      email: data.get("email") ?? "",
      telefono: data.get("telefono") ?? "",
      mensaje: data.get("mensaje") ?? "",
      sitio: data.get("sitio") ?? "",
    });

    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0];
        if (field === "sitio") {
          setEnviado(true);
          return;
        }
        if (
          (field === "nombre" ||
            field === "empresa" ||
            field === "email" ||
            field === "telefono" ||
            field === "mensaje") &&
          !next[field]
        ) {
          next[field] = issue.message;
        }
      }
      setErrors(next);
      setFormError("Revise los datos marcados y vuelva a intentar.");
      return;
    }

    setErrors({});
    const url = whatsappUrl(whatsappConsultaMessage(parsed.data));
    setWaUrl(url);
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.append(link);
    link.click();
    link.remove();
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="bg-white p-9">
        <p className="font-serif text-[22px] text-navy-900">
          WhatsApp está listo
        </p>
        <p className="mt-3 text-[15px] leading-[1.7] text-ink-500">
          Se abrió una conversación con el despacho. Envíe el mensaje para que
          lo recibamos.
        </p>
        <a href={waUrl} className="btn-primary mt-6 inline-flex">
          Abrir WhatsApp
        </a>
        <p className="mt-6 text-[14px] text-ink-400">
          Número del despacho: {whatsapp.display}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-white p-7 sm:p-9" noValidate>
      <p className="font-serif text-[20px] text-navy-900">
        Cuéntenos qué necesita
      </p>
      <p className="mt-2 text-[13.5px] text-ink-400">
        Al enviar se abre WhatsApp con su consulta lista. Los campos con * son
        obligatorios.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <div>
          <label htmlFor="nombre" className="sr-only">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            required
            placeholder="Nombre *"
            aria-invalid={Boolean(errors.nombre)}
            aria-describedby={errors.nombre ? "error-nombre" : undefined}
            className={cn(inputClass, errors.nombre && "border-[#B3261E]")}
          />
          <FieldError id="error-nombre" message={errors.nombre} />
        </div>

        <div>
          <label htmlFor="empresa" className="sr-only">
            Empresa
          </label>
          <input
            id="empresa"
            name="empresa"
            type="text"
            autoComplete="organization"
            placeholder="Empresa"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="Correo electrónico *"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "error-email" : undefined}
            className={cn(inputClass, errors.email && "border-[#B3261E]")}
          />
          <FieldError id="error-email" message={errors.email} />
        </div>

        <div>
          <label htmlFor="telefono" className="sr-only">
            Teléfono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            autoComplete="tel"
            placeholder="Teléfono"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="mensaje" className="sr-only">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={4}
            required
            placeholder="Mensaje *"
            aria-invalid={Boolean(errors.mensaje)}
            aria-describedby={errors.mensaje ? "error-mensaje" : undefined}
            className={cn(
              inputClass,
              "resize-none",
              errors.mensaje && "border-[#B3261E]",
            )}
          />
          <FieldError id="error-mensaje" message={errors.mensaje} />
        </div>

        <div aria-hidden="true" className="hidden">
          <label htmlFor="sitio">No llenar</label>
          <input
            id="sitio"
            name="sitio"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button type="submit" className="btn-primary w-full py-[15px]">
          Enviar por WhatsApp
        </button>
      </div>

      {formError ? (
        <div
          role="alert"
          className="mt-5 border-l-[3px] border-brand-600 bg-mist-50 p-4 text-[13.5px] leading-[1.6] text-navy-900"
        >
          <p>{formError}</p>
        </div>
      ) : null}
    </form>
  );
}
