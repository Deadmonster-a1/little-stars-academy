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
            className="text-ink font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(26px, 3.6vw, 38px)' }}
          >
            Little moments of infinite wonder
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-ink-soft font-sans text-sm sm:text-base leading-relaxed"
          >
            Instead of sterile stock photography of staged children, we share these hand-illustrated storybook windows into our classroom rituals.
          </motion.p>
        </div>

        {/* Illustrations Bento Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOMENTS_DATA.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-white rounded-3xl p-6 border border-cream-soft shadow-[0_8px_20px_-6px_rgba(45,42,61,0.05)] hover:shadow-[0_15px_30px_-6px_rgba(45,42,61,0.08)] hover:scale-[1.02] transition-all duration-300 flex flex-col items-center justify-between group"
            >
              {/* Illustration Block Container */}
              <div className="w-full bg-cream rounded-2xl p-4 flex items-center justify-center select-none border border-marigold/5 overflow-hidden relative">
                {renderIllustration(moment.illustrationType)}
                
                {/* Micro hover feedback star */}
                <div className="absolute top-3 right-3 text-marigold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <HandDrawnStar size={14} />
                </div>
              </div>

              {/* Caption */}
              <div className="pt-6 text-center">
                <p className="text-ink font-display font-medium text-sm sm:text-base leading-relaxed max-w-[260px] mx-auto">
                  {moment.caption}
                </p>
                <span className="text-[10px] font-mono tracking-widest text-coral uppercase block mt-2 font-semibold">
                  {moment.id === 'moment1' ? 'Literacy Core' : moment.id === 'moment2' ? 'Bio Garden' : 'Creative Studio'}
                </span>
              </div>
            </motion.div>
          ))}
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
            <span className="font-handwritten text-coral text-xl md:text-2xl font-bold block">
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
