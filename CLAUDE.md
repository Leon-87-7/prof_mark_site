# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Professor Mark's website built with **Astro 5** using **Server-Side Rendering (SSR)** with the Node.js adapter. The site uses Astro components for pages and layout, with React islands for interactive components (Navigation, LanguageSelector, BookingButton). Content is managed via **Sanity CMS** with an embedded Studio at `/studio`. Images are optimized using Sharp.

### Tech Stack

- **Framework**: Astro 5 (SSR mode)
- **CMS**: Sanity v3 (embedded Studio)
- **Runtime**: Node.js (standalone adapter)
- **Deployment**: Vercel (auto-detects Node.js adapter)
- **UI**: React islands for interactivity
- **i18n**: Hebrew (default), English, Russian

## Development Commands

```bash
# Start development server with HMR
npm run dev

# Build for production (runs Astro type check first, then builds)
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI
npm run astro
```

## Architecture

### Framework: Astro (Server-Side Rendering)

- **Build mode**: Server (`output: 'server'`) - required for Sanity Studio
- **Adapter**: Node.js standalone (`@astrojs/node`)
- **Integrations**: React (for interactive islands), Sitemap, Sanity
- **Image optimization**: Sharp service for automatic image processing
- **Site URL**: [https://markeidelman.com](https://markeidelman.com)
- **CMS Studio**: Embedded at `/studio` route

### Deployment

Deployed on **Vercel** which auto-detects the Node.js adapter:

- No infrastructure changes required vs SSG
- Vercel handles the Node.js runtime automatically
- Static pages can still be prerendered using `export const prerender = true`

### Page Structure

Multi-page site with Astro file-based routing (SSR with optional prerendering):

- **Pages**: Located in `src/pages/` (`.astro` files)
  - [index.astro](src/pages/index.astro) - Home page
  - [about.astro](src/pages/about.astro) - About page
  - [clinics.astro](src/pages/clinics.astro) - Clinics page
  - [services.astro](src/pages/services.astro) - Services page
  - [innovation.astro](src/pages/innovation.astro) - Innovation page
  - [guides.astro](src/pages/guides.astro) - Guides page
  - [study.astro](src/pages/study.astro) - Study page
- **Layout**: [BaseLayout.astro](src/layouts/BaseLayout.astro) wraps all pages
- **Components**: Mix of Astro components and React islands

### Component Structure

- **Astro components** (static, server-rendered):
  - [Header.astro](src/components/Header.astro) - Site header
  - [Footer.astro](src/components/Footer.astro) - Site footer
  - [OptimizedImage.astro](src/components/OptimizedImage.astro) - Image optimization wrapper
  - [ResponsivePicture.astro](src/components/ResponsivePicture.astro) - Responsive images

- **React islands** (interactive, hydrated on client):
  - Navigation component (client-side interactivity)
  - LanguageSelector component
  - BookingButton component

### React Islands Pattern

- React components are rendered as "islands of interactivity"
- Use `client:load`, `client:idle`, or `client:visible` directives for hydration strategy
- Keep islands small and focused for optimal performance
- Most content should be static Astro components

## Sanity CMS Integration

### Configuration

- **Project**: Configured via environment variables (`SANITY_PROJECT_ID`, `SANITY_DATASET`)
- **Studio**: Embedded at `/studio` via `@sanity/astro` integration
- **API Version**: 2024-01-01
- **CDN**: Enabled for fast reads (disabled for preview mode)

⚠️ **IMPORTANT - Environment Variables**:
- `sanity.config.ts` runs in the **browser** (not Node.js) and must use `import.meta.env.PUBLIC_*`
- Never use `process.env` in `sanity.config.ts` - it will cause "process is not defined" errors
- Project ID and dataset are **safe to expose** (public identifiers, not secrets)
- Secrets like `SANITY_TOKEN` must stay server-side only

### Key Files

- [src/sanity/client.ts](src/sanity/client.ts) - Sanity client with error handling
- [src/sanity/image.ts](src/sanity/image.ts) - Image URL builder utilities
- [src/sanity/schemas/](src/sanity/schemas/) - Content type definitions
- [sanity.config.ts](sanity.config.ts) - Studio configuration

### Preview Mode

- Enter: `/api/preview?secret=YOUR_SECRET&slug=/page`
- Exit: `/api/exit-preview?returnUrl=/page`
- Uses cookies to toggle draft content visibility

## Build Configuration

### Astro Config ([astro.config.mjs](astro.config.mjs))

**SSR Configuration:**

- `output: 'server'` - Server-side rendering mode
- `adapter: node({ mode: 'standalone' })` - Node.js runtime adapter
- Static pages can opt-in with `export const prerender = true`

**Build optimizations:**

- `inlineStylesheets: 'auto'` - Inlines critical CSS automatically
- CSS minification: LightningCSS (faster than cssnano)
- JS minification: Terser with optimizations:
  - `drop_console: true` - Removes console.logs in production
  - `drop_debugger: true` - Removes debugger statements

**Image optimization:**

- Service: Sharp (high-performance image processing)
- Remote patterns: Sanity CDN (`cdn.sanity.io`), Google (`**.googleusercontent.com`)

### Vite Integration

Astro uses Vite under the hood. Custom Vite config in `astro.config.mjs`:

- Terser for better JS minification (vs esbuild default)
- LightningCSS for faster CSS processing

### TypeScript

- Strict TypeScript enabled
- Astro provides built-in TypeScript support
- Type checking via `astro check` command

## Performance Optimization Strategy

### Current Performance Issues (Mobile: 66/100)

Based on Lighthouse audit:

1. **Text compression disabled** - Est savings: 2,596 KiB
2. **JS not minified enough** - Est savings: 1,892 KiB
3. **Unused JavaScript** - Est savings: 586 KiB
4. **Slow LCP** - 4.6s (target: <2.5s)
5. **High TBT** - 310ms (target: <200ms)

### Optimization Checklist

- [ ] Enable compression middleware (gzip/brotli) on server
- [ ] Verify Terser minification is working in production build
- [ ] Reduce React island hydration (use `client:idle` or `client:visible`)
- [ ] Optimize LCP element (likely hero image)
- [ ] Convert images to WebP/AVIF
- [ ] Implement lazy loading for offscreen images
- [ ] Remove duplicate modules in bundles

## Key Patterns

### Adding a New Page

1. Create `.astro` file in `src/pages/` (e.g., `new-page.astro`)
2. Import and use `BaseLayout` for consistent structure
3. Add navigation link in Navigation component
4. Page automatically gets route based on filename (`/new-page`)
5. For static pages, add `export const prerender = true` at the top

### Adding a React Island

1. Create React component in `src/components/`
2. Import in `.astro` file with hydration directive:
   ```astro
   import MyComponent from '../components/MyComponent';
   ---
   <MyComponent client:load />
   ```
3. Choose hydration strategy:
   - `client:load` - Hydrate immediately on page load
   - `client:idle` - Hydrate when browser is idle
   - `client:visible` - Hydrate when component is visible

### Image Optimization

Use Astro's built-in `<Image>` component or custom wrappers:

- [OptimizedImage.astro](src/components/OptimizedImage.astro) for single images
- [ResponsivePicture.astro](src/components/ResponsivePicture.astro) for responsive images
- Automatically generates WebP/AVIF formats
- Lazy loading built-in

### Styling Approach

- Astro supports scoped styles by default (`<style>` in `.astro` files)
- Global styles can be imported in layout
- CSS automatically extracted and minified
- Supports Sass, Less, Stylus, PostCSS if needed

### Working with Sanity Content

1. **Fetching data** - Use `sanityFetch()` from [src/sanity/client.ts](src/sanity/client.ts):

   ```typescript
   import { sanityFetch } from '../sanity/client';
   const data = await sanityFetch<MyType>(groqQuery, params);
   ```

2. **Image URLs** - Use helpers from [src/sanity/image.ts](src/sanity/image.ts):

   ```typescript
   import { urlFor, getOptimizedUrl } from '../sanity/image';
   const imageUrl = urlFor(sanityImage).width(800).url();
   ```

3. **Schema changes** - Edit files in `src/sanity/schemas/`, then restart dev server

4. **API Routes** - Use `export const prerender = false` for dynamic endpoints
