/**
 * Migration Script: JSON to Sanity CMS
 *
 * This script migrates all content from the JSON translation files
 * to Sanity CMS documents with localized fields.
 *
 * Usage:
 *   npm run migrate              - Creates documents only if they don't exist (safe mode)
 *   npm run migrate -- --force   - Overwrites existing documents (destructive)
 *
 * Environment:
 *   SANITY_DATASET=development npm run migrate     - Target development dataset
 *   SANITY_ALLOW_PRODUCTION=true npm run migrate   - Allow production writes
 */

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables
import 'dotenv/config';

// ============================================================================
// ENVIRONMENT VALIDATION
// ============================================================================
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const token = process.env.SANITY_TOKEN;

if (!projectId) {
  console.error('❌ Error: SANITY_PROJECT_ID environment variable is required');
  console.error('');
  console.error('Set it in your .env file or pass it directly:');
  console.error('  SANITY_PROJECT_ID=your_project_id npm run migrate');
  process.exit(1);
}

if (!dataset) {
  console.error('❌ Error: SANITY_DATASET environment variable is required');
  console.error('');
  console.error('Set it in your .env file or pass it directly:');
  console.error('  SANITY_DATASET=development npm run migrate');
  process.exit(1);
}

if (!token) {
  console.error('❌ Error: SANITY_TOKEN environment variable is required for migrations');
  console.error('');
  console.error('Generate a token at: https://sanity.io/manage');
  console.error('Then add it to your .env file');
  process.exit(1);
}

// ============================================================================
// PRODUCTION PROTECTION
// ============================================================================
if (dataset === 'production' && process.env.SANITY_ALLOW_PRODUCTION !== 'true') {
  console.error('❌ Error: Refusing to write to production dataset.');
  console.error('');
  console.error('This is a safety measure to prevent accidental writes to production.');
  console.error('');
  console.error('To run migrations against production, set:');
  console.error('  SANITY_ALLOW_PRODUCTION=true npm run migrate');
  console.error('');
  console.error('For local development, use:');
  console.error('  SANITY_DATASET=development npm run migrate');
  process.exit(1);
}

// Sanity client configuration
const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
});

// ============================================================================
// MIGRATION MODE
// ============================================================================
const forceMode = process.argv.includes('--force');

// Log connection info
console.log(`📦 Connecting to Sanity project: ${projectId}`);
console.log(`📁 Dataset: ${dataset}`);
console.log(`🔄 Mode: ${forceMode ? 'FORCE (overwrite existing)' : 'Safe (create if not exists)'}`);
if (dataset === 'production') {
  console.log('⚠️  WARNING: Running against PRODUCTION dataset!');
}
if (forceMode) {
  console.log('⚠️  WARNING: --force flag set - existing documents will be overwritten!');
}
console.log('');

/**
 * Migrate a document using the appropriate strategy based on mode.
 * - Default (safe): createIfNotExists - only creates if document doesn't exist
 * - Force mode: createOrReplace - overwrites existing documents
 */
async function migrateDocument<T extends { _id: string; _type: string }>(doc: T): Promise<void> {
  if (forceMode) {
    await client.createOrReplace(doc);
  } else {
    await client.createIfNotExists(doc);
  }
}

// Load JSON files
const en = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/i18n/en.json'), 'utf-8'));
const he = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/i18n/he.json'), 'utf-8'));
const ru = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/i18n/ru.json'), 'utf-8'));

// Helper to create localized string
function localized(enVal: string, heVal: string, ruVal: string) {
  return { en: enVal, he: heVal, ru: ruVal };
}

// ============================================================================
// SITE SETTINGS
// ============================================================================
async function migrateSiteSettings() {
  console.log('Migrating Site Settings...');

  const doc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: localized(en.header.name, he.header.name, ru.header.name),
    siteSubtitle: localized(en.header.subtitle, he.header.subtitle, ru.header.subtitle),
    contactButtonText: localized(en.header.contact, he.header.contact, ru.header.contact),
    navigation: {
      about: localized(en.nav.about, he.nav.about, ru.nav.about),
      clinics: localized(en.nav.clinics, he.nav.clinics, ru.nav.clinics),
      services: localized(en.nav.services, he.nav.services, ru.nav.services),
      innovation: localized(en.nav.innovation, he.nav.innovation, ru.nav.innovation),
      guides: localized(en.nav.guides, he.nav.guides, ru.nav.guides),
      study: localized(en.nav.study, he.nav.study, ru.nav.study),
    },
    footer: {
      quickLinksTitle: localized(en.footer.quickLinks, he.footer.quickLinks, ru.footer.quickLinks),
      contactTitle: localized(en.footer.contact, he.footer.contact, ru.footer.contact),
      infoTitle: localized(en.footer.info, he.footer.info, ru.footer.info),
      copyright: localized(en.footer.copyright, he.footer.copyright, ru.footer.copyright),
      phone: en.footer.contact_phone,
      location: localized(en.footer.location, he.footer.location, ru.footer.location),
      addresses: [
        localized(en.footer.address1, he.footer.address1, ru.footer.address1),
        localized(en.footer.address2, he.footer.address2, ru.footer.address2),
      ],
      infoLinks: {
        privacy: localized(en.footer.privacy, he.footer.privacy, ru.footer.privacy),
        terms: localized(en.footer.terms, he.footer.terms, ru.footer.terms),
        accessibility: localized(en.footer.accessibility, he.footer.accessibility, ru.footer.accessibility),
        sitemap: localized(en.footer.sitemap, he.footer.sitemap, ru.footer.sitemap),
        comingSoon: localized(en.footer.comingSoon, he.footer.comingSoon, ru.footer.comingSoon),
      },
    },
  };

  await migrateDocument(doc);
  console.log('✓ Site Settings migrated');
}

// ============================================================================
// HOME PAGE
// ============================================================================
async function migrateHomePage() {
  console.log('Migrating Home Page...');

  const doc = {
    _id: 'homePage',
    _type: 'homePage',
    hero: {
      title: localized(en.home.hero.title, he.home.hero.title, ru.home.hero.title),
      subtitle: localized(en.home.hero.subtitle, he.home.hero.subtitle, ru.home.hero.subtitle),
      descriptionLine1: localized(en.home.hero.description_line1, he.home.hero.description_line1, ru.home.hero.description_line1),
      descriptionLine2: localized(en.home.hero.description_line2, he.home.hero.description_line2, ru.home.hero.description_line2),
      descriptionLine3: localized(en.home.hero.description_line3, he.home.hero.description_line3, ru.home.hero.description_line3),
      descriptionLine4: localized(en.home.hero.description_line4, he.home.hero.description_line4, ru.home.hero.description_line4),
      descriptionHighlighted: localized(en.home.hero.description_highlighted, he.home.hero.description_highlighted, ru.home.hero.description_highlighted),
      descriptionClosing: localized(en.home.hero.description_closing, he.home.hero.description_closing, ru.home.hero.description_closing),
      stats: [
        {
          _key: 'experience',
          number: localized(en.home.hero.stats.experience.number, he.home.hero.stats.experience.number, ru.home.hero.stats.experience.number),
          label: localized(en.home.hero.stats.experience.label, he.home.hero.stats.experience.label, ru.home.hero.stats.experience.label),
        },
        {
          _key: 'surgeries',
          number: localized(en.home.hero.stats.surgeries.number, he.home.hero.stats.surgeries.number, ru.home.hero.stats.surgeries.number),
          label: localized(en.home.hero.stats.surgeries.label, he.home.hero.stats.surgeries.label, ru.home.hero.stats.surgeries.label),
        },
        {
          _key: 'trained',
          number: localized(en.home.hero.stats.trained.number, he.home.hero.stats.trained.number, ru.home.hero.stats.trained.number),
          label: localized(en.home.hero.stats.trained.label, he.home.hero.stats.trained.label, ru.home.hero.stats.trained.label),
        },
      ],
      ctaButtons: [
        {
          _key: 'clinics',
          text: localized(en.home.hero.cta.clinics, he.home.hero.cta.clinics, ru.home.hero.cta.clinics),
          link: '/clinics',
          variant: 'primary',
        },
        {
          _key: 'guides',
          text: localized(en.home.hero.cta.guides, he.home.hero.cta.guides, ru.home.hero.cta.guides),
          link: '/guides',
          variant: 'secondary',
        },
        {
          _key: 'innovation',
          text: localized(en.home.hero.cta.innovation, he.home.hero.cta.innovation, ru.home.hero.cta.innovation),
          link: '/innovation',
          variant: 'tertiary',
        },
      ],
    },
    credentials: {
      title: localized(en.home.credentials.title, he.home.credentials.title, ru.home.credentials.title),
      education: {
        title: localized(en.home.credentials.education.title, he.home.credentials.education.title, ru.home.credentials.education.title),
        items: [
          localized(en.home.credentials.education.md, he.home.credentials.education.md, ru.home.credentials.education.md),
          localized(en.home.credentials.education.residency, he.home.credentials.education.residency, ru.home.credentials.education.residency),
          localized(en.home.credentials.education.fellowship, he.home.credentials.education.fellowship, ru.home.credentials.education.fellowship),
          localized(en.home.credentials.education.certification, he.home.credentials.education.certification, ru.home.credentials.education.certification),
        ],
      },
      specializations: {
        title: localized(en.home.credentials.specializations.title, he.home.credentials.specializations.title, ru.home.credentials.specializations.title),
        items: [
          localized(en.home.credentials.specializations.pediatric, he.home.credentials.specializations.pediatric, ru.home.credentials.specializations.pediatric),
          localized(en.home.credentials.specializations.limb_lengthening, he.home.credentials.specializations.limb_lengthening, ru.home.credentials.specializations.limb_lengthening),
          localized(en.home.credentials.specializations.deformity, he.home.credentials.specializations.deformity, ru.home.credentials.specializations.deformity),
          localized(en.home.credentials.specializations.techniques, he.home.credentials.specializations.techniques, ru.home.credentials.specializations.techniques),
        ],
      },
    },
    testimonials: {
      title: localized(en.home.testimonials.title, he.home.testimonials.title, ru.home.testimonials.title),
    },
  };

  await client.createOrReplace(doc);
  console.log('✓ Home Page migrated');
}

// ============================================================================
// ABOUT PAGE
// ============================================================================
async function migrateAboutPage() {
  console.log('Migrating About Page...');

  const doc = {
    _id: 'aboutPage',
    _type: 'aboutPage',
    title: localized(en.about.title, he.about.title, ru.about.title),
    intro: localized(en.about.intro, he.about.intro, ru.about.intro),
    expertise: {
      title: localized(en.about.expertise.title, he.about.expertise.title, ru.about.expertise.title),
      text: localized(en.about.expertise.text, he.about.expertise.text, ru.about.expertise.text),
    },
    specializations: {
      title: localized(en.about.specializations.title, he.about.specializations.title, ru.about.specializations.title),
      items: [
        {
          _key: 'limb_lengthening',
          title: localized(en.about.specializations.limb_lengthening.title, he.about.specializations.limb_lengthening.title, ru.about.specializations.limb_lengthening.title),
          description: localized(en.about.specializations.limb_lengthening.description, he.about.specializations.limb_lengthening.description, ru.about.specializations.limb_lengthening.description),
        },
        {
          _key: 'clubfoot',
          title: localized(en.about.specializations.clubfoot.title, he.about.specializations.clubfoot.title, ru.about.specializations.clubfoot.title),
          description: localized(en.about.specializations.clubfoot.description, he.about.specializations.clubfoot.description, ru.about.specializations.clubfoot.description),
        },
        {
          _key: 'pelvic',
          title: localized(en.about.specializations.pelvic.title, he.about.specializations.pelvic.title, ru.about.specializations.pelvic.title),
          description: localized(en.about.specializations.pelvic.description, he.about.specializations.pelvic.description, ru.about.specializations.pelvic.description),
        },
        {
          _key: 'trauma',
          title: localized(en.about.specializations.trauma.title, he.about.specializations.trauma.title, ru.about.specializations.trauma.title),
          description: localized(en.about.specializations.trauma.description, he.about.specializations.trauma.description, ru.about.specializations.trauma.description),
        },
      ],
    },
    academic: {
      title: localized(en.about.academic.title, he.about.academic.title, ru.about.academic.title),
      paragraphs: [
        localized(en.about.academic.paragraph_1, he.about.academic.paragraph_1, ru.about.academic.paragraph_1),
        localized(en.about.academic.paragraph_2, he.about.academic.paragraph_2, ru.about.academic.paragraph_2),
      ],
    },
    educationAffiliations: {
      title: localized(en.about.education_affiliations.title, he.about.education_affiliations.title, ru.about.education_affiliations.title),
      education: {
        title: localized(en.about.education_affiliations.education.title, he.about.education_affiliations.education.title, ru.about.education_affiliations.education.title),
        items: [
          localized(en.about.education_affiliations.education.medical_school, he.about.education_affiliations.education.medical_school, ru.about.education_affiliations.education.medical_school),
          localized(en.about.education_affiliations.education.residency, he.about.education_affiliations.education.residency, ru.about.education_affiliations.education.residency),
          localized(en.about.education_affiliations.education.fellowship, he.about.education_affiliations.education.fellowship, ru.about.education_affiliations.education.fellowship),
        ],
      },
      memberships: {
        title: localized(en.about.education_affiliations.memberships.title, he.about.education_affiliations.memberships.title, ru.about.education_affiliations.memberships.title),
        items: [
          localized(en.about.education_affiliations.memberships.member_1, he.about.education_affiliations.memberships.member_1, ru.about.education_affiliations.memberships.member_1),
          localized(en.about.education_affiliations.memberships.member_2, he.about.education_affiliations.memberships.member_2, ru.about.education_affiliations.memberships.member_2),
        ],
      },
    },
  };

  await client.createOrReplace(doc);
  console.log('✓ About Page migrated');
}

// ============================================================================
// CLINICS
// ============================================================================
async function migrateClinics() {
  console.log('Migrating Clinics...');

  const clinics = [
    {
      _id: 'clinic-haifa',
      _type: 'clinic',
      identifier: 'haifa',
      emoji: en.clinics.haifa.emoji,
      title: localized(en.clinics.haifa.title, he.clinics.haifa.title, ru.clinics.haifa.title),
      locationLabel: localized(en.clinics.haifa.location_label, he.clinics.haifa.location_label, ru.clinics.haifa.location_label),
      location: localized(en.clinics.haifa.location, he.clinics.haifa.location, ru.clinics.haifa.location),
      hoursLabel: localized(en.clinics.haifa.hours_label, he.clinics.haifa.hours_label, ru.clinics.haifa.hours_label),
      hours: localized(en.clinics.haifa.hours, he.clinics.haifa.hours, ru.clinics.haifa.hours),
      servicesTitle: localized(en.clinics.haifa.services_title, he.clinics.haifa.services_title, ru.clinics.haifa.services_title),
      services: [
        localized(en.clinics.haifa.services.facility, he.clinics.haifa.services.facility, ru.clinics.haifa.services.facility),
        localized(en.clinics.haifa.services.pt_rooms, he.clinics.haifa.services.pt_rooms, ru.clinics.haifa.services.pt_rooms),
        localized(en.clinics.haifa.services.consultation, he.clinics.haifa.services.consultation, ru.clinics.haifa.services.consultation),
        localized(en.clinics.haifa.services.postop, he.clinics.haifa.services.postop, ru.clinics.haifa.services.postop),
        localized(en.clinics.haifa.services.accommodation, he.clinics.haifa.services.accommodation, ru.clinics.haifa.services.accommodation),
      ],
      ctaText: localized(en.clinics.haifa.cta, he.clinics.haifa.cta, ru.clinics.haifa.cta),
      phone: '+972-04-873-2227',
      visibleForLocales: ['he', 'en', 'ru'],
      order: 1,
    },
    {
      _id: 'clinic-kiryat-motzkin',
      _type: 'clinic',
      identifier: 'kiryat_motzkin',
      emoji: en.clinics.kiryat_motzkin.emoji,
      title: localized(en.clinics.kiryat_motzkin.title, he.clinics.kiryat_motzkin.title, ru.clinics.kiryat_motzkin.title),
      locationLabel: localized(en.clinics.kiryat_motzkin.location_label, he.clinics.kiryat_motzkin.location_label, ru.clinics.kiryat_motzkin.location_label),
      location: localized(en.clinics.kiryat_motzkin.location, he.clinics.kiryat_motzkin.location, ru.clinics.kiryat_motzkin.location),
      hoursLabel: localized(en.clinics.kiryat_motzkin.hours_label, he.clinics.kiryat_motzkin.hours_label, ru.clinics.kiryat_motzkin.hours_label),
      hours: localized(en.clinics.kiryat_motzkin.hours, he.clinics.kiryat_motzkin.hours, ru.clinics.kiryat_motzkin.hours),
      servicesTitle: localized(en.clinics.kiryat_motzkin.services_title, he.clinics.kiryat_motzkin.services_title, ru.clinics.kiryat_motzkin.services_title),
      services: [
        localized(en.clinics.kiryat_motzkin.services.initial, he.clinics.kiryat_motzkin.services.initial, ru.clinics.kiryat_motzkin.services.initial),
        localized(en.clinics.kiryat_motzkin.services.followup, he.clinics.kiryat_motzkin.services.followup, ru.clinics.kiryat_motzkin.services.followup),
        localized(en.clinics.kiryat_motzkin.services.pt, he.clinics.kiryat_motzkin.services.pt, ru.clinics.kiryat_motzkin.services.pt),
        localized(en.clinics.kiryat_motzkin.services.education, he.clinics.kiryat_motzkin.services.education, ru.clinics.kiryat_motzkin.services.education),
        localized(en.clinics.kiryat_motzkin.services.wellness, he.clinics.kiryat_motzkin.services.wellness, ru.clinics.kiryat_motzkin.services.wellness),
      ],
      ctaText: localized(en.clinics.kiryat_motzkin.cta, he.clinics.kiryat_motzkin.cta, ru.clinics.kiryat_motzkin.cta),
      phone: '+972-04-873-2227',
      visibleForLocales: ['he', 'en', 'ru'],
      order: 2,
    },
    {
      _id: 'clinic-virtual',
      _type: 'clinic',
      identifier: 'virtual',
      emoji: '💻',
      title: localized(en.clinics.virtual.title, he.clinics.virtual.title, ru.clinics.virtual.title),
      subtitle: localized(en.clinics.virtual.subtitle, he.clinics.virtual.subtitle, ru.clinics.virtual.subtitle),
      servicesTitle: localized(en.clinics.virtual.perfect_for_title, he.clinics.virtual.perfect_for_title, ru.clinics.virtual.perfect_for_title),
      services: [
        localized(en.clinics.virtual.perfect_for.international, he.clinics.virtual.perfect_for.international, ru.clinics.virtual.perfect_for.international),
        localized(en.clinics.virtual.perfect_for.pre_surgery, he.clinics.virtual.perfect_for.pre_surgery, ru.clinics.virtual.perfect_for.pre_surgery),
        localized(en.clinics.virtual.perfect_for.post_op, he.clinics.virtual.perfect_for.post_op, ru.clinics.virtual.perfect_for.post_op),
        localized(en.clinics.virtual.perfect_for.second_opinion, he.clinics.virtual.perfect_for.second_opinion, ru.clinics.virtual.perfect_for.second_opinion),
      ],
      ctaText: localized(en.clinics.virtual.cta, he.clinics.virtual.cta, ru.clinics.virtual.cta),
      visibleForLocales: ['en', 'ru'], // Not shown for Hebrew
      order: 3,
    },
  ];

  for (const clinic of clinics) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await client.createOrReplace(clinic as any);
  }
  console.log('✓ Clinics migrated (3 documents)');
}

// ============================================================================
// SERVICES
// ============================================================================
async function migrateServices() {
  console.log('Migrating Services...');

  const services = [
    {
      _id: 'service-cosmetic-lengthening',
      _type: 'service',
      identifier: 'cosmetic_lengthening',
      emoji: en.services.cards.cosmetic_lengthening.emoji,
      title: localized(en.services.cards.cosmetic_lengthening.title, he.services.cards.cosmetic_lengthening.title, ru.services.cards.cosmetic_lengthening.title),
      description: localized(en.services.cards.cosmetic_lengthening.description, he.services.cards.cosmetic_lengthening.description, ru.services.cards.cosmetic_lengthening.description),
      ctaText: localized(en.services.cards.cosmetic_lengthening.cta, he.services.cards.cosmetic_lengthening.cta, ru.services.cards.cosmetic_lengthening.cta),
      isFeatured: true,
      featuredContent: {
        sectionTitle: localized(en.services.featured.title, he.services.featured.title, ru.services.featured.title),
        what: {
          title: localized(en.services.featured.what.title, he.services.featured.what.title, ru.services.featured.what.title),
          description: localized(en.services.featured.what.description, he.services.featured.what.description, ru.services.featured.what.description),
        },
        who: {
          title: localized(en.services.featured.who.title, he.services.featured.who.title, ru.services.featured.who.title),
          items: [
            localized(en.services.featured.who.items.adults, he.services.featured.who.items.adults, ru.services.featured.who.items.adults),
            localized(en.services.featured.who.items.gain, he.services.featured.who.items.gain, ru.services.featured.who.items.gain),
            localized(en.services.featured.who.items.bone, he.services.featured.who.items.bone, ru.services.featured.who.items.bone),
            localized(en.services.featured.who.items.expectations, he.services.featured.who.items.expectations, ru.services.featured.who.items.expectations),
          ],
        },
        outcomes: {
          title: localized(en.services.featured.outcomes.title, he.services.featured.outcomes.title, ru.services.featured.outcomes.title),
          items: [
            localized(en.services.featured.outcomes.items.gain, he.services.featured.outcomes.items.gain, ru.services.featured.outcomes.items.gain),
            localized(en.services.featured.outcomes.items.appearance, he.services.featured.outcomes.items.appearance, ru.services.featured.outcomes.items.appearance),
            localized(en.services.featured.outcomes.items.confidence, he.services.featured.outcomes.items.confidence, ru.services.featured.outcomes.items.confidence),
            localized(en.services.featured.outcomes.items.scarring, he.services.featured.outcomes.items.scarring, ru.services.featured.outcomes.items.scarring),
            localized(en.services.featured.outcomes.items.complications, he.services.featured.outcomes.items.complications, ru.services.featured.outcomes.items.complications),
          ],
        },
        timeline: {
          title: localized(en.services.featured.timeline.title, he.services.featured.timeline.title, ru.services.featured.timeline.title),
          items: [
            localized(en.services.featured.timeline.items.surgery, he.services.featured.timeline.items.surgery, ru.services.featured.timeline.items.surgery),
            localized(en.services.featured.timeline.items.lengthening, he.services.featured.timeline.items.lengthening, ru.services.featured.timeline.items.lengthening),
            localized(en.services.featured.timeline.items.consolidation, he.services.featured.timeline.items.consolidation, ru.services.featured.timeline.items.consolidation),
            localized(en.services.featured.timeline.items.total, he.services.featured.timeline.items.total, ru.services.featured.timeline.items.total),
          ],
        },
        ctaText: localized(en.services.featured.cta, he.services.featured.cta, ru.services.featured.cta),
      },
      order: 1,
    },
    {
      _id: 'service-limb-discrepancy',
      _type: 'service',
      identifier: 'limb_discrepancy',
      emoji: en.services.cards.limb_discrepancy.emoji,
      title: localized(en.services.cards.limb_discrepancy.title, he.services.cards.limb_discrepancy.title, ru.services.cards.limb_discrepancy.title),
      description: localized(en.services.cards.limb_discrepancy.description, he.services.cards.limb_discrepancy.description, ru.services.cards.limb_discrepancy.description),
      ctaText: localized(en.services.cards.limb_discrepancy.cta, he.services.cards.limb_discrepancy.cta, ru.services.cards.limb_discrepancy.cta),
      isFeatured: false,
      order: 2,
    },
    {
      _id: 'service-deformity',
      _type: 'service',
      identifier: 'deformity',
      emoji: en.services.cards.deformity.emoji,
      title: localized(en.services.cards.deformity.title, he.services.cards.deformity.title, ru.services.cards.deformity.title),
      description: localized(en.services.cards.deformity.description, he.services.cards.deformity.description, ru.services.cards.deformity.description),
      ctaText: localized(en.services.cards.deformity.cta, he.services.cards.deformity.cta, ru.services.cards.deformity.cta),
      isFeatured: false,
      order: 3,
    },
    {
      _id: 'service-pediatric',
      _type: 'service',
      identifier: 'pediatric',
      emoji: en.services.cards.pediatric.emoji,
      title: localized(en.services.cards.pediatric.title, he.services.cards.pediatric.title, ru.services.cards.pediatric.title),
      description: localized(en.services.cards.pediatric.description, he.services.cards.pediatric.description, ru.services.cards.pediatric.description),
      ctaText: localized(en.services.cards.pediatric.cta, he.services.cards.pediatric.cta, ru.services.cards.pediatric.cta),
      isFeatured: false,
      order: 4,
    },
  ];

  for (const service of services) {
    await client.createOrReplace(service);
  }
  console.log('✓ Services migrated (4 documents)');
}

// ============================================================================
// INNOVATIONS
// ============================================================================
async function migrateInnovations() {
  console.log('Migrating Innovations...');

  const innovations = [
    {
      _id: 'innovation-techniques',
      _type: 'innovation',
      identifier: 'techniques',
      emoji: en.innovation.cards.techniques.emoji,
      title: localized(en.innovation.cards.techniques.title, he.innovation.cards.techniques.title, ru.innovation.cards.techniques.title),
      description: localized(en.innovation.cards.techniques.description, he.innovation.cards.techniques.description, ru.innovation.cards.techniques.description),
      ctaText: localized(en.innovation.cards.techniques.cta, he.innovation.cards.techniques.cta, ru.innovation.cards.techniques.cta),
      order: 1,
    },
    {
      _id: 'innovation-research',
      _type: 'innovation',
      identifier: 'research',
      emoji: en.innovation.cards.research.emoji,
      title: localized(en.innovation.cards.research.title, he.innovation.cards.research.title, ru.innovation.cards.research.title),
      description: localized(en.innovation.cards.research.description, he.innovation.cards.research.description, ru.innovation.cards.research.description),
      ctaText: localized(en.innovation.cards.research.cta, he.innovation.cards.research.cta, ru.innovation.cards.research.cta),
      order: 2,
    },
    {
      _id: 'innovation-mentorship',
      _type: 'innovation',
      identifier: 'mentorship',
      emoji: en.innovation.cards.mentorship.emoji,
      title: localized(en.innovation.cards.mentorship.title, he.innovation.cards.mentorship.title, ru.innovation.cards.mentorship.title),
      description: localized(en.innovation.cards.mentorship.description, he.innovation.cards.mentorship.description, ru.innovation.cards.mentorship.description),
      ctaText: localized(en.innovation.cards.mentorship.cta, he.innovation.cards.mentorship.cta, ru.innovation.cards.mentorship.cta),
      order: 3,
    },
    {
      _id: 'innovation-collaboration',
      _type: 'innovation',
      identifier: 'collaboration',
      emoji: en.innovation.cards.collaboration.emoji,
      title: localized(en.innovation.cards.collaboration.title, he.innovation.cards.collaboration.title, ru.innovation.cards.collaboration.title),
      description: localized(en.innovation.cards.collaboration.description, he.innovation.cards.collaboration.description, ru.innovation.cards.collaboration.description),
      ctaText: localized(en.innovation.cards.collaboration.cta, he.innovation.cards.collaboration.cta, ru.innovation.cards.collaboration.cta),
      order: 4,
    },
  ];

  for (const innovation of innovations) {
    await client.createOrReplace(innovation);
  }
  console.log('✓ Innovations migrated (4 documents)');
}

// ============================================================================
// INNOVATION PAGE
// ============================================================================
async function migrateInnovationPage() {
  console.log('Migrating Innovation Page...');

  const doc = {
    _id: 'innovationPage',
    _type: 'innovationPage',
    title: localized(en.innovation.title, he.innovation.title, ru.innovation.title),
    subtitle: localized(en.innovation.subtitle, he.innovation.subtitle, ru.innovation.subtitle),
    keyInnovations: {
      title: localized(en.innovation.key_innovations.title, he.innovation.key_innovations.title, ru.innovation.key_innovations.title),
      techniques: {
        title: localized(en.innovation.key_innovations.techniques.title, he.innovation.key_innovations.techniques.title, ru.innovation.key_innovations.techniques.title),
        items: [
          localized(en.innovation.key_innovations.techniques.items.screw, he.innovation.key_innovations.techniques.items.screw, ru.innovation.key_innovations.techniques.items.screw),
          localized(en.innovation.key_innovations.techniques.items.healing, he.innovation.key_innovations.techniques.items.healing, ru.innovation.key_innovations.techniques.items.healing),
          localized(en.innovation.key_innovations.techniques.items.minimally, he.innovation.key_innovations.techniques.items.minimally, ru.innovation.key_innovations.techniques.items.minimally),
          localized(en.innovation.key_innovations.techniques.items.computer, he.innovation.key_innovations.techniques.items.computer, ru.innovation.key_innovations.techniques.items.computer),
        ],
      },
      researchFocus: {
        title: localized(en.innovation.key_innovations.research_focus.title, he.innovation.key_innovations.research_focus.title, ru.innovation.key_innovations.research_focus.title),
        items: [
          localized(en.innovation.key_innovations.research_focus.items.osteogenesis, he.innovation.key_innovations.research_focus.items.osteogenesis, ru.innovation.key_innovations.research_focus.items.osteogenesis),
          localized(en.innovation.key_innovations.research_focus.items.prevention, he.innovation.key_innovations.research_focus.items.prevention, ru.innovation.key_innovations.research_focus.items.prevention),
          localized(en.innovation.key_innovations.research_focus.items.heparan, he.innovation.key_innovations.research_focus.items.heparan, ru.innovation.key_innovations.research_focus.items.heparan),
          localized(en.innovation.key_innovations.research_focus.items.outcomes, he.innovation.key_innovations.research_focus.items.outcomes, ru.innovation.key_innovations.research_focus.items.outcomes),
        ],
      },
    },
    publicationsTitle: localized(en.innovation.publications.title, he.innovation.publications.title, ru.innovation.publications.title),
  };

  await client.createOrReplace(doc);
  console.log('✓ Innovation Page migrated');
}

// ============================================================================
// PUBLICATIONS
// ============================================================================
async function migratePublications() {
  console.log('Migrating Publications...');

  const publications = [
    {
      _id: 'publication-1',
      _type: 'publication',
      title: localized(en.innovation.publications.publication_1.title, he.innovation.publications.publication_1.title, ru.innovation.publications.publication_1.title),
      journal: localized(en.innovation.publications.publication_1.journal, he.innovation.publications.publication_1.journal, ru.innovation.publications.publication_1.journal),
      description: localized(en.innovation.publications.publication_1.description, he.innovation.publications.publication_1.description, ru.innovation.publications.publication_1.description),
      year: 2023,
      ctaText: localized(en.innovation.publications.publication_1.cta, he.innovation.publications.publication_1.cta, ru.innovation.publications.publication_1.cta),
      order: 1,
    },
    {
      _id: 'publication-2',
      _type: 'publication',
      title: localized(en.innovation.publications.publication_2.title, he.innovation.publications.publication_2.title, ru.innovation.publications.publication_2.title),
      journal: localized(en.innovation.publications.publication_2.journal, he.innovation.publications.publication_2.journal, ru.innovation.publications.publication_2.journal),
      description: localized(en.innovation.publications.publication_2.description, he.innovation.publications.publication_2.description, ru.innovation.publications.publication_2.description),
      year: 2023,
      ctaText: localized(en.innovation.publications.publication_2.cta, he.innovation.publications.publication_2.cta, ru.innovation.publications.publication_2.cta),
      order: 2,
    },
    {
      _id: 'publication-3',
      _type: 'publication',
      title: localized(en.innovation.publications.publication_3.title, he.innovation.publications.publication_3.title, ru.innovation.publications.publication_3.title),
      journal: localized(en.innovation.publications.publication_3.journal, he.innovation.publications.publication_3.journal, ru.innovation.publications.publication_3.journal),
      description: localized(en.innovation.publications.publication_3.description, he.innovation.publications.publication_3.description, ru.innovation.publications.publication_3.description),
      year: 2022,
      ctaText: localized(en.innovation.publications.publication_3.cta, he.innovation.publications.publication_3.cta, ru.innovation.publications.publication_3.cta),
      order: 3,
    },
  ];

  for (const pub of publications) {
    await client.createOrReplace(pub);
  }
  console.log('✓ Publications migrated (3 documents)');
}

// ============================================================================
// GUIDES PAGE
// ============================================================================
async function migrateGuidesPage() {
  console.log('Migrating Guides Page...');

  const doc = {
    _id: 'guidesPage',
    _type: 'guidesPage',
    title: localized(en.guides.title, he.guides.title, ru.guides.title),
    subtitle: localized(en.guides.subtitle, he.guides.subtitle, ru.guides.subtitle),
    quickAccess: {
      preSurgery: localized(en.guides.quick_access.pre_surgery, he.guides.quick_access.pre_surgery, ru.guides.quick_access.pre_surgery),
      postSurgery: localized(en.guides.quick_access.post_surgery, he.guides.quick_access.post_surgery, ru.guides.quick_access.post_surgery),
      ptExercises: localized(en.guides.quick_access.pt_exercises, he.guides.quick_access.pt_exercises, ru.guides.quick_access.pt_exercises),
      recoveryTimeline: localized(en.guides.quick_access.recovery_timeline, he.guides.quick_access.recovery_timeline, ru.guides.quick_access.recovery_timeline),
    },
    preSurgerySectionTitle: localized(en.guides.pre_surgery.section_title, he.guides.pre_surgery.section_title, ru.guides.pre_surgery.section_title),
    postSurgerySectionTitle: localized(en.guides.post_surgery.section_title, he.guides.post_surgery.section_title, ru.guides.post_surgery.section_title),
    bundle: {
      title: localized(en.guides.bundle.title, he.guides.bundle.title, ru.guides.bundle.title),
      description: localized(en.guides.bundle.description, he.guides.bundle.description, ru.guides.bundle.description),
      ctaText: localized(en.guides.bundle.cta, he.guides.bundle.cta, ru.guides.bundle.cta),
    },
    faqSectionTitle: localized(en.guides.faq.section_title, he.guides.faq.section_title, ru.guides.faq.section_title),
  };

  await client.createOrReplace(doc);
  console.log('✓ Guides Page migrated');
}

// ============================================================================
// PATIENT GUIDES
// ============================================================================
async function migrateGuides() {
  console.log('Migrating Patient Guides...');

  const guides = [
    // Pre-surgery guides
    {
      _id: 'guide-checklist',
      _type: 'guide',
      identifier: 'checklist',
      emoji: en.guides.pre_surgery.checklist.emoji,
      title: localized(en.guides.pre_surgery.checklist.title, he.guides.pre_surgery.checklist.title, ru.guides.pre_surgery.checklist.title),
      description: localized(en.guides.pre_surgery.checklist.description, he.guides.pre_surgery.checklist.description, ru.guides.pre_surgery.checklist.description),
      category: 'pre_surgery',
      ctaText: localized(en.guides.pre_surgery.checklist.cta, he.guides.pre_surgery.checklist.cta, ru.guides.pre_surgery.checklist.cta),
      order: 1,
    },
    {
      _id: 'guide-exercises',
      _type: 'guide',
      identifier: 'exercises',
      emoji: en.guides.pre_surgery.exercises.emoji,
      title: localized(en.guides.pre_surgery.exercises.title, he.guides.pre_surgery.exercises.title, ru.guides.pre_surgery.exercises.title),
      description: localized(en.guides.pre_surgery.exercises.description, he.guides.pre_surgery.exercises.description, ru.guides.pre_surgery.exercises.description),
      category: 'pre_surgery',
      ctaText: localized(en.guides.pre_surgery.exercises.cta, he.guides.pre_surgery.exercises.cta, ru.guides.pre_surgery.exercises.cta),
      order: 2,
    },
    {
      _id: 'guide-questions',
      _type: 'guide',
      identifier: 'questions',
      emoji: en.guides.pre_surgery.questions.emoji,
      title: localized(en.guides.pre_surgery.questions.title, he.guides.pre_surgery.questions.title, ru.guides.pre_surgery.questions.title),
      description: localized(en.guides.pre_surgery.questions.description, he.guides.pre_surgery.questions.description, ru.guides.pre_surgery.questions.description),
      category: 'pre_surgery',
      ctaText: localized(en.guides.pre_surgery.questions.cta, he.guides.pre_surgery.questions.cta, ru.guides.pre_surgery.questions.cta),
      order: 3,
    },
    // Post-surgery guides
    {
      _id: 'guide-first-week',
      _type: 'guide',
      identifier: 'first_week',
      emoji: en.guides.post_surgery.first_week.emoji,
      title: localized(en.guides.post_surgery.first_week.title, he.guides.post_surgery.first_week.title, ru.guides.post_surgery.first_week.title),
      description: localized(en.guides.post_surgery.first_week.description, he.guides.post_surgery.first_week.description, ru.guides.post_surgery.first_week.description),
      category: 'post_surgery',
      ctaText: localized(en.guides.post_surgery.first_week.cta, he.guides.post_surgery.first_week.cta, ru.guides.post_surgery.first_week.cta),
      order: 1,
    },
    {
      _id: 'guide-lengthening',
      _type: 'guide',
      identifier: 'lengthening',
      emoji: en.guides.post_surgery.lengthening.emoji,
      title: localized(en.guides.post_surgery.lengthening.title, he.guides.post_surgery.lengthening.title, ru.guides.post_surgery.lengthening.title),
      description: localized(en.guides.post_surgery.lengthening.description, he.guides.post_surgery.lengthening.description, ru.guides.post_surgery.lengthening.description),
      category: 'post_surgery',
      ctaText: localized(en.guides.post_surgery.lengthening.cta, he.guides.post_surgery.lengthening.cta, ru.guides.post_surgery.lengthening.cta),
      order: 2,
    },
    {
      _id: 'guide-pt',
      _type: 'guide',
      identifier: 'pt',
      emoji: en.guides.post_surgery.pt.emoji,
      title: localized(en.guides.post_surgery.pt.title, he.guides.post_surgery.pt.title, ru.guides.post_surgery.pt.title),
      description: localized(en.guides.post_surgery.pt.description, he.guides.post_surgery.pt.description, ru.guides.post_surgery.pt.description),
      category: 'post_surgery',
      ctaText: localized(en.guides.post_surgery.pt.cta, he.guides.post_surgery.pt.cta, ru.guides.post_surgery.pt.cta),
      order: 3,
    },
  ];

  for (const guide of guides) {
    await client.createOrReplace(guide);
  }
  console.log('✓ Patient Guides migrated (6 documents)');
}

// ============================================================================
// FAQs
// ============================================================================
async function migrateFAQs() {
  console.log('Migrating FAQs...');

  const faqs = [
    {
      _id: 'faq-recovery-time',
      _type: 'faq',
      identifier: 'recovery_time',
      question: localized(en.guides.faq.recovery_time.question, he.guides.faq.recovery_time.question, ru.guides.faq.recovery_time.question),
      answer: localized(en.guides.faq.recovery_time.answer, he.guides.faq.recovery_time.answer, ru.guides.faq.recovery_time.answer),
      category: 'recovery',
      order: 1,
    },
    {
      _id: 'faq-risks',
      _type: 'faq',
      identifier: 'risks',
      question: localized(en.guides.faq.risks.question, he.guides.faq.risks.question, ru.guides.faq.risks.question),
      answer: localized(en.guides.faq.risks.answer, he.guides.faq.risks.answer, ru.guides.faq.risks.answer),
      category: 'risks',
      order: 2,
    },
    {
      _id: 'faq-fly',
      _type: 'faq',
      identifier: 'fly',
      question: localized(en.guides.faq.fly.question, he.guides.faq.fly.question, ru.guides.faq.fly.question),
      answer: localized(en.guides.faq.fly.answer, he.guides.faq.fly.answer, ru.guides.faq.fly.answer),
      category: 'travel',
      order: 3,
    },
    {
      _id: 'faq-max-gain',
      _type: 'faq',
      identifier: 'max_gain',
      question: localized(en.guides.faq.max_gain.question, he.guides.faq.max_gain.question, ru.guides.faq.max_gain.question),
      answer: localized(en.guides.faq.max_gain.answer, he.guides.faq.max_gain.answer, ru.guides.faq.max_gain.answer),
      category: 'results',
      order: 4,
    },
  ];

  for (const faq of faqs) {
    await client.createOrReplace(faq);
  }
  console.log('✓ FAQs migrated (4 documents)');
}

// ============================================================================
// STUDY PAGE
// ============================================================================
async function migrateStudyPage() {
  console.log('Migrating Study Page...');

  const doc = {
    _id: 'studyPage',
    _type: 'studyPage',
    title: localized(en.study.title, he.study.title, ru.study.title),
    subtitle: localized(en.study.subtitle, he.study.subtitle, ru.study.subtitle),
    search: {
      placeholder: localized(en.study.search.placeholder, he.study.search.placeholder, ru.study.search.placeholder),
      filters: {
        all: localized(en.study.search.filters.all, he.study.search.filters.all, ru.study.search.filters.all),
        articles: localized(en.study.search.filters.articles, he.study.search.filters.articles, ru.study.search.filters.articles),
        caseStudies: localized(en.study.search.filters.case_studies, he.study.search.filters.case_studies, ru.study.search.filters.case_studies),
        lectures: localized(en.study.search.filters.lectures, he.study.search.filters.lectures, ru.study.search.filters.lectures),
        research: localized(en.study.search.filters.research, he.study.search.filters.research, ru.study.search.filters.research),
      },
    },
    subscribe: {
      title: localized(en.study.subscribe.title, he.study.subscribe.title, ru.study.subscribe.title),
      description: localized(en.study.subscribe.description, he.study.subscribe.description, ru.study.subscribe.description),
      placeholder: localized(en.study.subscribe.placeholder, he.study.subscribe.placeholder, ru.study.subscribe.placeholder),
      ctaText: localized(en.study.subscribe.cta, he.study.subscribe.cta, ru.study.subscribe.cta),
    },
  };

  await client.createOrReplace(doc);
  console.log('✓ Study Page migrated');
}

// ============================================================================
// STUDY CONTENT
// ============================================================================
async function migrateStudyContent() {
  console.log('Migrating Study Content...');

  const contents = [
    {
      _id: 'study-article-1',
      _type: 'studyContent',
      identifier: 'article_1',
      emoji: en.study.content.article_1.emoji,
      title: localized(en.study.content.article_1.title, he.study.content.article_1.title, ru.study.content.article_1.title),
      contentType: 'article',
      typeLabel: localized(en.study.content.article_1.type, he.study.content.article_1.type, ru.study.content.article_1.type),
      dateLabel: localized(en.study.content.article_1.date, he.study.content.article_1.date, ru.study.content.article_1.date),
      description: localized(en.study.content.article_1.description, he.study.content.article_1.description, ru.study.content.article_1.description),
      ctaText: localized(en.study.content.article_1.cta, he.study.content.article_1.cta, ru.study.content.article_1.cta),
      cardColor: 'blue',
      order: 1,
    },
    {
      _id: 'study-case-study-1',
      _type: 'studyContent',
      identifier: 'case_study_1',
      emoji: en.study.content.case_study_1.emoji,
      title: localized(en.study.content.case_study_1.title, he.study.content.case_study_1.title, ru.study.content.case_study_1.title),
      contentType: 'case_study',
      typeLabel: localized(en.study.content.case_study_1.type, he.study.content.case_study_1.type, ru.study.content.case_study_1.type),
      dateLabel: localized(en.study.content.case_study_1.date, he.study.content.case_study_1.date, ru.study.content.case_study_1.date),
      description: localized(en.study.content.case_study_1.description, he.study.content.case_study_1.description, ru.study.content.case_study_1.description),
      ctaText: localized(en.study.content.case_study_1.cta, he.study.content.case_study_1.cta, ru.study.content.case_study_1.cta),
      cardColor: 'red',
      order: 2,
    },
    {
      _id: 'study-lecture-1',
      _type: 'studyContent',
      identifier: 'lecture_1',
      emoji: en.study.content.lecture_1.emoji,
      title: localized(en.study.content.lecture_1.title, he.study.content.lecture_1.title, ru.study.content.lecture_1.title),
      contentType: 'lecture',
      typeLabel: localized(en.study.content.lecture_1.type, he.study.content.lecture_1.type, ru.study.content.lecture_1.type),
      duration: localized(en.study.content.lecture_1.duration, he.study.content.lecture_1.duration, ru.study.content.lecture_1.duration),
      dateLabel: localized(en.study.content.lecture_1.date, he.study.content.lecture_1.date, ru.study.content.lecture_1.date),
      description: localized(en.study.content.lecture_1.description, he.study.content.lecture_1.description, ru.study.content.lecture_1.description),
      ctaText: localized(en.study.content.lecture_1.cta, he.study.content.lecture_1.cta, ru.study.content.lecture_1.cta),
      cardColor: 'orange',
      order: 3,
    },
    {
      _id: 'study-research-1',
      _type: 'studyContent',
      identifier: 'research_1',
      emoji: en.study.content.research_1.emoji,
      title: localized(en.study.content.research_1.title, he.study.content.research_1.title, ru.study.content.research_1.title),
      contentType: 'research',
      typeLabel: localized(en.study.content.research_1.type, he.study.content.research_1.type, ru.study.content.research_1.type),
      dateLabel: localized(en.study.content.research_1.date, he.study.content.research_1.date, ru.study.content.research_1.date),
      description: localized(en.study.content.research_1.description, he.study.content.research_1.description, ru.study.content.research_1.description),
      ctaText: localized(en.study.content.research_1.cta, he.study.content.research_1.cta, ru.study.content.research_1.cta),
      cardColor: 'green',
      order: 4,
    },
    {
      _id: 'study-article-2',
      _type: 'studyContent',
      identifier: 'article_2',
      emoji: en.study.content.article_2.emoji,
      title: localized(en.study.content.article_2.title, he.study.content.article_2.title, ru.study.content.article_2.title),
      contentType: 'article',
      typeLabel: localized(en.study.content.article_2.type, he.study.content.article_2.type, ru.study.content.article_2.type),
      dateLabel: localized(en.study.content.article_2.date, he.study.content.article_2.date, ru.study.content.article_2.date),
      description: localized(en.study.content.article_2.description, he.study.content.article_2.description, ru.study.content.article_2.description),
      ctaText: localized(en.study.content.article_2.cta, he.study.content.article_2.cta, ru.study.content.article_2.cta),
      cardColor: 'purple',
      order: 5,
    },
    {
      _id: 'study-case-study-2',
      _type: 'studyContent',
      identifier: 'case_study_2',
      emoji: en.study.content.case_study_2.emoji,
      title: localized(en.study.content.case_study_2.title, he.study.content.case_study_2.title, ru.study.content.case_study_2.title),
      contentType: 'case_study',
      typeLabel: localized(en.study.content.case_study_2.type, he.study.content.case_study_2.type, ru.study.content.case_study_2.type),
      dateLabel: localized(en.study.content.case_study_2.date, he.study.content.case_study_2.date, ru.study.content.case_study_2.date),
      description: localized(en.study.content.case_study_2.description, he.study.content.case_study_2.description, ru.study.content.case_study_2.description),
      ctaText: localized(en.study.content.case_study_2.cta, he.study.content.case_study_2.cta, ru.study.content.case_study_2.cta),
      cardColor: 'teal',
      order: 6,
    },
  ];

  for (const content of contents) {
    await client.createOrReplace(content);
  }
  console.log('✓ Study Content migrated (6 documents)');
}

// ============================================================================
// TESTIMONIALS
// ============================================================================
async function migrateTestimonials() {
  console.log('Migrating Testimonials...');

  const testimonials = [
    {
      _id: 'testimonial-1',
      _type: 'testimonial',
      author: localized(en.home.testimonials.testimonial_1.author, he.home.testimonials.testimonial_1.author, ru.home.testimonials.testimonial_1.author),
      rating: en.home.testimonials.testimonial_1.rating,
      ratingNumber: 5,
      text: localized(en.home.testimonials.testimonial_1.text, he.home.testimonials.testimonial_1.text, ru.home.testimonials.testimonial_1.text),
      order: 1,
    },
    {
      _id: 'testimonial-2',
      _type: 'testimonial',
      author: localized(en.home.testimonials.testimonial_2.author, he.home.testimonials.testimonial_2.author, ru.home.testimonials.testimonial_2.author),
      rating: en.home.testimonials.testimonial_2.rating,
      ratingNumber: 5,
      text: localized(en.home.testimonials.testimonial_2.text, he.home.testimonials.testimonial_2.text, ru.home.testimonials.testimonial_2.text),
      order: 2,
    },
    {
      _id: 'testimonial-3',
      _type: 'testimonial',
      author: localized(en.home.testimonials.testimonial_3.author, he.home.testimonials.testimonial_3.author, ru.home.testimonials.testimonial_3.author),
      rating: en.home.testimonials.testimonial_3.rating,
      ratingNumber: 5,
      text: localized(en.home.testimonials.testimonial_3.text, he.home.testimonials.testimonial_3.text, ru.home.testimonials.testimonial_3.text),
      order: 3,
    },
  ];

  for (const testimonial of testimonials) {
    await client.createOrReplace(testimonial);
  }
  console.log('✓ Testimonials migrated (3 documents)');
}

// ============================================================================
// MAIN MIGRATION FUNCTION
// ============================================================================
async function runMigration() {
  console.log('='.repeat(60));
  console.log('Starting Sanity CMS Migration');
  console.log('='.repeat(60));
  console.log('');

  try {
    // Singleton pages
    await migrateSiteSettings();
    await migrateHomePage();
    await migrateAboutPage();
    await migrateInnovationPage();
    await migrateGuidesPage();
    await migrateStudyPage();

    // Collections
    await migrateClinics();
    await migrateServices();
    await migrateInnovations();
    await migratePublications();
    await migrateGuides();
    await migrateFAQs();
    await migrateStudyContent();
    await migrateTestimonials();

    console.log('');
    console.log('='.repeat(60));
    console.log('Migration Complete!');
    console.log('='.repeat(60));
    console.log('');
    console.log('Summary:');
    console.log('  - 6 Singleton pages');
    console.log('  - 3 Clinics');
    console.log('  - 4 Services');
    console.log('  - 4 Innovations');
    console.log('  - 3 Publications');
    console.log('  - 6 Patient Guides');
    console.log('  - 4 FAQs');
    console.log('  - 6 Study Content items');
    console.log('  - 3 Testimonials');
    console.log('');
    console.log('Total: 39 documents migrated');
    console.log('');
    console.log('Visit your Sanity Studio to verify the content:');
    console.log('http://localhost:4321/studio');

  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
runMigration();
