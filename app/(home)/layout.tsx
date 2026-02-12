import type { Metadata } from "next"
import { brandConfig } from "@/config/brand"

const { company, urls, seo, assets } = brandConfig

export const metadata: Metadata = {
  title: "Dental Practice Management Software",
  description: `Streamline your dental practice with ${company.displayName}. Automate scheduling, billing, and patient records — HIPAA-compliant, offline-capable software trusted by modern dental clinics.`,
  openGraph: {
    title: `${company.displayName} - Dental Practice Management Software`,
    description: `Automate scheduling, billing, and patient records with ${company.displayName}. HIPAA-compliant, offline-capable software built for modern dental practices.`,
    url: urls.website,
    siteName: company.displayName,
    locale: seo.locale,
    type: "website",
    images: [
      {
        url: assets.ogImage,
        width: 1200,
        height: 630,
        alt: `${company.displayName} - ${company.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${company.displayName} - Dental Practice Management Software`,
    description: `Automate scheduling, billing, and patient records with ${company.displayName}. HIPAA-compliant, offline-capable software built for modern dental practices.`,
    images: [assets.ogImage],
  },
  alternates: {
    canonical: urls.website,
  },
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
