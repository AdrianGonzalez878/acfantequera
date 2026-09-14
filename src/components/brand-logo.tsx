import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Altura CSS del logotipo. El ancho se calcula solo. */
  height?: number;
  priority?: boolean;
};

/** Lockup oficial extraído del PDF de CorelDRAW. */
const WIDTH = 1400;
const HEIGHT = 903;

export function BrandLogo({ className, height = 26, priority = false }: Props) {
  const width = Math.round((height * WIDTH) / HEIGHT);
  return (
    <Image
      src="/logo-acf.png"
      alt="ACF Asesores y Consultores"
      width={WIDTH}
      height={HEIGHT}
      priority={priority}
      className={cn("h-auto w-auto", className)}
      style={{ height, width }}
      sizes={`${width}px`}
    />
  );
}
