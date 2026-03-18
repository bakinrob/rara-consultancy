

# Hero Redesign: Cinematic Video Background + Bring Back "What We Build"

## Overview
Replace the current split-layout hero (text + 3D helix card) with a fullscreen looping video background hero inspired by the Velorah/Space Voyage references. Cinematic, immersive, text centered on top. Also restore the "What We Build" / Portfolio section that was removed.

## 1. Hero Section Overhaul (`src/components/HeroSection.tsx`)

**Layout**: Fullscreen `100svh` section with a looping `<video>` background covering the entire viewport. Text centered on top with glassmorphic styling.

**Video**: Use the CloudFront video URL provided as a fullscreen background (`autoPlay`, `loop`, `muted`, `playsInline`, `object-cover`). Add a subtle dark overlay gradient so white text stays readable.

**Typography**: Switch to Instrument Serif for the headline (imported via Google Fonts). Keep the ScrambleText animation. Headline: "Build your company. We automate it. We engineer it." with muted-color contrast on select words.

**CTAs**: Two glassmorphic "liquid-glass" buttons (the CSS effect from the reference code) -- "See What To Automate" and "View Our Work".

**Remove**: The right-side card with ParticleGlobe, the 3 proof cards at bottom, the radial gradient backgrounds and blobs. The video provides all visual depth.

**Animations**: CSS `fade-rise` keyframe animations with staggered delays on headline, subtext, and CTA.

## 2. Navbar Update (`src/components/Navbar.tsx`)

- Over the video hero, nav text should be **white** (not dark slate) since the background is now a dark/cinematic video
- Glassmorphic nav bar style using the `liquid-glass` CSS class
- Add "What We Build" back to nav links

## 3. CSS Updates (`src/index.css`)

- Import Instrument Serif font alongside existing fonts
- Add the `liquid-glass` CSS class (glassmorphic effect with gradient border mask)
- Add `fade-rise` keyframe animation and delay utility classes
- Keep existing utilities intact

## 4. Restore Portfolio/What We Build Section

- Re-add `PortfolioSection` back into `Index.tsx` between Services and Testimonials
- The component and data already exist in the codebase (`src/components/PortfolioSection.tsx`, `projects` in `homeContent.ts`)

## 5. Remove ParticleGlobe dependency from Hero

- ParticleGlobe component file stays (could be used elsewhere) but is no longer imported in HeroSection

## Files to modify
- `src/components/HeroSection.tsx` -- full rewrite to video-bg cinematic hero
- `src/components/Navbar.tsx` -- white text over video, add "What We Build" link
- `src/index.css` -- add Instrument Serif font, liquid-glass class, fade-rise animations
- `src/pages/Index.tsx` -- re-add PortfolioSection import and component

## Page Flow After Changes
```text
Navbar (glassmorphic, white text over video)
Hero (fullscreen video bg, centered text, liquid-glass CTAs)
Proof Strip (light)
Services (light)
Portfolio / What We Build (light, restored)
Testimonials (light)
Founder (light)
Contact (darker anchor)
```

