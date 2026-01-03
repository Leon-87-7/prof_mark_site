/// <reference types="astro/client" />

interface ImportMetaEnv {
  // Public environment variables (exposed to client-side code)
  readonly PUBLIC_SANITY_PROJECT_ID: string;
  readonly PUBLIC_SANITY_DATASET: string;

  // Server-side only environment variables
  readonly SANITY_PROJECT_ID: string;
  readonly SANITY_DATASET: string;
  readonly SANITY_API_VERSION: string;
  readonly SANITY_TOKEN: string;
  readonly SANITY_PREVIEW_SECRET: string;
  readonly SANITY_WEBHOOK_SECRET: string;
  readonly VERCEL_DEPLOY_HOOK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}