import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

/** Image URL builder instance configured with the Sanity client */
const builder = imageUrlBuilder(client);

/**
 * Sanity image reference object structure.
 * This is the format returned by Sanity when querying image fields.
 */
interface SanityImageReference {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

/**
 * Accepted image source formats for URL generation.
 * - Full image reference object from Sanity queries
 * - Direct asset ID string
 * - Partial reference with optional asset
 */
type SanityImageSource =
  | SanityImageReference
  | string
  | { asset?: { _ref?: string } };

/**
 * Generates a URL for a Sanity image asset.
 *
 * @param source - Sanity image reference, asset ID, or partial reference
 * @returns The CDN URL for the image
 *
 * @example
 * ```ts
 * // From a Sanity query result
 * const imageUrl = urlFor(document.heroImage);
 * // => "https://cdn.sanity.io/images/projectId/dataset/image-abc123-800x600.jpg"
 * ```
 */
export function urlFor(source: SanityImageSource): string {
  return builder.image(source).url();
}

/**
 * Generates an array of image URLs at different widths for responsive images.
 * Useful for building custom responsive image components.
 *
 * @param source - Sanity image reference, asset ID, or partial reference
 * @param widths - Array of pixel widths to generate (default: [400, 800, 1200, 1600, 1920])
 * @param quality - JPEG/WebP quality 1-100 (default: 85)
 * @returns Array of objects with width and corresponding URL
 *
 * @example
 * ```ts
 * const urls = getResponsiveUrls(image, [400, 800, 1200]);
 * // => [
 * //   { width: 400, url: "https://cdn.sanity.io/...?w=400&q=85&auto=format" },
 * //   { width: 800, url: "https://cdn.sanity.io/...?w=800&q=85&auto=format" },
 * //   { width: 1200, url: "https://cdn.sanity.io/...?w=1200&q=85&auto=format" }
 * // ]
 * ```
 */
export function getResponsiveUrls(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200, 1600, 1920],
  quality = 85
): Array<{ width: number; url: string }> {
  return widths.map((w) => ({
    width: w,
    url: builder
      .image(source)
      .width(w)
      .quality(quality)
      .auto('format')
      .url(),
  }));
}

/**
 * Generates an HTML srcset string for responsive images.
 * Use with the `<img srcset>` or `<source srcset>` attributes.
 *
 * @param source - Sanity image reference, asset ID, or partial reference
 * @param widths - Array of pixel widths to generate (default: [400, 800, 1200, 1600, 1920])
 * @param quality - JPEG/WebP quality 1-100 (default: 85)
 * @returns Comma-separated srcset string with width descriptors
 *
 * @example
 * ```ts
 * const srcset = getSrcSet(image, [400, 800, 1200]);
 * // => "https://cdn.sanity.io/...?w=400 400w, https://cdn.sanity.io/...?w=800 800w, ..."
 *
 * // Usage in JSX/HTML:
 * <img src={urlFor(image)} srcset={getSrcSet(image)} sizes="(max-width: 768px) 100vw, 50vw" />
 * ```
 */
export function getSrcSet(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200, 1600, 1920],
  quality = 85
): string {
  return widths
    .map(
      (w) =>
        `${builder.image(source).width(w).quality(quality).auto('format').url()} ${w}w`
    )
    .join(', ');
}

/**
 * Generates an optimized image URL with specified dimensions and quality.
 * Automatically selects the best format (WebP/AVIF) based on browser support.
 *
 * @param source - Sanity image reference, asset ID, or partial reference
 * @param width - Target width in pixels
 * @param height - Target height in pixels (optional, maintains aspect ratio if omitted)
 * @param quality - JPEG/WebP quality 1-100 (default: 85)
 * @returns Optimized image URL with dimensions and format parameters
 *
 * @example
 * ```ts
 * // Fixed width, auto height (maintains aspect ratio)
 * const url = getOptimizedUrl(image, 800);
 *
 * // Fixed dimensions (may crop)
 * const thumbnailUrl = getOptimizedUrl(image, 200, 200, 80);
 * ```
 */
export function getOptimizedUrl(
  source: SanityImageSource,
  width: number,
  height?: number,
  quality = 85
): string {
  let img = builder
    .image(source)
    .width(width)
    .quality(quality)
    .auto('format');
  if (height) {
    img = img.height(height);
  }
  return img.url();
}
