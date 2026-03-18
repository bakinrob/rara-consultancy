import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import raraLogo from '@/assets/rara-logo.png';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'What We Build', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-slate-950/84 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(2,6,23,0.28)]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="group relative flex items-center">
            <div
              className={cn(
                'absolute -inset-3 rounded-[1.75rem] transition-all duration-500 blur-xl',
                scrolled ? 'bg-primary/18 group-hover:bg-primary/28' : 'bg-white/0 group-hover:bg-white/10'
              )}
            />
            <img
              src={raraLogo}
              alt="Rara Consultancy"
              className="relative h-12 md:h-16 w-auto brightness-0 invert"
            />
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold transition-colors duration-300 tracking-[0.2em] uppercase text-white/72 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="liquid-glass px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              See What To Automate
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <img
          src={raraLogo}
          alt="Rara Consultancy"
          className="h-16 w-auto brightness-0 invert mb-8"
        />
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-3xl font-bold text-foreground tracking-wide uppercase hover:text-primary transition-colors"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={() => setMobileOpen(false)}
          className="mt-4 liquid-glass px-8 py-3 rounded-full text-white text-lg font-semibold"
        >
          See What To Automate
        </a>
      </div>
    </>
  );
}
