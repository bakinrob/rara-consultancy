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

  return (
    <section id="services" ref={sectionRef} className="bg-slate-950 px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="services-heading mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-300/70">What we build</p>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[0.95] tracking-[-0.04em]">
            Automation first.
            <br />
            <span className="text-white/66">Everything around it designed to convert.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="service-panel group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 transition-transform duration-500 hover:-translate-y-2"
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    index === 0
                      ? 'radial-gradient(circle at top right, rgba(56,189,248,0.18), transparent 40%)'
                      : index === 1
                        ? 'radial-gradient(circle at top right, rgba(250,245,255,0.1), transparent 40%)'
                        : 'radial-gradient(circle at top right, rgba(37,99,235,0.16), transparent 40%)',
                }}
              />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/35">{service.eyebrow}</p>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-white">{service.title}</h3>
                <p className="mt-4 text-base leading-8 text-white/68">{service.description}</p>
                <ul className="mt-8 space-y-3 border-t border-white/10 pt-6 text-sm text-white/72">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-3">
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-300" />
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
