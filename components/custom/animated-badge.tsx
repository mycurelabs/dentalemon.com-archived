"use client"

import { useReducedMotion } from "framer-motion"
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text"

interface AnimatedBadgeProps {
  children: React.ReactNode
  shimmerWidth?: number
}

export function AnimatedBadge({ children, shimmerWidth = 150 }: AnimatedBadgeProps) {
  const prefersReducedMotion = useReducedMotion()

  // Static fallback for users with reduced motion preference
  if (prefersReducedMotion) {
    return (
      <div className="rounded-full px-3 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 inline-flex items-center justify-center h-8">
        <span className="text-xs font-medium text-amber-600 dark:text-amber-200 leading-none">
          {children}
        </span>
      </div>
    )
  }

  return (
    <div className="rounded-full px-3 py-1 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/30 inline-flex items-center justify-center h-8">
      <AnimatedShinyText
        className="text-xs font-medium !mx-0 !max-w-none !text-amber-600 dark:!text-amber-200 !bg-gradient-to-r !from-transparent !via-amber-600/80 dark:!via-amber-200/80 !via-50% !to-transparent !leading-none"
        shimmerWidth={shimmerWidth}
      >
        {children}
      </AnimatedShinyText>
    </div>
  )
}
