import he from './he.json';
import en from './en.json';
import ru from './ru.json';

export const languages = {
  he: 'עברית',
  en: 'English',
  ru: 'Русский',
};

export const defaultLang = 'he';

export const translations = {
  he,
  en,
  ru,
};

export type Language = keyof typeof languages;

/**
 * Determine the language code from a URL's pathname.
 *
 * @param url - The URL whose second path segment (the segment immediately after the leading slash) may contain a language code.
 * @returns The matching language key if that segment is a known language, `defaultLang` otherwise.
 */
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang; // Returns 'he' by default
}

/**
 * Create a translator function scoped to the specified language.
 *
 * @param lang - The language code to use for resolving translations.
 * @returns A function that takes a dot-separated translation key and returns the translated string for `lang`; returns the original key if no string translation is found.
 */
export function useTranslations(lang: Language) {
  return function t(key: string): string {
    const keys = key.split('.');
    let value: any = translations[lang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  };
}

/**
 * Get the URL path prefix used for the given language.
 *
 * @param lang - The language code to compute the prefix for
 * @returns `''` for the default language, otherwise `'/<lang>'` with the language code inserted
 */
export function getPathPrefix(lang: Language): string {
  return lang === defaultLang ? '' : `/${lang}`;
}

/**
 * Determines whether the given language uses a right-to-left writing direction.
 *
 * @returns `true` if the language is Hebrew (`'he'`), `false` otherwise.
 */
export function isRTL(lang: Language): boolean {
  return lang === 'he';
}