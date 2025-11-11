import Link from "next/link"
import { Logo } from "@/components/logo"

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/50">
      <div className="container px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Logo size="sm" />
              <span className="font-bold text-xl tracking-tight">Dentalemon</span>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed">
              Modern practice management software helping dental clinics streamline operations and deliver exceptional patient care.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4 tracking-tight">Product</h3>
            <ul className="space-y-3 text-base text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-primary transition-colors duration-300">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-primary transition-colors duration-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#why-choose-us" className="hover:text-primary transition-colors duration-300">
                  Why Dentalemon
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors duration-300">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 tracking-tight">Company</h3>
            <ul className="space-y-3 text-base text-muted-foreground">
              <li>
                <Link href="#why-choose-us" className="hover:text-primary transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#why-choose-us" className="hover:text-primary transition-colors duration-300">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 tracking-tight">Contact</h3>
            <ul className="space-y-3 text-base text-muted-foreground leading-relaxed">
              <li>123 Dental Street</li>
              <li>New York, NY 10001</li>
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@dentalemon.com</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-base text-muted-foreground">
            © 2024 Dentalemon. All rights reserved.
          </p>
          <div className="flex gap-6 text-base text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
