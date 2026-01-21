"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { PrimaryButton } from "@/components/custom/primary-button"
import { navigationConfig } from "@/app/(home)/data"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface MobileNavProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function MobileNav({ isOpen, onOpenChange }: MobileNavProps) {
  const handleLinkClick = () => {
    onOpenChange(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <VisuallyHidden>
            <SheetTitle>Navigation Menu</SheetTitle>
            <SheetDescription>Main site navigation with features, solutions, and quick links</SheetDescription>
          </VisuallyHidden>
        </SheetHeader>

        <nav className="flex flex-col gap-6 mt-6" aria-label="Mobile navigation">
          {/* Menu Section */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">
              Menu
            </span>
            <Link
              href="/"
              onClick={handleLinkClick}
              className="flex items-center min-h-[44px] px-2 text-base font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#how-it-works"
              onClick={handleLinkClick}
              className="flex items-center min-h-[44px] px-2 text-base font-medium hover:text-primary transition-colors"
            >
              How it Works
            </Link>
            <Link
              href="/#faq"
              onClick={handleLinkClick}
              className="flex items-center min-h-[44px] px-2 text-base font-medium hover:text-primary transition-colors"
            >
              FAQs
            </Link>
          </div>

          {/* Features Section */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">
              Features
            </span>
            {navigationConfig.features.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center min-h-[44px] px-2 text-base font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Solutions Section */}
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-2 mb-2">
              Solutions
            </span>
            {navigationConfig.solutions.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center min-h-[44px] px-2 text-base font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col gap-3 pt-4 mt-2 border-t">
            <Link
              href={navigationConfig.loginUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
              className="flex items-center min-h-[44px] px-2 text-base font-medium hover:text-primary transition-colors"
            >
              Log In
            </Link>
            <Link
              href={navigationConfig.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkClick}
            >
              <PrimaryButton className="w-full h-11 sm:h-12 text-base font-medium rounded-full">
                Get Started
                <ChevronRight className="ml-1 size-4" />
              </PrimaryButton>
            </Link>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
