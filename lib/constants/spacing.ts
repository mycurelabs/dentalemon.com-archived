/**
 * Standardized spacing constants for consistent section layouts.
 * Use these classes to maintain visual rhythm across pages.
 *
 * @example
 * ```tsx
 * import { SECTION_SPACING } from "@/lib/constants/spacing"
 *
 * function Section() {
 *   return (
 *     <section className={SECTION_SPACING.default}>
 *       <h2>Section Title</h2>
 *     </section>
 *   )
 * }
 * ```
 */
export const SECTION_SPACING = {
  /** Standard section padding: py-20 md:py-32 */
  default: "py-20 md:py-32",
  /** Compact section padding: py-12 md:py-20 */
  compact: "py-12 md:py-20",
  /** Large section padding: py-32 md:py-48 */
  large: "py-32 md:py-48",
} as const

export type SectionSpacing = keyof typeof SECTION_SPACING
