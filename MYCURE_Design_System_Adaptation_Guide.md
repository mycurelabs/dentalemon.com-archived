# MYCURE Design System - Adaptation Guide for Existing Websites

This guide helps you adapt an **existing website** to match the spacing, visual hierarchy, motion behaviors, and component library of mycure.md.

---

## Table of Contents
1. [Design Audit Framework](#1-design-audit-framework)
2. [Spacing System Adaptation](#2-spacing-system-adaptation)
3. [Typography Hierarchy Adaptation](#3-typography-hierarchy-adaptation)
4. [Motion & Animation Integration](#4-motion--animation-integration)
5. [Magic UI Component Integration](#5-magic-ui-component-integration)
6. [Library Ecosystem Migration](#6-library-ecosystem-migration)
7. [Step-by-Step Adaptation Process](#7-step-by-step-adaptation-process)
8. [Before/After Comparison Checklist](#8-beforeafter-comparison-checklist)

---

## 1. Design Audit Framework

### 1.1 Current State Analysis

Before adapting, audit your existing website:

**Spacing Audit:**
```
Current section padding: ___ px (mobile) → ___ px (desktop)
Current container max-width: ___ px
Current grid gaps: ___ px
Current vertical rhythm: ___ px between elements
```

**Typography Audit:**
```
Current H1 size: ___ px (mobile) → ___ px (desktop)
Current body size: ___ px
Current line height: ___
Current letter spacing: ___
Current font weights used: ___
```

**Motion Audit:**
```
Current animation durations: ___ ms
Current easing functions: ___
Are animations present? Yes/No
Scroll-triggered animations? Yes/No
```

**Component Audit:**
```
Button styles: ___
Card styles: ___
Badge styles: ___
Icon library: ___
```

### 1.2 Gap Analysis Template

Use this to identify what needs to change:

| Design Element | Current Value | MYCURE Target | Priority |
|---------------|---------------|---------------|----------|
| Section padding (mobile) | ___ | 80px | High |
| Section padding (desktop) | ___ | 128px | High |
| H1 size (mobile) | ___ | 36px | High |
| H1 size (desktop) | ___ | 72px | High |
| Button border radius | ___ | 24px (rounded-full) | Medium |
| Animation duration | ___ | 500ms | Medium |
| Grid gap | ___ | 24px | Medium |
| Container max-width | ___ | 1280px | Low |

---

## 2. Spacing System Adaptation

### 2.1 Section Spacing Migration

**Find and Replace Pattern:**

**Current (example):**
```css
section {
  padding: 40px 20px; /* Old spacing */
}
```

**Replace with MYCURE pattern:**
```css
section {
  /* Mobile: 80px vertical, 16px horizontal */
  padding: 80px 16px;
}

@media (min-width: 768px) {
  section {
    /* Tablet: 128px vertical, 24px horizontal */
    padding: 128px 24px;
  }
}

@media (min-width: 1024px) {
  section {
    /* Desktop: 128px vertical, 32px horizontal */
    padding: 128px 32px;
  }
}
```

**Tailwind CSS adaptation:**
```jsx
// Old
<section className="py-10 px-4">

// New - MYCURE style
<section className="py-20 px-4 md:py-32 md:px-6">
```

### 2.2 Container Constraints

**Current container:**
```css
.container {
  max-width: 1200px; /* Example old value */
  margin: 0 auto;
  padding: 0 15px;
}
```

**Adapt to MYCURE:**
```css
.container {
  max-width: 1280px; /* MYCURE standard: 7xl */
  margin: 0 auto;
  padding: 0 16px; /* Mobile */
}

@media (min-width: 640px) {
  .container { padding: 0 24px; }
}

@media (min-width: 768px) {
  .container { padding: 0 32px; }
}
```

**Content-specific max-widths:**
```css
/* Hero content */
.hero-content {
  max-width: 896px; /* 4xl */
  margin: 0 auto;
}

/* Section descriptions */
.section-description {
  max-width: 800px;
  margin: 0 auto;
}

/* CTA sections */
.cta-content {
  max-width: 768px; /* 3xl */
  margin: 0 auto;
}
```

### 2.3 Grid Gap Standardization

**Find all grid/flex layouts:**
```css
/* Old */
.grid {
  gap: 15px;
}

/* New - MYCURE standard */
.grid {
  gap: 24px; /* Default gap: 6 in Tailwind */
}
```

**Tailwind adaptation:**
```jsx
// Old
<div className="grid grid-cols-3 gap-4">

// New - MYCURE standard
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
```

### 2.4 Vertical Rhythm Adjustments

**Component spacing hierarchy:**
```css
/* Badge to heading */
.badge { margin-bottom: 24px; }

/* Heading to description */
.heading { margin-bottom: 24px; }

/* Description to content */
.description { margin-bottom: 48px; }

/* Section header to content */
.section-header { margin-bottom: 48px; }
```

**Tailwind classes:**
```jsx
<div className="mb-6">{/* Badge */}</div>
<h2 className="mb-6">{/* Heading */}</h2>
<p className="mb-12">{/* Description */}</p>
```

### 2.5 Card Internal Spacing

**Old card:**
```css
.card {
  padding: 15px;
}
```

**MYCURE card:**
```css
.card {
  padding: 24px; /* p-6 in Tailwind */
}
```

---

## 3. Typography Hierarchy Adaptation

### 3.1 Font Size Migration

**Create a mapping table for your current sizes:**

| Element | Current | MYCURE Mobile | MYCURE Desktop | Tailwind Class |
|---------|---------|---------------|----------------|----------------|
| Hero H1 | 32px | 36px | 72px | text-4xl lg:text-7xl |
| Section H2 | 28px | 30px | 60px | text-3xl lg:text-6xl |
| Card H3 | 20px | 20px | 30px | text-xl md:text-3xl |
| Body | 16px | 16px | 18px | text-base sm:text-lg |
| Muted | 14px | 16px | 16px | text-base text-muted-foreground |

**CSS Custom Properties approach:**
```css
:root {
  /* Hero */
  --font-size-hero-mobile: 36px;
  --font-size-hero-desktop: 72px;

  /* Section headings */
  --font-size-h2-mobile: 30px;
  --font-size-h2-desktop: 60px;

  /* Body */
  --font-size-body-mobile: 16px;
  --font-size-body-desktop: 18px;
}

h1 {
  font-size: var(--font-size-hero-mobile);
}

@media (min-width: 1024px) {
  h1 {
    font-size: var(--font-size-hero-desktop);
  }
}
```

### 3.2 Font Weight Standardization

**Audit current weights:**
```
Light (300): ___ (Remove if present - not used in MYCURE)
Normal (400): ___ → Keep for body text
Medium (500): ___ → Use for badges, navigation
Semibold (600): ___ → Use for buttons, card titles
Bold (700): ___ → Use for headings
```

**Replace inconsistent weights:**
```css
/* Old */
h1 { font-weight: 800; }
button { font-weight: 500; }

/* New - MYCURE standard */
h1 { font-weight: 700; } /* Bold */
button { font-weight: 600; } /* Semibold */
```

### 3.3 Line Height & Letter Spacing

**Apply MYCURE values:**
```css
/* Headings */
h1, h2, h3, h4, h5, h6 {
  line-height: 1.25; /* leading-tight */
  letter-spacing: -0.025em; /* tracking-tight */
}

/* Body text */
p, li {
  line-height: 1.625; /* leading-relaxed */
  letter-spacing: 0; /* Normal */
}
```

**Tailwind classes:**
```jsx
<h1 className="text-4xl font-bold tracking-tight leading-tight">
<p className="text-base leading-relaxed">
```

### 3.4 Color Hierarchy Integration

**Add MYCURE CSS variables to your globals.css:**
```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  --muted-foreground: 0 0% 45.1%;
  --primary-brand: #0099CC;
  --border: 0 0% 89.8%;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  --muted-foreground: 0 0% 63.9%;
  --border: 0 0% 14.9%;
}
```

**Replace existing color usage:**
```css
/* Old */
.text-gray { color: #999; }

/* New - MYCURE semantic colors */
.text-muted { color: hsl(var(--muted-foreground)); }
```

**Tailwind integration:**
```jsx
// Old
<p className="text-gray-600">

// New - MYCURE semantic
<p className="text-muted-foreground">
```

---

## 4. Motion & Animation Integration

### 4.1 Install Framer Motion

```bash
npm install framer-motion
```

### 4.2 Replace Existing Animations

**Pattern 1: Simple fade-in (most common)**

**Old (CSS):**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.element {
  animation: fadeIn 0.5s ease;
}
```

**New (Framer Motion - MYCURE style):**
```jsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {content}
</motion.div>
```

**Pattern 2: Scroll-triggered animations**

**Old (Intersection Observer + CSS):**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
    }
  });
});
```

**New (Framer Motion - MYCURE style):**
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  {content}
</motion.div>
```

**Pattern 3: Staggered children**

**Old (CSS with delays):**
```css
.item:nth-child(1) { animation-delay: 0s; }
.item:nth-child(2) { animation-delay: 0.1s; }
.item:nth-child(3) { animation-delay: 0.2s; }
```

**New (Framer Motion - MYCURE style):**
```jsx
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

<motion.div
  variants={container}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true }}
>
  {items.map((item, i) => (
    <motion.div key={i} variants={item}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### 4.3 Update Animation Timings

**Create timing constants:**
```javascript
// lib/animations.ts
export const ANIMATION_DURATION = {
  fast: 0.2,      // 200ms - hover, scale
  normal: 0.3,    // 300ms - standard transitions
  slow: 0.5,      // 500ms - page elements
  verySlow: 0.7   // 700ms - hero elements
};

export const STAGGER_DELAY = 0.1; // 100ms between children
```

**Replace all existing animation durations:**
```css
/* Old */
transition: all 0.3s ease;

/* New - MYCURE standard */
transition: all 0.3s ease-out; /* ease-out is MYCURE default */
```

### 4.4 Hover State Standardization

**Update hover interactions:**
```css
/* Cards */
.card {
  transition: transform 0.2s ease-out, box-shadow 0.3s ease-out;
}

.card:hover {
  transform: scale(1.05); /* MYCURE standard: 5% scale */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Buttons */
.button {
  transition: colors 0.3s ease-out;
}

.button:hover {
  background-color: rgba(var(--primary), 0.9);
}

.button:active {
  transform: translateY(1px);
}
```

**Tailwind classes:**
```jsx
<div className="transition-all duration-200 hover:scale-105">
<button className="transition-colors duration-300 hover:bg-primary/90 active:translate-y-px">
```

---

## 5. Magic UI Component Integration

### 5.1 Install Dependencies

```bash
# Core dependencies for Magic UI
npm install framer-motion lucide-react class-variance-authority clsx tailwind-merge
npm install @radix-ui/react-slot
```

### 5.2 Add Tailwind Animations

**Update tailwind.config.js:**
```javascript
module.exports = {
  theme: {
    extend: {
      keyframes: {
        "shimmer-slide": {
          to: { transform: "translate(calc(100cqw - 100%), 0)" }
        },
        "spin-around": {
          "0%": { transform: "translateZ(0) rotate(0)" },
          "15%, 35%": { transform: "translateZ(0) rotate(90deg)" },
          "65%, 85%": { transform: "translateZ(0) rotate(270deg)" },
          "100%": { transform: "translateZ(0) rotate(360deg)" }
        },
        "rainbow": {
          "0%": { backgroundPosition: "0%" },
          "100%": { backgroundPosition: "200%" }
        },
        "shiny-text": {
          "0%, 90%, 100%": {
            backgroundPosition: "calc(-100% - var(--shiny-width)) 0"
          },
          "30%, 60%": {
            backgroundPosition: "calc(100% + var(--shiny-width)) 0"
          }
        },
        "gradient": {
          to: { backgroundPosition: "var(--bg-size, 300%) 0" }
        }
      },
      animation: {
        "shimmer-slide": "shimmer-slide 1s ease-in-out infinite alternate",
        "spin-around": "spin-around 2s linear infinite",
        "rainbow": "rainbow 2s linear infinite",
        "shiny-text": "shiny-text 8s infinite",
        "gradient": "gradient 8s linear infinite"
      }
    }
  }
};
```

### 5.3 Replace Existing Buttons with ShimmerButton

**Old button:**
```jsx
<button className="bg-blue-500 text-white px-6 py-3 rounded">
  Get Started
</button>
```

**New - ShimmerButton (create component first):**
```jsx
// components/magicui/shimmer-button.tsx
import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps {
  children: ReactNode;
  className?: string;
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  onClick?: () => void;
}

export function ShimmerButton({
  children,
  className,
  shimmerColor = "#ffffff",
  shimmerSize = "0.05em",
  borderRadius = "100px",
  shimmerDuration = "3s",
  background = "rgba(0, 0, 0, 1)",
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      style={
        {
          "--shimmer-color": shimmerColor,
          "--shimmer-size": shimmerSize,
          "--border-radius": borderRadius,
          "--shimmer-duration": shimmerDuration,
          "--background": background,
        } as CSSProperties
      }
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 text-sm font-semibold text-white transition-all duration-300",
        "rounded-[--border-radius] bg-[--background]",
        "[box-shadow:0_0_0_0_rgba(0,0,0,0.1),0_0_0_0_rgba(255,255,255,0.1)]",
        "hover:[box-shadow:inset_0_-8px_10px_0_rgba(0,0,0,0.1),inset_0_-6px_10px_0_rgba(255,255,255,0.1)]",
        "active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {/* Spinning shimmer effect */}
      <div
        className="absolute inset-0 overflow-visible [mask:linear-gradient(white,transparent)]"
      >
        <div className="absolute -inset-full animate-spin-around"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg 90deg, var(--shimmer-color) 90deg 180deg, transparent 180deg 360deg)`,
            width: "100%",
            height: "100%",
            maskComposite: "exclude",
          }}
        />
      </div>

      {/* Sliding shimmer effect */}
      <div
        className="absolute inset-0 animate-shimmer-slide opacity-30"
        style={{
          background: `linear-gradient(90deg, transparent, var(--shimmer-color), transparent)`,
        }}
      />

      {/* Content */}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
```

**Usage:**
```jsx
<ShimmerButton
  background="#0099CC"
  shimmerColor="#ffffff"
  className="h-11 px-6 py-3 text-sm font-semibold rounded-full"
>
  Get Started
  <ChevronRight className="ml-1 size-4" />
</ShimmerButton>
```

### 5.4 Replace Badges with AnimatedShinyText

**Old badge:**
```jsx
<span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
  New Feature
</span>
```

**New - AnimatedShinyText:**
```jsx
// components/magicui/animated-shiny-text.tsx
import { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerWidth?: number;
}

export function AnimatedShinyText({
  children,
  className,
  shimmerWidth = 100,
}: AnimatedShinyTextProps) {
  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
        } as CSSProperties
      }
      className={cn(
        "inline-block animate-shiny-text bg-clip-text text-transparent",
        "[background:linear-gradient(90deg,transparent,rgba(0,0,0,0.8)_50%,transparent)] bg-[length:var(--shiny-width)_100%] bg-[position:calc(-100%-var(--shiny-width))_0]",
        "dark:[background:linear-gradient(90deg,transparent,rgba(255,255,255,0.8)_50%,transparent)]",
        className
      )}
    >
      {children}
    </span>
  );
}
```

**Usage:**
```jsx
<div className="inline-flex items-center rounded-full border px-4 py-1.5">
  <AnimatedShinyText
    shimmerWidth={150}
    className="text-xs font-medium"
  >
    ✨ New Feature
  </AnimatedShinyText>
</div>
```

### 5.5 Add NumberTicker for Stats

**Old static number:**
```jsx
<div className="text-4xl font-bold">2,946,953</div>
```

**New - NumberTicker:**
```jsx
// components/magicui/number-ticker.tsx
import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  decimalPlaces?: number;
}

export function NumberTicker({
  value,
  direction = "up",
  delay = 0,
  className,
  decimalPlaces = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)));
        }
      }),
    [springValue, decimalPlaces]
  );

  return <span className={cn("inline-block", className)} ref={ref} />;
}
```

**Usage:**
```jsx
<div className="text-center">
  <NumberTicker
    value={2946953}
    delay={0.4}
    className="text-4xl font-bold text-primary"
  />
  <p className="text-sm text-muted-foreground">Happy Patients</p>
</div>
```

---

## 6. Library Ecosystem Migration

### 6.1 Theme System Integration

**Install next-themes:**
```bash
npm install next-themes
```

**Update your root layout:**
```jsx
// app/layout.tsx or _app.tsx
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Create theme toggle:**
```jsx
// components/theme-toggle.tsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative rounded-md p-2 hover:bg-secondary transition-colors"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute inset-0 m-auto h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  );
}
```

### 6.2 Icon Library Migration

**If using a different icon library, migrate to Lucide:**
```bash
npm install lucide-react
```

**Find and replace patterns:**
```jsx
// Old (Font Awesome example)
import { FaCheck } from 'react-icons/fa';
<FaCheck />

// New (Lucide - MYCURE style)
import { Check } from 'lucide-react';
<Check className="size-5 text-primary" />
```

**Common MYCURE icon patterns:**
```jsx
import {
  Check,         // Checkmarks in lists
  ChevronRight,  // Button arrows
  Star,          // Ratings
  Shield,        // Security features
  Zap,           // Speed features
  Users,         // Social proof
  Calendar,      // Scheduling
  MapPin,        // Location
} from "lucide-react";

// Standard sizes
<Check className="size-4" />   // 16px - inline with text
<Check className="size-5" />   // 20px - list items
<Check className="size-6" />   // 24px - feature icons
<Check className="size-10" />  // 40px - large feature circles
```

### 6.3 Utility Function Setup

**Create lib/utils.ts:**
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**Install dependencies:**
```bash
npm install clsx tailwind-merge
```

**Replace all className concatenations:**
```jsx
// Old
<div className={`base-class ${condition ? 'conditional' : ''} ${props.className}`}>

// New - using cn()
<div className={cn("base-class", condition && "conditional", props.className)}>
```

---

## 7. Step-by-Step Adaptation Process

### Phase 1: Foundation (Week 1)

**Day 1-2: Setup**
- [ ] Install core dependencies (Framer Motion, Lucide, next-themes)
- [ ] Add MYCURE CSS variables to globals.css
- [ ] Update Tailwind config with MYCURE animations
- [ ] Create lib/utils.ts utility function

**Day 3-4: Spacing**
- [ ] Update all section padding to MYCURE values
- [ ] Adjust container max-widths
- [ ] Standardize grid gaps
- [ ] Fix vertical rhythm (mb-6, mb-12)

**Day 5-7: Typography**
- [ ] Update font sizes to MYCURE scale
- [ ] Apply tracking-tight to all headings
- [ ] Apply leading-relaxed to body text
- [ ] Update font weights (remove 800, use 700/600)
- [ ] Apply text-muted-foreground to secondary text

### Phase 2: Motion & Interaction (Week 2)

**Day 1-3: Animations**
- [ ] Wrap major sections with Framer Motion
- [ ] Add scroll-triggered animations (whileInView)
- [ ] Implement stagger effects for lists/grids
- [ ] Update animation durations (0.2s-0.7s)

**Day 4-5: Hover States**
- [ ] Update card hover states (scale: 1.05, shadow-md)
- [ ] Update button hover states
- [ ] Update link hover states
- [ ] Add active states (translateY: 1px)

**Day 6-7: Review**
- [ ] Test all animations across devices
- [ ] Verify reduced motion preferences
- [ ] Check animation performance

### Phase 3: Components (Week 3)

**Day 1-2: Magic UI Components**
- [ ] Create ShimmerButton component
- [ ] Replace primary CTAs with ShimmerButton
- [ ] Create AnimatedShinyText component
- [ ] Replace badges with AnimatedShinyText

**Day 3-4: Interactive Components**
- [ ] Create NumberTicker component
- [ ] Replace stat numbers with NumberTicker
- [ ] Add ScrollProgress indicator
- [ ] Create theme toggle component

**Day 5-7: Cards & Layouts**
- [ ] Update card styles (border-border/40, backdrop-blur)
- [ ] Add gradient backgrounds (from-background to-muted/10)
- [ ] Update border radius (rounded-lg = 8px)
- [ ] Standardize card padding (p-6 = 24px)

### Phase 4: Polish & QA (Week 4)

**Day 1-2: Dark Mode**
- [ ] Test all pages in dark mode
- [ ] Verify color contrast ratios
- [ ] Update any hardcoded colors
- [ ] Test theme toggle functionality

**Day 3-4: Responsive Testing**
- [ ] Test mobile (375px, 414px)
- [ ] Test tablet (768px, 1024px)
- [ ] Test desktop (1280px, 1440px, 1920px)
- [ ] Fix any spacing/layout issues

**Day 5-7: Final Review**
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Compare side-by-side with mycure.md

---

## 8. Before/After Comparison Checklist

### Visual Comparison

Use this checklist to verify your adaptation matches MYCURE:

**Spacing ✓**
- [ ] Section padding: 80px → 128px → 160px
- [ ] Grid gaps: 24px consistently
- [ ] Card padding: 24px all sides
- [ ] Vertical rhythm: 24px, 48px between elements

**Typography ✓**
- [ ] H1 scales: 36px → 48px → 60px → 72px
- [ ] All headings use tracking-tight
- [ ] Body text uses leading-relaxed
- [ ] Secondary text uses text-muted-foreground

**Colors ✓**
- [ ] Primary brand: #0099CC
- [ ] Foreground: hsl(0 0% 3.9%)
- [ ] Muted: hsl(0 0% 45.1%)
- [ ] Dark mode implemented correctly

**Motion ✓**
- [ ] Elements fade in from y: 20
- [ ] Animation duration: 0.5s standard
- [ ] Hover scale: 1.05 on cards
- [ ] Stagger delay: 0.1s between children

**Components ✓**
- [ ] CTAs use ShimmerButton or styled buttons
- [ ] Badges use AnimatedShinyText
- [ ] Stats use NumberTicker
- [ ] Cards have gradient backgrounds + backdrop-blur

**Border Radius ✓**
- [ ] Cards: 8px (rounded-lg)
- [ ] Buttons: 24px (rounded-full for primary)
- [ ] Badges: 9999px (rounded-full)

**Borders ✓**
- [ ] Border color: border-border/40 (40% opacity)
- [ ] Border width: 1px standard

**Shadows ✓**
- [ ] Cards hover: shadow-md
- [ ] No shadows by default
- [ ] Subtle shadows on interactive elements

### Notion-like Feel ✓

- [ ] Generous whitespace throughout
- [ ] Subtle, refined color palette
- [ ] Smooth, purposeful animations
- [ ] Clean typography hierarchy
- [ ] Rounded corners everywhere
- [ ] Layered, depth-based layout

---

## 9. Common Migration Issues & Solutions

### Issue 1: Typography Too Large on Mobile

**Problem:** MYCURE headings look too big on small screens

**Solution:** Ensure responsive breakpoints are applied
```jsx
// Wrong
<h1 className="text-7xl">

// Right
<h1 className="text-4xl md:text-6xl lg:text-7xl">
```

### Issue 2: Animations Causing Layout Shift

**Problem:** Elements jump during animation

**Solution:** Use transform instead of margin/padding
```jsx
// Wrong
initial={{ marginTop: 20 }}
animate={{ marginTop: 0 }}

// Right
initial={{ y: 20 }}
animate={{ y: 0 }}
```

### Issue 3: Dark Mode Colors Not Updating

**Problem:** Some colors stay light in dark mode

**Solution:** Use CSS variables instead of hardcoded values
```css
/* Wrong */
color: #999;

/* Right */
color: hsl(var(--muted-foreground));
```

### Issue 4: Animations Too Fast/Slow

**Problem:** Animations don't feel right

**Solution:** Use MYCURE timing tokens
```javascript
// Standard entrance
transition={{ duration: 0.5 }}

// Quick interaction
transition={{ duration: 0.2 }}

// Hero element
transition={{ duration: 0.7 }}
```

### Issue 5: Cards Look Flat

**Problem:** Cards don't have depth

**Solution:** Add gradient + backdrop blur
```jsx
<div className={cn(
  "rounded-lg border border-border/40",
  "bg-gradient-to-b from-background to-muted/10",
  "backdrop-blur",
  "p-6"
)}>
```

---

## 10. Maintenance & Future Updates

### Keep Design System in Sync

**Document custom additions:**
```markdown
# Our MYCURE Adaptations

## Custom Spacing
- Hero sections: py-24 md:py-40 (adjusted for our content)

## Custom Components
- FeatureCard: extends MYCURE card with custom icon style

## Custom Colors
- Accent color: #0099CC (MYCURE standard)
- Success: #10B981 (our addition)
```

**Create a living style guide:**
- Document all spacing values
- Show typography examples
- Display color palette
- Demonstrate animation patterns
- Include component examples

**Review quarterly:**
- Check for new MYCURE updates
- Audit for design drift
- Update components as needed
- Maintain consistency

---

## Conclusion

This adaptation guide provides a systematic approach to transforming your existing website to match MYCURE's design system. The key is to:

1. **Start with foundation** (spacing, typography)
2. **Add motion progressively** (animations, interactions)
3. **Integrate components gradually** (Magic UI, theme system)
4. **Test thoroughly** (responsive, accessibility, performance)
5. **Maintain consistency** (document, review, update)

By following this guide, your website will achieve the same polished, Notion-like aesthetic that makes MYCURE stand out, while maintaining your existing functionality and content.

**Remember:** The goal is not pixel-perfect replication, but capturing the *feeling* of MYCURE's design system - generous whitespace, smooth motion, clean hierarchy, and thoughtful interactions.
