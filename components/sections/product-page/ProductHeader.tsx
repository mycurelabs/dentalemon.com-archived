"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePageState } from "@/hooks/use-page-state"
import { PrimaryButton } from "@/components/custom/primary-button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { MobileNav } from "./MobileNav"
import { brandConfig } from "@/config"

export function ProductHeader() {
  const { isScrolled, mobileMenuOpen, setMobileMenuOpen, mounted, theme, toggleTheme } = usePageState()
  const { company, assets, navigation } = brandConfig

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${
        isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
          <div className="size-8 rounded-full bg-white flex items-center justify-center">
            <Image src={assets.logo} alt={assets.logoAlt} width={32} height={32} />
          </div>
          <span>{company.displayName}</span>
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-2">
            <NavigationMenuItem>
              <Link href="/#how-it-works" className="group inline-flex h-9 w-max items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none">
                How it Works
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/find-a-dentist" className="group inline-flex h-9 w-max items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none">
                Find a Dentist
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/#faq" className="group inline-flex h-9 w-max items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground focus:outline-none">
                FAQs
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden md:flex gap-4 items-center">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Link
            href={navigation.loginUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Log In
          </Link>
          <Link href={navigation.ctaUrl} target="_blank" rel="noopener noreferrer">
            <PrimaryButton className="h-11 sm:h-12 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-medium">
              {navigation.ctaText}
              <ChevronRight className="ml-1 size-4" />
            </PrimaryButton>
          </Link>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileNav isOpen={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </header>
  )
}
