

# Rara Consultancy — Premium Animated Landing Page

## Vision
A cinematic, dark-theme single-page site that positions Rara as a tech-forward agency doing web design + AI automations. The site speaks to everyone from barbers to IB firms — no jargon, just authority.

## Hero (100vh, pinned)
- **Headline:** *"You run your business. We automate everything else."*
- **Sub-copy:** *"Web design. AI automations. Built to scale."*
- **3D Background:** Slowly rotating particle sphere (2,000+ points, procedural — no external files). Reacts to scroll speed. Electric blue (#3B82F6) particles on deep black (#0A0A0B).
- **CTA:** "Book a Call" button with magnetic hover effect
- **On scroll:** Hero scales down (0.75) and tilts away, revealing the next section

## Navbar (fixed, transparent → solid on scroll)
- RARA logo (text-based, geometric)
- Links: Services / Our Work / Contact
- Mobile: Full-screen overlay hamburger menu

## Services Section (pinned scroll, ~200vh)
- Left side: "What We Do" title stays pinned
- Right side: Cards scroll in one by one:
  1. **Web Design & Branding** — Custom sites, redesigns, visual identity
  2. **AI Automations** — Booking systems, phone automation, workflow automation, data scraping
  3. **Custom Platforms** — Course platforms, client portals, dashboards
- Each card slides in from the right with staggered entry animation

## Client Work Showcase
- Featured projects: Atrium, Eskin Science, Big Dip Burgers
- Dark cards with hover reveal effect showing project details
- "View Our Work" CTA

## The Path (SVG line animation)
- A vertical line draws itself as the user scrolls, connecting hero to footer — the visual thread tying the whole page together

## Contact / CTA Section
- "Let's build something." headline with text reveal animation
- Clean booking CTA (link to your calendar or WhatsApp)
- High-contrast card with subtle mesh gradient background

## Design System
- **Background:** #0A0A0B
- **Primary:** #3B82F6 (Electric Blue)
- **Accent:** hsl(180, 100%, 50%) (Cyan for status/highlights)
- **Muted:** #94A3B8
- **Fonts:** Schibsted Grotesk (display, 700) + Geist (body, 400/500)
- **Borders:** rgba(255,255,255,0.08)

## Animation Stack
- **Three.js** (v0.136.0): Procedural particle globe, no external assets
- **GSAP + ScrollTrigger**: Hero pinning, service card reveals, text staggers, SVG path draw
- **Lenis**: Smooth momentum scrolling
- **Mouse tracking**: Globe follows cursor with smooth easing

## Responsive
- clamp() on all typography
- 3D sphere scales to 0.5x on mobile
- Grid → single column layout
- overflow-x: hidden everywhere
- Hamburger menu below 768px

