import type { APIRoute } from 'astro';
import { disablePreviewMode } from '../../lib/preview';
import { validateRedirectUrl } from '../../lib/url-validator';

/**
 * API Route: Exit preview mode
 *
 * Usage: /api/exit-preview?returnUrl=/about
 *
 * This removes the preview cookie and redirects back to the page.
 */
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const rawReturnUrl = url.searchParams.get('returnUrl') || '/';

  // Validate returnUrl to prevent open redirect attacks
  // Preserve query/hash to return to exact location (e.g., /about?lang=en#section)
  const returnUrl = validateRedirectUrl(rawReturnUrl, '/', true);

  // Disable preview mode (removes cookie)
  disablePreviewMode(cookies);

  // Redirect back to the page
  return redirect(returnUrl, 307);
};

// Disable prerendering for this API route
export const prerender = false;
