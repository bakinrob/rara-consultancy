import { useEffect, useRef } from 'react';
import { testimonials } from '@/content/homeContent';
import { ScrollingTestimonials } from '@/components/ui/scrolling-testimonials';

const mappedTestimonials = testimonials.map((t) => ({
  text: t.quote,
  image: `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=e2e8f0&color=334155&size=150&font-size=0.4&bold=true`,
  name: t.name,
  role: t.role,
}));

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

      gsap.from('.testimonial-heading', {
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
    <section ref={sectionRef} className="bg-white px-6 py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="testimonial-heading mb-4 max-w-3xl text-center mx-auto">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-sky-600">Customer happiness</p>
          <h2 className="mt-5 font-display text-[clamp(2.4rem,4vw,4.1rem)] leading-[0.95] tracking-[-0.04em] text-slate-900">
            What our clients say.
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-500">
            Discover how small businesses trust RARA to deliver real results.
          </p>
        </div>

        <ScrollingTestimonials testimonials={mappedTestimonials} />
      </div>
    </section>
  );
}
