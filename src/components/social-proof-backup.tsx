'use client'

import { motion } from "framer-motion"
import { NumberTicker } from "@/components/magicui/number-ticker"
import { Star } from "lucide-react"

const stats = [
  { value: 10000, suffix: "+", label: "Happy Patients", delay: 0.2 },
  { value: 25, suffix: "+", label: "Years Experience", delay: 0.3 },
  { value: 50, suffix: "+", label: "Expert Dentists", delay: 0.4 },
  { value: 98, suffix: "%", label: "Satisfaction Rate", delay: 0.5 },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Patient since 2020",
    content: "Best dental experience ever! The team is professional and caring.",
  },
  {
    name: "Michael Chen",
    role: "Patient since 2019",
    content: "They transformed my smile. Highly recommend DentaLemon!",
  },
  {
    name: "Emma Davis",
    role: "Patient since 2021",
    content: "Pain-free treatments and amazing results. Thank you!",
  },
]

export function SocialProof() {
  return (
    <section id="about" className="w-full py-20 md:py-32 bg-muted/50">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight leading-tight md:text-5xl lg:text-6xl mb-6">
            Trusted by Thousands
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-[800px] mx-auto">
            Join our community of satisfied patients
          </p>
        </motion.div>

        {/* Stats with NumberTicker */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                <NumberTicker
                  value={stat.value}
                  delay={stat.delay}
                  className="text-primary"
                />
                <span>{stat.suffix}</span>
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card p-6 rounded-lg border border-border/40 hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-base mb-4 text-muted-foreground leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
