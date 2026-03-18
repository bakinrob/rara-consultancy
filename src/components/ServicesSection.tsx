import { useEffect, useRef } from 'react';
import { services } from '@/content/homeContent';

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerModule: { getAll: () => Array<{ kill: () => void }> } | undefined;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerModule = ScrollTrigger;

      if (!sectionRef.current) return;

      gsap.from('.services-heading, .service-panel', {
        y: 52,
        opacity: 0,
        duration: 0.95,
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

  const accentColors = [
    'from-sky-400/20 to-blue-500/10',
    'from-violet-400/15 to-purple-500/10',
    'from-blue-400/18 to-indigo-500/10',
  ];

  return (
    <section id="services" ref={sectionRef} className="bg-[#f8fafc] px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="services-heading mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-600">What we build</p>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[0.95] tracking-[-0.04em] text-slate-900">
            Automation first.
            <br />
            <span className="text-slate-400">Everything around it designed to convert.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="service-panel group relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_8px_40px_rgba(148,163,184,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(148,163,184,0.22)]"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${accentColors[index]} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">{service.eyebrow}</p>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-slate-900">{service.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-500">{service.description}</p>
                <ul className="mt-8 space-y-3 border-t border-slate-100 pt-6 text-sm text-slate-600">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
