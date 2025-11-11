import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { SocialProof } from "@/components/social-proof"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <SocialProof />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
