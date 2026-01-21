import type { Metadata } from 'next'
import { brandConfig } from '@/config/brand'

const { company, urls, seo } = brandConfig

export const metadata: Metadata = {
  title: `${company.displayName} - Privacy Policy`,
  description: `Privacy Policy for ${company.displayName} healthcare management services. Learn how we protect and handle your data.`,
  openGraph: {
    title: `${company.displayName} - Privacy Policy`,
    description: `Privacy Policy for ${company.displayName} healthcare management services. Learn how we protect and handle your data.`,
    url: `${urls.website}${urls.privacyPath}`,
    siteName: company.displayName,
    locale: seo.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${company.displayName} - Privacy Policy`,
    description: `Privacy Policy for ${company.displayName} healthcare management services. Learn how we protect and handle your data.`,
  },
  alternates: {
    canonical: `${urls.website}${urls.privacyPath}`,
  },
}

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
