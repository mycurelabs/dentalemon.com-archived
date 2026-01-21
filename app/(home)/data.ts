import {
  Users,
  Shield,
  Zap,
  BarChart,
  Layers,
  Star,
  Calendar,
  WifiOff,
  ShieldCheck,
  Lock,
  Cloud,
  FileText,
  CreditCard,
  AlertTriangle,
  RefreshCw,
  UserPlus,
  Settings,
  Download,
  ClipboardList,
  MessageSquare,
  Bell,
  UserCircle,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { brandConfig } from "@/config"

const { company, urls, navigation } = brandConfig

// =============================================================================
// HERO SECTION CONFIG
// =============================================================================
export const heroConfig = {
  badge: "The New Frontier for Dental Clinics",
  headline: {
    line1: "Run Your Dental Practice",
    line2: "Without the Paperwork",
  },
  description: `Automate scheduling, billing, and patient records—even offline. Your practice, your way.`,
  cta: {
    primary: {
      text: "Start Free Trial",
      href: urls.demo,
    },
    secondary: {
      text: "See How It Works",
      href: "#how-it-works",
    },
  },
  video: {
    videoId: "",
    src: "",
    title: `${company.displayName} Dental Practice Management`,
    watchUrl: "",
  },
}

// =============================================================================
// TRUST BADGES CONFIG
// =============================================================================
export interface TrustBadge {
  icon: LucideIcon
  label: string
  description: string
}

export interface DemandSignal {
  value: number
  suffix?: string
  prefix?: string
  label: string
}

export const trustBadgesConfig = {
  badges: [
    { icon: ShieldCheck, label: "HIPAA Compliant", description: "Full regulatory compliance" },
    { icon: Lock, label: "256-bit Encryption", description: "Bank-level security" },
    { icon: RefreshCw, label: "Real-time Updates", description: "Always in sync" },
    { icon: Cloud, label: "Offline Capable", description: "Work without internet" },
  ] as TrustBadge[],
}

// =============================================================================
// GUIDE SECTION CONFIG
// =============================================================================
export interface CredentialItem {
  text: string
  icon?: LucideIcon
}

export interface CompetencyProof {
  value: number
  label: string
  icon: LucideIcon
  delay?: number
}

export const guideConfig = {
  badge: "Your Partner in Dental Care",
  headline: "We understand your practice",
  empathyStatement: `We've spent years working alongside dental professionals just like you. We've seen the frustration of juggling outdated systems, the stress of compliance concerns, and the exhaustion of managing paperwork instead of treating patients.`,
  solutionBridge: `That's why we built ${company.displayName}—a system designed by dental professionals, for dental professionals. We're here to give you back the time you need to do what you do best.`,
  competencyProof: [
    { value: 500000, label: "Patient Records Managed", icon: FileText, delay: 0.3 },
    { value: 150000, label: "Patient Profiles Created", icon: Users, delay: 0.4 },
    { value: 250000, label: "Appointments Scheduled", icon: Calendar, delay: 0.5 },
  ] as CompetencyProof[],
  credentials: [
    "Dental-focused since founding",
    "Built by former dental practice managers",
    "HIPAA compliance built into our DNA",
    "Serving dental practices across the US",
  ],
}

// =============================================================================
// STORYBRAND SECTION CONFIG
// =============================================================================
export const storybrandConfig = {
  reality: {
    badge: "THE CHALLENGE",
    title: "The Reality",
    subtitle: "What dental teams face daily",
    description: "Every day, your team battles mountains of paperwork, scattered patient records, and scheduling chaos that never seems to end. Appointments fall through the cracks. Records get lost. Revenue leaks from billing errors.",
    notifications: [
      { icon: AlertTriangle, text: "Missing patient record for 2pm appointment", type: "warning" as const },
      { icon: Calendar, text: "Double-booking conflict in Operatory 2", type: "error" as const },
      { icon: FileText, text: "3 unsigned treatment plans pending", type: "warning" as const },
    ],
  },
  frustration: {
    badge: "THE FRUSTRATION",
    title: "The Frustration",
    subtitle: "Time that should be yours",
    description: "You feel the weight of administrative burden stealing time from what you trained years to do—caring for patients. The constant firefighting is exhausting, and frankly, it's unfair to you and your team.",
    progressLabel: "Administrative time consuming your day",
    progressValue: 65,
  },
  answer: {
    badge: "THE ANSWER",
    title: "The Answer",
    subtitle: "One click. Next patient.",
    description: `Imagine walking into your practice knowing every patient record is at your fingertips, every appointment is optimized, and your team is finally free to focus on care, not chaos. With ${company.displayName}, that's your new reality.`,
  },
  philosophicalProblem: "Dental professionals shouldn't have to choose between excellent patient care and efficient operations. Both should be possible—and with the right tools, they are.",
}

// =============================================================================
// TIME BACK TO CARE CALCULATOR
// =============================================================================
export const stakesConfig = {
  badge: "Efficiency Calculator",
  headline: "Time Back to Care",
  description: "See how much time your team can reclaim for what matters most—your patients.",

  inputs: {
    patientsPerDay: {
      label: "Patients per Day",
      default: 25,
      min: 5,
      max: 80,
    },
    processTime: {
      label: "Process Time per Visit",
      description: "Check-in, documentation, billing, scheduling",
      default: 15,
      min: 5,
      max: 30,
      unit: "min",
    },
    providerCount: {
      label: "Number of Dentists",
      default: 2,
      min: 1,
      max: 10,
    },
  },

  efficiencyFactor: 0.8,
  workingDaysPerWeek: 5,
  avgVisitDuration: 30,
  revenuePerVisit: 250, // $250 average revenue per visit

  cta: {
    text: "Start Your Free Trial",
    href: urls.demo,
  },
  ctaNote: "Your staff will thank you. Your patients will too.",
}

// =============================================================================
// TESTIMONIALS SECTION CONFIG (Minimized)
// =============================================================================
export interface TestimonialItem {
  quote: string
  transformation?: {
    from: string
    to: string
  }
  author: string
  role: string
  practice: string
  image?: string
  stat?: {
    value: number
    suffix?: string
    prefix?: string
    label: string
  }
}

export interface AggregateStats {
  rating: { value: number; label: string }
  reviews: { value: number; suffix: string; label: string }
  nps: { value: number; label: string }
}

export const testimonialsConfig = {
  badge: "Success Stories",
  headline: "Trusted by Dental Professionals",
  description: "See how practices like yours improved their operations.",
  items: [] as TestimonialItem[],
  aggregateStats: {
    rating: { value: 4.8, label: "Average rating" },
    reviews: { value: 100, suffix: "+", label: "Reviews" },
    nps: { value: 72, label: "Net Promoter Score" },
  } as AggregateStats,
}

// =============================================================================
// LOGO CLOUD CONFIG
// =============================================================================
export const logosConfig = {
  heading: "Trusted by dental professionals.",
  subheading: "Used by modern dental practices.",
  logos: [] as { src: string; alt: string; name: string }[],
}

// =============================================================================
// FEATURES GRID CONFIG (6 Dental Features)
// =============================================================================
export interface FeatureItem {
  title: string
  description: string
  icon: LucideIcon
}

export const featuresGridConfig = {
  badge: "Features",
  headline: "Everything You Need to Run Your Practice",
  description: `${company.displayName} provides a complete set of tools for dental practices. From patient records to billing, our platform enables your team to deliver care more efficiently.`,
  items: [
    {
      title: "Appointment Scheduling",
      description: "Intelligent scheduling system with online booking, automated reminders, and calendar management to reduce no-shows and optimize your practice flow.",
      icon: Calendar,
    },
    {
      title: "Patient Records Management",
      description: "Comprehensive digital health records with treatment history, clinical notes, and document management for complete patient information at your fingertips.",
      icon: ClipboardList,
    },
    {
      title: "Billing & Payments",
      description: "Streamlined billing processes with insurance claim management, payment tracking, and financial reporting to keep your practice financially healthy.",
      icon: CreditCard,
    },
    {
      title: "Patient Portal",
      description: "Give your patients 24/7 access to their records, appointment booking, and secure messaging to enhance engagement and satisfaction.",
      icon: UserCircle,
    },
    {
      title: "Analytics & Reporting",
      description: "Powerful insights into practice performance, revenue trends, and operational metrics to make data-driven decisions for growth.",
      icon: BarChart,
    },
    {
      title: "Automated Communications",
      description: "Smart notification system for appointment reminders, follow-ups, and patient engagement campaigns via SMS, email, and push notifications.",
      icon: Bell,
    },
  ] as FeatureItem[],
}

// =============================================================================
// STATISTICS CONFIG
// =============================================================================
export const statisticsConfig = {
  headline: "Trusted by Dental Practices",
  description: `${company.displayName} helps dental practices deliver better care through modern practice management technology.`,
  items: [
    { value: 500000, label: "Patient Records", delay: 0.3 },
    { value: 150000, label: "Patient Profiles Created", delay: 0.4 },
    { value: 250000, label: "Appointments", delay: 0.5 },
  ],
}

// =============================================================================
// WHY CHOOSE SECTION CONFIG
// =============================================================================
export const whyChooseConfig = {
  badge: `Why Choose ${company.displayName}`,
  headline: "Built for Modern Dental Care",
  description: "Enterprise-grade capabilities with dental-specific design. Compliance, reliability, and smooth operations.",
  items: [
    {
      title: "Secure Patient Data Management",
      description: `${company.displayName} demonstrates a strong commitment to protecting patient information with HIPAA compliance, end-to-end encryption, and rigorous security protocols that meet healthcare standards.`,
      icon: Shield,
      mediaType: "image" as const,
      mediaSrc: "/features/Hipaa-compliance-mycure.webp",
      mediaAlt: "HIPAA Security & Compliance",
      bullets: [
        "Encrypted electronic health records with role-based access controls",
        "HIPAA-compliant infrastructure meeting healthcare security standards",
        "Audit trails and activity logs ensuring data accountability",
      ],
      imagePosition: "left" as const,
    },
    {
      title: "Seamless Offline Operations",
      description: `Work confidently regardless of internet connectivity. ${company.displayName}'s offline capabilities help your practice continue operating smoothly, with automatic synchronization when connectivity returns.`,
      icon: WifiOff,
      mediaType: "video" as const,
      mediaSrc: "/features/mycure-syncbase-demo.mp4",
      mediaAlt: "Offline Operations Demo",
      bullets: [
        "Offline access to patient records and treatment history",
        "Automatic sync when connection restores, preventing data loss",
        "Continue scheduling, charting, and billing without interruption",
      ],
      imagePosition: "right" as const,
    },
    {
      title: "Enhanced Patient Experience",
      description: "Empower your practice to deliver exceptional patient care with tools that improve communication, reduce wait times, and create seamless appointment experiences.",
      icon: Users,
      mediaType: "image" as const,
      mediaSrc: "/features/effortless-clinical-workflows-v3.png",
      mediaAlt: "Clinical Workflows",
      bullets: [
        "Online booking and automated appointment reminders",
        "Patient portal for easy access to records and communication",
        "Streamlined check-in process reducing patient wait times",
      ],
      imagePosition: "left" as const,
    },
  ],
}

// =============================================================================
// VISIBILITY SECTION CONFIG
// =============================================================================
export const visibilityConfig = {
  badge: "Your Transformation",
  headline: "Visibility for your entire practice.",
  description: "Keep up with what's happening across every operatory and patient case.",
  transformation: {
    from: "Overwhelmed administrator juggling paper records and constant firefighting",
    to: "Confident practice manager with complete visibility and time to focus on growth",
  },
  items: [
    {
      bold: "Eliminate",
      normal: "unnecessary tool costs with one comprehensive platform.",
      benefit: "Save on redundant subscriptions",
      image: "/Features Photos/Visibility for your entire clinic/eliminate-unnecessary-tool-costs.png",
      imageAlt: `${company.displayName} platform showing elimination of unnecessary tool costs`,
      gradient: "from-orange-400 via-pink-400 to-pink-500",
    },
    {
      bold: "Reduce",
      normal: "administrative burden through intelligent automation.",
      benefit: "Practices report saving 15+ hours weekly",
      image: "/Features Photos/Visibility for your entire clinic/reduce-administrative-burden.png",
      imageAlt: `${company.displayName} dashboard reducing administrative burden`,
      gradient: "from-orange-400 via-yellow-400 to-orange-500",
    },
    {
      bold: "Improve",
      normal: "patient satisfaction with efficient scheduling, clear communication, and reduced wait times.",
      benefit: "Practices report improved satisfaction",
      image: "/Features Photos/Visibility for your entire clinic/improve-patient-satisfaction.png",
      imageAlt: `${company.displayName} dashboard showing patient management features`,
      gradient: "from-green-400 via-blue-400 to-blue-500",
    },
    {
      bold: "Protect",
      normal: "your revenue with automatic compliance monitoring and HIPAA security.",
      benefit: "Prevent costly compliance fines",
      image: "/Features Photos/Visibility for your entire clinic/protect-your-revenue.png",
      imageAlt: `${company.displayName} revenue protection dashboard`,
      gradient: "from-gray-400 via-gray-300 to-gray-400",
    },
  ],
}

// =============================================================================
// INTEGRATION SECTION CONFIG
// =============================================================================
export const integrationConfig = {
  headline: {
    before: "Dental care that",
    highlight: "works together",
  },
  description: `${company.displayName} works with your existing dental workflows rather than replacing them. Our platform enhances what already works while filling critical gaps in patient records, scheduling, and compliance.`,
  cta: {
    text: "Schedule a Walkthrough",
    href: urls.demo,
  },
  icons: [
    { src: "/Icons/Laboratory.73d89a4.webp", alt: "Laboratory Integration" },
    { src: "/Icons/Imaging.6ce014b.webp", alt: "X-Ray Integration" },
    { src: "/Icons/Authentication.44e8ba4.webp", alt: "Authentication Integration" },
    { src: "/Icons/Billing.e26d6fb.webp", alt: "Billing Integration" },
    { src: "/Icons/Pharmacy.0b3ed83.webp", alt: "Pharmacy Integration" },
    { src: "/Icons/Chat.5394f0b.webp", alt: "Chat Integration" },
    { src: "/Icons/Inventory.c0eabf9.webp", alt: "Inventory Integration" },
    { src: "/Icons/Queuing.2f5c8c8.webp", alt: "Queuing Integration" },
  ],
}

// =============================================================================
// TIMELINE CONFIG
// =============================================================================
export interface TimelineStep {
  title: string
  icon: LucideIcon
  items: string[]
}

export interface TimelineContent {
  today: TimelineStep[]
  day3: TimelineStep[]
  day7: TimelineStep[]
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  icon: LucideIcon
}

export const timelineConfig = {
  badge: "How It Works",
  headline: `Your path to ${company.displayName}`,
  headlineHighlight: "in 3 simple steps",
  description: "We've helped hundreds of dental practices improve their operations. Here's exactly how we'll do the same for you.",

  processSteps: [
    {
      step: 1,
      title: "Create Your Account",
      description: "Sign up in under 2 minutes. No credit card required—just your email and you're in.",
      icon: UserPlus,
    },
    {
      step: 2,
      title: "Set Up Your Practice",
      description: "Add your team, configure operatories, and import existing patient data with guided setup.",
      icon: Settings,
    },
    {
      step: 3,
      title: "Download & Go Live",
      description: "Get the app on any device. Your practice runs smoothly from day one—online or offline.",
      icon: Download,
    },
  ] as ProcessStep[],

  agreementPlan: {
    title: "Our Promise to You",
    promises: [
      "14-day free trial—no credit card required",
      "Dedicated onboarding specialist",
      "Data migration assistance included",
      "Cancel anytime, no questions asked",
    ],
  },

  tabs: [
    { id: "today", label: "Today" },
    { id: "day3", label: "Day 3" },
    { id: "day7", label: "Day 7" },
  ],
  content: {
    today: [
      {
        title: "Setup Your Practice",
        icon: Users,
        items: [
          "Create your practice profile in minutes",
          "Add your first staff members and operatories",
          "Configure basic settings and preferences",
          "Import existing patient data securely",
        ],
      },
      {
        title: "Patient Registration",
        icon: Shield,
        items: [
          "Register your first patients",
          "Set up appointment scheduling",
          "Configure patient communication preferences",
          "Enable HIPAA-compliant data storage",
        ],
      },
      {
        title: "Basic Operations",
        icon: Zap,
        items: [
          "Schedule your first appointments",
          "Start using digital patient records",
          "Set up basic billing and invoicing",
          "Configure notification preferences",
        ],
      },
    ],
    day3: [
      {
        title: "Advanced Features",
        icon: BarChart,
        items: [
          "Set up automated appointment reminders",
          "Configure advanced reporting dashboards",
          "Enable patient portal access",
          "Connect payment processing",
        ],
      },
      {
        title: "Workflow Optimization",
        icon: Layers,
        items: [
          "Automate patient check-in processes",
          "Set up custom treatment templates",
          "Configure insurance verification workflows",
          "Enable treatment planning tools",
        ],
      },
      {
        title: "Team Collaboration",
        icon: Users,
        items: [
          "Set up operatory-specific workflows",
          "Configure staff scheduling and shifts",
          "Enable secure internal messaging",
          "Set up role-based access controls",
        ],
      },
    ],
    day7: [
      {
        title: "Streamlined Operations",
        icon: Zap,
        items: [
          "Automate routine administrative tasks",
          "Set up smart patient queuing workflows",
          "Use scheduling insights to reduce wait times",
          "Configure automated billing workflows",
        ],
      },
      {
        title: "Advanced Analytics",
        icon: BarChart,
        items: [
          "Generate comprehensive practice reports",
          "Track key performance indicators",
          "Monitor patient satisfaction metrics",
          "Analyze revenue and efficiency trends",
        ],
      },
      {
        title: "Scale Your Practice",
        icon: Star,
        items: [
          "Reduce administrative burden",
          "Increase patient satisfaction scores",
          "Improve appointment scheduling efficiency",
          "Enhance overall practice profitability",
        ],
      },
    ],
  } as TimelineContent,
  cta: {
    text: "Start My Free Trial",
    href: urls.demo,
  },
  ctaNote: "No credit card required • 14-day free trial • Setup in minutes",
}

// =============================================================================
// PRICING CONFIG (USD)
// =============================================================================
export interface PricingPlan {
  name: string
  tier: "good" | "better" | "best"
  price: string
  period: string
  description: string
  valueStatement: string
  features: string[]
  popular: boolean
  ctaText: string
  ctaHref?: string
}

// =============================================================================
// PRICING FEATURE COMPARISON CONFIG
// =============================================================================
export interface FeatureComparisonItem {
  name: string
  tooltip?: string
  starter: boolean | string
  professional: boolean | string
  enterprise: boolean | string
}

export interface FeatureComparisonCategory {
  category: string
  items: FeatureComparisonItem[]
}

export interface PricingComparisonConfig {
  badge?: string
  headline: string
  description: string
  plans: PricingPlan[]
  featureCategories: FeatureComparisonCategory[]
  guarantee: string
  transitionalCta: {
    text: string
    linkText: string
    href: string
  }
}

export const pricingConfig = {
  headline: "Simple, Transparent Pricing",
  description: "Choose the plan that fits your practice size and needs.",
  valueProposition: "Based on customer feedback, practices typically see ROI within the first month.",
  plans: [
    {
      name: "Starter",
      tier: "good" as const,
      price: "₱5,000",
      period: "one-time",
      description: "Perfect for solo practitioners",
      valueStatement: "Pays for itself in 2 hours of saved admin time",
      features: [
        "Up to 1 provider",
        "500 active patients",
        "Appointment scheduling",
        "Patient records management",
        "Basic reporting",
        "Email support",
      ],
      popular: false,
      ctaText: "Try Starter",
    },
    {
      name: "Professional",
      tier: "better" as const,
      price: "₱15,000",
      period: "one-time",
      description: "For growing practices",
      valueStatement: "Practices report saving 15+ hours weekly",
      features: [
        "Up to 5 providers",
        "Unlimited patients",
        "All Starter features",
        "Advanced analytics & reports",
        "Patient portal access",
        "Automated reminders",
        "Priority support",
      ],
      popular: true,
      ctaText: "Start Professional",
    },
    {
      name: "Enterprise",
      tier: "best" as const,
      price: "Custom pricing",
      period: "",
      description: "For multi-location practices",
      valueStatement: "Dedicated success manager + white-glove implementation",
      features: [
        "Unlimited providers",
        "Multi-location support",
        "All Professional features",
        "Dedicated account manager",
        "Custom integrations",
        "Priority support",
        "SLA guarantees",
        "On-site training",
      ],
      popular: false,
      ctaText: "Talk to Sales",
    },
  ] as PricingPlan[],
  featureCategories: [
    {
      category: "Core Features",
      items: [
        { name: "Providers", tooltip: "Number of dentists/hygienists", starter: "1", professional: "Up to 5", enterprise: "Unlimited" },
        { name: "Active Patients", tooltip: "Patient records you can manage", starter: "500", professional: "Unlimited", enterprise: "Unlimited" },
        { name: "Appointment Scheduling", starter: true, professional: true, enterprise: true },
        { name: "Patient Records Management", starter: true, professional: true, enterprise: true },
        { name: "Billing & Invoicing", starter: true, professional: true, enterprise: true },
        { name: "Offline Mode", tooltip: "Work without internet connection", starter: true, professional: true, enterprise: true },
      ],
    },
    {
      category: "Advanced Features",
      items: [
        { name: "Patient Portal Access", tooltip: "Patients can view records online", starter: false, professional: true, enterprise: true },
        { name: "Automated Reminders", tooltip: "SMS/Email appointment reminders", starter: false, professional: true, enterprise: true },
        { name: "Advanced Analytics", tooltip: "Revenue trends, performance metrics", starter: false, professional: true, enterprise: true },
        { name: "Custom Integrations", tooltip: "Connect with your existing tools", starter: false, professional: false, enterprise: true },
        { name: "Multi-Location Support", starter: false, professional: false, enterprise: true },
      ],
    },
    {
      category: "Support & Security",
      items: [
        { name: "HIPAA Compliance", starter: true, professional: true, enterprise: true },
        { name: "Data Encryption", starter: true, professional: true, enterprise: true },
        { name: "Email Support", starter: true, professional: true, enterprise: true },
        { name: "Priority Support", tooltip: "Faster response times", starter: false, professional: true, enterprise: true },
        { name: "Dedicated Account Manager", starter: false, professional: false, enterprise: true },
        { name: "On-Site Training", starter: false, professional: false, enterprise: true },
        { name: "SLA Guarantees", tooltip: "99.9% uptime commitment", starter: false, professional: false, enterprise: true },
      ],
    },
  ] as FeatureComparisonCategory[],
  guarantee: "30-day money-back guarantee • No long-term contracts",
  transitionalCta: {
    text: "Not sure which plan is right?",
    linkText: "Talk to our team",
    href: urls.demo,
  },
}

// =============================================================================
// FAQ CONFIG (Dental-Specific)
// =============================================================================
export const faqConfig = {
  headline: "Questions? We've got answers.",
  description: "Everything you need to know to get started with confidence.",
  items: [
    {
      question: `What is ${company.displayName}?`,
      answer: `${company.displayName} is a comprehensive dental practice management platform designed specifically for dental practices. It streamlines every aspect of your operations—from patient records and scheduling to billing and patient communication—in one unified, offline-capable system.`,
    },
    {
      question: `How much does ${company.displayName} cost?`,
      answer: `Plans start at ₱5,000 (one-time) for solo practitioners, with our most popular Professional plan at ₱15,000 (one-time) for growing practices. Enterprise pricing is customized for multi-location practices. All plans include a 14-day free trial—no credit card required. Based on customer feedback, practices typically see ROI within the first month through recovered administrative time.`,
    },
    {
      question: `Is ${company.displayName} HIPAA compliant?`,
      answer: `Yes. ${company.displayName} is built with HIPAA compliance at its core. We provide end-to-end encryption, role-based access controls, comprehensive audit trails, and secure data storage. Our infrastructure undergoes regular security assessments, and we provide BAA (Business Associate Agreement) documentation upon request.`,
    },
    {
      question: "Can I use it offline?",
      answer: `Absolutely. ${company.displayName}'s offline capability is one of our key features. You can access patient records, schedule appointments, and continue billing even without internet. When connectivity returns, everything syncs automatically—no data loss, no interruption to your workflow.`,
    },
    {
      question: "How long does implementation take?",
      answer: "Most practices are up and running within a day for basic features. Full implementation, including data migration and staff training, typically takes 1-2 weeks depending on practice size. Your dedicated onboarding specialist will create a customized timeline based on your needs.",
    },
    {
      question: "Can I migrate my existing patient data?",
      answer: `Yes. We provide data migration assistance with all plans. Our team will help you securely transfer your existing patient records, treatment history, and other critical data into ${company.displayName}. We support imports from most major dental practice management systems.`,
    },
    {
      question: "What kind of support do you offer?",
      answer: `${company.displayName} provides comprehensive support: in-app help center with guides and video tutorials, email support with 24-hour response time, priority phone support for Professional and Enterprise plans, and dedicated success managers for Enterprise clients. Our support team understands dental workflows.`,
    },
    {
      question: "What if it doesn't work for my practice?",
      answer: "We offer a 14-day free trial so you can fully explore the platform before committing. If you sign up and find it's not right for your practice, we offer a 30-day money-back guarantee—no questions asked. Our onboarding team will also work with you to ensure successful implementation.",
    },
  ],
  supplementaryCta: {
    text: "Have questions?",
    linkText: "Let's chat",
    href: urls.demo,
  },
}

// =============================================================================
// FINAL CTA CONFIG
// =============================================================================
export const finalCtaConfig = {
  headline: {
    before: "Ready to Transform",
    highlight: "Your Practice?",
    after: "",
  },
  description: `Join modern dental practices using ${company.displayName} to streamline operations and deliver exceptional patient care. Schedule a personalized demo today.`,
  directCta: {
    text: "Let's Get Started",
    href: urls.demo,
  },
  transitionalCta: {
    text: "Download Our Efficiency Guide",
    href: "/resources/dental-efficiency-guide",
    description: "Learn 7 strategies to reduce admin time by 50%",
  },
  features: [
    "No credit card required",
    "14-day free trial",
    "Setup in minutes",
    "Cancel anytime",
  ],
  socialProof: {
    text: "Trusted by dental practices nationwide",
  },
  cta: {
    text: "Schedule a Demo",
    href: urls.demo,
  },
}

// =============================================================================
// NAVIGATION CONFIG (Simplified)
// =============================================================================
export const navigationConfig = {
  features: [] as { label: string; href: string; description: string }[],
  solutions: [] as { label: string; href: string; description: string }[],
  links: [
    { label: "Pricing", href: "#pricing" },
    { label: "FAQs", href: "#faq" },
  ],
  loginUrl: navigation.loginUrl,
  ctaUrl: navigation.ctaUrl,
}
