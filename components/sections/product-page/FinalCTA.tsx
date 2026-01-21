"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { PrimaryButton } from "@/components/custom/primary-button"
import type { FinalCtaConfig } from "@/components/types/product-page"

interface FinalCTAProps {
  config: FinalCtaConfig
}

export function FinalCTA({ config }: FinalCTAProps) {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-muted/30">
      <div className="container px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-tight">
                {config.headline.prefix} {config.headline.highlight} {config.headline.suffix}
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {config.description}
              </p>
            </div>

            <div className="flex justify-center items-center px-4 sm:px-0">
              <Link href={config.cta.href} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <PrimaryButton slow className="h-11 sm:h-12 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base flex items-center justify-center gap-2 w-full sm:w-auto">
                  {config.cta.text}
                  <ArrowRight className="size-4" />
                </PrimaryButton>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              {config.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="size-4 text-primary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
