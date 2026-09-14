import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, isSanityConfigured, projectId } from "./env";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function imageUrl(
  source: SanityImageSource | null | undefined,
  width: number,
  height?: number,
): string | null {
  if (!builder || !source) return null;
  let image = builder.image(source).width(width).auto("format").fit("crop");
  if (height) image = image.height(height);
  return image.url();
}
