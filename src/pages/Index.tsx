import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProofStrip from '@/components/ProofStrip';
import { TextColorHero } from '@/components/ui/text-color-hero';
import ServicesSection from '@/components/ServicesSection';
import PortfolioSection from '@/components/PortfolioSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FounderSection from '@/components/FounderSection';
import ContactSection from '@/components/ContactSection';

const Index = () => {
  useEffect(() => {
    let lenis:
      | {
          raf: (time: number) => void;
          destroy: () => void;
        }
      | undefined;

    const init = async () => {
      const Lenis = (await import('lenis')).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    };

    init();
    return () => lenis?.destroy();
  }, []);

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProofStrip />
      <TextColorHero />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <FounderSection />
      <ContactSection />
    </main>
  );
};

export default Index;
