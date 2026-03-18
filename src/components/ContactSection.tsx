import { useEffect, useRef } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import raraLogo from '@/assets/rara-logo.png';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerModule: { getAll: () => Array<{ kill: () => void }> } | undefined;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerModule = ScrollTrigger;

      if (!sectionRef.current) return;

      gsap.from('.contact-copy', {
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      });
    };

    init();
    return () => scrollTriggerModule?.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="bg-slate-950 px-6 pb-14 pt-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="contact-mesh overflow-hidden rounded-[2.5rem] border border-white/10 px-8 py-12 shadow-[0_40px_140px_rgba(2,6,23,0.45)] md:px-14 md:py-16">
          <p className="contact-copy text-xs font-semibold uppercase tracking-[0.34em] text-sky-300/72">
            Ready to rethink the workflow?
          </p>
          <h2 className="contact-copy mt-6 max-w-4xl font-display text-[clamp(2.7rem,5vw,5.2rem)] leading-[0.94] tracking-[-0.05em]">
            Start with the bottleneck.
            <br />
            <span className="text-white/62">We’ll show you what to automate next.</span>
          </h2>
          <p className="contact-copy mt-6 max-w-2xl text-lg leading-8 text-white/72">
            Bring the process that is eating time. We’ll help you turn it into a cleaner system, then wrap it in a
            site and brand experience that feels finished.
          </p>

          <div className="contact-copy mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="mailto:raaghavsaxena500@gmail.com?subject=Let's%20See%20What%20To%20Automate"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100"
            >
              <Mail className="h-4 w-4" />
              See What To Automate
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/[0.03] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/78 transition-all duration-300 hover:bg-white/[0.08]"
            >
              Review Case Studies
            </a>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-sm text-white/44 md:flex-row">
          <div className="flex items-center gap-4">
            <img src={raraLogo} alt="Rara Consultancy" className="h-8 w-auto" />
            <span>AI automations, websites, and systems for ambitious small businesses.</span>
          </div>
          <span>© {new Date().getFullYear()} Rara Consultancy</span>
        </footer>
      </div>
    </section>
  );
}
