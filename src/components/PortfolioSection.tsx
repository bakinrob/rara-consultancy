import { useEffect, useRef } from 'react';
import { projects } from '@/content/homeContent';
import { ArrowUpRight } from 'lucide-react';

function BrowserFrame({ project, className = '' }: { project: typeof projects[number]; className?: string }) {
  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex flex-col rounded-2xl bg-white shadow-lg shadow-slate-200/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      {/* Browser chrome bar */}
      <div className="flex items-center gap-2 bg-slate-100 px-4 py-2.5 border-b border-slate-200">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="ml-2 flex-1 rounded-md bg-white px-3 py-1 text-[11px] text-slate-400 font-mono truncate border border-slate-200/60">
          {project.url.replace('https://', '')}
        </div>
      </div>

      {/* Project image */}
      <div className="relative flex-1 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-5">
          <p className="text-sm leading-relaxed text-slate-200 max-w-md">{project.description}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-white/80">
            Visit site <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>

      {/* Info bar */}
      <div className="flex items-center justify-between px-5 py-4 bg-white">
        <div>
          <h3 className="font-display text-lg font-semibold text-slate-900 leading-tight">{project.title}</h3>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.16em] text-slate-400">{project.category}</p>
        </div>
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors group-hover:border-slate-900 group-hover:text-slate-900">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </a>
  );
}

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

      gsap.from('.portfolio-heading', {
        y: 48, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
      });

      gsap.from('.portfolio-card', {
        y: 60, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
        scrollTrigger: { trigger: '.portfolio-grid', start: 'top 78%' },
      });
    };

    init();
    return () => scrollTriggerModule?.getAll().forEach((t) => t.kill());
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
              <span className="text-slate-500">Real results.</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Every project shown here is live work — click through to see it for yourself.
          </p>
        </div>

        {/* Bento grid */}
        <div className="portfolio-grid grid gap-5 md:grid-cols-2 lg:grid-cols-5 lg:grid-rows-2 auto-rows-[340px] md:auto-rows-[380px]">
          {/* Atrium — large, spans 3 cols + 1 row */}
          <BrowserFrame
            project={projects[0]}
            className="portfolio-card lg:col-span-3 lg:row-span-1"
          />
          {/* Eskin — right side top */}
          <BrowserFrame
            project={projects[1]}
            className="portfolio-card lg:col-span-2 lg:row-span-1"
          />
          {/* Bottom row: 3 even cards */}
          {projects.slice(2).map((p) => (
            <BrowserFrame
              key={p.title}
              project={p}
              className="portfolio-card lg:col-span-1 xl:col-span-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
