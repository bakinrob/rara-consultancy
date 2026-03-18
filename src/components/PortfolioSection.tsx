import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Atrium',
    category: 'Web Design & Branding',
    description: 'A premium digital presence for a forward-thinking firm.',
    color: 'from-primary/20 to-accent/10',
  },
  {
    title: 'Eskin Science',
    category: 'Web Design & Platform',
    description: 'Clean, scientific branding meets modern web experience.',
    color: 'from-accent/20 to-primary/10',
  },
  {
    title: 'Big Dip Burgers',
    category: 'Web Design & Branding',
    description: 'Bold identity and web design for a bold burger brand.',
    color: 'from-primary/15 to-accent/15',
  },
];

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollTriggerModule: any;

    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      scrollTriggerModule = ScrollTrigger;

      if (!sectionRef.current) return;

      gsap.from('.portfolio-title', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.portfolio-title',
          start: 'top 85%',
        },
      });

      const cards = sectionRef.current.querySelectorAll('.portfolio-card');
      cards.forEach((card) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });
      });
    };

    init();
    return () => scrollTriggerModule?.getAll().forEach((t: any) => t.kill());
  }, []);

  return (
    <section id="work" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <p className="portfolio-title text-sm font-medium tracking-[0.3em] uppercase text-primary mb-4">
            Our Work
          </p>
          <h2 className="portfolio-title text-[clamp(2rem,4vw,3.5rem)] font-black text-foreground leading-tight">
            Projects that<br />
            <span className="text-gradient-primary">speak for themselves.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="portfolio-card group relative glass-card rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              {/* Gradient preview area */}
              <div className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
                <span className="text-4xl font-black text-foreground/20 group-hover:text-foreground/40 transition-colors duration-500 tracking-tight">
                  {project.title}
                </span>
              </div>

              <div className="p-6">
                <span className="text-xs font-medium tracking-wider uppercase text-primary">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-foreground mt-2 mb-2 flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transform" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
