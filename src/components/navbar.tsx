'use client'

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🦷</span>
            <span className="font-bold text-xl">DentaLemon</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            About
          </Link>
          <Button variant="default" size="sm">
            Book Appointment
          </Button>
        </div>

        <button className="md:hidden flex flex-col gap-1.5">
          <span className="h-0.5 w-6 bg-foreground"></span>
          <span className="h-0.5 w-6 bg-foreground"></span>
          <span className="h-0.5 w-6 bg-foreground"></span>
        </button>
      </div>
    </nav>
  )
}
