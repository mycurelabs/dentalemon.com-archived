/**
 * Package Types
 *
 * Types matching the external packages API response structure
 */

export interface Entitlement {
  code: string
  name: string
  description?: string
  value?: string | number | boolean
}

export interface BillingConfig {
  unitAmount: number
  currency: string
  interval: "day" | "week" | "month" | "year"
  intervalCount: number
}

export interface Package {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
  entitlements: Entitlement[]
  billingConfig?: BillingConfig
  tags?: string[]
}
