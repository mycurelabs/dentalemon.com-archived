/**
 * Healthcare Template Design System
 * Based on Notion-inspired design patterns with mobile-first responsive scaling
 */

export const typography = {
  hero: {
    h1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight',
    subheadline: 'text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed'
  },
  section: {
    h2: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
    h3: 'text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight',
    h4: 'text-xl sm:text-2xl md:text-3xl font-bold',
    description: 'text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed'
  },
  document: {
    h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
    h2: 'text-xl sm:text-2xl md:text-3xl font-semibold',
    h3: 'text-lg sm:text-xl md:text-2xl font-semibold',
    body: 'text-base sm:text-lg leading-relaxed prose-gray'
  },
  body: {
    large: 'text-lg sm:text-xl leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    small: 'text-sm sm:text-base'
  }
}

export const spacing = {
  section: {
    hero: 'py-8 sm:py-12 md:py-20',
    default: 'py-12 sm:py-16 md:py-20 lg:py-32',
    compact: 'py-8 sm:py-12 md:py-16',
    large: 'py-16 sm:py-20 md:py-32 lg:py-40',
    document: 'py-12 sm:py-16 md:py-20'
  },
  container: {
    default: 'px-4 sm:px-6 md:px-8',
    tight: 'px-4 md:px-6',
    wide: 'px-6 sm:px-8 md:px-12'
  },
  maxWidth: {
    wide: 'max-w-7xl mx-auto',
    standard: 'max-w-6xl mx-auto', 
    narrow: 'max-w-5xl mx-auto',
    text: 'max-w-3xl mx-auto',
    prose: 'max-w-prose mx-auto'
  },
  componentGap: {
    large: 'gap-8 sm:gap-12 md:gap-16',
    default: 'gap-4 sm:gap-6 md:gap-8',
    small: 'gap-2 sm:gap-3 md:gap-4'
  }
}

export const components = {
  button: {
    primary: 'h-11 sm:h-12 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full',
    secondary: 'h-10 sm:h-11 px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base font-medium rounded-full',
    small: 'h-9 sm:h-10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium rounded-full'
  },
  card: {
    padding: 'p-4 sm:p-6 md:p-8',
    gap: 'space-y-3 sm:space-y-4 md:space-y-6',
    grid: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'
  }
}

export const animation = {
  duration: {
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    verySlow: '0.7s'
  },
  easing: 'ease-out',
  viewport: '{ once: true }',
  stagger: 0.1
}

export const backgrounds = {
  primary: 'bg-background',
  secondary: 'bg-muted/30',
  gradient: 'bg-gradient-to-br from-background to-muted/30',
  brandGradient: 'brand-gradient-bg'
}

/**
 * Helper function to combine classes
 */
export const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ')
}