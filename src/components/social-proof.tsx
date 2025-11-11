'use client'

import { motion } from "framer-motion"

const stats = [
  { number: "10,000+", label: "Happy Patients" },
  { number: "25+", label: "Years Experience" },
  { number: "50+", label: "Expert Dentists" },
  { number: "98%", label: "Satisfaction Rate" },
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
    <section className="w-full py-16 md:py-24 bg-muted/50">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-500 md:text-lg dark:text-gray-400">
            Join our community of satisfied patients
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
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
                {stat.number}
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
              className="bg-background p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-primary text-xl">★</span>
                ))}
              </div>
              <p className="text-sm mb-4 text-muted-foreground">
                &quot;{testimonial.content}&quot;
              </p>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-xs text-muted-foreground">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
