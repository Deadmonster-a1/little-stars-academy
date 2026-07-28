import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface StickyNavProps {
  onBookVisitClick: () => void;
}

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
        className="fixed top-8 left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 md:px-8"
      >
        <div className={`w-full max-w-5xl transition-all duration-500 rounded-full ${
          isScrolled ? 'border-4 border-ink bg-white' : ''
        }`}>
          <div 
            className={`w-full rounded-full transition-all duration-500 ${
              isScrolled
                ? 'text-ink py-3 px-6'
                : 'bg-transparent text-ink py-5 px-4 shadow-none'
            }`}
          >
          <div className="flex justify-between items-center w-full">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center space-x-2 focus:outline-none focus:ring-4 focus:ring-marigold rounded-xl px-2 py-1"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="text-marigold text-4xl font-black select-none animate-bounce" style={{ textShadow: '0 2px 0 #2C3E50' }}>★</span>
              <span className="font-display font-black text-2xl tracking-tight text-twilight-deep">
                Little Stars
              </span>
            </a>

            {/* Desktop Navigation links */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative group font-display text-xl font-bold tracking-wide transition-all duration-300 hover:-translate-y-1 ${
                    isScrolled ? 'text-ink hover:text-twilight-deep' : 'text-ink hover:text-twilight'
                  } focus:outline-none`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-1.5 transition-all duration-300 group-hover:w-full rounded-full ${isScrolled ? 'bg-coral' : 'bg-marigold'}`}></span>
                </a>
              ))}
            </div>

            {/* Book a visit CTA */}
            <div className="hidden md:block">
              <button
                onClick={onBookVisitClick}
                className="btn-playful bg-marigold text-twilight-deep px-8 py-3 text-base uppercase tracking-wider"
              >
                Book a Visit
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-xl transition-all focus:outline-none relative w-12 h-12 flex flex-col items-center justify-center space-y-1.5 ${
                  isScrolled
                    ? 'text-ink border-2 border-transparent hover:border-ink hover:shadow-[0_2px_0_#2C3E50]'
                    : 'text-ink border-2 border-transparent hover:border-ink hover:shadow-[0_2px_0_#2C3E50]'
                }`}
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <span className={`block w-6 h-1 rounded-full transition-fluid origin-center bg-ink ${isMobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                <span className={`block w-6 h-1 rounded-full transition-fluid origin-center bg-ink ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
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
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-twilight/90 backdrop-blur-md z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="fixed inset-x-4 top-20 bottom-6 z-50 flex flex-col rounded-[2rem] bg-white border-4 border-ink shadow-[8px_8px_0_#2C3E50] p-8 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-6 border-b-4 border-twilight/20">
                <div className="flex items-center space-x-2">
                  <span className="text-marigold text-3xl select-none animate-bounce">★</span>
                  <span className="font-display font-black text-2xl tracking-tight text-twilight-deep">
                    Menu
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl border-4 border-transparent hover:border-ink hover:bg-cream-soft text-ink focus:outline-none"
                  aria-label="Close menu"
                >
                  <X size={28} strokeWidth={3} />
                </button>
              </div>

              {/* Navigation links inside overlay */}
              <motion.div 
                className="flex flex-col space-y-4 mt-8 flex-1 justify-center"
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
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -40 }
                      }}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="block font-display text-3xl font-black tracking-tight text-ink hover:text-twilight hover:translate-x-2 transition-all duration-300 py-2"
                    >
                      {link.name}
                    </motion.a>
                  </div>
                ))}
              </motion.div>

              {/* Mobile CTA inside Overlay */}
              <div className="mt-auto pt-6 flex justify-center border-t-4 border-twilight/20">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onBookVisitClick();
                  }}
                  className="w-full btn-playful bg-marigold text-twilight-deep text-lg py-4 flex items-center justify-center gap-3"
                >
                  Book a Free Visit
                  <span className="text-2xl">🚀</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
