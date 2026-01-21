"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Use slower hover transition
   * Best for CTA sections where button is more prominent
   */
  slow?: boolean
  asChild?: boolean
}

/**
 * Primary brand button with Dentalemon amber styling
 * Fill: amber-100, Stroke: amber-200, Text: amber-600
 */
export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  PrimaryButtonProps
>(({ slow, className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "px-5 py-2 min-h-[40px] text-sm font-semibold rounded-full",
        "bg-amber-100 border border-amber-200 text-amber-600",
        "hover:bg-amber-200 hover:border-amber-300",
        "active:bg-amber-300",
        "transition-colors",
        slow ? "duration-300" : "duration-200",
        "shadow-sm hover:shadow-md",
        "inline-flex items-center justify-center gap-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})

PrimaryButton.displayName = "PrimaryButton"
