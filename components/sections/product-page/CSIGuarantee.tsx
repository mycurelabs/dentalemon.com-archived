"use client"

import { motion } from "framer-motion"
import { CheckCircle, Shield, Cloud } from "lucide-react"
import { AnimatedBadge } from "@/components/custom/animated-badge"
import { brandConfig } from "@/config/brand"

const { company } = brandConfig

export function CSIGuarantee() {
  return (
    <section id="csi-guarantee" className="w-full py-12 sm:py-16 md:py-20 lg:py-32 mb-12 md:mb-20 lg:mb-32 relative bg-background">
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
              <AnimatedBadge>{company.displayName} CSI Guarantee</AnimatedBadge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight mt-4">
                Protected by Design,<br />
                Compliant by Default
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground mt-6 max-w-lg leading-relaxed">
                Your patients trust you with their most sensitive health information. {company.displayName} CSI ensures
                that trust is never broken with enterprise-grade security, automatic compliance, and
                seamless interoperability.
              </p>
            </motion.div>
          </div>

          {/* Progressive Feature Reveals */}
          <div className="space-y-40">
            {/* Compliance Feature */}
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
                  <h3 className="text-2xl md:text-3xl font-bold text-green-600">HIPAA-Compliant from Day One</h3>
                  <p className="text-muted-foreground">Automatic healthcare compliance</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Start accepting patients immediately with built-in HIPAA compliance. No configuration needed—we handle
                encryption, access controls, and audit logs automatically so you can focus on patient care, not paperwork.
              </p>
              <div className="bg-gradient-to-br from-green-500/5 to-green-500/10 rounded-2xl p-6 border border-green-500/20">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Compliance Status</div>
                        <div className="text-xs text-muted-foreground">100% HIPAA Compliant</div>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-green-600">Active</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <div>
                        <div className="font-semibold text-sm">Audit Logs</div>
                        <div className="text-xs text-muted-foreground">Automatic tracking enabled</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <div>
                        <div className="font-semibold text-sm">Access Controls</div>
                        <div className="text-xs text-muted-foreground">Role-based permissions active</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Security Feature */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-purple-600">Bank-Level Security Infrastructure</h3>
                  <p className="text-muted-foreground">Enterprise-grade protection</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Sleep soundly with our dual-layer security approach. AES-256 encryption protects your data at rest,
                while advanced deidentification techniques ensure patient privacy even in worst-case scenarios.
              </p>
              <div className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 rounded-2xl p-6 border border-purple-500/20">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">AES-256 Encryption</div>
                        <div className="text-xs text-muted-foreground">Military-grade data protection</div>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-purple-600">Active</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                      <div>
                        <div className="font-semibold text-sm">Data Deidentification</div>
                        <div className="text-xs text-muted-foreground">Automated anonymization</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                      <div>
                        <div className="font-semibold text-sm">Dual-Layer Protection</div>
                        <div className="text-xs text-muted-foreground">Encryption + anonymization</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Interoperability Feature */}
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center">
                  <Cloud className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-600">Connect with Any Healthcare System</h3>
                  <p className="text-muted-foreground">Universal interoperability</p>
                </div>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Break down data silos and connect seamlessly with labs, clinics, pharmacies, and insurance providers.
                Share records, receive results, and process claims—all from one unified platform.
              </p>
              <div className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 rounded-2xl p-6 border border-blue-500/20">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Cloud className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Healthcare Network</div>
                        <div className="text-xs text-muted-foreground">Comprehensive connectivity</div>
                      </div>
                    </div>
                    <div className="text-xs font-medium text-blue-600">Connected</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <div>
                        <div className="font-semibold text-sm">Lab & Diagnostic Centers</div>
                        <div className="text-xs text-muted-foreground">Instant result sharing</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/90 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <div>
                        <div className="font-semibold text-sm">Insurance & HMO Partners</div>
                        <div className="text-xs text-muted-foreground">Streamlined claims processing</div>
                      </div>
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
