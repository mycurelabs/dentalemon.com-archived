'use client'

import * as React from "react"
import Link from "next/link"
import { Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { Logo } from "@/components/logo"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState('hero')

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer for active section detection
  React.useEffect(() => {
    const sections = ['hero', 'features', 'pricing']
    const sectionRatios = new Map<string, number>()

    // Single observer to track all sections
    const observer = new IntersectionObserver(
      (entries) => {
        // Update intersection ratios for all observed sections
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionRatios.set(entry.target.id, entry.intersectionRatio)
          } else {
            sectionRatios.set(entry.target.id, 0)
          }
        })

        // Find section with highest intersection ratio
        let maxRatio = 0
        let activeId = 'hero' // default to hero

        sectionRatios.forEach((ratio, id) => {
          if (ratio > maxRatio) {
            maxRatio = ratio
            activeId = id
          }
        })

        // Update active section if we have a visible section
        if (maxRatio > 0) {
          setActiveSection(activeId)
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
      }
    )

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId)
      if (element) {
        observer.observe(element)
        sectionRatios.set(sectionId, 0)
      }
    })

    return () => {
      observer.disconnect()
      sectionRatios.clear()
    }
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.div
      className="sticky top-0 z-50 w-full"
      initial={false}
    >
      <motion.div
        className={isScrolled ? 'max-w-7xl mx-auto px-6 pt-4' : 'w-full'}
        layout
        transition={{
          layout: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
          }
        }}
      >
        <motion.nav
          className="relative bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          layout
          animate={{
            height: isScrolled ? 56 : 64,
            borderRadius: isScrolled ? 9999 : 0,
          }}
          transition={{
            layout: {
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            },
            height: {
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            },
            borderRadius: {
              duration: 0.4,
              ease: [0.25, 0.1, 0.25, 1]
            }
          }}
          style={{
            border: isScrolled ? '1px solid #fafafa' : undefined,
            borderBottom: !isScrolled ? '1px solid hsl(var(--border))' : undefined,
            boxShadow: isScrolled ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : undefined,
          }}
        >
          <div className={`flex items-center h-full ${isScrolled ? 'px-6' : 'container mx-auto px-6'}`}>
            {/* Logo - Left */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Logo size="sm" />
                <span className="font-bold text-xl tracking-tight">Dentalemon</span>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            <div
              className={`hidden md:flex items-center gap-3 ${isScrolled ? 'flex-1 justify-center' : 'absolute left-1/2 -translate-x-1/2'}`}
            >
            <button
              onClick={() => scrollToSection('hero')}
              className={`text-sm font-medium transition-all duration-300 px-3 py-1.5 rounded-full ${
                activeSection === 'hero'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-accent'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className={`text-sm font-medium transition-all duration-300 px-3 py-1.5 rounded-full ${
                activeSection === 'features'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-accent'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('pricing')}
              className={`text-sm font-medium transition-all duration-300 px-3 py-1.5 rounded-full ${
                activeSection === 'pricing'
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:text-primary hover:bg-accent'
              }`}
            >
              Pricing
            </button>
            </div>

            {/* Right side - Theme toggle + CTA */}
            <div
              className="hidden md:flex items-center gap-4 ml-auto"
            >
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <ShimmerButton
                background="#FFCC5E"
                shimmerColor="#ffffff"
                className="h-9 px-4 text-sm font-semibold rounded-full"
              >
                Book Consultation
              </ShimmerButton>
            </div>

            {/* Mobile Menu Button */}
            <div
              className="flex items-center gap-2 md:hidden ml-auto"
            >
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-secondary rounded-md transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="md:hidden absolute top-full left-0 right-0 mt-2 border-t bg-background rounded-2xl border border-border shadow-lg"
            >
              <div className="py-6 px-6 flex flex-col gap-4">
                <button
                  onClick={() => scrollToSection('hero')}
                  className={`text-base font-medium transition-all duration-300 text-left px-4 py-2 rounded-full ${
                    activeSection === 'hero'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-primary hover:bg-accent'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('features')}
                  className={`text-base font-medium transition-all duration-300 text-left px-4 py-2 rounded-full ${
                    activeSection === 'features'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-primary hover:bg-accent'
                  }`}
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className={`text-base font-medium transition-all duration-300 text-left px-4 py-2 rounded-full ${
                    activeSection === 'pricing'
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-primary hover:bg-accent'
                  }`}
                >
                  Pricing
                </button>
                <ShimmerButton
                  background="#FFCC5E"
                  shimmerColor="#ffffff"
                  className="h-11 px-6 text-sm font-semibold rounded-full w-full"
                >
                  Book Consultation
                </ShimmerButton>
              </div>
            </motion.div>
          )}
        </motion.nav>
      </motion.div>
    </motion.div>
  )
}
