'use client'

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: "🦷",
    title: "General Dentistry",
    description: "Comprehensive dental care for the whole family, from routine checkups to preventive treatments.",
  },
  {
    icon: "✨",
    title: "Cosmetic Dentistry",
    description: "Transform your smile with teeth whitening, veneers, and other cosmetic procedures.",
  },
  {
    icon: "🔧",
    title: "Orthodontics",
    description: "Straighten your teeth with traditional braces or modern clear aligners.",
  },
  {
    icon: "🏥",
    title: "Emergency Care",
    description: "24/7 emergency dental services for urgent dental problems and accidents.",
  },
  {
    icon: "👶",
    title: "Pediatric Dentistry",
    description: "Specialized care for children in a friendly and comfortable environment.",
  },
  {
    icon: "💎",
    title: "Dental Implants",
    description: "Permanent tooth replacement solutions that look and feel natural.",
  },
]

export function Features() {
  return (
    <section id="features" className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Our Services
          </h2>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-lg dark:text-gray-400">
            Comprehensive dental care tailored to your needs
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
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-4xl mb-2">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
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
