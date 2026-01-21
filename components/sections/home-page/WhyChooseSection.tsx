"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { AnimatedBadge } from "@/components/custom/animated-badge"

interface WhyChooseItem {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  mediaType: "image" | "video"
  mediaSrc: string
  mediaAlt: string
  bullets: string[]
  imagePosition: "left" | "right"
}

interface WhyChooseConfig {
  badge: string
  headline: string
  description: string
  items: WhyChooseItem[]
}

interface WhyChooseSectionProps {
  config: WhyChooseConfig
}

export function WhyChooseSection({ config }: WhyChooseSectionProps) {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-white dark:bg-[#1a1a1a]">
      <div className="container px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <AnimatedBadge>{config.badge}</AnimatedBadge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">{config.headline}</h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            {config.description}
          </p>
        </motion.div>

        <div className="space-y-20">
          {config.items.map((item, index) => {
            const Icon = item.icon
            const isImageLeft = item.imagePosition === "left"

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                {/* Media */}
                <div className={`relative ${isImageLeft ? "order-2 lg:order-1" : "order-2 lg:order-2"}`}>
                  {item.mediaType === "image" ? (
                    <Image
                      src={item.mediaSrc}
                      width={480}
                      height={320}
                      alt={item.mediaAlt}
                      className="relative rounded-xl"
                    />
                  ) : (
                    <div className="w-full max-w-[480px] overflow-hidden rounded-xl mx-auto lg:mx-0">
                      <video
                        src={item.mediaSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-auto object-cover"
                        style={{
                          transform: 'scale(1.02)',
                          transformOrigin: 'center',
                          clipPath: 'inset(0 2px 0 2px)'
                        }}
                        aria-label={item.mediaAlt}
                        suppressHydrationWarning
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`space-y-6 ${isImageLeft ? "order-1 lg:order-2" : "order-1 lg:order-1"}`}>
                  <div className="space-y-4">
                    <div className="size-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-300">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{item.title}</h3>
                    <p className="text-muted-foreground text-base sm:text-lg">
                      {item.description}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {item.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-center gap-3">
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
