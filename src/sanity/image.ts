import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

// Create image URL builder
const builder = imageUrlBuilder(client);

// Define a simple type for Sanity image references
interface SanityImageReference {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

type SanityImageSource = SanityImageReference | string | { asset?: { _ref?: string } };

/**
 * Generate image URL from Sanity image reference
 * @param source - Sanity image reference
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Get responsive image URLs for srcset
 * @param source - Sanity image reference
 * @param widths - Array of widths to generate
 * @param quality - Image quality (1-100)
 */
export function getResponsiveUrls(
  source: SanityImageSource,
  widths: number[] = [400, 800, 1200, 1600, 1920],
  quality = 85
) {
  return widths.map((w) => ({
    width: w,
    url: builder.image(source).width(w).quality(quality).auto('format').url(),
  }));
}

/**
 * Generate srcset string for responsive images
 * @param source - Sanity image reference
 * @param widths - Array of widths to generate
 * @param quality - Image quality (1-100)
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
 * Get optimized image URL with common defaults
 * @param source - Sanity image reference
 * @param width - Desired width
 * @param height - Optional height (maintains aspect ratio if not provided)
 * @param quality - Image quality (1-100)
 */
export function getOptimizedUrl(
  source: SanityImageSource,
  width: number,
  height?: number,
  quality = 85
): string {
  let img = builder.image(source).width(width).quality(quality).auto('format');
  if (height) {
    img = img.height(height);
  }
  return img.url();
}
