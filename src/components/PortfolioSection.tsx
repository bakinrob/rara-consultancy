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
    image: 'https://images.squarespace-cdn.com/content/v1/66de9b05cf0c710417de4900/e18ce614-be0a-4c24-b0c3-3b9e1bcf47dc/4.png',
  },
  {
    title: 'Eskin Science',
    category: 'Web Design & Platform',
    description: 'Clean, scientific branding meets modern web experience for a skincare science brand.',
    image: 'https://images.squarespace-cdn.com/content/v1/66de9b05cf0c710417de4900/8bc4e93f-dde1-4c42-a2fa-cff2a6b82b7b/2.png',
  },
  {
    title: 'Big Dip Burgers',
    category: 'Web Design & Branding',
    description: 'Bold identity and web design for a bold burger brand — from logo to launch.',
    image: 'https://images.squarespace-cdn.com/content/v1/66de9b05cf0c710417de4900/ba57e5e2-3fad-4aa3-a7f2-cf52dfc8fc61/3.png',
  },
  {
    title: 'A2 Second Helpings',
    category: 'Web Design',
    description: 'A warm, community-driven web presence for a nonprofit fighting food insecurity.',
    image: 'https://images.squarespace-cdn.com/content/v1/66de9b05cf0c710417de4900/0c2d19b1-69ed-47a3-adf3-69c973e6d7a9/1.png',
  },
  {
    title: 'Detroit Soccer District',
    category: 'Web Design & Platform',
    description: 'Dynamic online hub for Detroit\'s growing soccer community — schedules, leagues, and more.',
    image: 'https://images.squarespace-cdn.com/content/v1/66de9b05cf0c710417de4900/8f28b6d4-3fcf-4c3a-bf23-0fc66e4c8c30/5.png',
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
