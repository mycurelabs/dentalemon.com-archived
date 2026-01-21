"use client";

import { useEffect, useMemo, useRef } from "react";
import { useInView, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

import { cn } from "@/lib/utils";

export interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  decimalPlaces?: number;
  startValue?: number;
}

export function NumberTicker({
  value,
  direction = "up",
  className,
  delay = 0,
  decimalPlaces = 0,
  startValue = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Memoize formatter to avoid creating new instance on every frame
  const formatter = useMemo(
    () => new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }),
    [decimalPlaces]
  );

  // Format the final value for display
  const formattedValue = formatter.format(value);

  // For reduced motion, start at the final value (no animation)
  const initialValue = prefersReducedMotion
    ? value
    : direction === "down"
      ? value
      : startValue;

  const motionValue = useMotionValue(initialValue);
  const springValue = useSpring(motionValue, {
    // Instant transition when reduced motion is preferred
    damping: prefersReducedMotion ? 1000 : 60,
    stiffness: prefersReducedMotion ? 1000 : 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    // Skip animation entirely when reduced motion is preferred
    if (prefersReducedMotion) {
      if (ref.current) {
        ref.current.textContent = formattedValue;
      }
      return;
    }

    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? startValue : value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value, direction, startValue, prefersReducedMotion, formattedValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatter.format(
          Number(latest.toFixed(decimalPlaces))
        );
      }
    });
    return unsubscribe;
  }, [springValue, formatter, decimalPlaces]);

  return (
    <span
      className={cn(
        "inline-block tabular-nums text-black dark:text-white tracking-wider",
        className,
      )}
      ref={ref}
      aria-label={formattedValue}
    />
  );
}