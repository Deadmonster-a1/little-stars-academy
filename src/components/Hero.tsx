import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowDown, X } from 'lucide-react';
import { HandDrawnStar } from './SVGIcons';
import { CONTACT_INFO } from '../data';

interface HeroProps {
  onBookVisitClick: () => void;
}

interface ConstellationStar {
  id: number;
  cx: number;
  cy: number;
  r: number;
  color: string;
  name: string;
  fact: string;
}

const CONSTELLATION_STARS: ConstellationStar[] = [
  {
    id: 1,
    cx: 80,
    cy: 320,
    r: 6,
    color: '#FFF8EC',
    name: 'Tactile Learning',
    fact: 'We believe early childhood is a tactile adventure. Our classrooms have zero single-use plastics and are stocked with natural, sensory-rich wooden play items.'
  },
  {
    id: 2,
    cx: 160,
    cy: 210,
    r: 7,
    color: '#FF7A6B',
    name: 'Emotional Milestones',
    fact: 'We track development across 14 emotional milestones rather than just academic memory, helping children identify and navigate their feelings.'
  },
  {
    id: 3,
    cx: 300,
    cy: 240,
    r: 6,
    color: '#FFF8EC',
    name: 'Cosmic Sandbox',
    fact: "Our 'Cosmic Sandbox' philosophy views mistakes as beautiful detours. Children learn resilience when encouraged to experiment without fear."
  },
  {
    id: 4,
    cx: 380,
    cy: 150,
    r: 12, // Giant Hero Star
    color: '#FFB84D',
    name: 'The Star Circle',
    fact: 'Every morning starts with a child-led "Star Circle" where little learners set their own play intentions for the day, building early autonomy.'
  },
  {
    id: 5,
    cx: 430,
    cy: 280,
    r: 8.5,
    color: '#4FA179',
    name: 'Nature Walks',
    fact: "Our 'Green Field' nature program connects kids with the seasons. We plant seeds, track shadows, and learn to listen to the whispers of wind."
  },
  {
    id: 6,
    cx: 300,
    cy: 380,
    r: 7.5,
    color: '#FFEFDA',
    name: 'Nurturing Ratio',
    fact: 'Our 1:8 teacher-to-child ratio ensures that every emotional transition, curiosity spark, or friend-making moment is supported with pure warmth.'
  },
  {
    id: 7,
    cx: 380,
    cy: 430,
    r: 6.5,
    color: '#FFF8EC',
    name: 'Screen-Free Policy',
    fact: 'We do not use digital screens in class. True neural connections are built through physical touch, eye contact, and cooperative storytelling.'
  }
];

export const Hero: React.FC<HeroProps> = ({ onBookVisitClick }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeStarId, setActiveStarId] = useState<number | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    starId: number;
    title: string;
    fact: string;
    color: string;
  } | null>(null);

  const scrollToSection = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionClick = () => {
    setActiveStarId(null);
    setTooltip(null);
  };

  const handleStarClick = (e: React.MouseEvent<SVGElement>, star: ConstellationStar) => {
    e.stopPropagation();

    // Toggle behavior: if already active, close it
    if (activeStarId === star.id) {
      setActiveStarId(null);
      setTooltip(null);
      return;
    }

    if (!heroRef.current) return;

    const heroRect = heroRef.current.getBoundingClientRect();
    const targetRect = e.currentTarget.getBoundingClientRect();

    // Calculate position relative to Hero section container
    const x = targetRect.left - heroRect.left + targetRect.width / 2;
    const y = targetRect.top - heroRect.top;

    setActiveStarId(star.id);
    setTooltip({
      x,
      y,
      starId: star.id,
      title: star.name,
      fact: star.fact,
      color: star.color
    });
  };

  // Adjust tooltip horizontal alignment dynamically based on coordinate position
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  let alignmentClass = "-translate-x-1/2";
  let arrowStyle: React.CSSProperties = { left: '50%' };

  if (tooltip) {
    if (tooltip.x < 160) {
      alignmentClass = "translate-x-0 -ml-4";
      arrowStyle = { left: '20px' };
    } else if (viewportWidth - tooltip.x < 160) {
      alignmentClass = "-translate-x-full ml-4";
      arrowStyle = { right: '20px', left: 'auto' };
    }
  }

  return (
    <section
      ref={heroRef}
      onClick={handleSectionClick}
      className="relative overflow-hidden min-h-screen flex flex-col justify-between bg-gradient-to-b from-twilight-deep via-twilight to-cream pt-28 md:pt-36 cursor-default"
    >
      {/* Background Starry Sky Canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Twinkling stars */}
        <div className="absolute top-[12%] left-[8%] animate-twinkle-slow text-marigold"><HandDrawnStar size={10} /></div>
        <div className="absolute top-[15%] left-[24%] animate-twinkle-medium text-cream-soft"><HandDrawnStar size={8} /></div>
        <div className="absolute top-[8%] left-[65%] animate-twinkle-fast text-marigold"><HandDrawnStar size={11} /></div>
        <div className="absolute top-[25%] left-[85%] animate-twinkle-slow text-cream"><HandDrawnStar size={9} /></div>
        <div className="absolute top-[40%] left-[15%] animate-twinkle-fast text-marigold"><HandDrawnStar size={12} /></div>
        <div className="absolute top-[48%] left-[88%] animate-twinkle-medium text-cream-soft"><HandDrawnStar size={8} /></div>
        <div className="absolute top-[58%] left-[70%] animate-twinkle-slow text-marigold"><HandDrawnStar size={10} /></div>
        <div className="absolute top-[68%] left-[10%] animate-twinkle-medium text-cream"><HandDrawnStar size={7} /></div>

        {/* Hand-drawn Constellation Connecting Lines SVG */}
        <svg
          className="absolute right-0 top-0 w-full h-[80%] md:w-[60%] md:h-full opacity-75 z-10 pointer-events-none"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Connecting constellation lines */}
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
            d="M80 320 L160 210 L300 240 L380 150 L430 280 L300 380 L160 210"
            stroke="rgba(255, 184, 77, 0.35)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, delay: 0.5, ease: 'easeInOut' }}
            d="M300 240 L300 380 L380 430"
            stroke="rgba(255, 184, 77, 0.25)"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />

          {/* Interactive constellation stars & hitzones */}
          {CONSTELLATION_STARS.map((star) => {
            const isActive = activeStarId === star.id;
            return (
              <g
                key={star.id}
                pointerEvents="all"
                className="cursor-pointer group"
                onClick={(e) => handleStarClick(e, star)}
              >
                {/* Wide invisible touch target to make mobile interaction feel highly responsive */}
                <circle
                  cx={star.cx}
                  cy={star.cy}
                  r="24"
                  fill="transparent"
                  className="pointer-events-auto"
                />

                {/* Pulsing ring for active state */}
                {isActive && (
                  <circle
                    cx={star.cx}
                    cy={star.cy}
                    r={star.id === 4 ? 24 : star.r + 10}
                    fill="none"
                    stroke={star.color}
                    strokeWidth="1.5"
                    className="animate-ping"
                    style={{ transformOrigin: `${star.cx}px ${star.cy}px` }}
                  />
                )}

                {/* Hover ring */}
                <circle
                  cx={star.cx}
                  cy={star.cy}
                  r={star.id === 4 ? 22 : star.r + 6}
                  fill="none"
                  stroke={star.color}
                  strokeWidth="1"
                  className="opacity-0 group-hover:opacity-40 transition-opacity duration-200 pointer-events-none"
                />

                {/* Actual visual star representation */}
                {star.id === 4 ? (
                  /* Special hero pulsar star path */
                  <g className="transition-transform duration-300 group-hover:scale-110 pointer-events-none" style={{ transformOrigin: "380px 150px" }}>
                    <path
                      d="M380 150 L385.5 166.5 L402 166.5 L388.5 176.5 L394 193 L380 183 L366 193 L371.5 176.5 L358 166.5 L374.5 166.5 Z"
                      fill={isActive ? "#FFE4B5" : "#FFB84D"}
                      stroke="#FFF8EC"
                      strokeWidth="1.2"
                    />
                    <circle cx="380" cy="150" r="28" stroke="rgba(255, 184, 77, 0.15)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx="380" cy="150" r="14" stroke="rgba(255, 184, 77, 0.25)" strokeWidth="0.8" />
                  </g>
                ) : (
                  /* Standard constellation star circle */
                  <circle
                    cx={star.cx}
                    cy={star.cy}
                    r={star.r}
                    fill={isActive ? "#FFB84D" : star.color}
                    className="transition-all duration-300 group-hover:fill-marigold pointer-events-none"
                    stroke={isActive ? "#FFF" : "none"}
                    strokeWidth={isActive ? 1 : 0}
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Hero Core Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 flex-grow flex flex-col justify-center relative">
        <div className="relative w-full">
          {/* Z-Axis Cascade Background Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 10, rotateZ: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, rotateZ: -2 }}
            transition={{ duration: 1.2, ease: [0.32, 0.72, 0, 1], delay: 0.2 }}
            className="absolute right-0 top-12 w-full lg:w-[50%] h-[110%] bg-white/5 rounded-[2.5rem] border border-white/10 hidden lg:block -z-10 shadow-2xl backdrop-blur-md"
          />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Headline and Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 text-cream-soft font-sans text-xs sm:text-sm font-medium tracking-wide select-none"
            >
              <span className="w-2 h-2 rounded-full bg-marigold animate-ping" />
              <span>Playgroup – UKG · Ages 2–6 · Admissions Open</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-cream font-display font-bold leading-tight select-none"
              style={{ fontSize: 'clamp(34px, 5.6vw, 58px)' }}
            >
              Every child is a <br />
              <span className="text-gradient-marigold relative inline-block pb-1">
                little star.
                <svg className="absolute left-0 bottom-0.5 w-full h-1.5 text-coral" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,9 100,5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-cream-soft font-sans text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              We believe early childhood is a cosmic sandbox. Through structured, play-first curriculum and warm guidance, we nurture independent thinking, emotional courage, and endless wonder.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3"
            >
              <button
                onClick={(e) => { e.stopPropagation(); onBookVisitClick(); }}
                className="w-full sm:w-auto bg-gradient-to-r from-marigold to-marigold-deep text-twilight-deep font-display font-semibold text-sm tracking-wide uppercase px-8 py-4 rounded-full shadow-lg hover:shadow-[0_8px_30px_-5px_rgba(255,184,77,0.5)] transition-fluid hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marigold relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book a Free Visit
                  <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-fluid group-hover:bg-white/30 group-hover:translate-x-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                  </span>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-fluid"></div>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); scrollToSection('#day-here'); }}
                className="w-full sm:w-auto bg-transparent hover:bg-white/5 text-cream border-2 border-white/20 hover:border-marigold/40 font-display font-medium text-sm tracking-wide uppercase px-7 py-3.5 rounded-full shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cream"
              >
                See a Day Here
              </button>
            </motion.div>
          </div>

          {/* Side constellation visual highlight space */}
          <div className="lg:col-span-5 hidden lg:flex justify-end select-none">
            {/* Illustrated subtle cloud element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="relative"
            >
              <div className="w-80 h-80 rounded-full bg-gradient-to-tr from-marigold/5 to-coral/10 blur-3xl absolute inset-0 -z-10" />
              {/* Cute hand-drawn starry moon vignette - Synchronized with the clicked star */}
              <div className="border border-cream/10 bg-white/5 backdrop-blur-lg rounded-3xl p-6 shadow-2xl space-y-4 max-w-xs text-cream/90 font-sans border-dashed min-h-[220px] flex flex-col justify-between transition-all duration-300 hover:border-marigold/20">
                <AnimatePresence mode="wait">
                  {(() => {
                    const activeStar = CONSTELLATION_STARS.find(s => s.id === activeStarId);
                    if (activeStar) {
                      return (
                        <motion.div
                          key={`star-card-${activeStar.id}`}
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-3 flex-grow flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-marigold">
                              <HandDrawnStar size={22} />
                              <span className="font-display font-semibold tracking-wide text-sm text-cream">
                                {activeStar.name}
                              </span>
                            </div>
                            <p className="text-xs text-cream-soft/90 leading-relaxed font-light">
                              {activeStar.fact}
                            </p>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-marigold/80 font-mono pt-3 border-t border-white/5">
                            <span>PHILOSOPHY INDEX</span>
                            <span className="bg-marigold/10 px-2 py-0.5 rounded-full text-marigold">★ {activeStar.id} / 7</span>
                          </div>
                        </motion.div>
                      );
                    } else {
                      return (
                        <motion.div
                          key="default-card"
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -12 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-3 flex-grow flex flex-col justify-between"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-marigold">
                              <HandDrawnStar size={24} />
                              <span className="font-display font-semibold tracking-wide text-sm text-cream">Cosmic Sandbox</span>
                            </div>
                            <p className="text-xs text-cream-soft leading-relaxed font-light">
                              "Children do not play to learn. They learn because they play." Our classrooms are designed as immersive, nature-connected discovery zones.
                            </p>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-marigold/80 font-mono pt-3 border-t border-white/5">
                            <span className="animate-pulse text-marigold font-bold">✦ TAP CONSTELLATION STARS</span>
                            <span>★ ★ ★ ★</span>
                          </div>
                        </motion.div>
                      );
                    }
                  })()}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>

      {/* Floating Constellation Tooltip Overlay */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10, rotateX: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className={`absolute z-50 w-72 sm:w-80 glass-panel-dark rounded-2xl p-5 text-cream select-none ${alignmentClass}`}
            style={{
              left: `${tooltip.x}px`,
              top: `${tooltip.y - 12}px`,
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when tapping tooltip itself
          >
            {/* Tooltip Arrow pointing down */}
            <div
              className="absolute bottom-0 w-3 h-3 rotate-45 border-r border-b border-marigold/30 bg-twilight-deep/95"
              style={{
                ...arrowStyle,
                marginBottom: '-6px',
                transform: 'translateX(-50%) rotate(45deg)',
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="text-marigold animate-pulse-glow">✦</span>
                <span className="font-display font-bold text-xs uppercase tracking-wider text-marigold">
                  Did You Know?
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveStarId(null);
                  setTooltip(null);
                }}
                className="text-cream-soft hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                aria-label="Close tooltip"
              >
                <X size={14} />
              </button>
            </div>

            {/* Content */}
            <div className="space-y-1.5">
              <h4 className="font-display font-semibold text-sm text-white">
                {tooltip.title}
              </h4>
              <p className="font-sans text-xs text-cream-soft/90 leading-relaxed font-light">
                {tooltip.fact}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Strip & Transition Layer */}
      <div className="w-full z-20 pt-16 pb-8 md:pb-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 1, ease: [0.32, 0.72, 0, 1] }}
            className="double-bezel-shell mx-auto max-w-5xl"
          >
            <div className="double-bezel-core p-8 md:py-6 md:px-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0 items-center justify-between text-center divide-y md:divide-y-0 md:divide-x divide-black/5">
              
              {/* Stat 1 */}
              <div className="md:px-4 space-y-1">
                <span className="font-display font-bold text-2xl lg:text-3xl text-twilight block">1 : 8 Ratio</span>
                <span className="font-sans text-xs uppercase tracking-widest text-ink-soft font-semibold">Teacher-to-Child Care</span>
              </div>

              {/* Stat 2 */}
              <div className="pt-4 md:pt-0 md:px-4 space-y-1">
                <span className="font-display font-bold text-2xl lg:text-3xl text-coral block">Safe Haven</span>
                <span className="font-sans text-xs uppercase tracking-widest text-ink-soft font-semibold">100% Child-proofed & Double-gated</span>
              </div>

              {/* Stat 3 */}
              <div className="pt-4 md:pt-0 md:px-4 space-y-1">
                <span className="font-display font-bold text-2xl lg:text-3xl text-twilight block">Since {CONTACT_INFO.foundedYear}</span>
                <span className="font-sans text-xs uppercase tracking-widest text-ink-soft font-semibold">Serving Happy Families</span>
              </div>

              </div>
            </div>
          </motion.div>
        </div>

        {/* Dawn Scroll Indicator */}
        <div className="flex flex-col items-center justify-center pt-8 text-ink select-none cursor-pointer" onClick={(e) => { e.stopPropagation(); scrollToSection('#why-us'); }}>
          <span className="font-display text-xs tracking-widest font-semibold uppercase opacity-60">Dawn of Discovery</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="mt-1 text-ink-soft"
          >
            <ArrowDown size={16} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
