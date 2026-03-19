

## Portfolio Section Redesign

**Problem**: Raw project screenshots in a carousel feel awkward — they look like random website grabs rather than showcasing real work with intent.

**Approach**: Replace the carousel with a **case-study grid** using browser mockup frames + overlay details. Each project card will:

1. Show the project image inside a realistic browser chrome frame (rounded top bar with 3 dots and a fake URL bar showing the real domain)
2. Overlay the project name, category tag, and a one-line description on hover (desktop) or always visible (mobile)
3. Include a subtle "Visit site →" link/button on each card
4. Keep the Atrium image prominent — give it the largest card in the grid

**Layout**: Asymmetric bento-style grid (not a boring 3-column):
```text
┌──────────────────┬───────────┐
│                  │           │
│   Atrium (large) │  Eskin    │
│                  │           │
├─────────┬────────┴───────────┤
│ Big Dip │  A2    │  Detroit  │
│         │        │           │
└─────────┴────────┴───────────┘
```

**Files to change**:
- **`src/components/PortfolioSection.tsx`** — Replace carousel with bento grid of browser-mockup cards, hover overlays with project info + visit link
- **`src/content/homeContent.ts`** — Add `url` field to each project (real website URLs or `#` placeholders)

**Styling**: Consistent with the dark/light sections already on the page. Cards get a subtle shadow, rounded corners, and the browser chrome bar will use `bg-slate-100` with colored dots. Hover state lifts the card slightly with a scale transform. GSAP stagger animation on scroll retained.

