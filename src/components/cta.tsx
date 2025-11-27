'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { Phone } from "lucide-react"

export function CTA() {
  return (
    <section className="w-full py-20 md:py-32">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/90 to-primary p-12 md:p-16 text-center"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tight leading-tight md:text-5xl lg:text-6xl mb-6 text-primary-foreground">
              Ready to Transform Your Practice?
            </h2>
            <p className="mx-auto max-w-[768px] text-base sm:text-lg text-primary-foreground/90 leading-relaxed mb-12">
              Join modern dental practices using Dentalemon to streamline operations and deliver exceptional patient care.
              Schedule a personalized demo today!
            </p>
            <div className="flex justify-center">
              <ShimmerButton
                background="#ffffff"
                shimmerColor="#FFCC5E"
                className="h-11 px-6 text-base font-semibold rounded-full"
              >
                Schedule a Demo
              </ShimmerButton>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </motion.div>
      </div>
    </section>
  )
}
