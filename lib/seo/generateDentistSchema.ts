/**
 * Generate schema.org/Dentist JSON-LD structured data
 * For SEO optimization and rich search results
 */

import { Dentist, Schedule } from "@/types/dentist";
import { brandConfig } from "@/config/brand";

/**
 * Convert schedule to schema.org OpeningHoursSpecification format
 */
function formatOpeningHours(schedules: Schedule[]) {
  return schedules
    .filter((schedule) => schedule.isOpen)
    .map((schedule) => {
      // Combine all time slots for a day
      const opens = schedule.slots.length > 0 ? schedule.slots[0].start : "09:00";
      const closes = schedule.slots.length > 0
        ? schedule.slots[schedule.slots.length - 1].end
        : "17:00";

      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: schedule.day,
        opens,
        closes,
      };
    });
}

/**
 * Generate price range string from clinic fees
 */
function getPriceRange(dentist: Dentist): string {
  if (!dentist.clinics || dentist.clinics.length === 0) {
    return "$$";
  }

  const fees = dentist.clinics.flatMap((clinic) => clinic.fees);
  if (fees.length === 0) {
    return "$$";
  }

  const amounts = fees.map((fee) => fee.amount);
  const min = Math.min(...amounts);
  const max = Math.max(...amounts);

  // Convert to price range indicator
  if (max < 1000) return "$";
  if (max < 2000) return "$$";
  if (max < 3000) return "$$$";
  return "$$$$";
}

/**
 * Generate schema.org/Dentist structured data for a dentist profile
 * @param dentist - Dentist object from the database
 * @param baseUrl - Base URL of the website (defaults to brandConfig.urls.website)
 * @returns JSON-LD object ready for insertion into script tag
 */
export function generateDentistSchema(
  dentist: Dentist,
  baseUrl: string = brandConfig.urls.website
) {
  const dentistUrl = `${baseUrl}/find-a-dentist/${dentist.slug}`;
  const primaryClinic = dentist.clinics[0];

  // Base schema structure
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: dentist.name,
    description: dentist.bio,
    url: dentistUrl,
    image: dentist.photo,

    // Contact information
    telephone: dentist.contact.phone,
    email: dentist.contact.email,

    // Professional details
    medicalSpecialty: dentist.specialties,

    // Services offered
    availableService: dentist.services.map((service) => ({
      "@type": "MedicalProcedure",
      name: service,
    })),

    // Professional memberships
    memberOf: dentist.affiliations.map((affiliation) => ({
      "@type": "Organization",
      name: affiliation,
    })),
  };

  // Add primary clinic address if available
  if (primaryClinic) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: primaryClinic.address.street,
      addressLocality: primaryClinic.address.city,
      addressRegion: primaryClinic.address.province,
      postalCode: primaryClinic.address.postalCode,
      addressCountry: primaryClinic.address.country,
    };

    // Add opening hours
    if (primaryClinic.schedules && primaryClinic.schedules.length > 0) {
      schema.openingHoursSpecification = formatOpeningHours(primaryClinic.schedules);
    }

    // Add clinic website if available
    if (primaryClinic.contact.website) {
      schema.url = primaryClinic.contact.website;
    }
  }

  // Add price range
  schema.priceRange = getPriceRange(dentist);

  // Add aggregate rating if available
  if (dentist.rating && dentist.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: dentist.rating.toString(),
      reviewCount: dentist.reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    };
  }

  return schema;
}

/**
 * Generate BreadcrumbList schema for dentist profile page
 */
export function generateDentistBreadcrumbSchema(
  dentist: Dentist,
  baseUrl: string = brandConfig.urls.website
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Find a Dentist",
        item: `${baseUrl}/find-a-dentist`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: dentist.name,
        item: `${baseUrl}/find-a-dentist/${dentist.slug}`,
      },
    ],
  };
}
