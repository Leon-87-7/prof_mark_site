// Object schemas (reusable building blocks)
import localizedString from './objects/localizedString';
import localizedText from './objects/localizedText';
import stat from './objects/stat';
import ctaButton from './objects/ctaButton';
import seo from './objects/seo';

// Document schemas (singleton pages)
import siteSettings from './documents/siteSettings';
import homePage from './documents/homePage';
import aboutPage from './documents/aboutPage';
import innovationPage from './documents/innovationPage';
import guidesPage from './documents/guidesPage';
import studyPage from './documents/studyPage';

// Document schemas (collections)
import clinic from './documents/clinic';
import service from './documents/service';
import innovation from './documents/innovation';
import publication from './documents/publication';
import guide from './documents/guide';
import faq from './documents/faq';
import studyContent from './documents/studyContent';
import testimonial from './documents/testimonial';

export const schemaTypes = [
  // Objects (must be registered first as they're used by documents)
  localizedString,
  localizedText,
  stat,
  ctaButton,
  seo,

  // Singleton documents (one instance each)
  siteSettings,
  homePage,
  aboutPage,
  innovationPage,
  guidesPage,
  studyPage,

  // Collection documents (multiple instances)
  clinic,
  service,
  innovation,
  publication,
  guide,
  faq,
  studyContent,
  testimonial,
];
