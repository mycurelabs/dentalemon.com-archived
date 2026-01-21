"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FileWarning,
  Clock,
  CheckCircle,
  LayoutDashboard,
  X,
  UserPlus,
  ChevronRight
} from "lucide-react"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import { brandConfig } from "@/config/brand"

const { company } = brandConfig

// Notification data for The Reality section - Dental-focused
const allNotifications = [
  { id: 0, text: "32 Treatment plans unsigned", type: "urgent" as const },
  { id: 1, text: "18 Post-op follow-ups overdue", type: "warning" as const },
  { id: 2, text: "X-ray files need review", type: "urgent" as const },
  { id: 3, text: "9 Insurance pre-auths pending", type: "warning" as const },
  { id: 4, text: "Lab cases waiting pickup", type: "urgent" as const },
  { id: 5, text: "6 Referral letters to send", type: "warning" as const },
  { id: 6, text: "Recall appointments overdue", type: "urgent" as const },
  { id: 7, text: "Patient callbacks waiting", type: "warning" as const },
]

// Checklist items for The Answer section - Dental-focused
const checklistItems = [
  "Patient chart loaded",
  "Insurance verified",
  "Medical history reviewed",
  "Treatment plan confirmed",
  "Post-op instructions sent",
]

export function StorybrandSection() {
  // State for The Reality - Endless notifications
  // Each card has a unique instanceId to handle cycling through the same notifications
  const [visibleCards, setVisibleCards] = useState([
    { cardId: 0, instanceId: 0 },
    { cardId: 1, instanceId: 1 },
    { cardId: 2, instanceId: 2 },
  ])
  const [nextInstanceId, setNextInstanceId] = useState(3)


  // State for The Answer - Next Patient flow (future-proofed with modulo cycling)
  const PATIENT_POOL_SIZE = 8
  const [patientIndex, setPatientIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showChecklist, setShowChecklist] = useState(true)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Handler for dismissing notification cards
  const dismissCard = (cardIndex: number) => {
    if (cardIndex < 0 || cardIndex >= visibleCards.length) return
    setVisibleCards(prev => {
      const newCards = prev.filter((_, i) => i !== cardIndex)
      const nextCardId = nextInstanceId % allNotifications.length
      return [...newCards, { cardId: nextCardId, instanceId: nextInstanceId }]
    })
    setNextInstanceId(prev => prev + 1)
  }

  // Handler for Next Patient button (with cleanup for rapid clicking)
  const handleNextPatient = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setIsTransitioning(true)
    setShowChecklist(false)

    timeoutRef.current = setTimeout(() => {
      setPatientIndex(prev => (prev + 1) % PATIENT_POOL_SIZE)
      setShowChecklist(true)
      setIsTransitioning(false)
      timeoutRef.current = null
    }, 400)
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-32 mb-12 md:mb-20 lg:mb-32 relative bg-background">
      <div className="container px-4 sm:px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Sticky Left Content */}
          <div className="lg:sticky lg:top-32 space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <AnimatedBadge>Your Journey</AnimatedBadge>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight mt-4">
                  From Chaos<br />to Clarity
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground mt-6 max-w-lg leading-relaxed">
                  See how {company.displayName} transforms your daily dental practice operations from overwhelming paperwork to streamlined efficiency.
                </p>
              </motion.div>
            </div>

            {/* Progressive Feature Reveals */}
            <div className="space-y-40">
              {/* THE REALITY - Endless Notifications Loop */}
              {/* Using motion.div instead of Scrollytelling.Animation for interactive content */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center">
                    <FileWarning className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-red-600">The Reality</h3>
                    <p className="text-muted-foreground">What clinic admins face daily</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Paper-based tracking, inconsistent follow-ups, and constant back-and-forth create daily chaos in your clinic operations.
                </p>
                {/* Endless Notifications - Dismiss to reveal more */}
                <div className="bg-gradient-to-br from-red-500/5 to-orange-500/10 rounded-2xl p-6 border border-red-500/20">
                  <div className="text-xs text-muted-foreground mb-3">
                    Never-ending and confusing
                  </div>
                  <div className="relative h-40 overflow-hidden">
                    <AnimatePresence mode="popLayout">
                      {visibleCards.map(({ cardId, instanceId }, index) => {
                        const card = allNotifications[cardId]
                        return (
                          <motion.div
                            key={instanceId}
                            layout
                            initial={{ opacity: 0, y: 60 }}
                            animate={{ opacity: 1, y: index * 48 }}
                            exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            style={{ willChange: "transform, opacity" }}
                            className={`absolute left-0 right-0 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-sm border ${
                              card.type === 'urgent' ? 'border-red-200 dark:border-red-800' : 'border-orange-200 dark:border-orange-800'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full animate-pulse ${
                                card.type === 'urgent' ? 'bg-red-500' : 'bg-orange-500'
                              }`} />
                              <div className="flex-1 min-w-0">
                                <div className="font-semibold text-sm">{card.text}</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => dismissCard(index)}
                                className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                                aria-label={`Dismiss: ${card.text}`}
                              >
                                <X className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* THE FRUSTRATION - Clinic Efficiency */}
              {/* Using motion.div instead of Scrollytelling.Animation for consistency with interactive sections */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-orange-600">The Frustration</h3>
                    <p className="text-muted-foreground">Time that should be yours</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Manual processes keep your clinic running at a fraction of its potential.
                </p>
                {/* Clinic Efficiency Progress */}
                <div className="bg-gradient-to-br from-orange-500/5 to-amber-500/10 rounded-2xl p-6 border border-orange-500/20">
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-orange-600">Practice Efficiency</div>

                    {/* Simple progress track */}
                    <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full relative overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-red-500"
                        initial={{ width: "0%" }}
                        whileInView={{ width: "30%" }}
                        viewport={{ once: true }}
                        style={{ willChange: "width" }}
                        transition={{
                          duration: 2,
                          ease: "easeOut",
                        }}
                      />
                    </div>

                    {/* Inefficiency remark */}
                    <div className="flex items-center justify-center text-xs">
                      <span className="text-orange-600 font-medium">Your clinic could do so much more.</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* THE ANSWER - Next Patient Flow */}
              {/* Using motion.div instead of Scrollytelling.Animation for interactive content */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-green-600">The Answer</h3>
                    <p className="text-muted-foreground">One click. Next patient.</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Built alongside healthcare providers for over a decade, {company.displayName} eliminates outdated systems so every patient encounter flows seamlessly into the next—no hunting for records, no double entry, just care.
                </p>
                {/* Next Patient Dashboard */}
                <div className="bg-gradient-to-br from-green-500/5 to-blue-500/10 rounded-2xl p-4 border border-green-500/20">
                  <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                    <div className="flex h-72">
                      {/* Mini sidebar */}
                      <div className="w-12 bg-primary/5 border-r border-gray-200 dark:border-gray-700 p-2 space-y-2">
                        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                          <LayoutDashboard className="w-4 h-4 text-white" />
                        </div>
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg" />
                      </div>

                      {/* Main content */}
                      <div className="flex-1 p-4 flex flex-col">
                        {/* Header with patient counter */}
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="text-sm font-semibold">Patient #{patientIndex + 1}</div>
                            <div className="text-xs text-muted-foreground">Current encounter</div>
                          </div>
                          <motion.div
                            key="patient-badge"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-xs text-green-600 bg-green-100 dark:bg-green-900/50 px-2 py-0.5 rounded-full"
                          >
                            All caught up
                          </motion.div>
                        </div>

                        {/* Animated checklist */}
                        <AnimatePresence mode="wait">
                          {showChecklist && (
                            <motion.div
                              key="patient-checklist"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-1.5 flex-1"
                            >
                              {checklistItems.map((item, index) => (
                                <motion.div
                                  key={item}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.15, type: "spring", stiffness: 300 }}
                                  style={{ willChange: "transform, opacity" }}
                                  className="flex items-center gap-2 p-1.5 bg-green-50 dark:bg-green-900/20 rounded-lg"
                                >
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: index * 0.15 + 0.1, type: "spring", stiffness: 400 }}
                                  >
                                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                  </motion.div>
                                  <span className="text-xs">{item}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Next Patient Button */}
                        <motion.button
                          type="button"
                          onClick={handleNextPatient}
                          disabled={isTransitioning}
                          aria-busy={isTransitioning}
                          className="mt-3 w-full py-2 bg-amber-100 hover:bg-amber-200 border border-amber-200 text-amber-600 text-sm font-medium rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <UserPlus className="w-4 h-4" />
                          <span>Next Patient</span>
                          <ChevronRight className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
        </div>
      </div>
    </section>
  )
}
