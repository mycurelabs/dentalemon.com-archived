import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: AnimatedShinyTextProps) {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "inline-block bg-clip-text text-transparent",
        "[background:linear-gradient(90deg,transparent,rgba(0,0,0,0.8)_50%,transparent)] bg-[length:var(--shiny-width)_100%] bg-[position:calc(-100%-var(--shiny-width))_0]",
        "dark:[background:linear-gradient(90deg,transparent,rgba(255,255,255,0.8)_50%,transparent)]",
        "[animation:var(--animate-shiny-text)]",
        className
      )}
    >
      {children}
    </span>
  );
}
