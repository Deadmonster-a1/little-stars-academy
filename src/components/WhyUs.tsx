import React from 'react';
import { motion } from 'motion/react';
import { WHY_US_DATA } from '../data';
import { SafetyStarBurst, PlayGrowthPath, SmallGroupsCircles, UpdatesEnvelope } from './SVGIcons';

export const WhyUs: React.FC = () => {
  // Map illustration components dynamically
  const renderIcon = (id: string) => {
    switch (id) {
      case 'safety':
        return <SafetyStarBurst className="w-14 h-14" />;
      case 'play':
        return <PlayGrowthPath className="w-14 h-14" />;
      case 'size':
        return <SmallGroupsCircles className="w-14 h-14" />;
      case 'updates':
        return <UpdatesEnvelope className="w-14 h-14" />;
      default:
        return null;
    }
  };

  const getBorderColorClass = (color: string) => {
    switch (color) {
      case 'marigold':
        return 'border-t-4 border-t-marigold';
      case 'coral':
        return 'border-t-4 border-t-coral';
      case 'meadow':
        return 'border-t-4 border-t-meadow';
      case 'twilight':
        return 'border-t-4 border-t-twilight';
      default:
        return 'border-t-4 border-t-marigold';
    }
  };

  return (
    <section id="why-us" className="py-24 md:py-40 bg-cream scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-coral font-display font-medium uppercase tracking-[0.2em] text-[10px] bg-coral/10 px-3 py-1 rounded-full"
          >
            Nurture & Foundations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-ink font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(26px, 3.6vw, 38px)' }}
          >
            Why parents trust our starry world
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-ink-soft font-sans text-sm sm:text-base leading-relaxed"
          >
            We don’t believe in dry, conveyor-belt teaching. Every corner of our academy is optimized for emotional grounding, safety, and immersive discovery.
          </motion.p>
        </div>

        {/* 4-Card Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {WHY_US_DATA.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1, ease: [0.32, 0.72, 0, 1], delay: index * 0.15 }}
              className={`group double-bezel-shell flex flex-col relative overflow-hidden transition-fluid hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(255,184,77,0.2)] ${
                index === 0 ? 'md:col-span-2 md:row-span-2' :
                index === 1 ? 'md:col-span-2' :
                'md:col-span-1'
              }`}
            >
              <div className={`double-bezel-core flex flex-col flex-grow p-6 lg:p-8 ${getBorderColorClass(card.accentColor)}`}>
                {/* Card Icon Header */}
                <div className="mb-6 flex justify-start select-none relative">
                  <div className="absolute inset-0 bg-marigold/0 group-hover:bg-marigold/10 blur-xl transition-fluid rounded-full w-14 h-14" />
                  <div className="relative transform group-hover:scale-110 group-hover:-rotate-3 transition-fluid">
                    {renderIcon(card.id)}
                  </div>
                </div>

                {/* Card Info */}
                <div className="space-y-3 flex-grow">
                  <h3 className={`text-ink font-display font-semibold tracking-tight ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                    {card.title}
                  </h3>
                  <p className="text-ink-soft font-sans text-sm sm:text-base leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Tiny decorative bottom tag */}
                <div className="pt-6 mt-6 border-t border-black/5 flex items-center justify-between text-[10px] font-mono font-semibold tracking-[0.1em] text-ink-soft/40 uppercase">
                  <span>Milestone Core</span>
                  <span>✦</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
