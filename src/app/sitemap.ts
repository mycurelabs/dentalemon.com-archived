import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dentalemon.com";

  // Note: Fragment URLs (#features, #pricing) are ignored by search engines
  // Add actual page URLs here when they are created (e.g., /features, /pricing)
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
