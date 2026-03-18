import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '@/content/homeContent';

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerModule: { getAll: () => Array<{ kill: () => void }> } | undefined;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerModule = ScrollTrigger;

      if (!sectionRef.current) return;

      gsap.from('.testimonial-heading, .testimonial-card', {
        y: 44,
        opacity: 0,
        duration: 0.9,
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
    <section ref={sectionRef} className="bg-white px-6 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="testimonial-heading mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-600">Customer happiness</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,4vw,4.1rem)] leading-[0.95] tracking-[-0.04em] text-slate-900">
            What our clients say.
            <br />
            <span className="text-slate-400">Real words, real results.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="testimonial-card rounded-[2rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-[0_8px_40px_rgba(148,163,184,0.1)] transition-shadow duration-500 hover:shadow-[0_16px_60px_rgba(148,163,184,0.18)]"
            >
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 text-lg leading-8 text-slate-600">"{testimonial.quote}"</p>
              <div className="mt-8 border-t border-slate-100 pt-5">
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.2em] text-slate-400">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
