'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: "📅",
    title: "Appointment Scheduling",
    description: "Intelligent scheduling system with online booking, automated reminders, and calendar management to reduce no-shows and optimize your practice flow.",
  },
  {
    icon: "📊",
    title: "Patient Records Management",
    description: "Comprehensive digital health records with treatment history, clinical notes, and document management for complete patient information at your fingertips.",
  },
  {
    icon: "💳",
    title: "Billing & Payments",
    description: "Streamlined billing processes with insurance claim management, payment tracking, and financial reporting to keep your practice financially healthy.",
  },
  {
    icon: "📱",
    title: "Patient Portal",
    description: "Give your patients 24/7 access to their records, appointment booking, and secure messaging to enhance engagement and satisfaction.",
  },
  {
    icon: "📈",
    title: "Analytics & Reporting",
    description: "Powerful insights into practice performance, revenue trends, and operational metrics to make data-driven decisions for growth.",
  },
  {
    icon: "🔔",
    title: "Automated Communications",
    description: "Smart notification system for appointment reminders, follow-ups, and patient engagement campaigns via SMS, email, and push notifications.",
  },
]

export function Features() {
  return (
    <section id="features" className="w-full py-20 md:py-32 bg-muted/50">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight leading-tight md:text-5xl lg:text-6xl mb-6">
            Core Features
          </h2>
          <p className="mx-auto max-w-[800px] text-base sm:text-lg text-muted-foreground leading-relaxed">
            Everything your dental practice needs to operate efficiently and deliver exceptional patient care
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full bg-card border-border/40 hover:shadow-md transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl md:text-2xl tracking-tight">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
