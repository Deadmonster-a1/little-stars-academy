import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { CONTACT_INFO } from '../data';
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
      className="relative overflow-hidden min-h-[100dvh] flex flex-col justify-between bg-cream pt-28 md:pt-36"
    >
      {/* Background 3D Toy Canvas */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* Hero Core Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 flex-grow flex flex-col justify-center relative pointer-events-none">
        
        {/* Editorial Typography Lockup */}
        <div className="flex flex-col items-center text-center space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center space-x-3 bg-white/50 backdrop-blur-xl px-5 py-2 rounded-full border border-black/5 shadow-sm font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] font-bold text-ink/60 pointer-events-auto"
          >
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span>Playgroup – UKG · Ages 2–6 · Admissions Open</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-ink text-[4rem] sm:text-[6rem] md:text-[8rem] font-display font-bold leading-[0.9] tracking-tighter"
          >
            Every child is <br />
            <span className="relative inline-block italic font-serif text-coral mix-blend-multiply pr-4">
              a little star.
              {/* Subtle underline SVG */}
              <svg className="absolute left-0 -bottom-2 w-full h-4 text-marigold" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0,5 Q50,9 100,5" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-ink/60 font-sans text-lg md:text-xl max-w-2xl font-medium leading-relaxed mt-6"
          >
            We believe early childhood is a cosmic sandbox. Through structured, play-first curriculum and warm guidance, we nurture independent thinking and endless wonder.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 pointer-events-auto"
          >
            <button
              onClick={(e) => { e.stopPropagation(); onBookVisitClick(); }}
              className="w-full sm:w-auto bg-ink text-cream font-display font-bold text-sm tracking-[0.1em] uppercase px-10 py-5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-ink/20 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Book a Free Visit
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </span>
              </span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); scrollToSection('#day-here'); }}
              className="w-full sm:w-auto bg-transparent text-ink hover:text-coral font-mono font-bold text-xs tracking-[0.2em] uppercase transition-colors duration-300 focus:outline-none border-b-2 border-transparent hover:border-coral pb-1"
            >
              See a Day Here
            </button>
          </motion.div>
        </div>
      </div>

      {/* Trust Strip & Dawn Scroll Indicator */}
      <div className="w-full z-20 pt-16 pb-8 md:pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="mx-auto max-w-5xl bg-white/60 backdrop-blur-xl border-2 border-white rounded-[2.5rem] shadow-paper p-6 md:py-6 md:px-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-center justify-between text-center divide-y md:divide-y-0 md:divide-x divide-ink/10">
              
              {/* Stat 1 */}
              <div className="md:px-4 space-y-2">
                <span className="font-serif italic font-bold text-3xl lg:text-4xl text-coral block">1 : 8 Ratio</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 font-bold block">Teacher-to-Child Care</span>
              </div>

              {/* Stat 2 */}
              <div className="pt-6 md:pt-0 md:px-4 space-y-2">
                <span className="font-serif italic font-bold text-3xl lg:text-4xl text-meadow block">Safe Haven</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 font-bold block">100% Child-proofed & Double-gated</span>
              </div>

              {/* Stat 3 */}
              <div className="pt-6 md:pt-0 md:px-4 space-y-2">
                <span className="font-serif italic font-bold text-3xl lg:text-4xl text-twilight block">Since {CONTACT_INFO.foundedYear}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 font-bold block">Serving Happy Families</span>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center justify-center pt-12 text-ink select-none cursor-pointer" onClick={(e) => { e.stopPropagation(); scrollToSection('#why-us'); }}>
          <span className="font-mono text-[10px] tracking-[0.3em] font-bold uppercase text-ink/30">Dawn of Discovery</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="mt-2 text-ink/40"
          >
            <ArrowDown size={18} strokeWidth={2.5} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
