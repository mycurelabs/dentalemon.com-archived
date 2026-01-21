"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import type { AdvantagesConfig } from "@/components/types/product-page"

interface AdvantagesSectionProps {
  config: AdvantagesConfig
}

export function AdvantagesSection({ config }: AdvantagesSectionProps) {
  return (
    <section id="advantages" className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-background">
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <AnimatedBadge>{config.badge}</AnimatedBadge>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight">{config.headline}</h2>
          <p className="max-w-[800px] text-muted-foreground text-xl md:text-2xl leading-relaxed">
            {config.description}
          </p>
        </motion.div>

        <div className="space-y-20">
          {config.items.map((advantage, index) => {
            const isEven = index % 2 === 0
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className={`relative ${isEven ? 'order-2 lg:order-1' : 'order-2 lg:order-2'}`}>
                  <Image
                    src={advantage.image}
                    width={480}
                    height={320}
                    alt={advantage.title}
                    className="relative rounded-xl"
                  />
                </div>
                <div className={`space-y-6 ${isEven ? 'order-1 lg:order-2' : 'order-1 lg:order-1'}`}>
                  <div className="space-y-4">
                    <div className="size-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary">
                      {React.createElement(advantage.icon, { className: "size-6" })}
                    </div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{advantage.title}</h3>
                    <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {advantage.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="size-5 text-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
