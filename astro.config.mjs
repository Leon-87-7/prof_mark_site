import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), // For React islands (Navigation, LanguageSelector, BookingButton)
    sitemap(), // Auto-generates sitemap.xml
  ],
  output: 'static', // Static Site Generation (SSG)
  site: 'https://markeidelman.com', // Your production URL
  build: {
    inlineStylesheets: 'auto', // Inline critical CSS
  },
  image: {
    // Image optimization configuration
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com', // For Google Maps images if needed
      },
    ],
  },
  vite: {
    build: {
      cssMinify: 'lightningcss', // Faster CSS minification
    },
  },
});
