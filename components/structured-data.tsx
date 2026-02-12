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
import { faqConfig } from "@/app/(home)/data";

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
      telephone: brandConfig.contact.phone,
      url: brandConfig.urls.portal,
      email: brandConfig.contact.supportEmail || brandConfig.contact.email,
      areaServed: brandConfig.organizationSchema.address?.addressCountry,
      availableLanguage: "English",
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
    mainEntity: faqConfig.items.map((item) => ({
      "@type": "Question" as const,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.answer,
      },
    })),
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
