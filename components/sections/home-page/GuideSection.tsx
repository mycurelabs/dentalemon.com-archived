"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import type { LucideIcon } from "lucide-react"

interface CompetencyProof {
  value: number
  label: string
  icon: LucideIcon
  delay?: number
}

interface GuideConfig {
  badge: string
  headline: string
  empathyStatement: string
  solutionBridge: string
  competencyProof: CompetencyProof[]
  credentials: string[]
}

interface GuideSectionProps {
  config: GuideConfig
}

export function GuideSection({ config }: GuideSectionProps) {
  return (
    <section className="w-full py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left Column - Empathy Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <AnimatedBadge>{config.badge}</AnimatedBadge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
              {config.headline}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {config.empathyStatement}
            </p>
            <p className="text-lg text-foreground leading-relaxed font-medium">
              {config.solutionBridge}
            </p>

            {/* Credentials List */}
            <ul className="space-y-3 pt-4">
              {config.credentials.map((credential, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-base text-muted-foreground">{credential}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Competency Proof Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-muted/50 rounded-2xl p-8 md:p-10 border border-border/50"
          >
            <div className="space-y-8">
              {config.competencyProof.map((proof, index) => {
                const Icon = proof.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: proof.delay || 0.3 + index * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Icon className="size-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl md:text-4xl font-bold text-foreground">
                        <NumberTicker value={proof.value} delay={proof.delay || 0.3} />
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {proof.label}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
