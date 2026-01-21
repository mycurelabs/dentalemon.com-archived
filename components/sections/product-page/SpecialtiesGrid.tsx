"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import { staggerContainer, staggerItem, viewportOnce, transition } from "@/lib/animation-variants"
import type { SpecialtiesGridConfig } from "@/components/types/product-page"

interface SpecialtiesGridProps {
  config: SpecialtiesGridConfig
}

export function SpecialtiesGrid({ config }: SpecialtiesGridProps) {
  return (
    <section id="specialties" className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-muted/30">
      <div className="container px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={transition.medium}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <AnimatedBadge>{config.badge}</AnimatedBadge>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-6">
            {config.headline}
          </h2>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {config.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {config.items.map((specialty) => (
            <motion.div
              key={specialty.id}
              variants={staggerItem}
              transition={transition.medium}
            >
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                    <specialty.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold leading-tight">
                      {specialty.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {specialty.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
