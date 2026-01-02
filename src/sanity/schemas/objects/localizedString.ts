import { defineType } from 'sanity';

/**
 * Localized String - Multi-language text field
 * Used for all translatable text content across the site
 * Supports Hebrew (he), English (en), and Russian (ru)
 */
export default defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    {
      name: 'he',
      title: 'Hebrew (עברית)',
      type: 'string',
    },
    {
      name: 'en',
      title: 'English',
      type: 'string',
    },
    {
      name: 'ru',
      title: 'Russian (Русский)',
      type: 'string',
    },
  ],
  options: {
    collapsed: false,
    collapsible: true,
  },
});
