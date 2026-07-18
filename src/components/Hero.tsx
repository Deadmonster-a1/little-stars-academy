import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Hero3D } from './Hero3D';

interface HeroProps {
  onBookVisitClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookVisitClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden min-h-[100dvh] flex flex-col justify-center items-center bg-cream pt-32 pb-32 md:pt-48 md:pb-48"
    >
      {/* Background 3D Toy Canvas */}
      <div className="absolute inset-0 z-0 opacity-80 mix-blend-multiply pointer-events-none">
        <Hero3D />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cream/80 z-10 pointer-events-none" />

      {/* Hero Core Content */}
      <div className="max-w-[1200px] w-full z-20 flex flex-col items-center justify-center relative px-4 sm:px-6 lg:px-8 text-center space-y-12">
        
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-ink text-editorial-hero font-bold leading-[0.95] tracking-tighter text-balance max-w-6xl w-full"
        >
          Every child is 
          <span 
            className="inline-block w-24 h-12 md:w-32 md:h-16 lg:w-40 lg:h-20 rounded-full align-middle mx-3 lg:mx-5 bg-cover bg-center shadow-lg transition-transform duration-700 hover:scale-105 filter grayscale hover:grayscale-0" 
            style={{backgroundImage: 'url(https://images.unsplash.com/photo-1545558014-8692077e9b5c?q=80&w=2070&auto=format&fit=crop)'}}
          ></span>
          a little star.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-ink/60 font-sans text-xl md:text-2xl max-w-2xl font-medium leading-relaxed text-balance"
        >
          We believe early childhood is a cosmic sandbox. Through structured, play-first curriculum and warm guidance, we nurture independent thinking and endless wonder.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-4 w-full"
        >
          <button
            onClick={(e) => { e.stopPropagation(); onBookVisitClick(); }}
            className="w-full sm:w-auto bg-ink text-white font-sans font-medium text-lg px-12 py-6 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)] hover:bg-ink-light hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-ink/20"
          >
            <span className="flex items-center justify-center gap-3">
              Book a Free Visit
            </span>
          </button>
          
          <button
            onClick={(e) => { e.stopPropagation(); scrollToSection('#programs'); }}
            className="w-full sm:w-auto bg-transparent text-ink hover:text-twilight-deep font-sans font-medium text-lg transition-colors duration-300 focus:outline-none group flex items-center justify-center gap-3"
          >
            <span>Explore Curriculum</span>
            <div className="w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center group-hover:border-twilight-deep transition-colors duration-300">
               <ArrowDownIcon />
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

const ArrowDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 5v14M19 12l-7 7-7-7"/>
  </svg>
);
