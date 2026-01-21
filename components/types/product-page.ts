import { LucideIcon } from "lucide-react"

// Generic Icon Card Item (unified type for grid items)
export interface IconCardItem {
  id: string
  icon: LucideIcon
  title: string
  description: string
}

// Legacy aliases for backward compatibility
export type SolutionItem = IconCardItem
export type SpecialtyItem = IconCardItem

// Unified Icon Card Grid Config
export interface IconCardGridConfig {
  sectionId: string
  badge: string
  headline: string
  description: string
  items: IconCardItem[]
}

// Advantage Section Types
export interface AdvantageItem {
  title: string
  description: string
  icon: LucideIcon
  image: string
  bullets: string[]
}

// Hero Section Types
export interface HeroConfig {
  badge: string
  headline: {
    prefix: string
    highlight: string
    suffix: string
  }
  description: string
  image: {
    src: string
    alt: string
  }
  cta: {
    text: string
    href: string
  }
}

// Video Showcase Section Types
export interface VideoShowcaseConfig {
  badge: string
  headline: string
  description: string
  cta: {
    text: string
    href: string
  }
  video: {
    src: string
    title: string
  }
}

// Feature Journey Section Types
export interface FeatureJourneyConfig {
  badge: string
  headline: string
  description: string
  image: {
    src: string
    alt: string
  }
  footnote?: string
}

// Statistics Section Types
export interface StatisticItem {
  value: number
  label: string
  suffix?: string
  delay?: number
}

export interface StatisticsConfig {
  headline: string
  description: string
  items: StatisticItem[]
}

// Solutions Grid Section Types
export interface SolutionsGridConfig {
  badge: string
  headline: string
  description: string
  items: SolutionItem[]
}

// Specialties Grid Section Types
export interface SpecialtiesGridConfig {
  badge: string
  headline: string
  description: string
  items: SpecialtyItem[]
}

// Advantages Section Types
export interface AdvantagesConfig {
  badge: string
  headline: string
  description: string
  items: AdvantageItem[]
}

// Final CTA Section Types
export interface FinalCtaConfig {
  headline: {
    prefix: string
    highlight: string
    suffix: string
  }
  description: string
  cta: {
    text: string
    href: string
  }
  features: string[]
}

// How It Works Section Types
export interface HowItWorksStep {
  number: number
  title: string
  items: string[]
}

export interface HowItWorksConfig {
  badge: string
  headline: string
  description: string
  steps: HowItWorksStep[]
  cta: {
    text: string
    href: string
  }
  ctaNote?: string
}

// Testimonials Section Types
export interface Testimonial {
  quote: string
  author: string
  role: string
  rating: number
}

export interface TestimonialsConfig {
  badge: string
  headline: string
  description: string
  testimonials: Testimonial[]
}

// Tab Section Types (for booking page)
export interface TabContent {
  id: string
  label: string
  icon: LucideIcon
  title: string
  subtitle: string
  features: string[]
  image: {
    src: string
    alt: string
  }
}

export interface TabSectionConfig {
  badge: string
  headline: string
  description: string
  tabs: TabContent[]
}

// Complete Product Page Configuration
export interface ProductPageConfig {
  pageName: string
  hero: HeroConfig
  solutionsGrid: SolutionsGridConfig
  videoShowcase: VideoShowcaseConfig
  featureJourney: FeatureJourneyConfig
  statistics: StatisticsConfig
  specialtiesGrid: SpecialtiesGridConfig
  advantages: AdvantagesConfig
  finalCta: FinalCtaConfig
}
