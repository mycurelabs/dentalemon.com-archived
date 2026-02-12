# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a healthcare management SaaS website template built with Next.js 16, TypeScript, and the App Router architecture. The template provides a customizable healthcare website foundation that can be configured via `config/brand.ts`.

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server (port 3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

**Note**: This project uses pnpm, not npm or yarn.

## Architecture Overview

### Animation Strategy
- Viewport-triggered animations using Framer Motion
- Stagger effects for lists/grids (0.1s delay increments)
- Progressive reveals (0.2s, 0.3s, 0.4s delays)
- `viewport={{ once: true }}` for performance

## Build Configuration

The project has conditional TypeScript settings in `next.config.mjs`:
- **TypeScript errors**: Only ignored in non-production builds (`ignoreBuildErrors: process.env.NODE_ENV !== 'production'`)
- **ESLint**: Config removed in Next.js 16 — use ESLint directly (no eslint setting in next.config.mjs)
- **Image optimization**: Enabled with AVIF and WebP formats (`formats: ['image/avif', 'image/webp']`)
- **Security headers**: Comprehensive CSP, X-Frame-Options, HSTS, and other security headers
- **API rewrites**: Conditional rewrites to backend API when API_URL is configured

This configuration balances development speed with production quality.

## Component System

### shadcn/ui Integration
- 12 components in `/components/ui/`: accordion, button, card, input, label, marquee, navigation-menu, sheet, skeleton, slider, tabs, tooltip
- Configuration in `components.json`
- To add new components: `npx shadcn-ui@latest add <component-name>`

### MagicUI Components
- 8 custom animated components in `/components/magicui/`: animated-gradient-text, animated-shiny-text, dot-pattern, number-ticker, rainbow-button, scroll-progress, shimmer-button, sparkles-text
- Key patterns:
  - **AnimatedShinyText**: Badge-style product positioning
  - **ShimmerButton**: Primary CTA buttons with shimmer effect
  - **NumberTicker**: Animated statistics with staggered delays
  - **RainbowButton**: Gradient-animated call-to-action button

### Component Organization
- **UI Components** (`/components/ui/`): shadcn/ui primitives
- **Magic UI** (`/components/magicui/`): Custom animated components
- **Sections** (`/components/sections/`): Reusable page sections
- **Hooks** (`/hooks/`): Custom React hooks

## Styling System

### Core Configuration
- **Primary Color**: `#0099CC` (brand blue)
- **CSS Variables**: HSL color system for theming
- **Dark Mode**: Implemented with next-themes
- **Utility**: `cn()` function in `/lib/utils.ts` for class merging

### Design Patterns
- Glass morphism: `bg-background/95 backdrop-blur-sm border-white/10`
- Brand gradient: `brand-gradient-bg` class
- Responsive grids: Mobile-first with md: and lg: breakpoints
- Section spacing: `py-20 md:py-32`
- Container: `container px-4 md:px-6`

## Page Routes

The project currently has 3 main routes:

- `/` - Homepage with hero, features, and marketing content
- `/privacy-policy` - Privacy policy and data handling information
- `/terms-and-conditions` - Terms of service

## Key Dependencies

### Core Framework
- Next.js ^16.1.4 with App Router
- React ^19.2.3 with TypeScript ^5
- Tailwind CSS with tailwindcss-animate

### UI Libraries
- shadcn/ui components (12 components)
- Framer Motion for animations
- Lucide React for icons
- Radix UI primitives (accordion, dialog, navigation-menu, tabs, tooltip, etc.)

### Utilities
- React Hook Form + Zod for forms
- clsx + tailwind-merge for styling
- class-variance-authority for component variants
- embla-carousel-react for carousels
- next-themes for dark mode

### Analytics & Performance
- @vercel/analytics for user analytics
- @vercel/speed-insights for performance monitoring
