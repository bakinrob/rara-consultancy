import { useEffect, useRef } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      gsap.from('.contact-text', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    };

    init();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mesh-gradient rounded-3xl p-12 md:p-20 border border-border">
          <p className="contact-text text-sm font-medium tracking-[0.3em] uppercase text-primary mb-6">
            Ready?
          </p>

          <h2 className="contact-text text-[clamp(2.5rem,5vw,4.5rem)] font-black text-foreground leading-[1.05]">
            Let's build<br />
            <span className="text-gradient-primary">something.</span>
          </h2>

          <p className="contact-text text-lg text-muted-foreground mt-6 max-w-xl mx-auto">
            Whether you need a website, an automation, or both — we'll make it happen.
          </p>

          <div className="contact-text mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:hello@raraconsultancy.com"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-[0_0_40px_hsl(217,91%,60%/0.4)]"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span className="font-bold tracking-[0.2em] uppercase text-foreground">RARA</span>
        <span>© {new Date().getFullYear()} Rara Consultancy. All rights reserved.</span>
      </div>
    </section>
  );
}
