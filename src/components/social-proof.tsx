'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { Shield, Cloud, Heart, Check } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Secure Patient Data Management",
    description: "Built with enterprise-grade security to help your clinic protect sensitive patient information with HIPAA-compliant systems, encrypted storage, and comprehensive access controls.",
    bullets: [
      "Encrypted electronic health records with role-based access controls",
      "HIPAA-compliant infrastructure meeting healthcare security standards",
      "Audit trails and activity logs ensuring data accountability",
    ],
    imagePosition: "left" as const,
    image: "/features/Hipaa-compliance-mycure.webp",
  },
  {
    icon: Cloud,
    title: "Seamless Offline Operations",
    description: "Continue managing your practice without interruption, even during internet outages. Work confidently with automatic synchronization when connectivity restores.",
    bullets: [
      "Offline access to patient records and treatment history",
      "Automatic sync when connection restores, preventing data loss",
      "Continue scheduling, charting, and billing without interruption",
    ],
    imagePosition: "right" as const,
    image: "/features/mycure-syncbase-demo.mp4",
  },
  {
    icon: Heart,
    title: "Enhanced Patient Experience",
    description: "Empower your clinic to deliver exceptional patient care with tools that improve communication, reduce wait times, and create seamless appointment experiences.",
    bullets: [
      "Online booking and automated appointment reminders",
      "Patient portal for easy access to records and communication",
      "Streamlined check-in process reducing patient wait times",
    ],
    imagePosition: "left" as const,
    image: "/features/effortless-clinical-workflows-v3.png",
  },
]

export function SocialProof() {
  return (
    <section id="why-choose-us" className="w-full py-20 md:py-32">
      <div className="container px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium bg-[#fffbeb] text-[#b45309] rounded-full border border-[#fde68a]">
            Why Choose Dentalemon
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built for Modern Dental Care
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Powerful practice management tools designed to streamline operations, protect patient data, and enhance care delivery.
          </p>
        </div>

        {/* Features - Alternating Layout */}
        <div className="space-y-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isImageLeft = feature.imagePosition === "left"

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                {/* Feature Image */}
                <div className={`${isImageLeft ? 'order-2 lg:order-1' : 'lg:order-2'} relative`}>
                  {feature.image.endsWith('.mp4') ? (
                    <video
                      src={feature.image}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="rounded-xl w-full h-auto object-cover"
                      style={{
                        transform: 'scale(1.02)',
                        transformOrigin: 'center',
                        clipPath: 'inset(0 2px 0 2px)'
                      }}
                      aria-label={`${feature.title} Demo`}
                    />
                  ) : (
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      width={480}
                      height={320}
                      className="rounded-xl w-full h-auto"
                    />
                  )}
                </div>

                {/* Content */}
                <div className={`${isImageLeft ? 'order-1 lg:order-2' : 'lg:order-1'} space-y-6`}>
                  <div className="space-y-4">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="size-6" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg">{feature.description}</p>
                  </div>
                  <ul className="space-y-3">
                    {feature.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3">
                        <Check className="size-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
