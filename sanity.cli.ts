import { defineCliConfig } from 'sanity/cli';

// ============================================================================
// ENVIRONMENT VALIDATION
// ============================================================================
const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;

if (!projectId) {
  throw new Error(
    '❌ SANITY_PROJECT_ID environment variable is required.\n' +
      'Set it in your .env file or pass it directly:\n' +
      '  SANITY_PROJECT_ID=your_project_id npx sanity <command>'
  );
}

if (!dataset) {
  throw new Error(
    '❌ SANITY_DATASET environment variable is required.\n' +
      'Set it in your .env file or pass it directly:\n' +
      '  SANITY_DATASET=development npx sanity <command>'
  );
}

// ============================================================================
// PRODUCTION PROTECTION
// ============================================================================
// Prevent accidental operations against production dataset
if (dataset === 'production' && process.env.SANITY_ALLOW_PRODUCTION !== 'true') {
  throw new Error(
    '❌ Refusing to connect to production dataset.\n\n' +
      'This is a safety measure to prevent accidental writes to production.\n\n' +
      'If you intentionally want to work with production, set:\n' +
      '  SANITY_ALLOW_PRODUCTION=true\n\n' +
      'For local development, use a non-production dataset:\n' +
      '  SANITY_DATASET=development npx sanity <command>'
  );
}

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
});
