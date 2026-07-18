import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface StickyNavProps {
  onBookVisitClick: () => void;
}

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className: string, onClick: () => void }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

export const StickyNav: React.FC<StickyNavProps> = ({ onBookVisitClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why Us', href: '#why-us' },
    { name: 'Programs', href: '#programs' },
    { name: 'A Day Here', href: '#day-here' },
    { name: 'Teachers', href: '#teachers' },
    { name: 'Admissions', href: '#admissions' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 ${
          isScrolled
            ? 'mt-4'
            : 'mt-6'
        }`}
      >
        <div className={`w-full max-w-5xl transition-all duration-500 rounded-full ${
          isScrolled ? 'shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-black/10 bg-white/90 backdrop-blur-2xl' : ''
        }`}>
          <div 
            className={`w-full rounded-full transition-all duration-500 ${
              isScrolled
                ? 'text-ink py-3 px-6'
                : 'bg-transparent text-ink py-3 px-2 shadow-none'
            }`}
          >
          <div className="flex justify-between items-center w-full">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-twilight-deep rounded-md"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className={`${isScrolled ? 'text-coral' : 'text-marigold'} text-2xl font-semibold select-none animate-pulse-glow`}>✦</span>
              <span className="font-display font-semibold text-lg tracking-tight">
                Little Stars Academy
              </span>
            </a>

            {/* Desktop Navigation links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative group font-sans text-sm font-medium tracking-wide transition-colors duration-200 ${
                    isScrolled ? 'text-ink/70 hover:text-ink' : 'text-ink/80 hover:text-ink'
                  } focus:outline-none`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full ${isScrolled ? 'bg-coral' : 'bg-marigold'}`}></span>
                </a>
              ))}
            </div>

            {/* Book a visit CTA */}
            <div className="hidden md:block">
              <MagneticButton
                onClick={onBookVisitClick}
                className={`px-6 py-2.5 rounded-full font-display font-medium text-xs tracking-wider uppercase shadow-sm hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isScrolled
                    ? 'bg-ink text-white focus:ring-ink hover:shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)]'
                    : 'bg-ink text-white hover:bg-ink-light focus:ring-ink shadow-sm'
                }`}
              >
                Book a Visit
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-full transition-fluid focus:outline-none focus:ring-2 focus:ring-offset-2 relative w-10 h-10 ${
                  isScrolled
                    ? 'text-ink hover:bg-cream-soft focus:ring-ink/20'
                    : 'text-ink hover:bg-ink/5 focus:ring-ink/30'
                }`}
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1.5">
                  <span className={`block w-5 h-0.5 rounded-full transition-fluid origin-center ${isScrolled || isMobileMenuOpen ? 'bg-current' : 'bg-ink'} ${isMobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''}`}></span>
                  <span className={`block w-5 h-0.5 rounded-full transition-fluid origin-center ${isScrolled || isMobileMenuOpen ? 'bg-current' : 'bg-ink'} ${isMobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-0 bg-twilight-deep/90 backdrop-blur-3xl z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
              transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
              className="fixed inset-x-4 top-24 bottom-6 z-50 flex flex-col rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b border-twilight-deep">
                <div className="flex items-center space-x-2">
                  <span className="text-marigold text-2xl select-none animate-pulse-glow">✦</span>
                  <span className="font-display font-semibold text-lg tracking-tight text-cream">
                    Little Stars
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-cream focus:outline-none focus:ring-2 focus:ring-marigold"
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Navigation links inside overlay */}
              <motion.div 
                className="flex flex-col space-y-2 mt-8 flex-1 justify-center"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
              >
                {navLinks.map((link) => (
                  <div key={link.name} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      variants={{
                        open: { opacity: 1, y: 0 },
                        closed: { opacity: 0, y: 40 }
                      }}
                      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="block font-display text-4xl font-semibold tracking-tight text-white hover:text-marigold transition-colors duration-300 py-3"
                    >
                      {link.name}
                    </motion.a>
                  </div>
                ))}
              </motion.div>

              {/* Mobile CTA inside Overlay */}
              <div className="mt-auto pt-8 flex justify-center">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookVisitClick();
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-marigold to-marigold-deep text-twilight-deep font-display font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded-full shadow-lg hover:shadow-[0_8px_30px_-5px_rgba(255,184,77,0.5)] transition-fluid focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marigold group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Book a Free Visit
                    <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-fluid group-hover:bg-white/30 group-hover:translate-x-1">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-fluid"></div>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
