import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ParticleGlobe from './ParticleGlobe';

function ScrambleText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
  const [display, setDisplay] = useState(text.replace(/[^ ]/g, ' '));
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  useEffect(() => {
    let frame = 0;
    const timeout = window.setTimeout(() => {
      let iteration = 0;
      const maxIterations = text.length * 3;

      const scramble = () => {
        const progress = iteration / maxIterations;
        const resolved = Math.floor(progress * text.length);

        setDisplay(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < resolved) return char;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('')
        );

        iteration += 1;
        if (iteration <= maxIterations) {
          frame = requestAnimationFrame(scramble);
        } else {
          setDisplay(text);
        }
      };

      frame = requestAnimationFrame(scramble);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [chars, delay, text]);

  return <span className={className}>{display}</span>;
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerModule: { getAll: () => Array<{ kill: () => void }> } | undefined;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerModule = ScrollTrigger;

      if (!heroRef.current || !cardRef.current) return;

      gsap.from('.hero-eyebrow, .hero-copy, .hero-cta, .hero-proof-card', {
        y: 36,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.12,
        delay: 0.1,
      });

      gsap.to(heroRef.current, {
        yPercent: 10,
        opacity: 0.3,
        scale: 0.94,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(cardRef.current, {
        yPercent: -10,
        rotation: -4,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    };

    init();
    return () => scrollTriggerModule?.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-shell relative min-h-[100svh] overflow-hidden px-6 pt-32 pb-24 text-slate-950"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.98),_rgba(242,247,255,0.82)_42%,_rgba(225,238,255,0.3)_72%,_transparent_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-slate-950" />
      <div className="absolute left-[-10%] top-[10%] h-72 w-72 rounded-full bg-sky-200/45 blur-3xl" />
      <div className="absolute right-[-8%] top-[18%] h-80 w-80 rounded-full bg-blue-200/55 blur-3xl" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-3xl">
          <p className="hero-eyebrow text-xs font-semibold uppercase tracking-[0.38em] text-slate-500">
            Rara Consultancy
          </p>

          <h1 className="mt-6 font-display text-[clamp(3.25rem,7vw,7rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-balance">
            <ScrambleText text="Build the website." delay={350} />
            <br />
            <ScrambleText text="Engineer the system." delay={700} className="text-gradient-ink" />
          </h1>

          <p className="hero-copy mt-8 max-w-2xl text-[clamp(1.05rem,1.2vw,1.3rem)] leading-8 text-slate-600">
            AI automations for real businesses, paired with front ends and brand systems that make the whole thing
            feel premium to the client on the other side.
          </p>

          <div className="hero-cta mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full bg-slate-950 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(15,23,42,0.2)]"
            >
              See What To Automate
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-slate-300/80 bg-white/60 px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 backdrop-blur transition-all duration-300 hover:border-slate-400 hover:bg-white"
            >
              View Our Work
            </a>
          </div>

          <div className="hero-proof-card mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.6rem] border border-white/70 bg-white/78 px-5 py-4 shadow-[0_14px_40px_rgba(148,163,184,0.16)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Automation-first</p>
              <p className="mt-2 text-sm font-medium text-slate-700">Booking flows, phone systems, workflow relief.</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/70 bg-white/78 px-5 py-4 shadow-[0_14px_40px_rgba(148,163,184,0.16)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Mixed clients</p>
              <p className="mt-2 text-sm font-medium text-slate-700">Contractors, restaurants, nonprofits, and firms.</p>
            </div>
            <div className="rounded-[1.6rem] border border-white/70 bg-white/78 px-5 py-4 shadow-[0_14px_40px_rgba(148,163,184,0.16)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Real proof</p>
              <p className="mt-2 text-sm font-medium text-slate-700">Built from actual RARA projects and reviews.</p>
            </div>
          </div>
        </div>

        <div ref={cardRef} className="hero-proof-card relative min-h-[420px] lg:min-h-[640px]">
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/70 bg-white/55 shadow-[0_30px_90px_rgba(148,163,184,0.22)] backdrop-blur-md" />
          <div className="absolute inset-5 rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.95),rgba(240,247,255,0.7))]" />
          <div className="absolute inset-0">
            <ParticleGlobe />
          </div>
          <div className="pointer-events-none absolute left-8 right-8 top-8 flex items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
            <span>Automation Core</span>
            <span>Live Motion Study</span>
          </div>
          <div className="pointer-events-none absolute bottom-8 left-8 right-8">
            <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/84 p-5 shadow-[0_12px_50px_rgba(148,163,184,0.16)]">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Why this hero works</p>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                The page opens bright and editorial, then the 3D system pulls attention into a darker proof sequence below.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-slate-400">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-slate-500" />
      </div>
    </section>
  );
}
