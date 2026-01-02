import type { Language } from '../i18n/utils';

/**
 * Type for localized content from Sanity
 */
export type LocalizedValue<T = string> = {
  he?: T;
  en?: T;
  ru?: T;
};

/**
 * Get localized value from a Sanity localized object
 * Falls back to English if the requested language is not available
 *
 * @param obj - Localized object with he, en, ru properties
 * @param lang - Current language
 * @param fallbackLang - Fallback language if current is missing
 */
export function getLocalizedValue<T>(
  obj: LocalizedValue<T> | undefined | null,
  lang: Language,
  fallbackLang: Language = 'en'
): T | undefined {
  if (!obj) return undefined;
  return obj[lang] ?? obj[fallbackLang] ?? obj['en'];
}

/**
 * Create a translation function from Sanity data
 * Mimics the t() function from the JSON-based i18n system
 *
 * @param data - Sanity document data
 * @param lang - Current language
 */
export function createTranslator(data: Record<string, unknown>, lang: Language) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: unknown = data;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
      } else {
        return key; // Return key if path not found
      }
    }

    // If it's a localized object, return the correct language
    if (value && typeof value === 'object') {
      const localized = value as LocalizedValue<string>;
      if (lang in localized || 'en' in localized || 'he' in localized) {
        return localized[lang] ?? localized['en'] ?? localized['he'] ?? key;
      }
    }

    return typeof value === 'string' ? value : key;
  };
}

/**
 * Check if content should be visible for a given locale
 * Used for locale-specific content like virtual consultation
 *
 * @param visibleForLocales - Array of locale codes
 * @param currentLang - Current language
 */
export function isVisibleForLocale(
  visibleForLocales: string[] | undefined | null,
  currentLang: Language
): boolean {
  if (!visibleForLocales || visibleForLocales.length === 0) {
    return true; // If not specified, show for all locales
  }
  return visibleForLocales.includes(currentLang);
}

/**
 * Extract plain text from Portable Text blocks
 * Useful for generating meta descriptions from rich text
 *
 * @param blocks - Portable Text blocks
 * @param maxLength - Maximum length of output
 */
export function portableTextToPlainText(
  blocks: Array<{ _type: string; children?: Array<{ text?: string }> }> | undefined | null,
  maxLength = 160
): string {
  if (!blocks) return '';

  const text = blocks
    .filter((block) => block._type === 'block')
    .map((block) =>
      block.children
        ?.filter((child) => child.text)
        .map((child) => child.text)
        .join('') ?? ''
    )
    .join(' ')
    .trim();

  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}
