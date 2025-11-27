'use client'

import { useRef } from "react"
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion"
import { Calendar, FileText, CreditCard, Users } from "lucide-react"

const features = [
  {
    icon: Calendar,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    titleColor: "text-amber-600",
    gradientFrom: "from-amber-50",
    gradientTo: "to-amber-50",
    borderColor: "border-amber-100",
    badgeBg: "bg-amber-100",
    badgeBorder: "border-amber-400 border",
    badgeTextColor: "text-amber-800",
    title: "Smart Scheduling",
    subtitle: "Reduce no-shows by 40%",
    description: "Take control of your practice calendar with intelligent appointment management. Automated reminders, online booking, and smart scheduling reduce no-shows and maximize your chair time.",
    cardTitle: "Today's Appointments",
    cardSubtitle: "12 patients scheduled",
    badgeText: "3 Confirmed",
  },
  {
    icon: FileText,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    titleColor: "text-purple-600",
    gradientFrom: "from-purple-50",
    gradientTo: "to-purple-50",
    borderColor: "border-purple-100",
    badgeBg: "bg-purple-100",
    badgeBorder: "border-purple-400 border",
    badgeTextColor: "text-purple-800",
    title: "Digital Records",
    subtitle: "HIPAA-compliant documentation",
    description: "Access complete patient histories instantly. Digital charting, treatment plans, and clinical notes all in one secure, organized system that keeps your practice compliant and efficient.",
    cardTitle: "Patient Records",
    cardSubtitle: "2,847 active files",
    badgeText: "HIPAA Secure",
  },
  {
    icon: CreditCard,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    titleColor: "text-orange-600",
    gradientFrom: "from-orange-50",
    gradientTo: "to-orange-50",
    borderColor: "border-orange-100",
    badgeBg: "bg-orange-100",
    badgeBorder: "border-orange-400 border",
    badgeTextColor: "text-orange-800",
    title: "Billing & Insurance",
    subtitle: "Faster claims, better cash flow",
    description: "Simplify your revenue cycle with integrated billing. Submit insurance claims electronically, track payments in real-time, and reduce accounts receivable with automated follow-ups.",
    cardTitle: "Monthly Revenue",
    cardSubtitle: "$127,450 collected",
    badgeText: "98% Clean Claims",
  },
  {
    icon: Users,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    titleColor: "text-green-600",
    gradientFrom: "from-green-50",
    gradientTo: "to-green-50",
    borderColor: "border-green-100",
    badgeBg: "bg-green-100",
    badgeBorder: "border-green-400 border",
    badgeTextColor: "text-green-800",
    title: "Patient Engagement",
    subtitle: "Build lasting relationships",
    description: "Keep patients connected with your practice through a dedicated portal. Secure messaging, treatment plan reviews, and appointment self-scheduling build trust and improve retention.",
    cardTitle: "Patient Portal",
    cardSubtitle: "1,203 active users",
    badgeText: "92% Satisfaction",
  },
]

interface FeatureCardProps {
  feature: typeof features[0]
  index: number
  progress: ReturnType<typeof useScroll>['scrollYProgress']
}

function FeatureCard({ feature, index, progress }: FeatureCardProps) {
  const Icon = feature.icon
  const prefersReducedMotion = useReducedMotion()

  // Calculate animation range for each card
  // First card is visible immediately, subsequent cards animate in on scroll
  const cardStart = index === 0 ? -0.1 : (index - 1) * 0.25 + 0.1

  const opacity = useTransform(progress, [cardStart, cardStart + 0.1], [0, 1])
  const y = useTransform(progress, [cardStart, cardStart + 0.15], [60, 0])
  const scale = useTransform(progress, [cardStart, cardStart + 0.1], [0.95, 1])

  const content = (
    <>
      {/* Feature Header */}
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${feature.iconBg} rounded-2xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${feature.iconColor}`} />
        </div>
        <div>
          <h3 className={`text-2xl md:text-3xl font-bold ${feature.titleColor}`}>
            {feature.title}
          </h3>
          <p className="text-muted-foreground">{feature.subtitle}</p>
        </div>
      </div>

      {/* Feature Description */}
      <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
        {feature.description}
      </p>

      {/* Feature Card */}
      <div className={`bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo} rounded-2xl p-6 ${feature.borderColor} border`}>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${feature.iconBg} rounded-full flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${feature.iconColor}`} />
              </div>
              <div>
                <div className="font-semibold text-sm text-slate-900">{feature.cardTitle}</div>
                <div className="text-xs text-slate-600">{feature.cardSubtitle}</div>
              </div>
            </div>
            <div className={`text-xs ${feature.badgeBg} ${feature.badgeBorder} rounded-full px-3 py-1.5 font-medium ${feature.badgeTextColor}`}>
              {feature.badgeText}
            </div>
          </div>
        </div>
      </div>
    </>
  )

  // If user prefers reduced motion, show all content without scroll animations
  if (prefersReducedMotion) {
    return <div className="space-y-6">{content}</div>
  }

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="space-y-6"
    >
      {content}
    </motion.div>
  )
}

export function StickyFeatures() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  return (
    <section
      ref={containerRef}
      id="streamline"
      className="w-full py-20 md:py-32 relative min-h-[200vh]"
    >
      <div className="container px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Sticky Left Column */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Badge */}
              <div className="inline-flex items-center justify-center px-3 py-1 mb-4 text-xs font-medium bg-[#fffbeb] text-[#b45309] rounded-full border border-[#fde68a]">
                Practice Excellence
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Streamline Your
                <br />
                <span className="text-primary">Practice</span>
              </h2>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground mt-6 max-w-lg">
                Modern dental practices deserve technology that matches their excellence.
                Our platform combines powerful features with simplicity, so you can
                focus on patient care while we handle the rest.
              </p>
            </motion.div>
          </div>

          {/* Scrolling Right Column */}
          <div className="space-y-32 lg:space-y-40 pt-8 lg:pt-0">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                feature={feature}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
