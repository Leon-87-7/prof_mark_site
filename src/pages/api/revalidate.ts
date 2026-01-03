import type { APIRoute } from 'astro';
import crypto from 'crypto';

/**
 * API Route: Webhook handler for Sanity content changes
 *
 * This endpoint receives webhooks from Sanity when content is published.
 * It can trigger rebuilds on your hosting platform (Vercel, Netlify, etc.)
 *
 * Configure in Sanity Dashboard:
 * - API > Webhooks > Create webhook
 * - URL: https://markeidelman.com/api/revalidate
 * - Trigger on: Create, Update, Delete
 * - Add a secret and store it as SANITY_WEBHOOK_SECRET
 */

function verifySignature(
  payload: string,
  signature: string,
  secret: string
): boolean {
  try {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(payload);
    const digest = hmac.digest('hex');
    // Convert to buffers once
    const signatureBuffer = Buffer.from(signature, 'utf8');
    const digestBuffer = Buffer.from(digest, 'utf8');

    // Pre-check lengths to prevent timingSafeEqual from throwing
    if (signatureBuffer.length !== digestBuffer.length) {
      return false;
    }

    // Now safe to use constant-time comparison
    return crypto.timingSafeEqual(signatureBuffer, digestBuffer);
  } catch {
    return false;
  }
}

export const POST: APIRoute = async ({ request }) => {
  const webhookSecret = import.meta.env.SANITY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('SANITY_WEBHOOK_SECRET is not configured');
    return new Response(
      JSON.stringify({ error: 'Webhook secret not configured' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Get the signature from headers
  const signature = request.headers.get('sanity-webhook-signature');
  if (!signature) {
    return new Response(
      JSON.stringify({ error: 'Missing signature' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Get the raw body
  const body = await request.text();

  // Verify the signature
  if (!verifySignature(body, signature, webhookSecret)) {
    return new Response(
      JSON.stringify({ error: 'Invalid signature' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Parse the webhook payload
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return new Response(
      JSON.stringify({ error: 'Invalid JSON payload' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Log the webhook event
  console.log('Sanity webhook received:', {
    type: payload._type,
    id: payload._id,
    operation: payload.operation,
  });

  // Trigger rebuild on hosting platform
  const vercelHookUrl = import.meta.env.VERCEL_DEPLOY_HOOK_URL;
  const netlifyHookUrl = import.meta.env.NETLIFY_BUILD_HOOK_URL;

  const rebuildPromises = [];

  if (vercelHookUrl) {
    rebuildPromises.push(
      fetch(vercelHookUrl, { method: 'POST' })
        .then(() => console.log('Triggered Vercel rebuild'))
        .catch((err) => console.error('Vercel rebuild failed:', err))
    );
  }

  if (netlifyHookUrl) {
    rebuildPromises.push(
      fetch(netlifyHookUrl, { method: 'POST' })
        .then(() => console.log('Triggered Netlify rebuild'))
        .catch((err) => console.error('Netlify rebuild failed:', err))
    );
  }

  await Promise.all(rebuildPromises);

  return new Response(
    JSON.stringify({
      revalidated: true,
      documentType: payload._type,
      documentId: payload._id,
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

// Disable prerendering for this API route
export const prerender = false;
