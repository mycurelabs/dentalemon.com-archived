"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import type { FeatureJourneyConfig } from "@/components/types/product-page"

interface FeatureJourneyProps {
  config: FeatureJourneyConfig
}

export function FeatureJourney({ config }: FeatureJourneyProps) {
  return (
    <section id="features" className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-muted/30">
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header Content */}
          <div className="text-center mb-12 space-y-4">
            {/* Animated Badge */}
            <div className="flex justify-center mb-4">
              <AnimatedBadge>{config.badge}</AnimatedBadge>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold">
              {config.headline}
            </h2>

            {/* Subheadline */}
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {config.description}
            </p>
          </div>

          {/* Feature Journey Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Image
              src={config.image.src}
              alt={config.image.alt}
              width={1200}
              height={600}
              className="w-full h-auto rounded-2xl"
              priority
            />
          </motion.div>

          {/* Optional Supporting Text */}
          {config.footnote && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                {config.footnote}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
