import type { Metadata } from 'next'
import { brandConfig } from '@/config/brand'

const { company, urls, seo } = brandConfig

export const metadata: Metadata = {
  title: `${company.displayName} - Terms and Conditions`,
  description: `Terms and Conditions for using ${company.displayName} healthcare management services.`,
  openGraph: {
    title: `${company.displayName} - Terms and Conditions`,
    description: `Terms and Conditions for using ${company.displayName} healthcare management services.`,
    url: `${urls.website}${urls.termsPath}`,
    siteName: company.displayName,
    locale: seo.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.displayName} - Terms and Conditions`,
    description: `Terms and Conditions for using ${company.displayName} healthcare management services.`,
  },
  alternates: {
    canonical: `${urls.website}${urls.termsPath}`,
  },
}

export default function TermsAndConditionsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
