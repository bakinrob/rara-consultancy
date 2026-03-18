import { useEffect, useRef } from 'react';
import ParticleGlobe from './ParticleGlobe';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapModule: any;
    let scrollTriggerModule: any;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      gsapModule = gsap;
      scrollTriggerModule = ScrollTrigger;

      if (!heroRef.current) return;

      // Hero scale-down on scroll
      gsap.to(heroRef.current, {
        scale: 0.75,
        opacity: 0,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          pin: true,
        },
      });

      // Text stagger animation
      gsap.from('.hero-text-line', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.3,
      });

      // CTA fade in
      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1,
      });
    };

    init();

    return () => {
      scrollTriggerModule?.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'hsl(240, 6%, 4%)' }}
    >
      <ParticleGlobe />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="overflow-hidden mb-2">
          <p className="hero-text-line text-sm md:text-base font-medium tracking-[0.3em] uppercase text-muted-foreground">
            Rara Consultancy
          </p>
        </div>

        <div className="overflow-hidden">
          <h1 className="hero-text-line text-[clamp(2rem,6vw,5rem)] font-black leading-[1.05] tracking-tight text-foreground">
            You run your business.
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-text-line text-[clamp(2rem,6vw,5rem)] font-black leading-[1.05] tracking-tight text-gradient-primary">
            We automate everything else.
          </h1>
        </div>

        <div className="overflow-hidden mt-6">
          <p className="hero-text-line text-lg md:text-xl text-muted-foreground font-medium">
            Web design. AI automations. Built to scale.
          </p>
        </div>

        <div className="hero-cta mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="group relative px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_40px_hsl(217,91%,60%/0.4)]"
          >
            Book a Call
            <span className="absolute inset-0 rounded-full bg-primary/20 scale-100 group-hover:scale-110 transition-transform duration-500" />
          </a>
          <a
            href="#services"
            className="px-8 py-4 rounded-full border border-border text-foreground font-semibold text-lg hover:bg-secondary transition-all duration-300"
          >
            What We Do
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
}
