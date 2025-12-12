# Image Optimization Guide

This project uses Astro's built-in image optimization with Sharp for automatic image processing, format conversion, and responsive image generation.

## 📁 Directory Structure

```
src/assets/images/          # Optimized images (processed at build time)
├── hero/                   # Hero section images
├── clinics/                # Clinic photos
├── team/                   # Team member photos
├── testimonials/           # Testimonial photos
└── services/               # Service-related images

public/images/              # Static images (served as-is, no optimization)
├── hero/
├── clinics/
├── team/
├── testimonials/
└── services/
```

## 🔧 When to Use Each Approach

### Use `src/assets/` for:
- Photos and images that need optimization
- Hero images, team photos, service images
- Images that will be displayed at multiple sizes
- JPG/PNG images that benefit from WebP/AVIF conversion

### Use `public/` for:
- SVG files (logos, icons)
- Images that are already optimized
- External images (favicons, social media images)
- Files that need exact filenames (for SEO or external references)

## 🎨 Components Available

### 1. OptimizedImage Component

Use for single images with automatic format conversion.

```astro
---
import OptimizedImage from '@/components/OptimizedImage.astro';
import heroImage from '@/assets/images/hero/prof-mark.jpg';
---

<!-- Local optimized image -->
<OptimizedImage
  src={heroImage}
  alt="Prof. Mark Eidelman"
  width={800}
  height={600}
  loading="eager"
  quality={85}
  format="webp"
  class="hero-image"
/>

<!-- External image (no optimization) -->
<OptimizedImage
  src="https://example.com/image.jpg"
  alt="External image"
  width={400}
  height={300}
/>
```

**Props:**
- `src` - ImageMetadata (import) or string (URL)
- `alt` - Alt text (required)
- `width` - Width in pixels
- `height` - Height in pixels
- `loading` - 'lazy' (default) or 'eager'
- `quality` - 1-100 (default: 80)
- `format` - 'webp' (default), 'avif', 'png', 'jpg'
- `class` - CSS class names

### 2. ResponsivePicture Component

Use for responsive images with multiple sizes and formats (art direction).

```astro
---
import ResponsivePicture from '@/components/ResponsivePicture.astro';
import teamPhoto from '@/assets/images/team/doctor.jpg';
---

<ResponsivePicture
  src={teamPhoto}
  alt="Dr. Smith"
  widths={[400, 800, 1200]}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  formats={['avif', 'webp']}
  loading="lazy"
  quality={85}
  class="team-photo"
/>
```

**Props:**
- `src` - ImageMetadata (import)
- `alt` - Alt text (required)
- `widths` - Array of widths (default: [400, 800, 1200])
- `sizes` - Responsive sizes attribute
- `formats` - Array of formats (default: ['avif', 'webp'])
- `loading` - 'lazy' (default) or 'eager'
- `quality` - 1-100 (default: 80)
- `class` - CSS class names

### 3. Direct Astro Image/Picture

For more control, use Astro's built-in components directly:

```astro
---
import { Image, Picture } from 'astro:assets';
import myImage from '@/assets/images/hero/banner.jpg';
---

<!-- Image component -->
<Image
  src={myImage}
  alt="Description"
  width={1200}
  height={800}
  format="webp"
  quality={80}
/>

<!-- Picture component with multiple formats -->
<Picture
  src={myImage}
  alt="Description"
  widths={[400, 800, 1200]}
  formats={['avif', 'webp', 'jpg']}
  sizes="(max-width: 768px) 100vw, 800px"
/>
```

## 📝 Usage Examples by Page

### Home Page Hero Image

```astro
---
import OptimizedImage from '@/components/OptimizedImage.astro';
import heroBackground from '@/assets/images/hero/medical-background.jpg';
---

<div class="hero" style={`background-image: url(${heroBackground.src})`}>
  <!-- Or use as img tag -->
  <OptimizedImage
    src={heroBackground}
    alt="Medical facility"
    width={1920}
    height={1080}
    loading="eager"
    quality={90}
    class="hero-bg"
  />
</div>
```

### Clinics Page - Location Photos

```astro
---
import ResponsivePicture from '@/components/ResponsivePicture.astro';
import haifaClinic from '@/assets/images/clinics/haifa-exterior.jpg';
import kiryatClinic from '@/assets/images/clinics/kiryat-exterior.jpg';
---

<div class="clinic-card">
  <ResponsivePicture
    src={haifaClinic}
    alt="Haifa Clinic Exterior"
    widths={[400, 800]}
    sizes="(max-width: 768px) 100vw, 50vw"
    class="clinic-photo"
  />
</div>
```

### Team/About Page - Professional Photos

```astro
---
import OptimizedImage from '@/components/OptimizedImage.astro';
import profMark from '@/assets/images/team/prof-mark-portrait.jpg';
---

<OptimizedImage
  src={profMark}
  alt="Prof. Mark Eidelman"
  width={400}
  height={400}
  format="avif"
  quality={90}
  class="team-portrait"
/>
```

### Testimonials - Patient Photos (Optional)

```astro
---
import OptimizedImage from '@/components/OptimizedImage.astro';
---

<!-- With placeholder for privacy -->
<OptimizedImage
  src="/images/testimonials/placeholder-avatar.svg"
  alt="Patient testimonial"
  width={80}
  height={80}
  class="testimonial-avatar"
/>
```

## ⚡ Performance Best Practices

### 1. Choose the Right Format
- **WebP**: Best balance (browser support + compression)
- **AVIF**: Best compression, but newer format
- **JPG**: Fallback for photos
- **PNG**: Use for images requiring transparency

### 2. Loading Strategy
```astro
<!-- Above the fold (hero images) -->
<OptimizedImage loading="eager" />

<!-- Below the fold (everything else) -->
<OptimizedImage loading="lazy" />
```

### 3. Sizing Guidelines
```astro
<!-- Hero images -->
width={1920} height={1080}

<!-- Content images -->
width={800} height={600}

<!-- Thumbnails -->
width={400} height={300}

<!-- Avatars -->
width={80} height={80}
```

### 4. Quality Settings
```astro
<!-- Hero/important images -->
quality={90}

<!-- Regular content images -->
quality={80}

<!-- Thumbnails/small images -->
quality={75}
```

### 5. Responsive Images with Sizes
```astro
<!-- Full width on mobile, 50% on desktop -->
sizes="(max-width: 768px) 100vw, 50vw"

<!-- Fixed width on large screens -->
sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"

<!-- Sidebar image -->
sizes="(max-width: 768px) 100vw, 300px"
```

## 🖼️ Adding New Images

### Step 1: Add Image File
Place your image in the appropriate directory:
```bash
# For optimized images
src/assets/images/hero/new-image.jpg

# For static images
public/images/icons/new-icon.svg
```

### Step 2: Import and Use
```astro
---
import OptimizedImage from '@/components/OptimizedImage.astro';
import newImage from '@/assets/images/hero/new-image.jpg';
---

<OptimizedImage
  src={newImage}
  alt="Description"
  width={800}
  height={600}
/>
```

## 🔍 Build Output

During build, Astro will:
1. ✅ Optimize all images in `src/assets/`
2. ✅ Generate multiple sizes (if using `widths`)
3. ✅ Convert to specified formats (WebP, AVIF)
4. ✅ Generate srcset for responsive images
5. ✅ Add proper caching headers
6. ✅ Serve optimized images from `_astro/` directory

## 📊 Measuring Performance

### Before Image Optimization
- Large JPG files (2-5 MB)
- No responsive images
- Single format (JPG/PNG)
- No lazy loading

### After Image Optimization
- Optimized WebP/AVIF (200-500 KB)
- Multiple sizes for different viewports
- Modern formats with fallbacks
- Lazy loading below the fold

**Expected savings: 60-80% file size reduction**

## 🚀 Quick Start Checklist

- [ ] Add images to `src/assets/images/` (organized by type)
- [ ] Import images in your `.astro` files
- [ ] Use `OptimizedImage` for single images
- [ ] Use `ResponsivePicture` for art direction
- [ ] Set `loading="eager"` for above-fold images
- [ ] Set `loading="lazy"` for below-fold images
- [ ] Choose quality based on image importance
- [ ] Test on different devices and connection speeds

## 🔧 Configuration

Image optimization is configured in `astro.config.mjs`:

```js
export default defineConfig({
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },
});
```

## 📚 Resources

- [Astro Image Documentation](https://docs.astro.build/en/guides/images/)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [WebP vs AVIF Comparison](https://jakearchibald.com/2020/avif-has-landed/)
