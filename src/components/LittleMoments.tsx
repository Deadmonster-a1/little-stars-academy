import React from 'react';
import { motion } from 'motion/react';
import { MOMENTS_DATA } from '../data';
import { StoryCircleIllustration, OutdoorIllustration, ArtIllustration, HandDrawnStar } from './SVGIcons';

export const LittleMoments: React.FC = () => {
  // Map our handcrafted inline illustration SVGs
  const renderIllustration = (type: string) => {
    switch (type) {
      case 'story':
        return <StoryCircleIllustration className="w-full h-44 text-twilight shrink-0" />;
      case 'outdoor':
        return <OutdoorIllustration className="w-full h-44 text-twilight shrink-0" />;
      case 'art':
        return <ArtIllustration className="w-full h-44 text-twilight shrink-0" />;
      default:
        return null;
    }
  };

  return (
    <section id="moments" className="py-20 md:py-28 bg-cream-soft scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-coral font-display font-semibold uppercase tracking-wider text-xs sm:text-sm bg-coral/10 px-3 py-1 rounded-full"
          >
            Illustrated Glimpses
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-ink text-editorial-hero font-bold tracking-tight"
          >
            Little moments of infinite wonder
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-ink-soft text-editorial-body"
          >
            Instead of sterile stock photography of staged children, we share these hand-illustrated storybook windows into our classroom rituals.
          </motion.p>
        </div>

        {/* Alternating Storybook Rows */}
        <div className="space-y-16 md:space-y-24">
          {MOMENTS_DATA.map((moment, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={moment.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Illustration Panel (Left/Right) */}
                <div className={`w-full md:w-1/2 p-6 bg-white/90 backdrop-blur-sm border-[3px] border-cream shadow-paper relative z-10 flex items-center justify-center select-none overflow-hidden h-64 md:h-80 group hover:shadow-paper-hover hover:-translate-y-2 transition-all duration-500 ${isEven ? 'shape-blob-1' : 'shape-blob-2'}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-coral/0 to-coral/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="w-full h-full flex items-center justify-center p-4 bg-cream rounded-2xl border border-marigold/5 overflow-hidden">
                    {renderIllustration(moment.illustrationType)}
                  </div>
                </div>

                {/* Text/Content Panel (Right/Left) */}
                <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                  <span className="text-[10px] font-mono tracking-widest text-coral uppercase block font-semibold">
                    {moment.id === 'moment1' ? 'Literacy Core' : moment.id === 'moment2' ? 'Bio Garden' : 'Creative Studio'}
                  </span>
                  <h3 className="text-ink font-display font-bold text-2xl md:text-3xl tracking-tight leading-tight">
                    {moment.id === 'moment1' ? 'Story circles and sensory canopy loops' : moment.id === 'moment2' ? 'Exploring ecosystems in cherry tomato fields' : 'Expressive finger-painting and pressed art projects'}
                  </h3>
                  <p className="text-ink-soft font-sans text-sm md:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
                    {moment.caption}
                  </p>
                  
                  {/* High end bullet highlight */}
                  <div className="flex items-center justify-center md:justify-start space-x-2 text-xs text-marigold font-mono font-medium">
                    <HandDrawnStar size={12} />
                    <span>NURTURED DISCOVERY INDEX · ✦ 0{index + 1}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Cozy hand-drawn style quote bubble at bottom of Moments */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 text-center max-w-xl mx-auto"
        >
          <div className="bg-white border-2 border-dashed border-marigold/40 rounded-2xl p-5 relative">
            <span className="font-handwritten text-coral text-2xl md:text-3xl font-bold block transform -rotate-2">
              "We believe childhood is a sandbox, not a race. Our stars find their glow because we let them explore without worksheets."
            </span>
            <span className="text-[11px] font-mono uppercase tracking-widest text-ink-soft/60 block mt-2 font-semibold">
              — Little Stars Philosophy
            </span>
            {/* Cute mini stars decorating */}
            <div className="absolute -top-3 -left-3 text-marigold animate-pulse-glow"><HandDrawnStar size={16} /></div>
            <div className="absolute -bottom-3 -right-3 text-marigold"><HandDrawnStar size={14} /></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
