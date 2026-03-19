import { useEffect, useRef, useState } from 'react';
import { services } from '@/content/homeContent';
import { ChevronRight } from 'lucide-react';

const accentGradients = [
  'from-sky-400 to-blue-600',
  'from-violet-400 to-indigo-600',
  'from-cyan-400 to-blue-500',
];

const bgAccents = [
  'bg-gradient-to-br from-sky-50 to-blue-50',
  'bg-gradient-to-br from-violet-50 to-indigo-50',
  'bg-gradient-to-br from-cyan-50 to-sky-50',
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let scrollTriggerModule: { getAll: () => Array<{ kill: () => void }> } | undefined;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerModule = ScrollTrigger;

      if (!sectionRef.current) return;

      gsap.from('.services-heading', {
        y: 52,
        opacity: 0,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
        },
      });
    };

    init();
    return () => scrollTriggerModule?.getAll().forEach((trigger) => trigger.kill());
  }, []);

  const active = services[activeIndex];

  return (
    <section id="services" ref={sectionRef} className="bg-[#f8fafc] px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="services-heading mb-20">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-600">What we build</p>
          <h2 className="mt-5 font-display text-[clamp(2.5rem,4.6vw,4.5rem)] leading-[0.95] tracking-[-0.04em] text-slate-900">
            Automation first.
          </h2>
          <p className="mt-3 font-display text-[clamp(1.8rem,3vw,3rem)] leading-[1] tracking-[-0.03em] text-slate-300">
            Everything around it designed to convert.
          </p>
        </div>

        {/* Interactive layout */}
        <div className="grid gap-0 lg:grid-cols-[340px_1fr] xl:grid-cols-[400px_1fr]">
          {/* Left: service selectors */}
          <div className="flex flex-col">
            {services.map((service, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={service.title}
                  onClick={() => setActiveIndex(index)}
                  className={`group relative text-left transition-all duration-500 border-l-[3px] py-8 pl-8 pr-4 ${
                    isActive
                      ? 'border-l-sky-500 bg-white shadow-[0_4px_30px_rgba(148,163,184,0.12)]'
                      : 'border-l-transparent hover:border-l-slate-200 hover:bg-white/50'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-display text-[2.5rem] leading-none tracking-[-0.04em] transition-colors duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${accentGradients[index]} bg-clip-text text-transparent`
                          : 'text-slate-200'
                      }`}
                    >
                      {service.eyebrow}
                    </span>
                    <div>
                      <h3
                        className={`text-xl font-semibold tracking-[-0.02em] transition-colors duration-300 ${
                          isActive ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {service.title}
                      </h3>
                      {isActive && (
                        <p className="mt-1 text-sm text-slate-500 leading-relaxed max-w-[260px]">
                          {service.description.split('.')[0]}.
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: active service detail */}
          <div
            className={`relative overflow-hidden rounded-[2rem] ${bgAccents[activeIndex]} p-10 lg:p-14 transition-all duration-500 min-h-[420px] flex flex-col justify-between`}
          >
            {/* Large decorative number */}
            <span
              className={`absolute -right-6 -top-10 font-display text-[14rem] leading-none tracking-[-0.06em] bg-gradient-to-br ${accentGradients[activeIndex]} bg-clip-text text-transparent opacity-[0.07] select-none pointer-events-none`}
            >
              {active.eyebrow}
            </span>

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600 mb-4">
                {active.eyebrow} — {active.title}
              </p>
              <h3 className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] leading-[1.1] tracking-[-0.03em] text-slate-900 max-w-lg">
                {active.description}
              </h3>
            </div>

            <div className="relative mt-10">
              <div className="grid grid-cols-2 gap-4">
                {active.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="group/item flex items-center gap-3 rounded-2xl bg-white/70 backdrop-blur-sm border border-white/80 px-5 py-4 shadow-[0_2px_12px_rgba(148,163,184,0.08)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(148,163,184,0.15)] hover:-translate-y-0.5"
                  >
                    <ChevronRight className="h-4 w-4 text-sky-500 transition-transform duration-300 group-hover/item:translate-x-0.5" />
                    <span className="text-sm font-medium text-slate-700">{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
