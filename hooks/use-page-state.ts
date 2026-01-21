"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useTheme } from "next-themes"

/**
 * Throttle function to limit how often a function can be called
 */
function useThrottle<T extends (...args: unknown[]) => void>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef(0)
  const lastArgs = useRef<unknown[] | null>(null)
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  return useCallback(
    ((...args: unknown[]) => {
      const now = Date.now()
      const timeSinceLastCall = now - lastCall.current

      if (timeSinceLastCall >= delay) {
        lastCall.current = now
        callback(...args)
      } else {
        // Schedule a trailing call
        lastArgs.current = args
        if (!timeoutId.current) {
          timeoutId.current = setTimeout(() => {
            lastCall.current = Date.now()
            if (lastArgs.current) {
              callback(...lastArgs.current)
            }
            timeoutId.current = null
          }, delay - timeSinceLastCall)
        }
      }
    }) as T,
    [callback, delay]
  )
}

export interface PageState {
  /** Whether the page has scrolled past the threshold */
  isScrolled: boolean
  /** Whether the mobile menu is open */
  mobileMenuOpen: boolean
  /** Set the mobile menu open state */
  setMobileMenuOpen: (open: boolean) => void
  /** Whether the component has mounted (for hydration safety) */
  mounted: boolean
  /** Current theme ("light" | "dark" | "system") */
  theme: string | undefined
  /** Toggle between light and dark theme */
  toggleTheme: () => void
}

interface UsePageStateOptions {
  /** Scroll threshold in pixels (default: 10) */
  scrollThreshold?: number
}

/**
 * Shared hook for common page state management.
 * Consolidates scroll tracking, mobile menu state, theme handling, and mount state.
 *
 * @example
 * ```tsx
 * function Page() {
 *   const { isScrolled, mobileMenuOpen, setMobileMenuOpen, mounted, theme, toggleTheme } = usePageState()
 *
 *   return (
 *     <header className={isScrolled ? "bg-white shadow" : "bg-transparent"}>
 *       <button onClick={toggleTheme}>
 *         {mounted && theme === "dark" ? <Sun /> : <Moon />}
 *       </button>
 *     </header>
 *   )
 * }
 * ```
 */
export function usePageState(options: UsePageStateOptions = {}): PageState {
  const { scrollThreshold = 10 } = options

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Throttled scroll handler - limits updates to every 100ms for better performance
  const handleScroll = useThrottle(
    useCallback(() => {
      setIsScrolled(window.scrollY > scrollThreshold)
    }, [scrollThreshold]),
    100
  )

  useEffect(() => {
    setMounted(true)

    // Check initial scroll position
    setIsScrolled(window.scrollY > scrollThreshold)

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [scrollThreshold, handleScroll])

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark")
  }, [theme, setTheme])

  return {
    isScrolled,
    mobileMenuOpen,
    setMobileMenuOpen,
    mounted,
    theme,
    toggleTheme,
  }
}
