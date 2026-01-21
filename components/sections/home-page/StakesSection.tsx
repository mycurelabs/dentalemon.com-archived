"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Minus, Plus, Clock, Calendar, Users } from "lucide-react"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { SparklesText } from "@/components/magicui/sparkles-text"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCurrencyLocale } from "@/hooks/use-currency-locale"

interface CalculatorInputs {
  patientsPerDay: number
  processTime: number
  providerCount: number
}

interface TimeBackToCareSectionConfig {
  badge: string
  headline: string
  description: string
  inputs: {
    patientsPerDay: { label: string; default: number; min: number; max: number }
    processTime: { label: string; description?: string; default: number; min: number; max: number; unit: string }
    providerCount: { label: string; default: number; min: number; max: number }
  }
  efficiencyFactor: number
  workingDaysPerWeek: number
  avgVisitDuration: number
  revenuePerVisit: number
  cta: { text: string; href: string }
  ctaNote: string
}

interface StakesSectionProps {
  config: TimeBackToCareSectionConfig
}

export function StakesSection({ config }: StakesSectionProps) {
  const { formatCurrency } = useCurrencyLocale()

  const [inputs, setInputs] = useState<CalculatorInputs>({
    patientsPerDay: config.inputs.patientsPerDay.default,
    processTime: config.inputs.processTime.default,
    providerCount: config.inputs.providerCount.default,
  })

  // Calculate time-based metrics (staff-empowering)
  const timeSavedPerPatient = Math.round(inputs.processTime * config.efficiencyFactor)
  const dailyTimeSavedMinutes = timeSavedPerPatient * inputs.patientsPerDay * inputs.providerCount
  const weeklyMinutesSaved = dailyTimeSavedMinutes * config.workingDaysPerWeek
  const weeklyHoursSaved = Math.round(weeklyMinutesSaved / 60)
  const additionalPatientsPerWeek = Math.floor(weeklyMinutesSaved / config.avgVisitDuration)
  const weeklyRevenuePotential = additionalPatientsPerWeek * config.revenuePerVisit
  const efficiencyPercent = Math.round(config.efficiencyFactor * 100)

  return (
    <section className="w-full py-20 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-4 sm:px-6 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <AnimatedBadge>{config.badge}</AnimatedBadge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight mt-4 mb-4">
            {config.headline}
          </h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-lg">
            {config.description}
          </p>
        </motion.div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-border/40 shadow-xl overflow-hidden rounded-xl">
            <CardContent className="p-0">
              {/* 2-Column Layout */}
              <div className="grid lg:grid-cols-2">
                {/* Inputs Column */}
                <div className="p-6 lg:p-8 lg:border-r border-border/40 bg-neutral-50">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-8">
                    Your Clinic
                  </p>
                  <div className="space-y-8">
                    {/* Patients per Day with +/- buttons */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-foreground">
                        {config.inputs.patientsPerDay.label}
                      </Label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setInputs((p) => ({
                              ...p,
                              patientsPerDay: Math.max(config.inputs.patientsPerDay.min, p.patientsPerDay - 5),
                            }))
                          }
                          className="size-10 rounded-lg border-2 border-border bg-background flex items-center justify-center hover:bg-muted hover:border-primary/50 active:scale-95 transition-all"
                          aria-label="Decrease patients per day"
                        >
                          <Minus className="size-5" />
                        </button>
                        <Input
                          type="number"
                          value={inputs.patientsPerDay}
                          onChange={(e) =>
                            setInputs((p) => ({
                              ...p,
                              patientsPerDay: Math.max(
                                config.inputs.patientsPerDay.min,
                                Math.min(config.inputs.patientsPerDay.max, Number(e.target.value) || 5)
                              ),
                            }))
                          }
                          className="w-20 h-10 text-center text-lg font-semibold border-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min={config.inputs.patientsPerDay.min}
                          max={config.inputs.patientsPerDay.max}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setInputs((p) => ({
                              ...p,
                              patientsPerDay: Math.min(config.inputs.patientsPerDay.max, p.patientsPerDay + 5),
                            }))
                          }
                          className="size-10 rounded-lg border-2 border-border bg-background flex items-center justify-center hover:bg-muted hover:border-primary/50 active:scale-95 transition-all"
                          aria-label="Increase patients per day"
                        >
                          <Plus className="size-5" />
                        </button>
                      </div>
                    </div>

                    {/* Non-Clinical Time per Visit - Slider */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-baseline">
                        <div>
                          <Label className="text-base font-semibold text-foreground">
                            {config.inputs.processTime.label}
                          </Label>
                          {config.inputs.processTime.description && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {config.inputs.processTime.description}
                            </p>
                          )}
                        </div>
                        <span className="text-lg font-bold text-amber-500 tabular-nums">
                          {inputs.processTime} min
                        </span>
                      </div>
                      <Slider
                        value={[inputs.processTime]}
                        onValueChange={([v]) => setInputs((p) => ({ ...p, processTime: v }))}
                        min={config.inputs.processTime.min}
                        max={config.inputs.processTime.max}
                        step={1}
                        className="cursor-pointer py-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{config.inputs.processTime.min} min</span>
                        <span>{config.inputs.processTime.max} min</span>
                      </div>
                    </div>

                    {/* Provider Count with +/- buttons */}
                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-foreground">
                        {config.inputs.providerCount.label}
                      </Label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() =>
                            setInputs((p) => ({
                              ...p,
                              providerCount: Math.max(config.inputs.providerCount.min, p.providerCount - 1),
                            }))
                          }
                          className="size-10 rounded-lg border-2 border-border bg-background flex items-center justify-center hover:bg-muted hover:border-primary/50 active:scale-95 transition-all"
                          aria-label="Decrease provider count"
                        >
                          <Minus className="size-5" />
                        </button>
                        <Input
                          type="number"
                          value={inputs.providerCount}
                          onChange={(e) =>
                            setInputs((p) => ({
                              ...p,
                              providerCount: Math.max(
                                config.inputs.providerCount.min,
                                Math.min(config.inputs.providerCount.max, Number(e.target.value) || 1)
                              ),
                            }))
                          }
                          className="w-20 h-10 text-center text-lg font-semibold border-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          min={config.inputs.providerCount.min}
                          max={config.inputs.providerCount.max}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setInputs((p) => ({
                              ...p,
                              providerCount: Math.min(config.inputs.providerCount.max, p.providerCount + 1),
                            }))
                          }
                          className="size-10 rounded-lg border-2 border-border bg-background flex items-center justify-center hover:bg-muted hover:border-primary/50 active:scale-95 transition-all"
                          aria-label="Increase provider count"
                        >
                          <Plus className="size-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Results Column */}
                <div className="p-6 lg:p-8 bg-white flex flex-col justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-8">
                      Your Team Gains
                    </p>

                    <div className="space-y-6">
                      {/* Efficiency Badge - Top */}
                      <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-500 px-4 py-2 rounded-full text-sm font-semibold">
                        <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                        {efficiencyPercent}% efficiency gain
                      </div>

                      {/* Hero Metric: Time saved per patient */}
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="size-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <Clock className="size-5 text-amber-500" />
                          </div>
                          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            Saved per Patient
                          </p>
                        </div>
                        <p className="text-4xl lg:text-5xl font-bold text-amber-500 tabular-nums">
                          <SparklesText sparklesCount={6}>
                            {timeSavedPerPatient}
                          </SparklesText>
                          <span className="text-2xl ml-2">min</span>
                        </p>
                      </div>

                      {/* Weekly Hours Back */}
                      <div className="pt-6 border-t-2 border-amber-200">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="size-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <Calendar className="size-5 text-amber-500" />
                          </div>
                          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            Hours Back Weekly
                          </p>
                        </div>
                        <p className="text-3xl font-bold text-foreground tabular-nums">
                          {weeklyHoursSaved} <span className="text-xl text-muted-foreground">hours</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          returned to patient care
                        </p>
                      </div>

                      {/* Additional Patients */}
                      <div className="pt-6 border-t border-amber-100">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="size-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <Users className="size-5 text-amber-500" />
                          </div>
                          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                            Additional Capacity
                          </p>
                        </div>
                        <p className="text-3xl font-bold text-foreground tabular-nums">
                          +{additionalPatientsPerWeek} <span className="text-xl text-muted-foreground">patients/week</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatCurrency(weeklyRevenuePotential)} potential weekly
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="pt-8 mt-8 border-t border-amber-100">
                    <Link href={config.cta.href}>
                      <ShimmerButton
                        background="rgba(217, 119, 6, 1)"
                        shimmerColor="#FEF3C7"
                        className="w-full h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold"
                      >
                        {config.cta.text}
                        <ArrowRight className="ml-2 size-4" />
                      </ShimmerButton>
                    </Link>
                    <p className="text-sm text-muted-foreground text-center mt-4">
                      {config.ctaNote}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
