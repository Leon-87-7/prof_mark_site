# Mobile Performance Improvement Plan

**Current Mobile Performance Score:** 60/100
**Target:** 90+/100
**Test Configuration:** Mobile device with network throttling (simulated 4G)

---

## 🔴 Critical Issues (Biggest Impact)

### 1. Enable Text Compression (Est. savings: 2,596 KiB)
**Priority:** HIGHEST
**Impact:** Massive reduction in download size

**Problem:** JavaScript and CSS files are not being compressed with gzip/brotli

**Solution:**
Configure your hosting provider or web server to enable compression:

**For Vercel/Netlify (automatic):**
- Already enabled by default ✅

**For Apache (.htaccess):**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

**For Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
gzip_min_length 1000;
```

**Note:** This is a deployment configuration issue, not a build issue. The files themselves are fine.

---

### 2. Minify JavaScript (Est. savings: 1,892 KiB)
**Priority:** HIGH
**Impact:** Large reduction in bundle size

**Problem:** JavaScript is not properly minified in production build

**Current Astro config:**
```js
// astro.config.mjs already has this, but verify:
export default defineConfig({
  vite: {
    build: {
      minify: 'esbuild', // Should be enabled
      cssMinify: 'lightningcss',
    },
  },
});
```

**Action items:**
1. Verify production build uses minification
2. Check that React production mode is enabled
3. Consider using terser instead of esbuild for better compression:
   ```js
   vite: {
     build: {
       minify: 'terser',
       terserOptions: {
         compress: {
           drop_console: true,
         },
       },
     },
   }
   ```

---

### 3. Eliminate Render-Blocking Resources (Est. savings: 610ms)
**Priority:** HIGH
**Impact:** Faster First Contentful Paint

**Problem:** Google Fonts and CSS are blocking initial render

**Current issue:**
```html
<!-- BaseLayout.astro - BLOCKING -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@400;600;700&display=swap"
  rel="stylesheet"
/>
```

**Solution 1: Preload critical fonts**
```html
<!-- Add before font stylesheet -->
<link
  rel="preload"
  href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@400;600;700&display=swap"
  as="style"
  onload="this.onload=null;this.rel='stylesheet'"
/>
<noscript>
  <link
    href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@400;600;700&display=swap"
    rel="stylesheet"
  />
</noscript>
```

**Solution 2: Self-host fonts (better)**
1. Download font files from Google Fonts
2. Place in `public/fonts/`
3. Use `@font-face` in global CSS
4. Preload critical font files

---

### 4. Reduce Unused JavaScript (Est. savings: 586 KiB)
**Priority:** HIGH
**Impact:** Smaller bundles, faster parsing

**Problem:** React bundle includes unused code

**Solutions:**

**Option A: Convert React components to vanilla JS/Astro**
- Navigation → Pure Astro component
- LanguageSelector → Vanilla JS or Astro
- Only keep BookingButton as React (truly needs reactivity)

**Option B: Switch to Preact**
```bash
npm install @astrojs/preact preact
npm uninstall @astrojs/react react react-dom
```

Update `astro.config.mjs`:
```js
import preact from '@astrojs/preact';

export default defineConfig({
  integrations: [
    preact(), // Instead of react()
    sitemap(),
  ],
});
```

Update components:
```jsx
// Change imports from 'react' to 'preact/hooks'
import { useState } from 'preact/hooks';
```

**Expected savings:** ~140 KiB (React 183KB → Preact 40KB)

---

### 5. Optimize LCP Element (Currently: 5,290ms, Target: <2,500ms)
**Priority:** CRITICAL
**Impact:** Largest visual element loads too slowly

**Problem:** Hero image on homepage is the LCP element and loads slowly

**Investigation needed:**
1. Which page was tested?
2. What is the LCP element? (likely hero image)

**Solutions:**

**For hero images:**
```astro
<!-- Add priority loading -->
<img
  src="/images/hero/hero_image_mark_02.jpg"
  alt="Prof. Mark Eidelman"
  loading="eager"
  fetchpriority="high"
  width="1920"
  height="1080"
/>

<!-- OR use Astro Image with priority -->
<Image
  src={heroImage}
  alt="Prof. Mark Eidelman"
  loading="eager"
  fetchpriority="high"
  format="webp"
/>
```

**Preload the LCP image in `<head>`:**
```html
<link
  rel="preload"
  as="image"
  href="/images/hero/hero_image_mark_02.jpg"
  fetchpriority="high"
/>
```

---

### 6. Reduce Main-Thread Work (Currently: 4.9s)
**Priority:** HIGH
**Impact:** Faster interactivity

**Problem:** Too much JavaScript parsing/execution

**Solutions:**
1. Reduce JavaScript bundle size (see items 2, 4)
2. Use `client:idle` for all React components (already done ✅)
3. Consider code splitting:
   ```astro
   <!-- Lazy load heavy components -->
   <HeavyComponent client:visible />
   ```

---

## 🟡 Medium Priority Issues

### 7. Convert Images to Next-Gen Formats (Est. savings: 23 KiB)
**Priority:** MEDIUM
**Impact:** Small but worthwhile

**Problem:** Images are JPEG/PNG instead of WebP/AVIF

**Solution:** Use Astro's Image component everywhere
```astro
---
import { Image } from 'astro:assets';
import heroImage from '@/assets/images/hero/hero_image_mark_02.jpg';
---

<Image
  src={heroImage}
  alt="Prof. Mark Eidelman"
  format="webp"
  quality={80}
  loading="eager"
/>
```

**For responsive images:**
```astro
<Image
  src={heroImage}
  alt="..."
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 400px, (max-width: 1200px) 800px, 1200px"
  format="webp"
/>
```

---

### 8. Defer Offscreen Images (Est. savings: 4 KiB)
**Priority:** MEDIUM
**Impact:** Small improvement

**Problem:** All images load immediately instead of lazy loading

**Solution:**
```astro
<!-- For below-the-fold images -->
<Image
  src={image}
  alt="..."
  loading="lazy"
  decoding="async"
/>

<!-- For above-the-fold images -->
<Image
  src={heroImage}
  alt="..."
  loading="eager"
  fetchpriority="high"
/>
```

**Verify:** Check that OptimizedImage.astro uses lazy loading by default

---

### 9. Remove Duplicate JavaScript Modules (Est. savings: 11 KiB)
**Priority:** LOW
**Impact:** Small optimization

**Problem:** Some modules might be bundled multiple times

**Solution:**
```js
// astro.config.mjs
export default defineConfig({
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
          },
        },
      },
    },
  },
});
```

---

### 10. Reduce Network Payload (Currently: 3,911 KiB)
**Priority:** MEDIUM
**Impact:** Cumulative of all above fixes

**Total network payload breakdown:**
- JavaScript: ~195 KB (can reduce to ~40 KB with Preact)
- CSS: ~25 KB (already optimized ✅)
- Images: ~3,500 KB (optimize with WebP)
- Fonts: ~150 KB (can self-host and subset)

**Target:** <2,000 KiB total

---

## 📋 Implementation Priority

### Phase 1: Server Configuration (Deployment Day)
1. ✅ **Enable text compression** (gzip/brotli) - 2,596 KiB savings
2. ✅ **Verify minification enabled** in production build

### Phase 2: Quick Wins (1-2 hours)
3. **Preload LCP image** in `<head>`
4. **Add `fetchpriority="high"` to hero image**
5. **Convert font loading to async** (preload with onload trick)
6. **Ensure all below-fold images use `loading="lazy"`**

### Phase 3: Medium Effort (2-4 hours)
7. **Convert images to WebP/AVIF** using Astro Image component
8. **Self-host fonts** (download from Google Fonts, use @font-face)
9. **Optimize React bundle** (convert simple components to vanilla JS)

### Phase 4: Major Refactor (optional, 4-8 hours)
10. **Switch from React to Preact** - 140 KB savings
11. **Convert Navigation to pure Astro component**
12. **Convert LanguageSelector to vanilla JS**

---

## 📊 Expected Results

**After Phase 1 (Server Config):**
- Mobile Performance: 60 → **75**/100
- Savings: ~2,600 KiB

**After Phase 2 (Quick Wins):**
- Mobile Performance: 75 → **85**/100
- LCP: 5,290ms → ~3,000ms

**After Phase 3 (Medium Effort):**
- Mobile Performance: 85 → **90+**/100
- Total payload: 3,911 KiB → ~2,500 KiB

**After Phase 4 (Major Refactor):**
- Mobile Performance: 90+ → **95+**/100
- JavaScript: 195 KB → ~50 KB
- Total payload: ~1,800 KiB

---

## 🎯 Quick Start Checklist

**Can be done NOW (before deployment):**
- [ ] Add `fetchpriority="high"` to hero image
- [ ] Add `<link rel="preload">` for LCP image
- [ ] Convert font loading to async pattern
- [ ] Verify all below-fold images have `loading="lazy"`
- [ ] Convert hero image to WebP format

**Must be done at DEPLOYMENT:**
- [ ] Enable gzip/brotli compression on hosting
- [ ] Verify production build has minification enabled
- [ ] Test mobile performance on actual hosting (not localhost)

**Can be done POST-LAUNCH:**
- [ ] Self-host fonts
- [ ] Switch to Preact (if needed)
- [ ] Convert more images to WebP/AVIF

---

## 📝 Notes

1. **This is a MOBILE test with throttling** - Desktop was 93/100 ✅
2. **Text compression is a hosting/server config issue** - Not a code issue
3. **The 60 score is primarily due to slow mobile network simulation** - Real-world mobile on 4G/5G will be faster
4. **Priority 1 fix: Enable compression at deployment** - This alone will bring score to ~75

---

**Document Created:** 2025-12-13
**Mobile Lighthouse Score:** 60/100
**Target Score:** 90+/100
**Estimated Implementation Time:** 8-16 hours total (Phases 1-3)
