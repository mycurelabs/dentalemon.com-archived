/**
 * Brand Configuration Example - MYCURE Reference
 *
 * This file contains the original MYCURE brand values as a reference
 * for how to customize the template for your own brand.
 *
 * DO NOT import this file in your application.
 * Copy values you need to brand.ts and customize them.
 */

import type { BrandConfig } from "./brand.types";

/**
 * MYCURE Brand Configuration (Reference Only)
 *
 * This configuration was used by MYCURE, a Philippine healthcare
 * clinic management system. Use this as a guide for your own branding.
 */
export const mycureBrandConfig: BrandConfig = {
  // ============================================
  // Company Identity
  // ============================================
  company: {
    legalName: "TOPSI Inc.",
    displayName: "MYCURE",
    shortName: "MYCURE",
    tagline: "Clinic Management Made Simple",
    description:
      "Transform your healthcare practice with the clinic management system designed for Philippine healthcare—secure, offline-capable, and ready to simplify your entire operation.",
    foundedYear: 2013,
  },

  // ============================================
  // Brand Colors - MYCURE Blue Theme
  // ============================================
  colors: {
    primary: "#0099CC",
    gradients: {
      primary: "#008FCC",
      secondary: "#0085CC",
      tertiary: "#00B8CC",
      quaternary: "#0099CC",
      quinary: "#0099CC",
      background: "#c7e2ff",
    },
    gradientsDark: {
      primary: "#33A6D6",
      secondary: "#3BA2D6",
      tertiary: "#4DC2D6",
      quaternary: "#47B8D6",
      quinary: "#47B8D6",
      background: "#1a2631",
    },
  },

  // ============================================
  // External URLs
  // ============================================
  urls: {
    website: "https://mycure.md",
    portal: "https://portal.mycureapp.com",
    cms: "https://next.cms.mycure.md",
    help: "https://help.mycure.md",
    blog: "https://blog.mycure.md",
    culture: "https://culture.mycure.md",
    demo: "https://calendly.com/mycure/demo",
    contact: "https://mycure.md/contact",
    privacyPath: "/privacy-policy",
    termsPath: "/terms-and-conditions",
  },

  // ============================================
  // Social Media
  // ============================================
  social: {
    facebook: "https://www.facebook.com/mycure.md/",
    instagram: "https://www.instagram.com/mycure.md/",
    linkedin: "https://www.linkedin.com/company/mycure",
    twitter: undefined, // @mycaboret was the handle
    youtube: undefined,
  },

  // ============================================
  // Brand Assets
  // ============================================
  assets: {
    logo: "/mycure-logo.svg",
    logoAlt: "MYCURE Logo",
    favicon: "/favicon.ico",
    favicon16: "/favicon-16x16.png",
    favicon32: "/favicon-32x32.png",
    appleTouchIcon: "/apple-touch-icon.png",
    ogImage: "/og-image.png",
  },

  // ============================================
  // SEO Configuration
  // ============================================
  seo: {
    titleTemplate: "%s | MYCURE",
    defaultTitle: "MYCURE - Clinic Management System for Philippine Healthcare",
    defaultDescription:
      "Transform your healthcare practice with the clinic management system designed for Philippine healthcare—secure, offline-capable, and ready to simplify your entire operation.",
    keywords: [
      "clinic management system",
      "healthcare management software",
      "EMR Philippines",
      "electronic medical records",
      "clinic software Philippines",
      "HIPAA compliant healthcare software",
      "patient management system",
      "medical practice management",
      "healthcare automation",
    ],
    twitterHandle: "mycaboret",
    locale: "en_PH",
  },

  // ============================================
  // Organization Schema (JSON-LD)
  // ============================================
  organizationSchema: {
    name: "MYCURE",
    alternateName: "TOPSI Inc.",
    url: "https://mycure.md",
    logo: "https://mycure.md/mycure-logo.svg",
    description:
      "Clinic management software for Philippine healthcare providers with EMR, scheduling, billing, and PhilHealth integration.",
    email: "helpdesk@mycure.md",
    foundingDate: "2013",
    address: {
      addressLocality: "Philippines",
      addressRegion: "Metro Manila",
      addressCountry: "PH",
    },
    sameAs: [
      "https://www.facebook.com/mycure.md",
      "https://www.linkedin.com/company/mycure",
    ],
  },

  // ============================================
  // Software Application Schema (JSON-LD)
  // ============================================
  softwareSchema: {
    name: "MYCURE",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web Browser",
    description:
      "Clinic management system for Philippine healthcare with EMR, PhilHealth integration, and offline capability.",
    screenshot: "https://mycure.md/og-image.png",
    featureList: [
      "Electronic Medical Records (EMR)",
      "Patient Registration",
      "Appointment Scheduling",
      "HIPAA Compliance",
      "Offline Capability",
      "Telehealth",
      "Lab Management",
      "Pharmacy Management",
      "Billing & Invoicing",
      "PhilHealth Integration",
    ],
    offers: {
      price: "0",
      priceCurrency: "PHP",
    },
  },

  // ============================================
  // Contact Information
  // ============================================
  contact: {
    email: "helpdesk@mycure.md",
    supportEmail: "helpdesk@mycure.md",
    salesEmail: "sales@mycure.md",
    phone: undefined,
  },

  // ============================================
  // Navigation Configuration
  // ============================================
  navigation: {
    loginUrl: "https://next.cms.mycure.md/",
    ctaUrl: "https://calendly.com/mycure/demo",
    ctaText: "Get Started",
  },
};

// Note: This file is for reference only.
// Do not import mycureBrandConfig in your application.
