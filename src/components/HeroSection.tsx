import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import ParticleGlobe from './ParticleGlobe';

function ScrambleText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = useState(text.replace(/[^ ]/g, ' '));
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';

  useEffect(() => {
    let frame: number;
    const timeout = setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length * 3;

      const scramble = () => {
        const progress = iteration / maxIterations;
        const resolved = Math.floor(progress * text.length);

        setDisplay(
          text
            .split('')
            .map((char, i) => {
              if (char === ' ') return ' ';
              if (i < resolved) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        iteration++;
        if (iteration <= maxIterations) {
          frame = requestAnimationFrame(scramble);
        } else {
          setDisplay(text);
        }
      };
      frame = requestAnimationFrame(scramble);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [text, delay]);

  return <>{display}</>;
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerModule: any;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerModule = ScrollTrigger;

      if (!heroRef.current) return;

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

      gsap.from('.hero-text-line', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        delay: 0.3,
      });

      gsap.from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 1,
      });
    };

    init();
    return () => scrollTriggerModule?.getAll().forEach((t: any) => t.kill());
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
            <ScrambleText text="You run your business." delay={600} />
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="hero-text-line text-[clamp(2rem,6vw,5rem)] font-black leading-[1.05] tracking-tight text-gradient-primary">
            <ScrambleText text="We automate everything else." delay={900} />
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

      {/* Scroll indicator - animated chevron */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </div>
    </section>
  );
}
