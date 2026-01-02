import type { AstroCookies } from 'astro';

const PREVIEW_COOKIE_NAME = 'sanity-preview';

/**
 * Check if preview mode is active
 * @param cookies - Astro cookies object
 */
export function isPreviewMode(cookies: AstroCookies): boolean {
  return cookies.get(PREVIEW_COOKIE_NAME)?.value === 'true';
}

/**
 * Enable preview mode by setting a cookie
 * @param cookies - Astro cookies object
 * @param maxAge - Cookie max age in seconds (default: 1 hour)
 */
export function enablePreviewMode(cookies: AstroCookies, maxAge = 3600): void {
  cookies.set(PREVIEW_COOKIE_NAME, 'true', {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: import.meta.env.PROD,
    maxAge,
  });
}

/**
 * Disable preview mode by deleting the cookie
 * @param cookies - Astro cookies object
 */
export function disablePreviewMode(cookies: AstroCookies): void {
  cookies.delete(PREVIEW_COOKIE_NAME, { path: '/' });
}
