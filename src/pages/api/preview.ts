import type { APIRoute } from 'astro';
import { enablePreviewMode } from '../../lib/preview';
import { validateRedirectUrl } from '../../lib/url-validator';

/**
 * API Route: Enter preview mode
 *
 * Usage: /api/preview?secret=YOUR_SECRET&slug=/about
 *
 * This sets a cookie that tells the site to fetch draft content from Sanity.
 * The secret must match SANITY_PREVIEW_SECRET in your environment.
 */
export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  const url = new URL(request.url);
  const secret = url.searchParams.get('secret');
  const rawSlug = url.searchParams.get('slug') || '/';

  // Validate slug to prevent open redirect attacks
  const slug = validateRedirectUrl(rawSlug, '/');

  // Get the preview secret from environment
  const previewSecret = import.meta.env.SANITY_PREVIEW_SECRET;

  // Validate the secret
  if (!previewSecret || secret !== previewSecret) {
    return new Response(JSON.stringify({ error: 'Invalid preview secret' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Enable preview mode (sets cookie)
  enablePreviewMode(cookies);

  // Redirect to the requested page
  return redirect(slug, 307);
};

// Disable prerendering for this API route
export const prerender = false;
