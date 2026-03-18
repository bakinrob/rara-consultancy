

# Rara Consultancy -- Creative Overhaul

## What I learned from the scrape
- Real portfolio: Atrium (full rebrand), Emmanuel Skinscience (website), Big Dip Burgers (website + branding), A2 Second Helpings, Detroit Soccer District
- Real reviews from Jennifer Puzsar, Jacob Sessions, Atrium, Aashna Nadarjah -- all 5-star
- Founded by Raaghav Saxena, mission is helping small businesses
- Contact email: raaghavsaxena500@gmail.com

## Changes

### 1. Logo -- bigger and transparent treatment
- Increase logo from `h-10` to `h-14` on desktop, `h-12` on mobile
- Add `mix-blend-mode: lighten` or use the logo with transparent background styling
- On scroll, the navbar glass effect frames the logo nicely -- keep that but make logo more prominent

### 2. Navbar -- brand presence like top agencies
- Logo left, nav right is correct. But add a subtle glow/highlight behind the logo on hover
- Consider showing the logo in the mobile overlay menu too (centered at top)

### 3. Portfolio section -- use real project data + add 2 missing projects
- Update from 3 to 5 projects: Atrium, Eskin Science, Big Dip Burgers, A2 Second Helpings, Detroit Soccer District
- Add real descriptions from the scrape
- Use the actual Squarespace CDN image URLs as project thumbnails (they're publicly accessible)

### 4. Add a Testimonials/Reviews section (new)
- Horizontal scroll or stacked cards with real 5-star reviews
- Jennifer Puzsar (Eskin Science), Jacob Sessions (Big Dip Burgers), Atrium, Aashna Nadarjah (A2 Second Helpings)
- Glass-card style, star rating, attribution
- GSAP stagger reveal on scroll

### 5. Animation creativity overhaul
- **Particle Globe**: Add a pulsing glow effect -- particles breathe (scale up/down subtly). Add a few connecting lines between nearby particles (constellation effect) to make it feel more unique/networked
- **Hero text**: Add a typewriter or text-scramble effect on the headline instead of just fade-in -- letters scramble then resolve ("You run your business")
- **Services section**: Cards tilt on mouse hover (3D perspective transform via CSS), add a subtle animated gradient border on hover
- **Portfolio**: On hover, the project image zooms slightly and a color overlay fades out revealing the image underneath
- **Scroll indicator**: Replace simple line with an animated chevron bouncing

### 6. Contact section -- use real email
- Update email to `raaghavsaxena500@gmail.com`
- Add the logo in the footer area

### 7. Update page order
Index page: Navbar > Hero > Services > Portfolio (5 projects with images) > Testimonials (new) > Contact

## Technical approach
- New `TestimonialsSection.tsx` component
- Update `PortfolioSection.tsx` with 5 real projects + CDN images
- Update `ParticleGlobe.tsx` with constellation lines + breathing effect
- Update `HeroSection.tsx` with text scramble animation
- Update `Navbar.tsx` for larger logo + mobile logo
- Update `ContactSection.tsx` with real email + footer logo
- Update `Index.tsx` to include TestimonialsSection

