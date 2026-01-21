import { MetadataRoute } from "next";
import { brandConfig } from "@/config/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = brandConfig.urls.website;
  // Use fixed date to prevent unnecessary re-crawling on each build
  const lastUpdate = new Date("2025-01-20");

  return [
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
}
