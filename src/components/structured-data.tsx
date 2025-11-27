export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Dentalemon",
    url: "https://dentalemon.com",
    logo: "https://dentalemon.com/logo.png",
    description:
      "Dental practice management software that automates scheduling, billing, and patient records for modern dental clinics.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "sales",
      email: "info@dentalemon.com",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Dental Street",
      addressLocality: "New York",
      addressRegion: "NY",
      postalCode: "10001",
      addressCountry: "US",
    },
    sameAs: [
      "https://twitter.com/dentalemon",
      "https://linkedin.com/company/dentalemon",
      "https://facebook.com/dentalemon",
    ],
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Dentalemon",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    description:
      "HIPAA-compliant dental practice management software with scheduling, billing, patient records, and analytics.",
    offers: [
      {
        "@type": "Offer",
        name: "Starter",
        price: "99",
        priceCurrency: "USD",
        priceValidUntil: "2025-12-31",
        availability: "https://schema.org/InStock",
        description: "Perfect for solo practitioners - up to 1 provider, 500 active patients",
      },
      {
        "@type": "Offer",
        name: "Professional",
        price: "299",
        priceCurrency: "USD",
        priceValidUntil: "2025-12-31",
        availability: "https://schema.org/InStock",
        description: "Ideal for growing practices - up to 5 providers, unlimited patients",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "156",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Appointment Scheduling",
      "Patient Records Management",
      "Billing & Insurance Claims",
      "Patient Portal",
      "Analytics & Reporting",
      "Automated Communications",
      "HIPAA Compliance",
      "Offline Mode",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dentalemon",
    url: "https://dentalemon.com",
    description: "Dental practice management software for modern clinics",
    publisher: {
      "@type": "Organization",
      name: "Dentalemon",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://dentalemon.com/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Dentalemon?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dentalemon is a comprehensive dental practice management software that helps dental clinics automate scheduling, billing, patient records, and communications. It's HIPAA-compliant and designed for modern dental practices of all sizes.",
        },
      },
      {
        "@type": "Question",
        name: "Is Dentalemon HIPAA compliant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Dentalemon is fully HIPAA compliant with enterprise-grade security, encrypted storage, role-based access controls, and comprehensive audit trails to protect sensitive patient information.",
        },
      },
      {
        "@type": "Question",
        name: "Does Dentalemon work offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Dentalemon offers seamless offline operations. You can continue managing patient records, scheduling, and billing during internet outages, with automatic synchronization when connectivity restores.",
        },
      },
      {
        "@type": "Question",
        name: "How much does Dentalemon cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dentalemon offers three pricing tiers: Starter at $99/month for solo practitioners, Professional at $299/month for growing practices with up to 5 providers, and Enterprise with custom pricing for multi-location practices.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
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
