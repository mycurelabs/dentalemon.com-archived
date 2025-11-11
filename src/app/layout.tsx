import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DentaLemon - Your Trusted Dental Care Partner",
  description: "Experience world-class dental care with cutting-edge technology and compassionate professionals. Transform your smile today with DentaLemon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
