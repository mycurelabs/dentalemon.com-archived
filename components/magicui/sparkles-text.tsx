"use client"

import { ReactNode, useEffect, useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Sparkle {
  id: string
  x: string
  y: string
  color: string
  delay: number
  scale: number
}

interface SparklesTextProps {
  children: ReactNode
  className?: string
  sparklesCount?: number
  colors?: {
    first: string
    second: string
  }
}

const generateSparkle = (colors: { first: string; second: string }): Sparkle => {
  return {
    id: Math.random().toString(36).substring(2, 9),
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    color: Math.random() > 0.5 ? colors.first : colors.second,
    delay: Math.random() * 2,
    scale: Math.random() * 0.5 + 0.5,
  }
}

const SparkleIcon = ({ sparkle }: { sparkle: Sparkle }) => {
  return (
    <motion.span
      className="pointer-events-none absolute z-20"
      style={{
        left: sparkle.x,
        top: sparkle.y,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, sparkle.scale, 0],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        delay: sparkle.delay,
        ease: "easeInOut",
      }}
    >
      <svg
        className="h-3 w-3"
        viewBox="0 0 68 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.5 25.5C19.0043 33.3697 0 34 0 34C0 34 19.1013 35.3684 26.5 43.5C33.234 50.901 34 68 34 68C34 68 35.7921 50.2604 43.5 43.5C51.6654 36.3226 68 34 68 34C68 34 51.6654 31.6774 43.5 24.5C35.7921 17.7396 34 0 34 0C34 0 33.234 17.099 26.5 25.5Z"
          fill={sparkle.color}
        />
      </svg>
    </motion.span>
  )
}

const DEFAULT_COLORS = { first: "#f59e0b", second: "#fbbf24" } // amber-500 and amber-400

export function SparklesText({
  children,
  className,
  sparklesCount = 10,
  colors,
}: SparklesTextProps) {
  const prefersReducedMotion = useReducedMotion()
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  // Memoize colors to prevent useEffect from running on every render
  const stableColors = useMemo(
    () => colors ?? DEFAULT_COLORS,
    [colors?.first, colors?.second]
  )

  useEffect(() => {
    if (prefersReducedMotion) return

    const initialSparkles = Array.from({ length: sparklesCount }, () =>
      generateSparkle(stableColors)
    )
    setSparkles(initialSparkles)

    const interval = setInterval(() => {
      setSparkles((current) =>
        current.map((sparkle) =>
          Math.random() > 0.7 ? generateSparkle(stableColors) : sparkle
        )
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [sparklesCount, stableColors, prefersReducedMotion])

  return (
    <span className={cn("relative inline-block", className)}>
      {!prefersReducedMotion &&
        sparkles.map((sparkle) => <SparkleIcon key={sparkle.id} sparkle={sparkle} />)}
      <span className="relative z-10">{children}</span>
    </span>
  )
}
