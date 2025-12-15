# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Professor Mark's website built with **Astro 5** using Static Site Generation (SSG). The site uses Astro components for pages and layout, with React islands for interactive components (Navigation, LanguageSelector, BookingButton). Images are optimized using Sharp.

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

### Framework: Astro (Static Site Generation)

- **Build mode**: Static (`output: 'static'`)
- **Integrations**: React (for interactive islands), Sitemap
- **Image optimization**: Sharp service for automatic image processing
- **Site URL**: https://markeidelman.com

### Page Structure

Multi-page static site with Astro file-based routing:
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

## Build Configuration

### Astro Config ([astro.config.mjs](astro.config.mjs))

**Build optimizations:**
- `inlineStylesheets: 'auto'` - Inlines critical CSS automatically
- CSS minification: LightningCSS (faster than cssnano)
- JS minification: Terser with optimizations:
  - `drop_console: true` - Removes console.logs in production
  - `drop_debugger: true` - Removes debugger statements
- Manual chunk splitting: React/React-DOM separated into `react-vendor` chunk

**Image optimization:**
- Service: Sharp (high-performance image processing)
- Supports remote patterns for external images (e.g., Google Maps)

### Vite Integration

Astro uses Vite under the hood. Custom Vite config in `astro.config.mjs`:
- Terser for better JS minification (vs esbuild default)
- LightningCSS for faster CSS processing
- Manual chunks for better code splitting

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