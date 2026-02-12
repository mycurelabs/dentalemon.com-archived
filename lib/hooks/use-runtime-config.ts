"use client"

import { useState, useEffect, useCallback } from "react"
import { brandConfig } from "@/config/brand"

interface RuntimeConfig {
  accountUrl: string
}

interface UseRuntimeConfigResult {
  config: RuntimeConfig
  isLoading: boolean
  error: Error | null
}

// Default fallback values from brand config
const defaultConfig: RuntimeConfig = {
  accountUrl: brandConfig.urls.accountUrl || brandConfig.urls.portal,
}

// Module-level cache
let cachedConfig: RuntimeConfig | null = null
let cachePromise: Promise<RuntimeConfig> | null = null

/**
 * Fetch runtime config from API with caching
 */
async function fetchRuntimeConfig(): Promise<RuntimeConfig> {
  // Return cached if available
  if (cachedConfig) {
    return cachedConfig
  }

  // Return existing promise if fetch is in progress
  if (cachePromise) {
    return cachePromise
  }

  // Start new fetch
  cachePromise = (async () => {
    try {
      const response = await fetch("/api/config", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch config: ${response.statusText}`)
      }

      const data = await response.json()
      const fetchedUrl = data.accountUrl || defaultConfig.accountUrl
      cachedConfig = {
        accountUrl: isValidHttpsUrl(fetchedUrl) ? fetchedUrl : defaultConfig.accountUrl,
      }
      return cachedConfig
    } catch (err) {
      console.error("Error fetching runtime config, using defaults:", err)
      cachedConfig = defaultConfig
      return cachedConfig
    }
  })()

  return cachePromise
}

/**
 * Hook to get runtime configuration
 * Fetches from API once and caches, falls back to brand config defaults
 */
export function useRuntimeConfig(): UseRuntimeConfigResult {
  const [config, setConfig] = useState<RuntimeConfig>(cachedConfig || defaultConfig)
  const [isLoading, setIsLoading] = useState(!cachedConfig)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    // If already cached, no need to fetch
    if (cachedConfig) {
      setConfig(cachedConfig)
      setIsLoading(false)
      return
    }

    let mounted = true

    fetchRuntimeConfig()
      .then((result) => {
        if (mounted) {
          setConfig(result)
          setIsLoading(false)
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err instanceof Error ? err : new Error("Failed to fetch config"))
          setIsLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  return {
    config,
    isLoading,
    error,
  }
}

/**
 * Validate that a URL is HTTPS and well-formed
 */
function isValidHttpsUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:"
  } catch {
    return false
  }
}

/**
 * Build sign-up URL with package redirect
 */
export function buildSignUpUrl(accountUrl: string, packageId?: string): string {
  if (!isValidHttpsUrl(accountUrl)) {
    throw new Error("Invalid account URL: must be a valid HTTPS URL")
  }

  if (packageId && !/^[a-zA-Z0-9\-_]+$/.test(packageId)) {
    throw new Error("Invalid package ID: must be alphanumeric with hyphens/underscores only")
  }

  if (!packageId) {
    return `${accountUrl}/auth/sign-up`
  }

  const redirectPath = `/licenses?package=${packageId}`
  return `${accountUrl}/auth/sign-up?redirectTo=${encodeURIComponent(redirectPath)}`
}
