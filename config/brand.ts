/**
 * Brand Configuration
 *
 * Dentalemon - Dental Practice Management Software
 * Yellow color scheme with dental-focused branding
 */

import type { BrandConfig } from "./brand.types";

export const brandConfig: BrandConfig = {
  // ============================================
  // Company Identity
  // ============================================
  company: {
    legalName: "Dentalemon Inc.",
    displayName: "Dentalemon",
    shortName: "DL",
    tagline: "Run Your Dental Practice Without the Paperwork",
    description:
      "Automate scheduling, billing, and patient records so you can focus on patient care and growing your practice.",
    foundedYear: 2024,
  },

  // ============================================
  // Brand Colors (Yellow Theme)
  // ============================================
  colors: {
    primary: "#FFCC5E",
    gradients: {
      primary: "#FFCC5E",
      secondary: "#FFE4A0",
      tertiary: "#FFF5D6",
      quaternary: "#FFFBEB",
      quinary: "#FFFFFF",
      background: "#FFFEF7",
    },
    gradientsDark: {
      primary: "#FFCC5E",
      secondary: "#D4A84A",
      tertiary: "#A68339",
      quaternary: "#785F2A",
      quinary: "#4A3B1B",
      background: "#1A1708",
    },
  },

  // ============================================
  // External URLs
  // ============================================
  urls: {
    website: "https://dentalemon.com",
    portal: "https://app.dentalemon.com",
    cms: "https://app.dentalemon.com",
    help: "https://help.dentalemon.com",
    blog: "https://dentalemon.com/blog",
    culture: "https://dentalemon.com/careers",
    demo: "https://calendly.com/dentalemon/demo",
    contact: "https://dentalemon.com/contact",
    privacyPath: "/privacy-policy",
    termsPath: "/terms-and-conditions",
    accountUrl: process.env.NEXT_PUBLIC_ACCOUNT_URL || "https://app.dentalemon.com",
  },

  // ============================================
  // Social Media
  // ============================================
  social: {
    facebook: "https://facebook.com/dentalemon",
    instagram: undefined,
    linkedin: "https://linkedin.com/company/dentalemon",
    twitter: "https://twitter.com/dentalemon",
    youtube: undefined,
  },

  // ============================================
  // Brand Assets
  // ============================================
  assets: {
    logo: "/logo.png",
    logoAlt: "Dentalemon Logo",
    favicon: "/favicon.ico",
    ogImage: "/og-image.png",
  },

  // ============================================
  // SEO Configuration
  // ============================================
  seo: {
    titleTemplate: "%s | Dentalemon",
    defaultTitle: "Dentalemon - Dental Practice Management Software",
    defaultDescription:
      "Streamline your dental practice with Dentalemon. Automate scheduling, billing, and patient records. HIPAA-compliant software trusted by modern dental clinics.",
    keywords: [
      "dental practice management software",
      "dental practice management software Philippines",
      "dental clinic software",
      "dental scheduling software",
      "dental appointment booking system",
      "dental billing software",
      "dental billing software HIPAA",
      "HIPAA compliant dental software",
      "dental patient management",
      "dental patient portal software",
      "dental EHR",
      "dental office management",
      "dental office management system",
      "dentist software",
      "dental practice automation",
      "offline dental software",
      "dental records management",
      "best dental software for small practice",
    ],
    twitterHandle: "dentalemon",
    locale: "en_US",
  },

  // ============================================
  // Organization Schema (JSON-LD)
  // ============================================
  organizationSchema: {
    name: "Dentalemon",
    alternateName: "Dentalemon Inc.",
    url: "https://dentalemon.com",
    logo: "https://dentalemon.com/logo.png",
    description:
      "Dental practice management software for modern dental clinics.",
    email: "info@dentalemon.com",
    foundingDate: "2024",
    address: {
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
    sameAs: [
      "https://facebook.com/dentalemon",
      "https://linkedin.com/company/dentalemon",
      "https://twitter.com/dentalemon",
    ],
  },

  // ============================================
  // Software Application Schema (JSON-LD)
  // ============================================
  softwareSchema: {
    name: "Dentalemon",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    description:
      "Dental practice management system with scheduling, billing, patient records, and HIPAA compliance.",
    screenshot: "https://dentalemon.com/og-image.png",
    featureList: [
      "Appointment Scheduling",
      "Patient Records Management",
      "Billing & Payments",
      "Patient Portal",
      "Analytics & Reporting",
      "Automated Communications",
      "HIPAA Compliance",
      "Offline Capability",
    ],
    offers: {
      price: "5000",
      priceCurrency: "PHP",
    },
  },

  // ============================================
  // Contact Information
  // ============================================
  contact: {
    email: "info@dentalemon.com",
    supportEmail: "support@dentalemon.com",
    salesEmail: "sales@dentalemon.com",
    securityEmail: "security@dentalemon.com",
    phone: "(555) 123-4567",
  },

  // ============================================
  // Navigation Configuration
  // ============================================
  navigation: {
    loginUrl: "https://app.dentalemon.com",
    ctaUrl: "https://calendly.com/dentalemon/demo",
    ctaText: "Schedule a Demo",
  },
};

export default brandConfig;
