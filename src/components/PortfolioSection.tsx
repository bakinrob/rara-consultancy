import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/content/homeContent';

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerModule: { getAll: () => Array<{ kill: () => void }> } | undefined;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerModule = ScrollTrigger;

      if (!sectionRef.current) return;

      gsap.from('.portfolio-heading, .portfolio-card', {
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

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="portfolio-card group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(148,163,184,0.18)]"
              style={{ gridColumn: index === 0 ? 'span 2' : undefined }}
            >
              <div className="relative h-72 overflow-hidden md:h-80">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/78 via-slate-900/12 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-200/85">{project.category}</p>
                <div className="mt-3 flex items-center gap-2">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{project.title}</h3>
                  <ArrowUpRight className="h-5 w-5 text-sky-200 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/78">{project.description}</p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-sky-100/72">{project.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
