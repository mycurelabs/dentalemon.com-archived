'use client'

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShimmerButton } from "@/components/magicui/shimmer-button"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative w-full py-20 md:py-32 overflow-hidden">
      <div className="container px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6 max-w-4xl mx-auto"
          >
            <h1 className="text-4xl font-bold tracking-tight leading-tight md:text-6xl lg:text-7xl">
              Run Your Dental Practice{" "}
              <span className="text-primary">Without the Paperwork</span>
            </h1>
            <p className="mx-auto max-w-[800px] text-base sm:text-lg text-muted-foreground leading-relaxed">
              Automate scheduling, billing, and patient records so you can focus on patient care and growing your practice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mt-12"
          >
            <ShimmerButton
              background="#FFCC5E"
              shimmerColor="#ffffff"
              className="h-11 px-8 text-sm sm:text-base font-semibold rounded-full"
            >
              Schedule a Demo
              <ChevronRight className="ml-1 size-4" />
            </ShimmerButton>
            <Button
              size="lg"
              variant="outline"
              className="text-base font-semibold rounded-full h-11 px-6 hover:bg-secondary transition-all duration-300"
              onClick={() => scrollToSection('pricing')}
            >
              View Pricing
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-4xl mt-12"
          >
            <Image
              src="/dentalemon-ui-prepped.png"
              alt="Dentalemon Application Interface"
              width={1920}
              height={1080}
              className="w-full h-auto rounded-xl shadow-2xl"
              priority
              quality={95}
            />
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
