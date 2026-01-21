"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import { brandConfig } from "@/config/brand"

const { company } = brandConfig

export function OfflineCapability() {
  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-32 bg-background">
      <div className="container px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center space-y-8"
        >
          {/* Animated Badge */}
          <div className="flex justify-center">
            <AnimatedBadge>Seamless Offline Operations</AnimatedBadge>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight max-w-3xl">
            Never Stop Caring, Even Without Internet
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {company.displayName}&apos;s offline mode ensures your clinic never stops serving patients.
            Access records, manage appointments, and process transactions anywhere—all changes
            sync automatically when you're back online.
          </p>

          {/* Offline Sync Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full max-w-xl mt-8"
          >
            <div className="overflow-hidden rounded-2xl">
              <video
                src="/Features Photos/Built for Modern Teams/syncbase-demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover"
                style={{
                  transform: 'scale(1.02)',
                  transformOrigin: 'center',
                  clipPath: 'inset(0 2px 0 2px)'
                }}
                aria-label={`${company.displayName} Offline Sync - Never Stop Caring`}
              />
            </div>
          </motion.div>

          {/* Feature Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 mt-12 w-full max-w-3xl"
          >
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Full Patient Records Offline</h3>
              <p className="text-sm text-muted-foreground">
                Access complete patient histories and medical records without internet
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Appointment Management</h3>
              <p className="text-sm text-muted-foreground">
                Schedule and manage appointments seamlessly even when offline
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-2">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Secure Local Encryption</h3>
              <p className="text-sm text-muted-foreground">
                All offline data is encrypted and secured on your local device
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
