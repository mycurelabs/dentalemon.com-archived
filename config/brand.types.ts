/**
 * Brand Configuration Type Definitions
 *
 * These interfaces define the structure for all configurable brand elements
 * in the healthcare website template. Healthcare-specific terminology (HIPAA,
 * EMR, PhilHealth, etc.) remains in data files - only brand identity is here.
 */

// ============================================
// Company Identity
// ============================================

export interface CompanyIdentity {
  /** Legal company name for copyright, terms, privacy policy */
  legalName: string;
  /** Display name for marketing and UI (may differ from legal) */
  displayName: string;
  /** Short name for compact spaces (nav badges, footer) */
  shortName: string;
  /** Company tagline/slogan */
  tagline: string;
  /** Extended description for meta tags and about sections */
  description: string;
  /** Year company was founded (for copyright notices) */
  foundedYear: number;
}

// ============================================
// Color System
// ============================================

export interface GradientColors {
  /** Primary gradient color */
  primary: string;
  /** Secondary gradient color */
  secondary: string;
  /** Tertiary gradient color */
  tertiary: string;
  /** Quaternary gradient color */
  quaternary: string;
  /** Quinary gradient color */
  quinary: string;
  /** Background color for gradient sections */
  background: string;
}

export interface BrandColors {
  /** Primary brand color (hex) - used for CTAs, links, primary actions */
  primary: string;
  /** Light mode gradient colors */
  gradients: GradientColors;
  /** Dark mode gradient colors */
  gradientsDark: GradientColors;
}

// ============================================
// URLs and External Links
// ============================================

export interface ExternalURLs {
  /** Main marketing website (e.g., "https://example.com") */
  website: string;
  /** Application portal/login URL */
  portal: string;
  /** CMS/admin login URL (optional) */
  cms?: string;
  /** Help center / documentation URL */
  help: string;
  /** Blog URL */
  blog: string;
  /** Company culture/careers page */
  culture?: string;
  /** Demo scheduling URL (e.g., Calendly) */
  demo: string;
  /** Contact page URL */
  contact?: string;
  /** Privacy policy page path (relative) */
  privacyPath: string;
  /** Terms of service page path (relative) */
  termsPath: string;
}

export interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

// ============================================
// Assets
// ============================================

export interface BrandAssets {
  /** Path to primary logo (SVG preferred) */
  logo: string;
  /** Alt text for logo */
  logoAlt: string;
  /** Path to favicon.ico */
  favicon: string;
  /** Path to favicon 16x16 */
  favicon16?: string;
  /** Path to favicon 32x32 */
  favicon32?: string;
  /** Path to apple touch icon (180x180) */
  appleTouchIcon?: string;
  /** Path to OG image (1200x630) */
  ogImage: string;
}

// ============================================
// SEO & Metadata
// ============================================

export interface SEOConfig {
  /** Default meta title template (%s = page title) */
  titleTemplate: string;
  /** Default title when no page title provided */
  defaultTitle: string;
  /** Site-wide meta description */
  defaultDescription: string;
  /** Primary keywords array */
  keywords: string[];
  /** Twitter handle (without @) */
  twitterHandle?: string;
  /** Open Graph locale (e.g., "en_PH", "en_US") */
  locale: string;
}

// ============================================
// Structured Data (JSON-LD)
// ============================================

export interface OrganizationSchema {
  name: string;
  alternateName?: string;
  url: string;
  logo: string;
  description: string;
  email?: string;
  telephone?: string;
  foundingDate?: string;
  address?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion: string;
    postalCode?: string;
    addressCountry: string;
  };
  sameAs: string[];
}

export interface SoftwareApplicationSchema {
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  description: string;
  screenshot?: string;
  featureList?: string[];
  offers?: {
    price: string;
    priceCurrency: string;
  };
}

// ============================================
// Contact Information
// ============================================

export interface ContactInfo {
  /** Primary contact email */
  email: string;
  /** Support/helpdesk email */
  supportEmail?: string;
  /** Sales email */
  salesEmail?: string;
  /** Security vulnerability reporting email */
  securityEmail?: string;
  /** Primary phone number (international format) */
  phone?: string;
}

// ============================================
// Navigation Configuration
// ============================================

export interface NavigationConfig {
  /** URL for login/CMS button */
  loginUrl: string;
  /** URL for primary CTA button */
  ctaUrl: string;
  /** Text for primary CTA button */
  ctaText: string;
}

// ============================================
// Main BrandConfig Interface
// ============================================

export interface BrandConfig {
  /** Company identity information */
  company: CompanyIdentity;
  /** Brand colors */
  colors: BrandColors;
  /** External URLs */
  urls: ExternalURLs;
  /** Social media links */
  social: SocialMediaLinks;
  /** Brand assets (logos, favicons, etc.) */
  assets: BrandAssets;
  /** SEO and metadata configuration */
  seo: SEOConfig;
  /** JSON-LD organization schema */
  organizationSchema: OrganizationSchema;
  /** JSON-LD software application schema (optional) */
  softwareSchema?: SoftwareApplicationSchema;
  /** Contact information */
  contact: ContactInfo;
  /** Navigation configuration */
  navigation: NavigationConfig;
}
