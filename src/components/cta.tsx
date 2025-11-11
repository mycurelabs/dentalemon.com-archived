'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/90 to-primary p-12 md:p-16 text-center"
        >
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-primary-foreground">
              Ready for a Brighter Smile?
            </h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/90 md:text-lg mb-8">
              Book your appointment today and experience the difference. 
              New patients receive a complimentary consultation!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-base"
              >
                Book Your Appointment
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-base border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              >
                Call Us: (555) 123-4567
              </Button>
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
