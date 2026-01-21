"use client"

import { motion } from "framer-motion"
import { NumberTicker } from "@/components/magicui/number-ticker"
import type { LucideIcon } from "lucide-react"

interface TrustBadge {
  icon: LucideIcon
  label: string
  description: string
}

interface DemandSignal {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

interface TrustBadgesConfig {
  badges: TrustBadge[]
  demandSignals: Record<string, DemandSignal>
  logosHeading?: string
  logos?: { src: string; alt: string; name: string }[]
}

interface TrustBadgesSectionProps {
  config: TrustBadgesConfig
}

export function TrustBadgesSection({ config }: TrustBadgesSectionProps) {
  const signals = Object.values(config.demandSignals)

  return (
    <section className="w-full py-8 sm:py-12 border-y bg-muted/30">
      <div className="container px-4 sm:px-6 md:px-8">
        {/* Trust Badges Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mb-8"
        >
          {config.badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <div className="p-1.5 rounded-full bg-primary/10">
                  <Icon className="size-4 text-primary" />
                </div>
                <span className="text-sm font-medium">{badge.label}</span>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Demand Signals / Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
        >
          {signals.map((signal, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {signal.prefix}
                <NumberTicker value={signal.value} delay={0.3 + index * 0.1} />
                {signal.suffix}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider mt-1">
                {signal.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
