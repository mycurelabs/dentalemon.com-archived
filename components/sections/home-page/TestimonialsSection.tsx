"use client"

import { motion } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Card, CardContent } from "@/components/ui/card"

interface TestimonialItem {
  quote: string
  transformation?: {
    from: string
    to: string
  }
  author: string
  role: string
  practice: string
  image?: string
  stat?: {
    value: number
    suffix?: string
    prefix?: string
    label: string
  }
}

interface AggregateStats {
  rating: { value: number; label: string }
  reviews: { value: number; suffix: string; label: string }
  nps: { value: number; label: string }
}

interface TestimonialsConfig {
  badge: string
  headline: string
  description: string
  items: TestimonialItem[]
  aggregateStats: AggregateStats
}

interface TestimonialsSectionProps {
  config: TestimonialsConfig
}

export function TestimonialsSection({ config }: TestimonialsSectionProps) {
  // Display first 6 testimonials in grid
  const displayedTestimonials = config.items.slice(0, 6)

  return (
    <section className="w-full py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <AnimatedBadge>{config.badge}</AnimatedBadge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight mt-4 mb-4">
            {config.headline}
          </h2>
          <p className="mx-auto max-w-[700px] text-base sm:text-lg text-muted-foreground leading-relaxed">
            {config.description}
          </p>
        </motion.div>

        {/* Aggregate Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mb-12"
        >
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-2xl font-bold">{config.aggregateStats.rating.value}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              {config.aggregateStats.rating.label}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">
              <NumberTicker value={config.aggregateStats.reviews.value} delay={0.3} />
              {config.aggregateStats.reviews.suffix}
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              {config.aggregateStats.reviews.label}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              <NumberTicker value={config.aggregateStats.nps.value} delay={0.4} />
            </div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider">
              {config.aggregateStats.nps.label}
            </div>
          </div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {displayedTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/40 bg-gradient-to-b from-background to-muted/10 hover:shadow-md transition-all duration-300">
                <CardContent className="p-6 flex flex-col h-full">
                  {/* Quote Icon */}
                  <Quote className="size-8 text-primary/20 mb-4" />

                  {/* Quote Text */}
                  <p className="text-base leading-relaxed text-foreground mb-4 flex-grow">
                    "{testimonial.quote}"
                  </p>

                  {/* Transformation (if exists) */}
                  {testimonial.transformation && (
                    <div className="bg-muted/50 rounded-lg p-3 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <span className="line-through">{testimonial.transformation.from}</span>
                        <span className="text-primary">→</span>
                        <span className="text-foreground font-medium">{testimonial.transformation.to}</span>
                      </div>
                    </div>
                  )}

                  {/* Stat (if exists) */}
                  {testimonial.stat && (
                    <div className="bg-primary/5 rounded-lg p-3 mb-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {testimonial.stat.prefix}
                        <NumberTicker value={testimonial.stat.value} delay={0.5} />
                        {testimonial.stat.suffix}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider">
                        {testimonial.stat.label}
                      </div>
                    </div>
                  )}

                  {/* Author */}
                  <div className="pt-4 border-t border-border/50">
                    <div className="font-semibold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.practice}
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
