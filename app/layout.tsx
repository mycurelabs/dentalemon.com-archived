import type React from "react"
import "./globals.css"
import { Inter, Lora } from "next/font/google"
import type { Metadata, Viewport } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { ScrollProgress } from "@/components/magicui/scroll-progress"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics as GoogleAnalytics } from "@/components/analytics"
import { Footer } from "@/components/sections/Footer"
import { StructuredData } from "@/components/structured-data"
import { brandConfig } from "@/config"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(brandConfig.urls.website),
  title: {
    default: brandConfig.seo.defaultTitle,
    template: brandConfig.seo.titleTemplate,
  },
  description: brandConfig.seo.defaultDescription,
  keywords: brandConfig.seo.keywords,
  authors: [{ name: brandConfig.company.displayName, url: brandConfig.urls.website }],
  creator: `${brandConfig.company.displayName} by ${brandConfig.company.legalName}`,
  publisher: brandConfig.company.legalName,
  generator: null,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: brandConfig.seo.locale,
    url: brandConfig.urls.website,
    siteName: brandConfig.company.displayName,
    title: brandConfig.seo.defaultTitle,
    description: brandConfig.seo.defaultDescription,
    images: [
      {
        url: brandConfig.assets.ogImage,
        width: 1200,
        height: 630,
        alt: `${brandConfig.company.displayName} - ${brandConfig.company.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brandConfig.seo.defaultTitle,
    description: brandConfig.seo.defaultDescription,
    creator: brandConfig.seo.twitterHandle ? `@${brandConfig.seo.twitterHandle}` : undefined,
    images: [brandConfig.assets.ogImage],
  },
  alternates: {
    canonical: brandConfig.urls.website,
  },
  icons: {
    icon: brandConfig.assets.favicon,
    apple: "/apple-touch-icon.png",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preload" as="image" href="/dentalemon-ui-prepped.webp" type="image/webp" />
        <StructuredData />
      </head>
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        <GoogleAnalytics />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <ScrollProgress />
            {children}
            <Footer />
          </TooltipProvider>
        </ThemeProvider>
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
