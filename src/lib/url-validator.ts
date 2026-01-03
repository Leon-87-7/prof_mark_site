/**
 * Validates that a URL is safe for redirection
 * Prevents open redirect attacks via encoding, protocol-relative URLs, etc.
 * @param url - The URL to validate
 * @param fallback - The fallback URL if validation fails (default: '/')
 * @param preserveQueryAndHash - Whether to preserve query strings and hash fragments (default: false)
 */
export function validateRedirectUrl(
  url: string,
  fallback = '/',
  preserveQueryAndHash = false
): string {
  const normalized = url.trim();

  if (
    !normalized ||
    !normalized.startsWith('/') ||
    normalized.startsWith('//')
  ) {
    return fallback;
  }

  // Block backslashes (Windows paths or browser confusion)
  if (normalized.includes('\\')) {
    return fallback;
  }

  // Block encoded characters that could bypass checks
  if (/%2f|%5c|%3a|%40|%25/i.test(normalized)) {
    return fallback;
  }

  // Use URL constructor for canonical validation
  try {
    const testUrl = new URL(normalized, 'http://localhost');

    // Verify still relative after parsing
    if (
      !testUrl.pathname.startsWith('/') ||
      testUrl.pathname.startsWith('//') ||
      testUrl.host !== 'localhost' ||
      testUrl.protocol !== 'http:'
    ) {
      return fallback;
    }

    return preserveQueryAndHash
      ? testUrl.pathname + testUrl.search + testUrl.hash
      : testUrl.pathname;
  } catch {
    return fallback;
  }
}
