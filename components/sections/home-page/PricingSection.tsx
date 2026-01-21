"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { brandConfig } from "@/config/brand"
import { AnimatedBadge } from "@/components/custom/animated-badge"

const { urls } = brandConfig

interface PricingPlan {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  popular: boolean
  ctaText?: string
  ctaHref?: string
}

interface PricingConfig {
  badge?: string
  headline: string
  description: string
  plans: PricingPlan[]
}

interface PricingSectionProps {
  config: PricingConfig
}

export function PricingSection({ config }: PricingSectionProps) {
  return (
    <section id="pricing" className="w-full py-20 md:py-32 bg-muted/50">
      <div className="container px-4 sm:px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          {config.badge && <AnimatedBadge>{config.badge}</AnimatedBadge>}
          <h2 className="text-3xl font-bold tracking-tight leading-tight md:text-4xl lg:text-5xl font-serif">
            {config.headline}
          </h2>
          <p className="mx-auto max-w-[800px] text-base sm:text-lg text-muted-foreground leading-relaxed">
            {config.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {config.plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className={`h-full flex flex-col bg-card border-border/40 transition-all duration-300 ${plan.popular ? 'border-primary shadow-md scale-105 hover:scale-110' : 'hover:shadow-md hover:scale-105'}`}>
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-semibold rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader className="space-y-4">
                  <CardTitle className="text-xl md:text-2xl font-serif font-bold tracking-tight">{plan.name}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">{plan.description}</CardDescription>
                  <div className="pt-2">
                    <span className="text-3xl md:text-4xl font-serif font-bold tracking-tight">{plan.price}</span>
                    <span className="text-muted-foreground ml-2 text-sm">{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {plan.popular ? (
                    <Link href={plan.ctaHref || urls.demo} className="w-full">
                      <ShimmerButton
                        background="rgba(217, 119, 6, 1)"
                        shimmerColor="#FEF3C7"
                        className="w-full h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold"
                      >
                        {plan.ctaText || "Get Started"}
                        <ArrowRight className="ml-2 size-4" />
                      </ShimmerButton>
                    </Link>
                  ) : (
                    <Link href={plan.ctaHref || urls.demo} className="w-full">
                      <Button
                        className="w-full h-10 px-5 text-sm font-semibold rounded-full transition-all duration-300"
                        variant="outline"
                      >
                        {plan.ctaText || "Get Started"}
                        <ChevronRight className="ml-1 size-4" />
                      </Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
