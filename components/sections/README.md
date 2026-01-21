# Section Templates

These components serve as **template references** for creating clean, well-structured sections in the main landing page.

## Available Templates

- **HeroSection.tsx** - Hero section with CTA, email capture, and background styling
- **FeaturesSection.tsx** - Feature grid with icons and descriptions  
- **TestimonialsSection.tsx** - Customer testimonials with ratings and quotes
- **LogosSection.tsx** - Partner/customer logos with animations
- **CTASection.tsx** - Call-to-action section with primary/secondary buttons

## Usage

These are **reference templates only**. For the actual landing page:

1. Copy the relevant JSX structure from these components
2. Paste directly into the main `app/page.tsx` file as inline sections
3. Add clear section markers (comments) for easy identification
4. Customize content and styling as needed

## Example Section Structure

```jsx
{/* ============= HERO SECTION ============= */}
<section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-primary to-primary/90 text-primary-foreground relative">
  {/* Hero content from HeroSection.tsx template */}
</section>

{/* ============= FEATURES SECTION ============= */}
<section className="w-full py-20 md:py-32">
  {/* Features content from FeaturesSection.tsx template */}
</section>
```

This approach allows for easy section rearrangement by moving code blocks within the main page file.