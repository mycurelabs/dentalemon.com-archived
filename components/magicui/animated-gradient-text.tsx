"use client";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

export interface AnimatedGradientTextProps
  extends ComponentPropsWithoutRef<"div"> {
  speed?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function AnimatedGradientText({
  children,
  className,
  speed = 1,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  ...props
}: AnimatedGradientTextProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span
      style={
        {
          "--bg-size": `${speed * 300}%`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
        } as React.CSSProperties
      }
      className={cn(
        // Base gradient styling
        "inline bg-gradient-to-r from-[var(--color-from)] via-[var(--color-to)] to-[var(--color-from)] bg-clip-text text-transparent",
        // Animation only when motion is allowed
        !prefersReducedMotion && "animate-gradient bg-[length:var(--bg-size)_100%]",
        // Static gradient for reduced motion
        prefersReducedMotion && "bg-[length:100%_100%]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
