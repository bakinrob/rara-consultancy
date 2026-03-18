import { useEffect, useRef } from 'react';
import { Globe, Cpu, LayoutDashboard } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Web Design & Branding',
    description: 'Custom websites, redesigns, and visual identity that makes your brand impossible to ignore.',
    features: ['Custom Websites', 'Brand Identity', 'UI/UX Design', 'Responsive Design'],
  },
  {
    icon: Cpu,
    title: 'AI Automations',
    description: 'From booking systems to phone automation — we eliminate the manual work that slows you down.',
    features: ['Booking Systems', 'Phone Automation', 'Workflow Automation', 'Data Scraping'],
  },
  {
    icon: LayoutDashboard,
    title: 'Custom Platforms',
    description: 'Course platforms, client portals, dashboards — built exactly the way your business needs them.',
    features: ['Course Platforms', 'Client Portals', 'Dashboards', 'Custom Tools'],
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerModule: any;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerModule = ScrollTrigger;

      if (!sectionRef.current) return;

      const cards = sectionRef.current.querySelectorAll('.service-card');
      cards.forEach((card) => {
        gsap.from(card, {
          x: 120,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 50%', scrub: 1 },
        });
      });

      gsap.from('.services-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.services-title', start: 'top 85%' },
      });
    };

    init();
    return () => scrollTriggerModule?.getAll().forEach((t: any) => t.kill());
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)';
  };

  return (
    <section id="services" ref={sectionRef} className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="services-title text-sm font-medium tracking-[0.3em] uppercase text-primary mb-4">
            What We Do
          </p>
          <h2 className="services-title text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground leading-tight">
            Three ways we<br />
            <span className="text-gradient-primary">transform your business.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group glass-card rounded-2xl p-8 transition-all duration-300 cursor-pointer border border-transparent hover:border-primary/30"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ willChange: 'transform' }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{service.description}</p>

              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span key={feature} className="text-xs px-3 py-1.5 rounded-full bg-secondary text-muted-foreground font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
