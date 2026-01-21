"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Check, X, HelpCircle, ArrowRight, ChevronRight } from "lucide-react"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { brandConfig } from "@/config/brand"
import { cn } from "@/lib/utils"

const { urls } = brandConfig

interface PricingPlan {
  name: string
  tier: "good" | "better" | "best"
  price: string
  period: string
  description: string
  popular: boolean
  ctaText: string
  ctaHref?: string
}

interface FeatureComparisonItem {
  name: string
  tooltip?: string
  starter: boolean | string
  professional: boolean | string
  enterprise: boolean | string
}

interface FeatureComparisonCategory {
  category: string
  items: FeatureComparisonItem[]
}

interface PricingComparisonConfig {
  badge?: string
  headline: string
  description: string
  plans: PricingPlan[]
  featureCategories: FeatureComparisonCategory[]
  guarantee: string
  transitionalCta: {
    text: string
    linkText: string
    href: string
  }
}

interface PricingComparisonTableProps {
  config: PricingComparisonConfig
}

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="size-5 text-amber-600" />
    ) : (
      <X className="size-5 text-muted-foreground/40" />
    )
  }
  return <span className="text-sm font-medium text-foreground">{value}</span>
}

// Map tier to feature key
const tierToKey: Record<string, "starter" | "professional" | "enterprise"> = {
  good: "starter",
  better: "professional",
  best: "enterprise",
}

export function PricingComparisonTable({ config }: PricingComparisonTableProps) {
  const planKeys = ["starter", "professional", "enterprise"] as const

  return (
    <section id="pricing" className="w-full py-20 md:py-32 bg-muted/50">
      <div className="container px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left mb-12 max-w-5xl mx-auto"
        >
          {config.badge && <AnimatedBadge>{config.badge}</AnimatedBadge>}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight mt-4 mb-4">
            {config.headline}
          </h2>
          <p className="max-w-[700px] mx-auto md:mx-0 text-muted-foreground md:text-lg">
            {config.description}
          </p>
        </motion.div>

        {/* Desktop: Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-5xl mx-auto hidden md:block"
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              {/* Plan Headers */}
              <thead>
                <tr>
                  <th className="p-4 text-left w-[280px]">
                    <span className="sr-only">Feature</span>
                  </th>
                  {config.plans.map((plan, index) => (
                    <th
                      key={plan.name}
                      className={cn(
                        "p-4 text-center min-w-[160px]",
                        plan.popular && "bg-amber-50 dark:bg-amber-900/20 rounded-t-xl"
                      )}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="space-y-2"
                      >
                        {plan.popular && (
                          <span className="inline-block px-3 py-1 text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-200 rounded-full mb-2">
                            Most Popular
                          </span>
                        )}
                        <div className="text-lg font-serif font-bold">{plan.name}</div>
                        <div className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                          {plan.price}
                        </div>
                        <div className="text-sm text-muted-foreground">{plan.period}</div>
                        <div className="pt-2">
                          {plan.popular ? (
                            <Link href={plan.ctaHref || urls.demo} className="block">
                              <ShimmerButton
                                background="rgba(217, 119, 6, 1)"
                                shimmerColor="#FEF3C7"
                                className="w-full h-10 px-4 text-sm font-semibold"
                              >
                                {plan.ctaText}
                                <ArrowRight className="ml-1 size-4" />
                              </ShimmerButton>
                            </Link>
                          ) : (
                            <Link href={plan.ctaHref || urls.demo} className="block">
                              <Button
                                variant="outline"
                                className="w-full h-10 px-4 text-sm font-semibold rounded-full"
                              >
                                {plan.ctaText}
                                <ChevronRight className="ml-1 size-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </motion.div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* Feature Categories */}
              <tbody>
                <TooltipProvider>
                  {config.featureCategories.map((category, catIndex) => (
                    <>
                      {/* Category Header */}
                      <tr key={`cat-${catIndex}`}>
                        <td
                          colSpan={4}
                          className="pt-8 pb-3 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wide border-b border-border/50"
                        >
                          {category.category}
                        </td>
                      </tr>

                      {/* Feature Rows */}
                      {category.items.map((item, itemIndex) => (
                        <tr
                          key={`${catIndex}-${itemIndex}`}
                          className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                        >
                          {/* Feature Name */}
                          <td className="p-4 text-sm font-medium text-foreground">
                            <div className="flex items-center gap-2">
                              {item.name}
                              {item.tooltip && (
                                <Tooltip>
                                  <TooltipTrigger>
                                    <HelpCircle className="size-4 text-muted-foreground/60" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-[200px] text-sm">{item.tooltip}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </td>

                          {/* Plan Values */}
                          {planKeys.map((planKey, planIndex) => {
                            const plan = config.plans[planIndex]
                            return (
                              <td
                                key={planKey}
                                className={cn(
                                  "p-4 text-center",
                                  plan.popular && "bg-amber-50/50 dark:bg-amber-900/10"
                                )}
                              >
                                <div className="flex justify-center">
                                  <FeatureValue value={item[planKey]} />
                                </div>
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </>
                  ))}
                </TooltipProvider>
              </tbody>
            </table>
          </div>

          {/* Desktop Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-8 space-y-4"
          >
            <p className="text-sm text-muted-foreground">{config.guarantee}</p>
            <p className="text-sm text-muted-foreground">
              {config.transitionalCta.text}{" "}
              <Link
                href={config.transitionalCta.href}
                className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2"
              >
                {config.transitionalCta.linkText}
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Mobile: Tab-based Plan Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-lg mx-auto md:hidden"
        >
          <Tabs defaultValue="better" className="w-full">
            {/* Plan Tabs */}
            <TabsList className="w-full grid grid-cols-3 h-12 bg-muted/50 p-1 rounded-xl mb-6">
              {config.plans.map((plan) => (
                <TabsTrigger
                  key={plan.tier}
                  value={plan.tier}
                  className={cn(
                    "rounded-lg text-sm font-medium transition-all relative",
                    "data-[state=active]:bg-white dark:data-[state=active]:bg-background data-[state=active]:shadow-sm",
                    "data-[state=active]:text-amber-600"
                  )}
                >
                  {plan.name}
                  {plan.popular && (
                    <span className="absolute -top-1 -right-1 size-2 bg-amber-500 rounded-full" />
                  )}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Plan Content */}
            {config.plans.map((plan) => {
              const planKey = tierToKey[plan.tier]
              return (
                <TabsContent key={plan.tier} value={plan.tier} className="mt-0">
                  {/* Plan Header Card */}
                  <Card
                    className={cn(
                      "mb-6",
                      plan.popular && "border-amber-200 bg-amber-50/50 dark:bg-amber-900/10"
                    )}
                  >
                    <CardHeader className="text-center pb-4">
                      {plan.popular && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-200 rounded-full mb-2 mx-auto w-fit">
                          Most Popular
                        </span>
                      )}
                      <CardTitle className="text-xl font-serif">{plan.name}</CardTitle>
                      <div className="text-3xl font-serif font-bold mt-2">{plan.price}</div>
                      <p className="text-xs text-muted-foreground/60">{plan.period}</p>
                      <p className="text-sm text-foreground/80 mt-3">{plan.description}</p>
                    </CardHeader>
                    <CardContent>
                      {plan.popular ? (
                        <Link href={plan.ctaHref || urls.demo} className="block">
                          <ShimmerButton
                            background="rgba(217, 119, 6, 1)"
                            shimmerColor="#FEF3C7"
                            className="w-full h-12 text-base font-semibold"
                          >
                            {plan.ctaText}
                            <ArrowRight className="ml-2 size-4" />
                          </ShimmerButton>
                        </Link>
                      ) : (
                        <Link href={plan.ctaHref || urls.demo} className="block">
                          <Button
                            variant="outline"
                            className="w-full h-12 text-base font-semibold rounded-full"
                          >
                            {plan.ctaText}
                            <ChevronRight className="ml-2 size-4" />
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>

                  {/* Feature Categories as Accordions */}
                  <TooltipProvider>
                    <Accordion
                      type="multiple"
                      defaultValue={["core-features"]}
                      className="space-y-3"
                    >
                      {config.featureCategories.map((category, catIndex) => {
                        const categoryId = category.category.toLowerCase().replace(/\s+/g, "-")
                        return (
                          <AccordionItem
                            key={catIndex}
                            value={categoryId}
                            className="border border-border/40 rounded-xl px-4 bg-background"
                          >
                            <AccordionTrigger className="text-sm font-semibold py-4 hover:no-underline">
                              {category.category}
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pb-2">
                                {category.items.map((item, itemIndex) => (
                                  <div
                                    key={itemIndex}
                                    className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
                                  >
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm">{item.name}</span>
                                      {item.tooltip && (
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <HelpCircle className="size-3.5 text-muted-foreground/60" />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p className="max-w-[200px] text-sm">{item.tooltip}</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      )}
                                    </div>
                                    <FeatureValue value={item[planKey]} />
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        )
                      })}
                    </Accordion>
                  </TooltipProvider>
                </TabsContent>
              )
            })}
          </Tabs>

          {/* Mobile Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-8 space-y-4"
          >
            <p className="text-sm text-muted-foreground">{config.guarantee}</p>
            <p className="text-sm text-muted-foreground">
              {config.transitionalCta.text}{" "}
              <Link
                href={config.transitionalCta.href}
                className="text-amber-600 hover:text-amber-700 font-medium underline underline-offset-2"
              >
                {config.transitionalCta.linkText}
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
