

# Homepage Refresh: Lighter, More Creative, Reviews-First

## What's Changing

### 1. Hero Text Update
Current: "Build the website. Engineer the system."
New: **"Build your company. We automate it. We engineer it."** — keeps the scramble text animation, just new copy.

### 2. Replace the Globe with a Creative 3D Element
Remove the particle globe. Replace with an **abstract DNA-helix / flowing ribbon structure** — interlocking curves made from particles and light trails that twist and breathe. It suggests interconnected systems without being a literal globe or robot. Mouse-reactive, scroll-aware, same Three.js stack.

### 3. Kill the Dark Theme (Almost Everywhere)
- **Hero**: Stays light (already is) — soft whites, slate ink text
- **Proof Strip**: Switch from dark `bg-slate-950` to light `bg-white` with subtle borders
- **Services**: Switch from dark to **light background** (`bg-[#f8fafc]` or similar) with white cards, colored accents, and 3D micro-interactions on hover (subtle tilt/float effects via CSS transforms)
- **Testimonials**: Light background, warm cards — focus on happiness/reviews
- **Founder**: Already light — keep as is
- **Contact**: Keep slightly darker as a closing contrast moment — it works as an anchor
- **Overall body background**: Switch from deep navy gradient to a clean light base

### 4. Remove Portfolio/Case Studies Section
Drop `PortfolioSection` entirely from the page. The flow becomes:
Hero → Proof Strip → Services → Testimonials → Founder → Contact

### 5. Testimonials Reframe
Rename from "Public proof" to something warmer like **"What Our Clients Say"** or **"Customer Happiness"**. Keep the 4 real reviews, add warmth — maybe a subtle background pattern or gradient instead of flat dark.

### 6. Services Section — More Creative
- Light background with white glassmorphic cards
- Add subtle hover animations (card lift + glow)
- Consider a small animated icon or illustration per service instead of plain text
- Keep the 3 services (AI Automations, Websites & Brand Systems, Custom Platforms)

## Files to Modify
- `src/components/HeroSection.tsx` — new headline text
- `src/components/ParticleGlobe.tsx` — replace globe with ribbon/helix 3D
- `src/components/ProofStrip.tsx` — light theme
- `src/components/ServicesSection.tsx` — light theme + creative cards
- `src/components/TestimonialsSection.tsx` — light theme + warmer tone
- `src/components/ContactSection.tsx` — minor copy tweaks
- `src/pages/Index.tsx` — remove PortfolioSection import
- `src/index.css` — update body background to light base
- `src/content/homeContent.ts` — remove projects data, update any copy

## Page Flow
```text
Navbar (transparent → scroll-aware)
Hero (light, new headline, 3D ribbon/helix)
Proof Strip (light cards, metrics)
Services (light, creative cards with hover effects)
Testimonials (light, warm, review-focused)
Founder (light — unchanged)
Contact (slightly darker anchor)
```

