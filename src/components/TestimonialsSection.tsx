import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Jennifer Puzsar',
    project: 'Eskin Science',
    quote: 'Working with Rara was seamless. They understood my vision from day one and delivered a website that perfectly represents my brand. The attention to detail was incredible.',
  },
  {
    name: 'Jacob Sessions',
    project: 'Big Dip Burgers',
    quote: 'Rara transformed our online presence completely. The branding and website they created captures exactly who we are. Could not be happier with the results.',
  },
  {
    name: 'Atrium Team',
    project: 'Atrium',
    quote: 'The full rebrand exceeded our expectations. Rara delivered a cohesive brand identity and digital experience that positions us exactly where we want to be.',
  },
  {
    name: 'Aashna Nadarjah',
    project: 'A2 Second Helpings',
    quote: 'Rara built us a beautiful website that truly represents our mission. They were patient, creative, and delivered beyond what we imagined possible.',
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerModule: any;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerModule = ScrollTrigger;

      if (!sectionRef.current) return;

      gsap.from('.testimonial-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonial-title', start: 'top 85%' },
      });

      const cards = sectionRef.current.querySelectorAll('.testimonial-card');
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 90%' },
        });
      });
    };

    init();
    return () => scrollTriggerModule?.getAll().forEach((t: any) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="testimonial-title text-sm font-medium tracking-[0.3em] uppercase text-primary mb-4">
            Reviews
          </p>
          <h2 className="testimonial-title text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground leading-tight">
            What our clients<br />
            <span className="text-gradient-primary">have to say.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="testimonial-card glass-card rounded-2xl p-8 hover:border-primary/20 transition-all duration-500"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-foreground/90 leading-relaxed mb-6 text-sm md:text-base italic">
                "{t.quote}"
              </p>

              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">
                  {t.project}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
