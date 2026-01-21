import Link from "next/link"
import Image from "next/image"
import { brandConfig } from "@/config"

export function Footer() {
  const { company, assets, social, urls, contact } = brandConfig

  return (
    <footer className="w-full bg-muted/30 border-t border-border/40">
      <div className="container px-4 md:px-6 py-12">
        {/* Mobile Layout */}
        <div className="sm:hidden">
          {/* Company Info Section */}
          <div className="mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <div className="size-8 rounded-full bg-white flex items-center justify-center">
                  <Image src={assets.logo} alt={assets.logoAlt} width={32} height={32} />
                </div>
                <span>{company.displayName}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Transforming dental practice management with innovative solutions for dental professionals.
              </p>
              <div className="flex -ml-2">
                {social.facebook && (
                  <Link href={social.facebook} className="flex items-center justify-center min-w-[44px] min-h-[44px] text-muted-foreground hover:text-foreground transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </Link>
                )}
                {social.linkedin && (
                  <Link href={social.linkedin} className="flex items-center justify-center min-w-[44px] min-h-[44px] text-muted-foreground hover:text-foreground transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>
                )}
                {social.twitter && (
                  <Link href={social.twitter} className="flex items-center justify-center min-w-[44px] min-h-[44px] text-muted-foreground hover:text-foreground transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Links Section - 2 Column Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Support */}
            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <ul className="-ml-2 text-sm">
                <li>
                  <Link href={urls.portal} target="_blank" rel="noopener noreferrer" className="flex items-center min-h-[44px] px-2 text-muted-foreground hover:text-foreground transition-colors">
                    Customer Portal
                  </Link>
                </li>
                <li>
                  <Link href={urls.help} target="_blank" rel="noopener noreferrer" className="flex items-center min-h-[44px] px-2 text-muted-foreground hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href={`mailto:${contact.email}`} className="flex items-center min-h-[44px] px-2 text-muted-foreground hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <ul className="-ml-2 text-sm">
                <li>
                  <Link href={urls.privacyPath} className="flex items-center min-h-[44px] px-2 text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href={urls.termsPath} className="flex items-center min-h-[44px] px-2 text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Desktop/Tablet Layout - 3 Columns */}
        <div className="hidden sm:grid sm:grid-cols-3 gap-8">
          {/* Company */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold">
              <div className="size-8 rounded-full bg-white flex items-center justify-center">
                <Image src={assets.logo} alt={assets.logoAlt} width={32} height={32} />
              </div>
              <span>{company.displayName}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Transforming dental practice management with innovative solutions for dental professionals.
            </p>
            <div className="flex -ml-2">
              {social.facebook && (
                <Link href={social.facebook} className="flex items-center justify-center min-w-[44px] min-h-[44px] text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
              )}
              {social.linkedin && (
                <Link href={social.linkedin} className="flex items-center justify-center min-w-[44px] min-h-[44px] text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </Link>
              )}
              {social.twitter && (
                <Link href={social.twitter} className="flex items-center justify-center min-w-[44px] min-h-[44px] text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
              )}
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <ul className="-ml-2 text-sm">
              <li>
                <Link href={urls.portal} target="_blank" rel="noopener noreferrer" className="flex items-center min-h-[44px] px-2 text-muted-foreground hover:text-foreground transition-colors">
                  Customer Portal
                </Link>
              </li>
              <li>
                <Link href={urls.help} target="_blank" rel="noopener noreferrer" className="flex items-center min-h-[44px] px-2 text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href={`mailto:${contact.email}`} className="flex items-center min-h-[44px] px-2 text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <ul className="-ml-2 text-sm">
              <li>
                <Link href={urls.privacyPath} className="flex items-center min-h-[44px] px-2 text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={urls.termsPath} className="flex items-center min-h-[44px] px-2 text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container px-4 md:px-6 py-4 border-t">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} {company.displayName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
