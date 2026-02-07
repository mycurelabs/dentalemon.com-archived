"use client"

import Link from "next/link"
import Image from "next/image"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePageState } from "@/hooks/use-page-state"
import { brandConfig } from "@/config/brand"
import { cn } from "@/lib/utils"

const { company, assets } = brandConfig

export function DirectoryHeader() {
  const { isScrolled, mounted, theme, toggleTheme } = usePageState()

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300",
      isScrolled ? "bg-background/80 shadow-sm" : "bg-background/50"
    )}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold hover:opacity-80 transition-opacity">
          <div className="size-8 rounded-full bg-white flex items-center justify-center">
            <Image src={assets.logo} alt={`${company.displayName} Logo`} width={32} height={32} />
          </div>
          <span>{company.displayName}</span>
        </Link>

        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
          {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}
