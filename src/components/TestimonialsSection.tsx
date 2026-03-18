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
    <section ref={sectionRef} className="bg-slate-950 px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="testimonial-heading mb-16 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-300/70">Reviews</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,4vw,4.1rem)] leading-[0.95] tracking-[-0.04em]">
            Public proof,
            <br />
            <span className="text-white/64">not generic agency filler.</span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="testimonial-card rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur"
            >
              <div className="flex gap-1 text-sky-300">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-6 text-lg leading-8 text-white/84">“{testimonial.quote}”</p>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="mt-1 text-sm uppercase tracking-[0.2em] text-white/45">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
