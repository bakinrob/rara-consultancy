

# Integrate Fancy Carousel into Portfolio Section

## Overview
Replace the current grid layout in the Portfolio section with the new interactive 3D carousel component, using Rara's existing project images and data.

## Changes

### 1. Install dependency
- `@tabler/icons-react` for the arrow icon used in carousel controls

### 2. Create `src/components/ui/carousel-fancy.tsx`
Save the provided carousel component as `carousel-fancy.tsx` (keeping the existing shadcn `carousel.tsx` untouched). Minor adjustments:
- Remove `"use client"` directive (not needed in Vite)
- Fix TypeScript types on refs (`useRef<HTMLDivElement>(null)`, `useRef<number>()`)
- Replace `@tabler/icons-react` arrow with `lucide-react`'s `ArrowRight` to avoid adding a new dependency — keeps the icon library consistent

### 3. Update `src/components/PortfolioSection.tsx`
- Import the new `Carousel` from `carousel-fancy.tsx`
- Map the existing `projects` array into the carousel's `SlideData` format (`title`, `button`, `src`)
- Keep the section heading ("Selected work / Real projects.") above the carousel
- Keep the GSAP scroll-trigger animation for the heading
- Remove the grid layout, replace with the carousel

### 4. Add required CSS
Add the carousel-specific styles to `src/index.css`:
- `.slide-content` radial gradient overlay
- 3D perspective transforms
- The `--x`/`--y` custom property–driven lighting effect

## No other files change. The existing embla-based `carousel.tsx` stays untouched.

