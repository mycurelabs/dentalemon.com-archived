"use client"

import { useCallback } from "react"

// PHP-only currency configuration
const PHP_CURRENCY = {
  code: "PHP",
  symbol: "₱",
  locale: "en-PH",
}

export function useCurrencyLocale() {
  const formatCurrency = useCallback((amount: number) => {
    return new Intl.NumberFormat(PHP_CURRENCY.locale, {
      style: "currency",
      currency: PHP_CURRENCY.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }, [])

  return {
    currency: PHP_CURRENCY,
    formatCurrency,
  }
}
