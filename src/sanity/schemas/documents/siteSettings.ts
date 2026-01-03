import { defineType, defineField } from 'sanity';

/**
 * Site Settings - Global configuration (Singleton)
 * Contains navigation labels, header, and footer content
 */
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'localizedString',
      description: 'The name shown in the header',
    }),
    defineField({
      name: 'siteSubtitle',
      title: 'Site Subtitle',
      type: 'localizedString',
      description: 'Subtitle shown below the name',
    }),
    defineField({
      name: 'contactButtonText',
      title: 'Contact Button Text',
      type: 'localizedString',
    }),

    // Navigation
    defineField({
      name: 'navigation',
      title: 'Navigation Labels',
      type: 'object',
      fields: [
        { name: 'about', title: 'About', type: 'localizedString' },
        { name: 'clinics', title: 'Clinics', type: 'localizedString' },
        { name: 'services', title: 'Services', type: 'localizedString' },
        { name: 'innovation', title: 'Innovation', type: 'localizedString' },
        { name: 'guides', title: 'Guides', type: 'localizedString' },
        { name: 'study', title: 'Study', type: 'localizedString' },
      ],
    }),

    // Footer
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      fields: [
        { name: 'quickLinksTitle', title: 'Quick Links Title', type: 'localizedString' },
        { name: 'contactTitle', title: 'Contact Title', type: 'localizedString' },
        { name: 'infoTitle', title: 'Info Title', type: 'localizedString' },
        { name: 'copyright', title: 'Copyright Text', type: 'localizedString' },
        { name: 'phone', title: 'Phone Number', type: 'string' },
        { name: 'location', title: 'Location', type: 'localizedString' },
        {
          name: 'addresses',
          title: 'Addresses',
          type: 'array',
          of: [{ type: 'localizedString' }],
        },
        {
          name: 'infoLinks',
          title: 'Information Links',
          type: 'object',
          fields: [
            { name: 'privacy', title: 'Privacy Policy', type: 'localizedString' },
            { name: 'terms', title: 'Terms of Service', type: 'localizedString' },
            { name: 'accessibility', title: 'Accessibility', type: 'localizedString' },
            { name: 'sitemap', title: 'Sitemap', type: 'localizedString' },
            { name: 'comingSoon', title: 'Coming Soon Label', type: 'localizedString' },
          ],
        },
      ],
    }),

    // Default SEO
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      description: 'Default SEO settings used when page-specific SEO is not set',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
        subtitle: 'Global configuration',
      };
    },
  },
});
