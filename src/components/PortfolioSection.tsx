import { useEffect, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import projectAtrium from '@/assets/project-atrium.jpg';
import projectEskin from '@/assets/project-eskin.jpg';
import projectBigdip from '@/assets/project-bigdip.jpg';
import projectA2 from '@/assets/project-a2.jpg';
import projectDetroit from '@/assets/project-detroit.jpg';

const projects = [
  {
    title: 'Atrium',
    category: 'Full Rebrand & Web Design',
    description: 'Complete brand overhaul — logo, guidelines, and a premium digital presence for a forward-thinking firm.',
    image: projectAtrium,
  },
  {
    title: 'Eskin Science',
    category: 'Web Design & Platform',
    description: 'Clean, scientific branding meets modern web experience for a skincare science brand.',
    image: projectEskin,
  },
  {
    title: 'Big Dip Burgers',
    category: 'Web Design & Branding',
    description: 'Bold identity and web design for a bold burger brand — from logo to launch.',
    image: projectBigdip,
  },
  {
    title: 'A2 Second Helpings',
    category: 'Web Design',
    description: 'A warm, community-driven web presence for a nonprofit fighting food insecurity.',
    image: projectA2,
  },
  {
    title: 'Detroit Soccer District',
    category: 'Web Design & Platform',
    description: 'Dynamic online hub for Detroit\'s growing soccer community — schedules, leagues, and more.',
    image: projectDetroit,
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
        scrollTrigger: { trigger: '.portfolio-title', start: 'top 85%' },
      });

      const cards = sectionRef.current.querySelectorAll('.portfolio-card');
      cards.forEach((card) => {
        gsap.from(card, {
          y: 80,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 85%' },
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.title}
              className="portfolio-card group relative glass-card rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
            >
              {/* Image with zoom + overlay reveal */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-background/60 group-hover:bg-transparent transition-colors duration-500" />
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
