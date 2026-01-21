"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface VisibilityItem {
  bold: string
  normal: string
  image: string
  imageAlt: string
  gradient: string
}

interface VisibilityConfig {
  headline: string
  description: string
  items: VisibilityItem[]
}

interface VisibilitySectionProps {
  config: VisibilityConfig
}

export function VisibilitySection({ config }: VisibilitySectionProps) {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-muted/50">
      <div className="container px-4 sm:px-6 md:px-8 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight">
            {config.headline}
          </h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            {config.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {config.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="space-y-6"
            >
              <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} p-1`}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  width={600}
                  height={256}
                  className="w-full h-64 object-cover object-top rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                  <span className="font-bold">{item.bold}</span>{" "}
                  <span className="font-normal text-muted-foreground">
                    {item.normal}
                  </span>
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
