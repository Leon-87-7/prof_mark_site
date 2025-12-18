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

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang; // Returns 'he' by default
}

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

// Helper to get the correct path prefix for a language
export function getPathPrefix(lang: Language): string {
  return lang === defaultLang ? '' : `/${lang}`;
}

// Helper to check if language is RTL
export function isRTL(lang: Language): boolean {
  return lang === 'he';
}
