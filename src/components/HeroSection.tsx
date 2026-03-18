import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
  return (
    <section className="relative min-h-[100svh] overflow-hidden flex flex-col items-center justify-center text-center">
      {/* Fullscreen video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/25 to-black/60" />

      {/* Hero content */}
      <div className="relative z-10 px-6 pt-32 pb-40 flex flex-col items-center max-w-5xl mx-auto">
        <p className="animate-fade-rise text-xs font-semibold uppercase tracking-[0.38em] text-white/60 mb-8">
          Rara Consultancy
        </p>

        <h1
          className="font-display-serif text-[clamp(2.8rem,7vw,6.5rem)] font-normal leading-[0.95] tracking-[-0.04em]"
        >
          <ScrambleText text="Build your company." delay={350} className="text-white" />
          <br />
          <ScrambleText text="We automate it." delay={700} className="text-white/60" />
          <br />
          <ScrambleText text="We engineer it." delay={1050} className="text-white/60" />
        </h1>

        <p className="animate-fade-rise-delay text-white/60 text-base sm:text-lg max-w-2xl mt-8 leading-relaxed">
          AI-powered automations paired with premium websites and brand systems — built for ambitious small businesses ready to scale.
        </p>

        <div className="animate-fade-rise-delay-2 mt-12 flex flex-col gap-4 sm:flex-row">
          <a
            href="#contact"
            className="liquid-glass rounded-full px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-[1.03]"
          >
            See What To Automate
          </a>
          <a
            href="#work"
            className="liquid-glass rounded-full px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-[1.03]"
          >
            View Our Work
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-white/40">Scroll</span>
        <ChevronDown className="h-5 w-5 animate-bounce text-white/50" />
      </div>
    </section>
  );
}
