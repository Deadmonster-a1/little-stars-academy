import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { WHY_US_DATA } from '../data';
import { SafetyStarBurst, PlayGrowthPath, SmallGroupsCircles, UpdatesEnvelope } from './SVGIcons';

export const WhyUs: React.FC = () => {
  const container = useRef<HTMLElement>(null);
  
  const renderIcon = (id: string) => {
    switch (id) {
      case 'safety':
        return <SafetyStarBurst className="w-16 h-16" />;
      case 'play':
        return <PlayGrowthPath className="w-16 h-16" />;
      case 'size':
        return <SmallGroupsCircles className="w-16 h-16" />;
      case 'updates':
        return <UpdatesEnvelope className="w-16 h-16" />;
      default:
        return null;
    }
  };

  const getAccentClass = (color: string) => {
    switch (color) {
      case 'marigold': return 'bg-[#FDF9F1] border-marigold/10 text-marigold';
      case 'coral': return 'bg-[#FFF5F3] border-coral/10 text-coral';
      case 'meadow': return 'bg-[#F2FAF6] border-meadow/10 text-meadow';
      case 'twilight': return 'bg-[#F4F6FB] border-twilight/10 text-twilight';
      default: return 'bg-[#FAFAFA] border-black/[0.03] text-ink';
    }
  };

  return (
    <section id="why-us" ref={container} className="py-24 md:py-32 bg-white relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-32 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center space-x-4"
          >
            <div className="h-[1px] w-12 bg-coral/40"></div>
            <span className="text-coral font-mono text-xs uppercase tracking-[0.2em]">
              Nurture & Foundations
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-ink text-editorial-hero font-bold tracking-tight leading-[1.05]"
          >
            Why parents trust <br/>
            <span className="text-ink/40 italic font-serif font-normal block mt-2">our starry world.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-ink/70 text-editorial-body max-w-xl"
          >
            We don’t believe in dry, conveyor-belt teaching. Every corner of our academy is optimized for emotional grounding, safety, and immersive discovery.
          </motion.p>
        </div>

        {/* Editorial Scrapbook Vertical Flow */}
        <div className="space-y-32 md:space-y-48 lg:space-y-56 relative pt-12">
          {/* Vertical connecting line (subtle) */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-ink/5 hidden lg:block -translate-x-1/2" />

          {WHY_US_DATA.map((card, index) => {
            const isEven = index % 2 === 0;
            const numberString = `0${index + 1}`;
            
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-150px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center lg:items-start gap-12 lg:gap-16`}
              >
                {/* Background Giant Number (Absolute behind content) */}
                <div className={`absolute top-1/2 -translate-y-1/2 ${isEven ? 'lg:-left-24' : 'lg:-right-24'} text-[20vw] lg:text-[300px] font-serif italic leading-none font-bold text-ink/[0.02] select-none pointer-events-none -z-10`}>
                  {numberString}
                </div>

                {/* Scrapbook Graphic Element (Left/Right side) */}
                <div className={`w-full lg:w-5/12 flex justify-center ${isEven ? 'lg:justify-end lg:pr-12' : 'lg:justify-start lg:pl-12'} relative`}>
                  {/* Floating decorative elements */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: isEven ? 5 : -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`w-56 h-56 md:w-72 md:h-72 ${getAccentClass(card.accentColor)} border-[3px] border-cream rounded-[3rem] shadow-paper flex items-center justify-center relative z-20 ${isEven ? 'shape-blob-1 rotate-[-2deg]' : 'shape-blob-2 rotate-[2deg]'}`}
                  >
                    <div className="relative transform scale-125 drop-shadow-md">
                      {renderIcon(card.id)}
                    </div>
                  </motion.div>
                  
                  {/* Overlapping small accent block */}
                  <div className={`absolute top-1/2 -translate-y-1/2 w-20 h-20 bg-white shadow-paper border-[3px] border-cream rounded-full z-10 flex items-center justify-center text-ink/20 italic font-serif text-lg ${isEven ? 'right-4 lg:right-2' : 'left-4 lg:left-2'}`}>
                    ★
                  </div>
                </div>

                {/* Editorial Text Content */}
                <div className={`w-full lg:w-7/12 relative z-30 pt-4 lg:pt-16 flex flex-col ${isEven ? 'items-center lg:items-start text-center lg:text-left lg:pl-12' : 'items-center lg:items-end text-center lg:text-right lg:pr-12'}`}>
                  <div className="space-y-6 max-w-lg">
                    {/* Tiny eyebrow */}
                    <div className={`flex items-center space-x-3 text-ink/40 font-mono text-[10px] uppercase tracking-[0.2em] font-bold justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}>
                      {isEven ? (
                        <>
                          <span>{numberString}</span>
                          <span className="w-8 h-[1px] bg-ink/20"></span>
                          <span>Milestone Core</span>
                        </>
                      ) : (
                        <>
                          <span>Milestone Core</span>
                          <span className="w-8 h-[1px] bg-ink/20"></span>
                          <span>{numberString}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-ink font-display font-bold text-4xl lg:text-5xl tracking-tight leading-[1.1]">
                      {card.title}
                    </h3>

                    <p className="text-ink/70 font-sans text-lg md:text-xl leading-relaxed">
                      {card.description}
                    </p>

                    {/* Subtle aesthetic line */}
                    <div className={`pt-6 flex justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}>
                      <div className="w-16 h-[2px] bg-ink/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
