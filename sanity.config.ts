import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemas';

// Validate required environment variables
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

if (!projectId) {
  throw new Error(
    'SANITY_PROJECT_ID environment variable is required.\n' +
    'Please set it in your .env file.\n' +
    'Get your project ID from https://sanity.io/manage'
  );
}

if (!dataset) {
  throw new Error(
    'SANITY_DATASET environment variable is required.\n' +
    'Please set it in your .env file (e.g., "production", "development").\n' +
    'For local development, use a non-production dataset.'
  );
}

// Define singleton document IDs
const singletonTypes = new Set([
  'siteSettings',
  'homePage',
  'aboutPage',
  'innovationPage',
  'guidesPage',
  'studyPage',
]);

// Define singleton document actions
const singletonActions = new Set([
  'publish',
  'discardChanges',
  'restore',
]);

export default defineConfig({
  name: 'prof-mark-eidelman',
  title: 'Prof. Mark Eidelman Website',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Site Settings (Singleton)
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Site Settings')
              ),

            S.divider(),

            // Pages Group
            S.listItem()
              .title('Pages')
              .child(
                S.list()
                  .title('Pages')
                  .items([
                    S.listItem()
                      .title('Home Page')
                      .id('homePage')
                      .child(
                        S.document()
                          .schemaType('homePage')
                          .documentId('homePage')
                          .title('Home Page')
                      ),
                    S.listItem()
                      .title('About Page')
                      .id('aboutPage')
                      .child(
                        S.document()
                          .schemaType('aboutPage')
                          .documentId('aboutPage')
                          .title('About Page')
                      ),
                    S.listItem()
                      .title('Innovation Page')
                      .id('innovationPage')
                      .child(
                        S.document()
                          .schemaType('innovationPage')
                          .documentId('innovationPage')
                          .title('Innovation Page')
                      ),
                    S.listItem()
                      .title('Guides Page')
                      .id('guidesPage')
                      .child(
                        S.document()
                          .schemaType('guidesPage')
                          .documentId('guidesPage')
                          .title('Guides Page')
                      ),
                    S.listItem()
                      .title('Study Page')
                      .id('studyPage')
                      .child(
                        S.document()
                          .schemaType('studyPage')
                          .documentId('studyPage')
                          .title('Study Page')
                      ),
                  ])
              ),

            S.divider(),

            // Collections
            S.listItem()
              .title('Clinics')
              .schemaType('clinic')
              .child(S.documentTypeList('clinic').title('Clinics')),

            S.listItem()
              .title('Services')
              .schemaType('service')
              .child(S.documentTypeList('service').title('Services')),

            S.listItem()
              .title('Innovations')
              .schemaType('innovation')
              .child(
                S.documentTypeList('innovation').title('Innovations')
              ),

            S.listItem()
              .title('Publications')
              .schemaType('publication')
              .child(
                S.documentTypeList('publication').title(
                  'Publications'
                )
              ),

            S.divider(),

            S.listItem()
              .title('Patient Guides')
              .schemaType('guide')
              .child(
                S.documentTypeList('guide').title('Patient Guides')
              ),

            S.listItem()
              .title('FAQs')
              .schemaType('faq')
              .child(S.documentTypeList('faq').title('FAQs')),

            S.listItem()
              .title('Study Content')
              .schemaType('studyContent')
              .child(
                S.documentTypeList('studyContent').title(
                  'Study Content'
                )
              ),

            S.listItem()
              .title('Testimonials')
              .schemaType('testimonial')
              .child(
                S.documentTypeList('testimonial').title(
                  'Testimonials'
                )
              ),
          ]),
    }),
    visionTool(), // GROQ query playground
  ],

  schema: {
    types: schemaTypes,
    // Prevent creating new singleton documents
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !singletonTypes.has(schemaType)
      ),
  },

  document: {
    // Restrict actions for singleton documents
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) => action && singletonActions.has(action)
          )
        : input,
  },
});
