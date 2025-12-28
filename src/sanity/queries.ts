import groq from 'groq';

// ============================================================================
// SITE SETTINGS
// ============================================================================

/**
 * Query for global site settings (navigation, header, footer)
 */
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteName,
  siteSubtitle,
  contactButtonText,
  navigation {
    about,
    clinics,
    services,
    innovation,
    guides,
    study
  },
  footer {
    quickLinksTitle,
    contactTitle,
    infoTitle,
    copyright,
    phone,
    location,
    addresses[],
    infoLinks {
      privacy,
      terms,
      accessibility,
      sitemap,
      comingSoon
    }
  },
  defaultSeo
}`;

// ============================================================================
// PAGE QUERIES
// ============================================================================

/**
 * Query for home page content
 */
export const homePageQuery = groq`*[_type == "homePage"][0]{
  hero {
    title,
    subtitle,
    descriptionLine1,
    descriptionLine2,
    descriptionLine3,
    descriptionLine4,
    descriptionHighlighted,
    descriptionClosing,
    image,
    stats[] {
      number,
      label
    },
    ctaButtons[] {
      text,
      link,
      variant
    }
  },
  credentials {
    title,
    education {
      title,
      items[]
    },
    specializations {
      title,
      items[]
    }
  },
  testimonials {
    title,
    items[]-> {
      _id,
      author,
      rating,
      ratingNumber,
      text,
      image
    }
  },
  seo
}`;

/**
 * Query for about page content
 */
export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  title,
  intro,
  expertise {
    title,
    text
  },
  specializations {
    title,
    items[] {
      title,
      description
    }
  },
  academic {
    title,
    paragraphs[]
  },
  educationAffiliations {
    title,
    education {
      title,
      items[]
    },
    memberships {
      title,
      items[]
    }
  },
  seo
}`;

/**
 * Query for innovation page content
 */
export const innovationPageQuery = groq`*[_type == "innovationPage"][0]{
  title,
  subtitle,
  keyInnovations {
    title,
    techniques {
      title,
      items[]
    },
    researchFocus {
      title,
      items[]
    }
  },
  publicationsTitle,
  seo
}`;

/**
 * Query for guides page content
 */
export const guidesPageQuery = groq`*[_type == "guidesPage"][0]{
  title,
  subtitle,
  quickAccess {
    preSurgery,
    postSurgery,
    ptExercises,
    recoveryTimeline
  },
  preSurgerySectionTitle,
  postSurgerySectionTitle,
  bundle {
    title,
    description,
    ctaText,
    "fileUrl": file.asset->url
  },
  faqSectionTitle,
  seo
}`;

/**
 * Query for study page content
 */
export const studyPageQuery = groq`*[_type == "studyPage"][0]{
  title,
  subtitle,
  search {
    placeholder,
    filters {
      all,
      articles,
      caseStudies,
      lectures,
      research
    }
  },
  subscribe {
    title,
    description,
    placeholder,
    ctaText
  },
  seo
}`;

// ============================================================================
// COLLECTION QUERIES
// ============================================================================

/**
 * Query for all clinics, ordered by display order
 */
export const clinicsQuery = groq`*[_type == "clinic"] | order(order asc) {
  _id,
  identifier,
  emoji,
  title,
  subtitle,
  locationLabel,
  location,
  hoursLabel,
  hours,
  servicesTitle,
  services[],
  ctaText,
  phone,
  mapEmbedUrl,
  visibleForLocales,
  order
}`;

/**
 * Query for all services, ordered by display order
 */
export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id,
  identifier,
  emoji,
  title,
  description,
  ctaText,
  ctaLink,
  isFeatured,
  featuredContent {
    sectionTitle,
    what {
      title,
      description
    },
    who {
      title,
      items[]
    },
    outcomes {
      title,
      items[]
    },
    timeline {
      title,
      items[]
    },
    ctaText
  },
  order
}`;

/**
 * Query for all innovation cards, ordered by display order
 */
export const innovationsQuery = groq`*[_type == "innovation"] | order(order asc) {
  _id,
  identifier,
  emoji,
  title,
  description,
  ctaText,
  ctaLink,
  order
}`;

/**
 * Query for all publications, ordered by year (newest first)
 */
export const publicationsQuery = groq`*[_type == "publication"] | order(year desc, order asc) {
  _id,
  title,
  journal,
  description,
  year,
  ctaText,
  link,
  order
}`;

/**
 * Query for all patient guides, grouped by category
 */
export const guidesQuery = groq`*[_type == "guide"] | order(category, order asc) {
  _id,
  identifier,
  emoji,
  title,
  description,
  category,
  ctaText,
  "downloadUrl": downloadFile.asset->url,
  order
}`;

/**
 * Query for pre-surgery guides only
 */
export const preSurgeryGuidesQuery = groq`*[_type == "guide" && category == "pre_surgery"] | order(order asc) {
  _id,
  identifier,
  emoji,
  title,
  description,
  ctaText,
  "downloadUrl": downloadFile.asset->url,
  order
}`;

/**
 * Query for post-surgery guides only
 */
export const postSurgeryGuidesQuery = groq`*[_type == "guide" && category == "post_surgery"] | order(order asc) {
  _id,
  identifier,
  emoji,
  title,
  description,
  ctaText,
  "downloadUrl": downloadFile.asset->url,
  order
}`;

/**
 * Query for all FAQs, ordered by display order
 */
export const faqsQuery = groq`*[_type == "faq"] | order(order asc) {
  _id,
  identifier,
  question,
  answer,
  category,
  order
}`;

/**
 * Query for all study content, ordered by display order
 */
export const studyContentQuery = groq`*[_type == "studyContent"] | order(order asc) {
  _id,
  identifier,
  emoji,
  title,
  contentType,
  typeLabel,
  date,
  dateLabel,
  duration,
  description,
  ctaText,
  link,
  cardColor,
  order
}`;

/**
 * Query for study content filtered by type
 */
export const studyContentByTypeQuery = groq`*[_type == "studyContent" && contentType == $contentType] | order(order asc) {
  _id,
  identifier,
  emoji,
  title,
  contentType,
  typeLabel,
  date,
  dateLabel,
  duration,
  description,
  ctaText,
  link,
  cardColor,
  order
}`;

/**
 * Query for all testimonials, ordered by display order
 */
export const testimonialsQuery = groq`*[_type == "testimonial"] | order(order asc) {
  _id,
  author,
  rating,
  ratingNumber,
  text,
  image,
  order
}`;

// ============================================================================
// COMBINED QUERIES (for page rendering efficiency)
// ============================================================================

/**
 * Combined query for clinics page - gets page title and all clinics
 */
export const clinicsPageDataQuery = groq`{
  "settings": *[_type == "siteSettings"][0]{
    siteName
  },
  "clinics": *[_type == "clinic"] | order(order asc) {
    _id,
    identifier,
    emoji,
    title,
    subtitle,
    locationLabel,
    location,
    hoursLabel,
    hours,
    servicesTitle,
    services[],
    ctaText,
    phone,
    mapEmbedUrl,
    visibleForLocales
  }
}`;

/**
 * Combined query for services page - gets services and featured content
 */
export const servicesPageDataQuery = groq`{
  "services": *[_type == "service"] | order(order asc) {
    _id,
    identifier,
    emoji,
    title,
    description,
    ctaText,
    ctaLink,
    isFeatured,
    featuredContent
  }
}`;

/**
 * Combined query for innovation page
 */
export const innovationPageDataQuery = groq`{
  "page": *[_type == "innovationPage"][0]{
    title,
    subtitle,
    keyInnovations,
    publicationsTitle,
    seo
  },
  "cards": *[_type == "innovation"] | order(order asc) {
    _id,
    identifier,
    emoji,
    title,
    description,
    ctaText,
    ctaLink
  },
  "publications": *[_type == "publication"] | order(year desc, order asc) {
    _id,
    title,
    journal,
    description,
    year,
    ctaText,
    link
  }
}`;

/**
 * Combined query for guides page
 */
export const guidesPageDataQuery = groq`{
  "page": *[_type == "guidesPage"][0]{
    title,
    subtitle,
    quickAccess,
    preSurgerySectionTitle,
    postSurgerySectionTitle,
    bundle,
    faqSectionTitle,
    seo
  },
  "preSurgery": *[_type == "guide" && category == "pre_surgery"] | order(order asc) {
    _id,
    identifier,
    emoji,
    title,
    description,
    ctaText,
    "downloadUrl": downloadFile.asset->url
  },
  "postSurgery": *[_type == "guide" && category == "post_surgery"] | order(order asc) {
    _id,
    identifier,
    emoji,
    title,
    description,
    ctaText,
    "downloadUrl": downloadFile.asset->url
  },
  "faqs": *[_type == "faq"] | order(order asc) {
    _id,
    identifier,
    question,
    answer,
    category
  }
}`;

/**
 * Combined query for study page
 */
export const studyPageDataQuery = groq`{
  "page": *[_type == "studyPage"][0]{
    title,
    subtitle,
    search,
    subscribe,
    seo
  },
  "content": *[_type == "studyContent"] | order(order asc) {
    _id,
    identifier,
    emoji,
    title,
    contentType,
    typeLabel,
    date,
    dateLabel,
    duration,
    description,
    ctaText,
    link,
    cardColor
  }
}`;
