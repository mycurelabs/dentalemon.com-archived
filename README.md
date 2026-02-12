# TOPSI Healthcare Website Template

A brand-agnostic healthcare website template built with Next.js 16, Tailwind CSS, and shadcn/ui. Features HIPAA-compliant terminology, patient safety language, and configurable branding.

## Features

- **Brand Configuration**: Centralized brand config (`config/brand.ts`) for easy customization
- **Healthcare-Ready**: HIPAA compliance messaging, clinical terminology, patient-centric UX
- **Modern Stack**: Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Offline-First**: Built-in offline capability messaging and patterns
- **SEO Optimized**: JSON-LD structured data, OpenGraph, Twitter cards
- **Responsive**: Mobile-first design with WCAG 2.2 AA accessibility

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

## Brand Configuration

All brand-specific elements are centralized in `config/brand.ts`. Edit this file to customize:

### Company Identity
```typescript
company: {
  legalName: "Your Company Inc.",
  displayName: "YourBrand",
  shortName: "YB",
  tagline: "Healthcare Management Made Simple",
  description: "Your company description...",
  foundedYear: 2024,
}
```

### Colors
```typescript
colors: {
  primary: "#0099CC",        // Your primary brand color
  gradients: {
    primary: "#008FCC",      // Gradient colors for hero sections
    secondary: "#0085CC",
    tertiary: "#00B8CC",
    quaternary: "#0099CC",
    quinary: "#0099CC",
    background: "#c7e2ff",
  },
  // Dark mode variants...
}
```

### URLs
```typescript
urls: {
  website: "https://yourdomain.com",
  portal: "https://portal.yourdomain.com",
  demo: "https://calendly.com/your-company/demo",
  help: "https://help.yourdomain.com",
  blog: "https://blog.yourdomain.com",
  // ...
}
```

### Social Media
```typescript
social: {
  facebook: "https://www.facebook.com/your-company/",
  instagram: "https://www.instagram.com/your-company/",
  linkedin: "https://www.linkedin.com/company/your-company",
  // twitter, youtube, tiktok...
}
```

### Assets
```typescript
assets: {
  logo: "/logo.svg",          // Replace with your logo
  logoAlt: "YourBrand Logo",
  favicon: "/favicon.ico",
  favicon16: "/favicon-16x16.png",
  favicon32: "/favicon-32x32.png",
  appleTouchIcon: "/apple-touch-icon.png",
  ogImage: "/og-image.png",
}
```

## File Structure

```
topsi-template.com/
├── app/                    # Next.js App Router pages
│   ├── (home)/            # Landing page
│   ├── privacy-policy/    # Privacy policy
│   ├── terms-and-conditions/
│   ├── api/               # API routes
│   ├── globals.css        # Global styles + CSS variables
│   └── layout.tsx         # Root layout with metadata
├── components/
│   ├── sections/          # Page sections (Footer, headers)
│   ├── ui/                # shadcn/ui components (12 components)
│   ├── magicui/           # Animation components (8 components)
│   └── structured-data.tsx # JSON-LD schemas
├── config/
│   ├── brand.ts           # Main brand configuration
│   ├── brand.types.ts     # TypeScript interfaces
│   ├── brand.example.ts   # Reference configuration
│   └── index.ts           # Export barrel
├── public/
│   ├── logo.svg           # Brand logo (replace)
│   ├── favicon.ico        # Favicon (replace)
│   └── ...                # Other assets
└── tailwind.config.js     # Tailwind + CSS variable integration
```

## Customization Guide

### 1. Update Brand Configuration

Edit `config/brand.ts` with your company information, colors, and URLs.

### 2. Replace Logo & Favicons

Replace files in `/public/`:
- `logo.svg` - Your SVG logo
- `favicon.ico` - Browser favicon
- `favicon-16x16.png` - Small favicon
- `favicon-32x32.png` - Standard favicon
- `apple-touch-icon.png` - iOS icon (180x180)
- `og-image.png` - Social sharing image (1200x630)

### 3. Customize Colors (Optional)

For advanced color customization, edit CSS variables in `app/globals.css`:

```css
:root {
  --brand-primary: #YOUR_COLOR;
  --gradient-primary: #YOUR_GRADIENT_1;
  --gradient-secondary: #YOUR_GRADIENT_2;
  /* ... */
}
```

### 4. Update Page Content

Each page has a `data.ts` file with content configuration:
- `app/(home)/data.ts` - Landing page content

Content automatically uses your brand name from the config.

## Healthcare Terminology (Preserved)

The following terminology is healthcare-specific and intentionally NOT configurable:

- HIPAA compliance messaging
- EMR (Electronic Medical Records)
- Clinical terminology (patient, provider, appointment, etc.)
- Regulatory references (DOH, DOLE, OSH)
- Healthcare workflow descriptions
- Security and encryption messaging

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
pnpm add -g vercel

# Deploy
vercel
```

### Other Platforms

Build the production bundle:

```bash
pnpm build
pnpm start
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Components**: shadcn/ui (12 components)
- **Animations**: Framer Motion
- **Analytics**: Vercel Analytics

## License

Proprietary - TOPSI Inc.

---

For reference on the original MYCURE configuration values, see `config/brand.example.ts`.
