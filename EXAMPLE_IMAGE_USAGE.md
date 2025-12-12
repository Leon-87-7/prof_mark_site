# Example: Adding Images to Your Pages

## Example 1: Adding a Hero Image to Home Page

### Before (No Image Optimization)
```astro
<!-- src/pages/index.astro -->
<div class="hero">
  <div class="hero-wrapper">
    <div class="hero-content">
      <h1>Leading the Future of Pediatric Orthopedics</h1>
      <!-- ... rest of content ... -->
    </div>
  </div>
</div>
```

### After (With Optimized Image)
```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import OptimizedImage from '@/components/OptimizedImage.astro';
import heroImage from '@/assets/images/hero/prof-mark-hero.jpg';
---

<BaseLayout>
  <div class="hero">
    <OptimizedImage
      src={heroImage}
      alt="Prof. Mark Eidelman - Pediatric Orthopedic Specialist"
      width={1920}
      height={1080}
      loading="eager"
      quality={90}
      format="webp"
      class="hero-background"
    />
    <div class="hero-wrapper">
      <div class="hero-content">
        <h1>Leading the Future of Pediatric Orthopedics</h1>
        <!-- ... rest of content ... -->
      </div>
    </div>
  </div>
</BaseLayout>

<style>
  .hero {
    position: relative;
    min-height: 600px;
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .hero-wrapper {
    position: relative;
    z-index: 1;
  }
</style>
```

## Example 2: Adding Clinic Photos to Clinics Page

### Step 1: Add images to your project
```bash
# Add these images:
src/assets/images/clinics/haifa-exterior.jpg
src/assets/images/clinics/haifa-interior.jpg
src/assets/images/clinics/kiryat-exterior.jpg
src/assets/images/clinics/kiryat-interior.jpg
```

### Step 2: Update clinics.astro
```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import BookingButton from '@/components/BookingButton';
import ResponsivePicture from '@/components/ResponsivePicture.astro';

// Import clinic images
import haifaExterior from '@/assets/images/clinics/haifa-exterior.jpg';
import haifaInterior from '@/assets/images/clinics/haifa-interior.jpg';
import kiryatExterior from '@/assets/images/clinics/kiryat-exterior.jpg';
import kiryatInterior from '@/assets/images/clinics/kiryat-interior.jpg';
---

<BaseLayout title="Clinics - Prof. Mark Eidelman">
  <div class="page active">
    <div class="clinics-grid">
      <div class="clinic-card">
        <div class="clinic-header">🏥 HAIFA CLINIC</div>

        <!-- Add clinic photos -->
        <div class="clinic-photos">
          <ResponsivePicture
            src={haifaExterior}
            alt="Haifa Clinic - Exterior View"
            widths={[400, 800]}
            sizes="(max-width: 768px) 100vw, 50vw"
            class="clinic-photo"
          />
          <ResponsivePicture
            src={haifaInterior}
            alt="Haifa Clinic - Interior"
            widths={[400, 800]}
            sizes="(max-width: 768px) 100vw, 50vw"
            class="clinic-photo"
          />
        </div>

        <div class="clinic-content">
          <!-- ... existing content ... -->
        </div>
      </div>
    </div>
  </div>
</BaseLayout>

<style>
  .clinic-photos {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
    margin-bottom: 24px;
  }

  .clinic-photo {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
    height: auto;
  }
</style>
```

## Example 3: Adding Team Photo to About Page

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import OptimizedImage from '@/components/OptimizedImage.astro';
import profMarkPortrait from '@/assets/images/team/prof-mark-portrait.jpg';
---

<BaseLayout>
  <div class="page active">
    <div class="hero">
      <div class="hero-wrapper">
        <div class="hero-content-with-image">
          <!-- Add professional portrait -->
          <div class="portrait-container">
            <OptimizedImage
              src={profMarkPortrait}
              alt="Prof. Mark Eidelman"
              width={400}
              height={500}
              quality={90}
              format="webp"
              class="portrait"
            />
          </div>

          <div class="text-content">
            <h1>Leading the Future of Pediatric Orthopedics</h1>
            <h3>Limb Lengthening & Deformity Correction Specialist</h3>
            <p>
              <b>Prof. Mark Eidelman</b> brings over...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</BaseLayout>

<style>
  .hero-content-with-image {
    display: flex;
    gap: 40px;
    align-items: center;
  }

  .portrait-container {
    flex-shrink: 0;
  }

  .portrait {
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    .hero-content-with-image {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
```

## Example 4: Adding Service Icons/Images

```astro
---
import OptimizedImage from '@/components/OptimizedImage.astro';
import limbLengthening from '@/assets/images/services/limb-lengthening.jpg';
import deformityCorrection from '@/assets/images/services/deformity-correction.jpg';
import pediatricCare from '@/assets/images/services/pediatric-care.jpg';
---

<div class="cards-grid">
  <div class="card">
    <OptimizedImage
      src={limbLengthening}
      alt="Limb Lengthening Surgery"
      width={600}
      height={400}
      class="card-image"
    />
    <div class="card-content">
      <h3>Cosmetic Limb Lengthening</h3>
      <p>Enhance height through bilateral leg lengthening surgery...</p>
    </div>
  </div>

  <!-- More cards... -->
</div>

<style>
  .card {
    overflow: hidden;
  }

  .card-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px 8px 0 0;
  }
</style>
```

## Example 5: Background Images with CSS

### Option A: Using CSS background-image
```astro
---
import heroBackground from '@/assets/images/hero/medical-facility.jpg';
---

<div class="hero" style={`background-image: url(${heroBackground.src})`}>
  <div class="hero-content">
    <h1>Your Content Here</h1>
  </div>
</div>

<style>
  .hero {
    background-size: cover;
    background-position: center;
    min-height: 600px;
  }
</style>
```

### Option B: Using img tag positioned absolutely
```astro
---
import OptimizedImage from '@/components/OptimizedImage.astro';
import heroBackground from '@/assets/images/hero/medical-facility.jpg';
---

<div class="hero">
  <OptimizedImage
    src={heroBackground}
    alt=""
    width={1920}
    height={1080}
    loading="eager"
    class="hero-bg-image"
  />
  <div class="hero-content">
    <h1>Your Content Here</h1>
  </div>
</div>

<style>
  .hero {
    position: relative;
    min-height: 600px;
  }

  .hero-bg-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: -1;
  }

  .hero-content {
    position: relative;
    z-index: 1;
  }
</style>
```

## Quick Migration Checklist for Existing Pages

For each page that needs images:

1. **Create image directory** (if not exists)
   ```bash
   mkdir -p src/assets/images/[page-name]
   ```

2. **Add your images** to that directory
   ```bash
   # Example:
   src/assets/images/hero/banner.jpg
   ```

3. **Import the image** at the top of your .astro file
   ```astro
   ---
   import myImage from '@/assets/images/hero/banner.jpg';
   ---
   ```

4. **Use the appropriate component**
   - Single image → `OptimizedImage`
   - Responsive with multiple sizes → `ResponsivePicture`

5. **Set appropriate props**
   - `loading="eager"` for above-fold
   - `loading="lazy"` for below-fold
   - `quality={90}` for important images
   - `quality={80}` for regular images

## Common Patterns

### Gallery Grid
```astro
---
import ResponsivePicture from '@/components/ResponsivePicture.astro';
import gallery1 from '@/assets/images/gallery/image1.jpg';
import gallery2 from '@/assets/images/gallery/image2.jpg';
import gallery3 from '@/assets/images/gallery/image3.jpg';
---

<div class="gallery">
  {[gallery1, gallery2, gallery3].map((image, i) => (
    <ResponsivePicture
      src={image}
      alt={`Gallery image ${i + 1}`}
      widths={[400, 800]}
      sizes="(max-width: 768px) 100vw, 33vw"
      class="gallery-item"
    />
  ))}
</div>
```

### Logo/Icon (SVG - no optimization needed)
```astro
<!-- Use regular img for SVGs -->
<img
  src="/images/logo.svg"
  alt="Company Logo"
  width="200"
  height="50"
  class="logo"
/>
```

### Testimonial Avatar
```astro
---
import OptimizedImage from '@/components/OptimizedImage.astro';
---

<div class="testimonial">
  <OptimizedImage
    src="/images/testimonials/avatar-placeholder.jpg"
    alt="Patient photo"
    width={80}
    height={80}
    class="avatar"
  />
  <div class="testimonial-content">
    <!-- ... -->
  </div>
</div>
```
