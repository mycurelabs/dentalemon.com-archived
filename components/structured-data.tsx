/**
 * Structured Data (JSON-LD) for SEO
 *
 * SECURITY NOTE: This component uses dangerouslySetInnerHTML to inject JSON-LD
 * scripts. This is safe because:
 * 1. All schema data is derived from static brand configuration
 * 2. No user input or dynamic data is used in the schemas
 * 3. JSON.stringify() properly escapes the static objects
 *
 * If schema data ever becomes dynamic (e.g., from CMS or API), this must be
 * refactored to use proper sanitization or Next.js metadata API.
 */
import { brandConfig } from "@/config";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandConfig.organizationSchema.name,
    alternateName: brandConfig.organizationSchema.alternateName,
    url: brandConfig.organizationSchema.url,
    logo: brandConfig.organizationSchema.logo,
    description: brandConfig.organizationSchema.description,
    foundingDate: brandConfig.organizationSchema.foundingDate,
    foundingLocation: brandConfig.organizationSchema.address
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressCountry: brandConfig.organizationSchema.address.addressCountry,
          },
        }
      : undefined,
    sameAs: brandConfig.organizationSchema.sameAs,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: brandConfig.urls.portal,
      email: brandConfig.contact.supportEmail || brandConfig.contact.email,
    },
  };

  const softwareSchema = brandConfig.softwareSchema
    ? {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: brandConfig.softwareSchema.name,
        applicationCategory: brandConfig.softwareSchema.applicationCategory,
        operatingSystem: brandConfig.softwareSchema.operatingSystem,
        offers: brandConfig.softwareSchema.offers
          ? {
              "@type": "Offer",
              price: brandConfig.softwareSchema.offers.price,
              priceCurrency: brandConfig.softwareSchema.offers.priceCurrency,
              description: "Free trial available",
            }
          : undefined,
        featureList: brandConfig.softwareSchema.featureList,
        screenshot: brandConfig.softwareSchema.screenshot,
        softwareHelp: {
          "@type": "WebPage",
          url: brandConfig.urls.help,
        },
      }
    : null;

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brandConfig.company.displayName,
    url: brandConfig.urls.website,
    description: brandConfig.company.description,
    publisher: {
      "@type": "Organization",
      name: brandConfig.company.displayName,
      url: brandConfig.urls.website,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is ${brandConfig.company.displayName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${brandConfig.company.displayName} is a comprehensive dental practice management platform designed specifically for dental practices. It streamlines every aspect of your operations—from patient records and scheduling to billing and patient communication—in one unified, offline-capable system.`,
        },
      },
      {
        "@type": "Question",
        name: `How much does ${brandConfig.company.displayName} cost?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Plans start at ₱5,000 (one-time) for solo practitioners, with our most popular Professional plan at ₱15,000 (one-time) for growing practices. Enterprise pricing is customized for multi-location practices. All plans include a 14-day free trial—no credit card required.`,
        },
      },
      {
        "@type": "Question",
        name: `Is ${brandConfig.company.displayName} HIPAA compliant?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. ${brandConfig.company.displayName} is built with HIPAA compliance at its core. We provide end-to-end encryption, role-based access controls, comprehensive audit trails, and secure data storage.`,
        },
      },
      {
        "@type": "Question",
        name: `Can I use ${brandConfig.company.displayName} offline?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Absolutely. ${brandConfig.company.displayName}'s offline capability is one of our key features. You can access patient records, schedule appointments, and continue billing even without internet. When connectivity returns, everything syncs automatically.`,
        },
      },
      {
        "@type": "Question",
        name: "How long does implementation take?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most practices are up and running within a day for basic features. Full implementation, including data migration and staff training, typically takes 1-2 weeks depending on practice size.",
        },
      },
      {
        "@type": "Question",
        name: "Can I migrate my existing patient data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. We provide data migration assistance with all plans. Our team will help you securely transfer your existing patient records, treatment history, and other critical data into ${brandConfig.company.displayName}.`,
        },
      },
      {
        "@type": "Question",
        name: "What kind of support do you offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: `${brandConfig.company.displayName} provides comprehensive support: in-app help center with guides and video tutorials, email support with 24-hour response time, priority phone support for Professional and Enterprise plans, and dedicated success managers for Enterprise clients.`,
        },
      },
      {
        "@type": "Question",
        name: "What if it doesn't work for my practice?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We offer a 14-day free trial so you can fully explore the platform before committing. If you sign up and find it's not right for your practice, we offer a 30-day money-back guarantee—no questions asked.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {softwareSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
