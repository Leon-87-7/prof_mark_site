import { createClient } from '@sanity/client';

// Environment variables
const projectId = import.meta.env.SANITY_PROJECT_ID || 's4qwd9sw';
const dataset = import.meta.env.SANITY_DATASET || 'production';
const apiVersion = import.meta.env.SANITY_API_VERSION || '2024-01-01';
const token = import.meta.env.SANITY_TOKEN;

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
    console.error('Sanity fetch error:', error);
    return null;
  }
}
