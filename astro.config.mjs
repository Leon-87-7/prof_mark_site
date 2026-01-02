import { defineConfig, fontProviders } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import sanity from '@sanity/astro';
import node from '@astrojs/node';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), // For React islands (Navigation, LanguageSelector, BookingButton)
    sitemap({
      // Exclude studio from sitemap
      filter: (page) => !page.includes('/studio'),
    }),
    sanity({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET,
      apiVersion: '2024-01-01',
      useCdn: true,
      studioBasePath: '/studio',
    }),
  ],
  // Server mode with prerendering for static pages
  // The Sanity Studio requires server-side rendering
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
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
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // Sanity CDN for images
      },
    ],
  },
  vite: {
    // Build optimizations (only applied during production build)
    build: {
      cssMinify: 'lightningcss',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {},
    },
  },
  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: 'Montserrat',
        cssVariable: '--font-montserrat',
        weights: [400, 500, 600, 700],
        display: 'swap',
      },
      {
        provider: fontProviders.google(),
        name: 'Lato',
        cssVariable: '--font-lato',
        weights: [400, 700],
        display: 'swap',
      },
    ],
  },
  i18n: {
    defaultLocale: 'he',
    locales: ['he', 'en', 'ru'],
    // fallback: {
    //   he: 'en',
    // },
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
});
