import { MetadataRoute } from "next";
import { brandConfig } from "@/config/brand";
import { sampleDentists } from "@/data/dentists/sample-dentists";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = brandConfig.urls.website;
  // Use fixed date to prevent unnecessary re-crawling on each build
  const lastUpdate = new Date("2025-01-20");
  const dentistUpdate = new Date("2026-02-07");

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastUpdate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: lastUpdate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: lastUpdate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dentist directory page
  const directoryPage: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/find-a-dentist`,
      lastModified: dentistUpdate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Individual dentist profile pages
  const dentistPages: MetadataRoute.Sitemap = sampleDentists.map((dentist) => ({
    url: `${baseUrl}/find-a-dentist/${dentist.slug}`,
    lastModified: dentistUpdate,
    changeFrequency: "weekly" as const,
    priority: dentist.featured ? 0.8 : 0.7,
  }));

  return [...staticPages, ...directoryPage, ...dentistPages];
}
