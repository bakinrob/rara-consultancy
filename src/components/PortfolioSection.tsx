import { useEffect, useRef } from 'react';
import { projects } from '@/content/homeContent';
import { FancyCarousel } from '@/components/ui/carousel-fancy';

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const slides = projects.map((p) => ({
    title: p.title,
    button: p.category,
    src: p.image,
  }));

  useEffect(() => {
    let scrollTriggerModule: { getAll: () => Array<{ kill: () => void }> } | undefined;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerModule = ScrollTrigger;

      if (!sectionRef.current) return;

      gsap.from('.portfolio-heading', {
        y: 48,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
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
    <section id="work" ref={sectionRef} className="bg-[#eef3fb] px-6 py-32 text-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="portfolio-heading mb-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-400">Selected work</p>
            <h2 className="mt-5 font-display text-[clamp(2.5rem,4.2vw,4.4rem)] leading-[0.95] tracking-[-0.04em]">
              Real projects.
              <br />
              <span className="text-slate-500">Real images. Real proof.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            The homepage now uses the actual imagery from the RARA scrape so the redesign feels grounded in the work,
            not in placeholders pretending to be it.
          </p>
        </div>

        <FancyCarousel slides={slides} />
      </div>
    </section>
  );
}
