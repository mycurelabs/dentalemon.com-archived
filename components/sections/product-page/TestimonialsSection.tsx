"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import type { TestimonialsConfig } from "@/components/types/product-page"

interface TestimonialsSectionProps {
  config: TestimonialsConfig
}

export function TestimonialsSection({ config }: TestimonialsSectionProps) {
  return (
    <section
      id="testimonials"
      className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-background"
    >
      <div className="container px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <AnimatedBadge>{config.badge}</AnimatedBadge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
            {config.headline}
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            {config.description}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
          {config.testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Card className="h-full overflow-hidden border-border/40 bg-gradient-to-b from-background to-muted/10 backdrop-blur transition-all hover:shadow-md">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex mb-4">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, j) => (
                        <Star
                          key={j}
                          className="size-4 text-yellow-500 fill-yellow-500"
                        />
                      ))}
                  </div>
                  <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                    <div
                      className="size-10 rounded-full bg-muted flex items-center justify-center text-foreground font-medium"
                      role="img"
                      aria-label={`Avatar for ${testimonial.author}`}
                    >
                      {testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
