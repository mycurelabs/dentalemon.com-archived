"use client"

import Link from "next/link"
import { useMemo } from "react"
import { motion } from "framer-motion"
import { Check, X, ArrowRight, ChevronRight } from "lucide-react"
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
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import {
  usePackages,
  formatPrice,
  formatInterval,
  filterMainPackages,
} from "@/lib/hooks/use-packages"
import { useRuntimeConfig, buildSignUpUrl } from "@/lib/hooks/use-runtime-config"

interface PricingComparisonConfig {
  badge?: string
  headline: string
  description: string
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

interface DisplayPlan {
  id: string
  name: string
  price: string
  period: string
  description: string
  popular: boolean
  features: string[]
  entitlementCodes: Set<string>
}

function FeatureValue({ included }: { included: boolean }) {
  return included ? (
    <Check className="size-5 text-amber-600" />
  ) : (
    <X className="size-5 text-muted-foreground/40" />
  )
}

/**
 * Loading skeleton for pricing table
 */
function PricingTableSkeleton() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center md:text-left mb-12">
        <Skeleton className="h-8 w-32 mb-4 bg-amber-200/50 dark:bg-amber-800/30" />
        <Skeleton className="h-12 w-80 mb-4 bg-amber-200/50 dark:bg-amber-800/30" />
        <Skeleton className="h-6 w-96 bg-amber-200/50 dark:bg-amber-800/30" />
      </div>

      {/* Desktop skeleton */}
      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left w-[280px]"></th>
                {[0, 1, 2].map((i) => (
                  <th key={i} className="p-4 text-center min-w-[160px]">
                    <div className="space-y-3">
                      <Skeleton className="h-6 w-24 mx-auto bg-amber-200/50 dark:bg-amber-800/30" />
                      <Skeleton className="h-10 w-28 mx-auto bg-amber-200/50 dark:bg-amber-800/30" />
                      <Skeleton className="h-4 w-20 mx-auto bg-amber-200/50 dark:bg-amber-800/30" />
                      <Skeleton className="h-10 w-full bg-amber-200/50 dark:bg-amber-800/30" />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row} className="border-b border-border/30">
                  <td className="p-4">
                    <Skeleton className="h-4 w-40 bg-amber-200/50 dark:bg-amber-800/30" />
                  </td>
                  {[0, 1, 2].map((col) => (
                    <td key={col} className="p-4 text-center">
                      <Skeleton className="h-5 w-5 mx-auto rounded-full bg-amber-200/50 dark:bg-amber-800/30" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile skeleton */}
      <div className="md:hidden max-w-lg mx-auto">
        <Skeleton className="h-12 w-full mb-6 rounded-xl bg-amber-200/50 dark:bg-amber-800/30" />
        <Skeleton className="h-64 w-full rounded-xl bg-amber-200/50 dark:bg-amber-800/30" />
      </div>
    </div>
  )
}

export function PricingComparisonTable({
  config,
}: PricingComparisonTableProps) {
  const { packages, loading: packagesLoading } = usePackages()
  const { config: runtimeConfig, isLoading: configLoading } = useRuntimeConfig()

  const loading = packagesLoading || configLoading

  // Build plans from API packages
  const plans: DisplayPlan[] = useMemo(() => {
    const mainPackages = filterMainPackages(packages)
    return mainPackages.map((pkg, index) => ({
      id: pkg.id,
      name: pkg.name,
      price: pkg.billingConfig
        ? formatPrice(pkg.billingConfig.unitAmount, pkg.billingConfig.currency)
        : "Custom",
      period: pkg.billingConfig
        ? formatInterval(
            pkg.billingConfig.interval,
            pkg.billingConfig.intervalCount || 1
          )
        : "pricing",
      description: pkg.description,
      popular: index === 1,
      features: pkg.entitlements.map((e) => e.name),
      entitlementCodes: new Set(pkg.entitlements.map((e) => e.code)),
    }))
  }, [packages])

  // Build feature comparison matrix from entitlements
  const allEntitlements = useMemo(() => {
    const mainPackages = filterMainPackages(packages)
    const seen = new Map<string, string>() // code -> name
    for (const pkg of mainPackages) {
      for (const e of pkg.entitlements) {
        if (!seen.has(e.code)) {
          seen.set(e.code, e.name)
        }
      }
    }
    return Array.from(seen.entries()).map(([code, name]) => ({ code, name }))
  }, [packages])

  const getPlanCtaHref = (planId: string): string => {
    return buildSignUpUrl(runtimeConfig.accountUrl, planId)
  }

  // Loading or empty: show skeleton
  if (loading || plans.length === 0) {
    return (
      <section id="pricing" className="w-full py-20 md:py-32 bg-muted/50">
        <div className="container px-4 sm:px-6 md:px-8">
          <PricingTableSkeleton />
        </div>
      </section>
    )
  }

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
              <thead>
                <tr>
                  <th className="p-4 text-left w-[280px]">
                    <span className="sr-only">Feature</span>
                  </th>
                  {plans.map((plan, index) => (
                    <th
                      key={plan.id}
                      className={cn(
                        "p-4 text-center min-w-[160px]",
                        plan.popular &&
                          "bg-amber-50 dark:bg-amber-900/20 rounded-t-xl"
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
                        <div className="text-lg font-serif font-bold">
                          {plan.name}
                        </div>
                        <div className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                          {plan.price}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {plan.period}
                        </div>
                        <div className="pt-2">
                          {plan.popular ? (
                            <Link
                              href={getPlanCtaHref(plan.id)}
                              className="block"
                            >
                              <ShimmerButton
                                background="rgba(217, 119, 6, 1)"
                                shimmerColor="#FEF3C7"
                                className="w-full h-10 px-4 text-sm font-semibold"
                              >
                                Get Started
                                <ArrowRight className="ml-1 size-4" />
                              </ShimmerButton>
                            </Link>
                          ) : (
                            <Link
                              href={getPlanCtaHref(plan.id)}
                              className="block"
                            >
                              <Button
                                variant="outline"
                                className="w-full h-10 px-4 text-sm font-semibold rounded-full"
                              >
                                Get Started
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

              <tbody>
                {allEntitlements.map((entitlement, idx) => (
                  <tr
                    key={entitlement.code}
                    className="border-b border-border/30 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 text-sm font-medium text-foreground">
                      {entitlement.name}
                    </td>
                    {plans.map((plan) => (
                      <td
                        key={plan.id}
                        className={cn(
                          "p-4 text-center",
                          plan.popular &&
                            "bg-amber-50/50 dark:bg-amber-900/10"
                        )}
                      >
                        <div className="flex justify-center">
                          <FeatureValue
                            included={plan.entitlementCodes.has(
                              entitlement.code
                            )}
                          />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
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
          <Tabs
            defaultValue={plans[1]?.id || plans[0]?.id}
            className="w-full"
          >
            <TabsList
              className="w-full grid h-12 bg-muted/50 p-1 rounded-xl mb-6"
              style={{
                gridTemplateColumns: `repeat(${plans.length}, minmax(0, 1fr))`,
              }}
            >
              {plans.map((plan) => (
                <TabsTrigger
                  key={plan.id}
                  value={plan.id}
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

            {plans.map((plan) => (
              <TabsContent key={plan.id} value={plan.id} className="mt-0">
                <Card
                  className={cn(
                    "mb-6",
                    plan.popular &&
                      "border-amber-200 bg-amber-50/50 dark:bg-amber-900/10"
                  )}
                >
                  <CardHeader className="text-center pb-4">
                    {plan.popular && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-200 rounded-full mb-2 mx-auto w-fit">
                        Most Popular
                      </span>
                    )}
                    <CardTitle className="text-xl font-serif">
                      {plan.name}
                    </CardTitle>
                    <div className="text-3xl font-serif font-bold mt-2">
                      {plan.price}
                    </div>
                    <p className="text-xs text-muted-foreground/60">
                      {plan.period}
                    </p>
                    <p className="text-sm text-foreground/80 mt-3">
                      {plan.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    {plan.popular ? (
                      <Link
                        href={getPlanCtaHref(plan.id)}
                        className="block"
                      >
                        <ShimmerButton
                          background="rgba(217, 119, 6, 1)"
                          shimmerColor="#FEF3C7"
                          className="w-full h-12 text-base font-semibold"
                        >
                          Get Started
                          <ArrowRight className="ml-2 size-4" />
                        </ShimmerButton>
                      </Link>
                    ) : (
                      <Link
                        href={getPlanCtaHref(plan.id)}
                        className="block"
                      >
                        <Button
                          variant="outline"
                          className="w-full h-12 text-base font-semibold rounded-full"
                        >
                          Get Started
                          <ChevronRight className="ml-2 size-4" />
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>

                {/* Features as accordion */}
                <Accordion
                  type="multiple"
                  defaultValue={["features"]}
                  className="space-y-3"
                >
                  <AccordionItem
                    value="features"
                    className="border border-border/40 rounded-xl px-4 bg-background"
                  >
                    <AccordionTrigger className="text-sm font-semibold py-4 hover:no-underline">
                      Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pb-2">
                        {allEntitlements.map((entitlement) => (
                          <div
                            key={entitlement.code}
                            className="flex items-center justify-between py-3 border-b border-border/30 last:border-0"
                          >
                            <span className="text-sm">
                              {entitlement.name}
                            </span>
                            <FeatureValue
                              included={plan.entitlementCodes.has(
                                entitlement.code
                              )}
                            />
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            ))}
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
