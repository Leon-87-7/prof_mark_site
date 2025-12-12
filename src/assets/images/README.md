# Image Assets Directory

This directory contains all images that will be optimized by Astro during build time.

## Directory Structure

```
src/assets/images/
├── hero/              # Hero section images (1920x1080 recommended)
├── clinics/           # Clinic photos (800x600 recommended)
├── team/              # Team member photos (400x500 recommended)
├── testimonials/      # Testimonial photos (80x80 for avatars)
└── services/          # Service-related images (600x400 recommended)
```

## Adding Images

1. Place your image in the appropriate directory
2. Use descriptive filenames (e.g., `haifa-clinic-exterior.jpg`)
3. Supported formats: JPG, PNG, WebP, AVIF
4. Recommended max size before optimization: 2-3 MB

## Image Guidelines

### Hero Images
- **Size**: 1920x1080px (16:9 aspect ratio)
- **Format**: JPG
- **Content**: High-quality photos of medical facilities, Prof. Eidelman, or related imagery
- **Examples**:
  - `prof-mark-hero.jpg`
  - `medical-facility-hero.jpg`
  - `surgery-room-hero.jpg`

### Clinic Photos
- **Size**: 800x600px (4:3 aspect ratio)
- **Format**: JPG
- **Content**: Exterior and interior clinic photos
- **Examples**:
  - `haifa-clinic-exterior.jpg`
  - `haifa-clinic-interior.jpg`
  - `kiryat-clinic-exterior.jpg`
  - `kiryat-clinic-waiting-room.jpg`

### Team Photos
- **Size**: 400x500px (portrait orientation)
- **Format**: JPG
- **Content**: Professional headshots
- **Examples**:
  - `prof-mark-portrait.jpg`
  - `dr-smith-headshot.jpg`

### Service Images
- **Size**: 600x400px (3:2 aspect ratio)
- **Format**: JPG
- **Content**: Illustrative images for each service
- **Examples**:
  - `limb-lengthening-procedure.jpg`
  - `deformity-correction-xray.jpg`
  - `pediatric-consultation.jpg`

### Testimonial Avatars
- **Size**: 80x80px (square)
- **Format**: JPG or PNG
- **Content**: Patient photos (optional, can use placeholders)
- **Examples**:
  - `avatar-placeholder.jpg`
  - `patient-sarah-m.jpg`

## Placeholder Images

Until you add your actual images, you can:
1. Use free stock photos from [Unsplash](https://unsplash.com/s/photos/medical)
2. Use [Pexels](https://www.pexels.com/search/hospital/)
3. Create placeholders with [Placeholder.com](https://placeholder.com/)

Example placeholders:
```
https://placehold.co/1920x1080/2c3e50/ffffff?text=Hero+Image
https://placehold.co/800x600/3498db/ffffff?text=Clinic+Photo
https://placehold.co/400x500/27ae60/ffffff?text=Team+Photo
```

## Optimization

All images in this directory will be:
- ✅ Automatically optimized during build
- ✅ Converted to modern formats (WebP, AVIF)
- ✅ Resized to multiple responsive sizes
- ✅ Served with appropriate caching headers

See [IMAGE_OPTIMIZATION_GUIDE.md](../../../IMAGE_OPTIMIZATION_GUIDE.md) for detailed usage instructions.
