import type { Variants, Transition } from "framer-motion"

// Reduced motion variants - instant transitions for accessibility
export const reducedMotionVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  whileInView: { opacity: 1 },
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const reducedMotionTransition: Transition = { duration: 0.01 }

// Common animation variants for reuse across components
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
}

export const fadeInUpLarge: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
}

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  whileInView: { opacity: 1, x: 0 },
}

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  whileInView: { opacity: 1, x: 0 },
}

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  whileInView: { opacity: 1, scale: 1 },
}

// Stagger container variants for grids
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

// Transition presets
export const transition = {
  fast: { duration: 0.3 },
  medium: { duration: 0.5 },
  slow: { duration: 0.6 },
  delayed: { duration: 0.5, delay: 0.1 },
} as const

// Viewport options
export const viewportOnce = { once: true } as const
export const viewportHalf = { once: true, margin: "-50%" } as const

// Helper to get motion-safe variants
export function getMotionSafeVariants(variants: Variants, prefersReducedMotion: boolean): Variants {
  return prefersReducedMotion ? reducedMotionVariants : variants
}

// Helper to get motion-safe transition
export function getMotionSafeTransition(transition: Transition, prefersReducedMotion: boolean): Transition {
  return prefersReducedMotion ? reducedMotionTransition : transition
}
