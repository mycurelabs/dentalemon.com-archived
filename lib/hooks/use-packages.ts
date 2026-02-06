"use client"

import { useState, useEffect } from "react"
import type { Package } from "@/lib/types/package"

export type { Package }

export function usePackages() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetch("/licenses/packages")
      .then((res) => res.json())
      .then((data) => {
        const active = (data.data || []).filter(
          (p: Package) => p.status === "active"
        )
        setPackages(active)
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false))
  }, [])

  return { packages, loading, error }
}

export function formatPrice(unitAmount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(unitAmount)
}

export function formatInterval(interval: string, count: number): string {
  if (count === 1) return `per ${interval}`
  return `per ${count} ${interval}s`
}

export function filterMainPackages(packages: Package[]): Package[] {
  return packages.filter((p) => !p.tags?.includes("addon"))
}
