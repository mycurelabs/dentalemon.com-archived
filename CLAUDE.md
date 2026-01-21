# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a healthcare management SaaS website template built with Next.js 14, TypeScript, and the App Router architecture. The template provides comprehensive clinic and healthcare management marketing pages that can be customized via `config/brand.ts`.

## Development Commands

```bash
# Install dependencies
npm install

# Run development server (port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

**Note**: This project uses npm, not pnpm or yarn.

## Architecture Overview

### Page Layout System

The project uses 5 distinct layout patterns (documented in `PAGE_LAYOUTS.md`):

1. **landing-style**: Complex marketing pages with heavy animations
2. **document-style**: Long-form content with sidebar navigation and scrollspy
3. **product-style**: Product marketing with sticky scroll, NumberTicker stats, and conversion optimization
4. **feature-style**: Clean SaaS feature pages with 2x2 grids and FAQ sections
5. **download-style**: Platform download pages with tab navigation

### Component Patterns

Key reusable patterns (documented in `COMPONENT_PATTERNS.md`):
- **AnimatedShinyText**: Badge-style product positioning
- **ShimmerButton**: Primary CTA buttons with shimmer effect
- **NumberTicker**: Animated statistics with staggered delays
- **Scrollytelling**: Sticky scroll with progressive content reveal
- **Card Grids**: Responsive layouts (2x2, 2x3, 1x3)

### Animation Strategy
- Viewport-triggered animations using Framer Motion
- Stagger effects for lists/grids (0.1s delay increments)
- Progressive reveals (0.2s, 0.3s, 0.4s delays)
- `viewport={{ once: true }}` for performance

## Build Configuration

The project has relaxed build settings in `next.config.mjs`:
- ESLint errors ignored during builds
- TypeScript errors ignored during builds
- Images are unoptimized

This configuration prioritizes rapid development and deployment.

## Component System

### shadcn/ui Integration
- 47+ pre-installed components in `/components/ui/`
- Configuration in `components.json` (note: references `tailwind.config.ts` but actual file is `.js`)
- To add new components: `npx shadcn-ui@latest add <component-name>`

### Component Organization
- **UI Components** (`/components/ui/`): shadcn/ui primitives
- **Magic UI** (`/components/magicui/`): Custom animated components
- **Sections** (`/components/sections/`): Reusable page sections
- **Hooks** (`/hooks/` and `/components/ui/`): Custom React hooks (duplicated)

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

### Main Pages
- `/` - Landing page (landing-style)
- `/download` - Platform downloads (download-style)

### Product Pages (product-style)
- `/clinics` - Clinics product page (definitive product-style standard)
- `/diagnostics` - Diagnostic services
- `/telehealth` - Telehealth features (feature-style)
- `/booking` - Booking system (feature-style)

### Content Pages (document-style)
- `/privacy-policy` - Privacy policy
- `/terms-and-conditions` - Terms of service
- `/our-story` - Company story
- `/syncbase-technology` - Technology explanation

### Specialty Pages
- `/skin` - Dermatology
- `/corporate` - Corporate solutions
- `/mobile-labs` - Mobile laboratory services

## Key Dependencies

### Core Framework
- Next.js 14.2.16 with App Router
- React 18 with TypeScript
- Tailwind CSS with tailwindcss-animate

### UI Libraries
- shadcn/ui components (47+ components)
- Framer Motion for animations
- GSAP for advanced animations
- @bsmnt/scrollytelling for sticky scroll

### Utilities
- React Hook Form + Zod for forms
- Recharts for data visualization
- Sonner for toast notifications
- date-fns for date handling
- clsx + tailwind-merge for styling