import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  /** "onDark" cuando la sección va sobre fondo navy. */
  tone?: "onLight" | "onDark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "onLight",
  className,
}: Props) {
  const onDark = tone === "onDark";
  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-2xl text-center",
        className,
      )}
    >
      <p className={onDark ? "eyebrow-light" : "eyebrow"}>{eyebrow}</p>
      <h2 className={cn("mt-3.5 section-title", onDark && "text-white")}>
        {title}
      </h2>
      {lead && (
        <p
          className={cn(
            "mt-5 text-[16px] leading-[1.75]",
            align === "center" && "mx-auto",
            onDark ? "text-white/75" : "text-ink-500",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
