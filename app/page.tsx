"use client"

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, Menu, X, Moon, Sun, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text"
import { usePageState } from "@/hooks/use-page-state"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Import all section components
import {
  WhyChooseSection,
  VisibilitySection,
  TimelineSection,
  StorybrandSection,
  PricingComparisonTable,
  StakesSection,
} from "@/components/sections/home-page"
import { brandConfig } from "@/config/brand"
import heroImage from "../public/dentalemon-ui-prepped.webp"

const { company, assets } = brandConfig
import { MobileNav } from "@/components/sections/product-page/MobileNav"

// Import all data configs
import {
  heroConfig,
  stakesConfig,
  whyChooseConfig,
  visibilityConfig,
  pricingConfig,
  timelineConfig,
  faqConfig,
  finalCtaConfig,
  navigationConfig,
} from "./(home)/data"

export default function LandingPage() {
  const { isScrolled, mobileMenuOpen, setMobileMenuOpen, mounted, theme, toggleTheme } = usePageState()

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="flex min-h-[100dvh] flex-col">
      {/* Header */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm" : "bg-transparent"}`}>
        <div className="container flex h-16 items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
            <div className="size-8 rounded-full bg-white flex items-center justify-center">
              <Image src={assets.logo} alt={`${company.displayName} Logo`} width={32} height={32} />
            </div>
            <span>{company.displayName}</span>
          </button>
          <nav className="hidden md:flex items-center gap-1">
            <Link href="#how-it-works" onClick={(e) => scrollToSection(e, '#how-it-works')} className="inline-flex h-9 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">How It Works</Link>
            <Link href="#pricing" onClick={(e) => scrollToSection(e, '#pricing')} className="inline-flex h-9 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">Pricing</Link>
            <Link href="/find-a-dentist" className="inline-flex h-9 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">Find a Dentist</Link>
            <Link href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="inline-flex h-9 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">FAQs</Link>
            <Link href="mailto:info@dentalemon.com" className="inline-flex h-9 items-center justify-center rounded-xl px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">Contact</Link>
          </nav>
          <div className="hidden md:flex gap-4 items-center">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link href={navigationConfig.loginUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">Log In</Link>
            <Link href={navigationConfig.ctaUrl} target="_blank" rel="noopener noreferrer">
              <ShimmerButton
                background="rgba(217, 119, 6, 1)"
                shimmerColor="#FEF3C7"
                className="h-9 px-4 text-sm font-semibold"
              >
                Book a Demo
                <ArrowRight className="ml-1 size-4" />
              </ShimmerButton>
            </Link>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">{mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}<span className="sr-only">Toggle theme</span></Button>
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

      <main className="flex-1">
        {/* ============================================================
            SECTION 1: HERO (CHARACTER - Desire)
            SB7 Element: What the customer wants
        ============================================================ */}
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-32 overflow-hidden text-white relative brand-gradient-bg">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="container px-4 sm:px-6 md:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="text-center max-w-4xl mx-auto mb-12">
              <div className="mb-6">
                <div className="inline-flex items-center rounded-full border border-white/20 bg-white/90 px-4 py-1.5 backdrop-blur-sm">
                  <Sparkles className="size-4 text-amber-500 mr-2" />
                  <AnimatedGradientText className="text-sm font-medium">
                    {heroConfig.badge}
                  </AnimatedGradientText>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight mb-6 text-white">{heroConfig.headline.line1}<br />{heroConfig.headline.line2}</h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">{heroConfig.description}</p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
                <Link href={heroConfig.cta.primary.href} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                  <ShimmerButton background="rgba(217, 119, 6, 1)" shimmerColor="#FEF3C7" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold whitespace-nowrap w-full sm:w-auto min-w-[180px]">
                    {heroConfig.cta.primary.text}
                    <ArrowRight className="ml-2 size-4" />
                  </ShimmerButton>
                </Link>
                <Link href={heroConfig.cta.secondary.href} onClick={(e) => scrollToSection(e, heroConfig.cta.secondary.href)} className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-full bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white whitespace-nowrap w-full sm:w-auto min-w-[180px]">
                    {heroConfig.cta.secondary.text}
                  </Button>
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-sm text-white/80">
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-white" />
                  HIPAA Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-white" />
                  Works Offline
                </span>
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 text-white" />
                  14-Day Free Trial
                </span>
              </div>
            </motion.div>
            <motion.div id="video-demo" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="relative mx-auto max-w-5xl">
              <div className="relative">
                <Image
                  src={heroImage}
                  alt="Dentalemon Dashboard Interface"
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                  className="w-full h-auto rounded-3xl"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: STORYBRAND (PROBLEM - External/Internal/Philosophical)
            SB7 Element: The 3 levels of problem + The Answer with empathy bridge
        ============================================================ */}
        <StorybrandSection />

        {/* ============================================================
            SECTION 3: VISIBILITY / SUCCESS (SUCCESS)
            SB7 Element: The transformation outcome
        ============================================================ */}
        <VisibilitySection config={visibilityConfig} />

        {/* ============================================================
            SECTION 4: WHY CHOOSE (Solution Details)
            Feature-benefit deep dive
        ============================================================ */}
        <WhyChooseSection config={whyChooseConfig} />

        {/* ============================================================
            SECTION 6: TIMELINE / HOW IT WORKS (PLAN)
            SB7 Element: 3-step process plan
        ============================================================ */}
        <TimelineSection config={timelineConfig} />

        {/* ============================================================
            SECTION 7: STAKES (FAILURE)
            SB7 Element: What they lose without you
        ============================================================ */}
        <StakesSection config={stakesConfig} />

        {/* ============================================================
            SECTION 8: PRICING
            Monetizing Innovation: Good/Better/Best
        ============================================================ */}
        <PricingComparisonTable config={pricingConfig} />

        {/* ============================================================
            SECTION 11: FAQ (Agreement Plan)
            SB7 Element: Fear-reducing promises
        ============================================================ */}
        <section id="faq" className="w-full py-20 md:py-32 text-white relative overflow-hidden brand-gradient-bg">
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="container px-4 sm:px-6 md:px-8 relative">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center space-y-6 text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight">{faqConfig.headline}</h2>
              <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">{faqConfig.description}</p>
            </motion.div>
            <Accordion type="single" collapsible className="max-w-3xl mx-auto">
              {faqConfig.items.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/20 bg-white/10 backdrop-blur-sm rounded-xl mb-3 sm:mb-4 px-4 sm:px-6">
                  <AccordionTrigger className="text-white hover:text-white/80 text-left text-base sm:text-lg font-medium py-4 sm:py-5">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-white/80 text-base sm:text-lg leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {/* Supplementary CTA */}
            {faqConfig.supplementaryCta && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-center mt-8"
              >
                <p className="text-white/80 mb-3">{faqConfig.supplementaryCta.text}</p>
                <Link href={faqConfig.supplementaryCta.href}>
                  <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white rounded-full">
                    {faqConfig.supplementaryCta.linkText}
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {/* ============================================================
            SECTION 12: FINAL CTA (CALL TO ACTION)
            SB7 Element: Direct + Transitional CTA
        ============================================================ */}
        <section className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-gradient-to-br from-background to-muted/30">
          <div className="container px-4 sm:px-6 md:px-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center max-w-4xl mx-auto">
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight">{finalCtaConfig.headline.before} {finalCtaConfig.headline.highlight} {finalCtaConfig.headline.after}</h2>
                  <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">{finalCtaConfig.description}</p>
                </div>

                {/* CTA */}
                <div className="flex justify-center items-center px-4 sm:px-0">
                  <Link href={finalCtaConfig.directCta.href} target="_blank" rel="noopener noreferrer">
                    <ShimmerButton background="rgba(217, 119, 6, 1)" shimmerColor="#FEF3C7" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold">
                      {finalCtaConfig.directCta.text}
                      <ArrowRight className="ml-2 size-4" />
                    </ShimmerButton>
                  </Link>
                </div>

                {/* Features / Trust Signals */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
                  {finalCtaConfig.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="size-4 text-primary" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
