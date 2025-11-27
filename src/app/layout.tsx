import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL("https://dentalemon.com"),
  title: {
    default: "Dentalemon - Dental Practice Management Software",
    template: "%s | Dentalemon",
  },
  description:
    "Streamline your dental practice with Dentalemon. Automate scheduling, billing, and patient records. HIPAA-compliant software trusted by modern dental clinics.",
  keywords: [
    "dental practice management software",
    "dental clinic software",
    "dental scheduling software",
    "dental billing software",
    "HIPAA compliant dental software",
    "dental patient management",
    "dental EHR",
    "dental office management",
    "dentist software",
    "dental practice automation",
  ],
  authors: [{ name: "Dentalemon" }],
  creator: "Dentalemon",
  publisher: "Dentalemon",
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
    locale: "en_US",
    url: "https://dentalemon.com",
    siteName: "Dentalemon",
    title: "Dentalemon - Dental Practice Management Software",
    description:
      "Automate scheduling, billing, and patient records. HIPAA-compliant software built for modern dental practices.",
    // OG image is auto-generated from src/app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Dentalemon - Dental Practice Management Software",
    description:
      "Automate scheduling, billing, and patient records. HIPAA-compliant software built for modern dental practices.",
    // Twitter image uses the same OG image
    creator: "@dentalemon",
  },
  alternates: {
    canonical: "https://dentalemon.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
