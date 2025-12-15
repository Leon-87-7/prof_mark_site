import { defineConfig, fontProviders } from 'astro/config';
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
      minify: 'terser', // Better JavaScript minification than esbuild
      terserOptions: {
        compress: {
          drop_console: true, // Remove console.logs in production
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
});
