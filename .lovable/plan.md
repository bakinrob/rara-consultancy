

## Plan: Add Team Section + Fix Portfolio Visibility

Two issues to address:
1. **Add a Team section** — adapt the provided team-section component to match RARA's dark premium style, using the uploaded headshots for Raaghav, Anthony, and Abraham. Replace the current single-founder FounderSection.
2. **Fix Portfolio section not showing** — the portfolio grid likely has a rendering issue (GSAP `from` with `opacity: 0` may leave cards invisible if ScrollTrigger doesn't fire). Will add fallback visibility.

---

### 1. Copy team member headshots to assets

Save the 3 uploaded images:
- `user-uploads://image-17.png` → `src/assets/rara/raaghav-headshot.jpg` (Raaghav)
- `user-uploads://image-18.png` → `src/assets/rara/anthony-headshot.jpg` (Anthony)
- `user-uploads://image-16.png` → `src/assets/rara/abraham-headshot.jpg` (Abraham)

### 2. Update `src/content/homeContent.ts`

Replace the single `founder` object with a `team` array:
- **Raaghav Saxena** — Founder & CEO — "Raaghav founded RARA with a vision to help businesses compete with bigger players. He leads strategy and ensures every client gets the attention they deserve."
- **Anthony Jarjosa** — Creative Director — "Anthony brings brands to life. With an eye for design and a passion for storytelling, he crafts visual identities that make businesses unforgettable."
- **Abraham El-Chafei** — Co-Founder — "Abraham builds the AI systems and automation workflows that power RARA's client businesses. He ensures every lead is captured, every call is answered, and no opportunity slips through the cracks."

Remove "small business" references — use "businesses" generally.

Keep `founder` export for backward compat or remove it and update imports.

### 3. Create `src/components/TeamSection.tsx`

Adapted from the provided component but restyled to match RARA's aesthetic:
- **Dark background** (`bg-slate-950`) consistent with the site's dark sections
- **No framer-motion 3D tilt** — use simpler framer-motion fade/stagger animations (the provided component's tilt effect is heavy; keep it lightweight)
- **Card design**: Dark glassmorphism cards (`bg-white/5 backdrop-blur border border-white/10`), circular avatar images, name, role in accent color, bio text
- **No skills badges or social links** — keep it clean with just photo, name, role, bio
- **Layout**: 3-column grid on desktop, single column on mobile
- **Section header**: "Meet the Team" with the same typographic pattern as other sections (uppercase eyebrow + large heading)
- Remove "Small Business First" — no mission references, just the team

### 4. Update `src/pages/Index.tsx`

Replace `<FounderSection />` with `<TeamSection />`.

### 5. Fix Portfolio section visibility

In `PortfolioSection.tsx`, ensure cards are visible even if GSAP doesn't trigger:
- Add `will-change: transform` and ensure initial opacity isn't stuck at 0
- Set cards to `opacity: 1` by default in CSS, let GSAP handle animation only when ScrollTrigger fires

### Files changed
- `src/content/homeContent.ts` — add `team` array, remove/update `founder`
- `src/components/TeamSection.tsx` — new component (replaces FounderSection)
- `src/pages/Index.tsx` — swap FounderSection → TeamSection
- `src/components/PortfolioSection.tsx` — fix visibility issue

