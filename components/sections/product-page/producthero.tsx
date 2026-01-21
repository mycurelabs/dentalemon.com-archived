"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import { PrimaryButton } from "@/components/custom/primary-button"
import type { HeroConfig } from "@/components/types/product-page"

interface ProductHeroProps {
  config: HeroConfig
}

export function ProductHero({ config }: ProductHeroProps) {
  return (
    <section id="hero" className="w-full py-8 sm:py-12 md:py-20 bg-background">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Hero Image - Shows first on mobile, left side on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative order-1 lg:order-1"
          >
            <Image
              src={config.image.src}
              width={600}
              height={500}
              alt={config.image.alt}
              className="rounded-2xl w-full aspect-[6/5] mx-auto max-w-sm md:max-w-none"
              priority
            />
          </motion.div>

          {/* Content - Shows second on mobile, right side on desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 order-2 lg:order-2 text-center lg:text-left"
          >
            <div className="space-y-4">
              {/* Animated Badge */}
              <div className="flex justify-center lg:justify-start">
                <AnimatedBadge>{config.badge}</AnimatedBadge>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight">
                {config.headline.prefix} {config.headline.highlight} {config.headline.suffix}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                {config.description}
              </p>
            </div>
            <div className="flex justify-center lg:justify-start w-full lg:w-auto">
              <Link href={config.cta.href} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <PrimaryButton className="h-11 sm:h-12 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base flex items-center justify-center gap-2 w-full sm:w-auto">
                  {config.cta.text}
                  <ArrowRight className="size-4" />
                </PrimaryButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
