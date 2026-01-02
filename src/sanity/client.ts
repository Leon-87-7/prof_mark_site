import { createClient } from '@sanity/client';

// Environment variables
// Using PUBLIC_ prefixed variables as they're defined in .env
// - PUBLIC_* variables are exposed to the client-side bundle (safe for Sanity projectId/dataset)
// - Non-PUBLIC_* variables are server-only (used for sensitive tokens)
// - Fallback pattern ensures compatibility in both SSR and client contexts
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID || import.meta.env.SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || import.meta.env.SANITY_DATASET;
const apiVersion = import.meta.env.SANITY_API_VERSION || '2024-01-01';
const token = import.meta.env.SANITY_TOKEN; // Server-only: never use PUBLIC_ prefix for tokens

if (!projectId || !dataset) {
  throw new Error(
    'SANITY_PROJECT_ID and SANITY_DATASET must be defined'
  );
}
/**
 * Standard Sanity client - uses CDN for fast reads
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster responses
});

/**
 * Preview client - no CDN, includes draft content
 * Used when preview mode is active
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for preview
  token, // API token with read access
  perspective: 'previewDrafts', // Include draft documents
});

/**
 * Get the appropriate client based on preview mode
 * @param preview - Whether to use preview mode
 */
export function getClient(preview = false) {
  return preview ? previewClient : client;
}

/**
 * Check if an error is recoverable (transient network issues, server errors)
 * vs non-recoverable (auth failures, bad queries, client errors)
 */
function isRecoverableError(error: unknown): boolean {
  if (error instanceof Error) {
    const name = error.name.toLowerCase();
    const message = error.message.toLowerCase();

    // Network errors are recoverable
    if (
      name.includes('network') ||
      name.includes('timeout') ||
      name.includes('abort') ||
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('econnrefused') ||
      message.includes('econnreset')
    ) {
      return true;
    }
  }

  // Check for HTTP status codes (Sanity client errors often have statusCode)
  const statusCode =
    (error as { statusCode?: number }).statusCode ??
    (error as { status?: number }).status;

  if (typeof statusCode === 'number') {
    // 5xx server errors are recoverable (transient)
    if (statusCode >= 500 && statusCode < 600) {
      return true;
    }
    // 4xx client errors are NOT recoverable (bad request, auth, not found)
    if (statusCode >= 400 && statusCode < 500) {
      return false;
    }
  }

  // Default: treat unknown errors as non-recoverable to surface issues
  return false;
}

/**
 * Fetch data from Sanity with automatic error handling
 * @param query - GROQ query string
 * @param params - Query parameters
 * @param preview - Whether to use preview mode
 */
export async function sanityFetch<T = unknown>(
  query: string,
  params: Record<string, unknown> = {},
  preview = false
): Promise<T | null> {
  try {
    const sanityClient = getClient(preview);
    return await sanityClient.fetch<T>(query, params);
  } catch (error) {
    // Build detailed context for debugging
    const context = {
      query: query.slice(0, 200) + (query.length > 200 ? '...' : ''),
      params,
      preview,
      errorName: error instanceof Error ? error.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : String(error),
      statusCode:
        (error as { statusCode?: number }).statusCode ??
        (error as { status?: number }).status,
    };

    if (isRecoverableError(error)) {
      // Log recoverable errors but return null to allow graceful degradation
      console.warn('[Sanity] Recoverable fetch error (returning null):', context);
      return null;
    }

    // Non-recoverable errors: log and rethrow so callers can handle
    console.error('[Sanity] Non-recoverable fetch error:', context);
    throw error;
  }
}
