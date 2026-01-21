"use client";

import { ComponentPropsWithoutRef, CSSProperties, FC } from "react";
import { useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface AnimatedShinyTextProps
  extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  ...props
}) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",

        // Shine effect - only animate when motion is allowed
        !prefersReducedMotion && "animate-shiny-text bg-clip-text bg-no-repeat [background-position:0_0] [background-size:var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",
        !prefersReducedMotion && "bg-gradient-to-r from-transparent via-black/80 via-50% to-transparent dark:via-white/80",

        // Static fallback for reduced motion - show solid text color
        prefersReducedMotion && "text-neutral-800 dark:text-neutral-200",

        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
};
