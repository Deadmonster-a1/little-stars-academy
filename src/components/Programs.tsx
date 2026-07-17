import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROGRAMS_DATA } from '../data';
import { HandDrawnStar } from './SVGIcons';

type AgeFilter = 'all' | '2-3' | '3-4' | '4-5' | '5-6';

export const Programs: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<AgeFilter>('all');

  const filters: { label: string; value: AgeFilter }[] = [
    { label: 'All Programs', value: 'all' },
    { label: 'Ages 2 – 3', value: '2-3' },
    { label: 'Ages 3 – 4', value: '3-4' },
    { label: 'Ages 4 – 5', value: '4-5' },
    { label: 'Ages 5 – 6', value: '5-6' },
  ];

  // Helper to determine if program matches filter
  const filteredPrograms = PROGRAMS_DATA.filter((prog) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '2-3') return prog.id === 'playgroup';
    if (activeFilter === '3-4') return prog.id === 'nursery';
    if (activeFilter === '4-5') return prog.id === 'lkg';
    if (activeFilter === '5-6') return prog.id === 'ukg';
    return true;
  });

  return (
    <section id="programs" className="py-20 md:py-28 bg-cream-soft scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-meadow font-display font-semibold uppercase tracking-wider text-xs sm:text-sm bg-meadow/10 px-3 py-1 rounded-full"
          >
            Guided Growth Path
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-ink font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(26px, 3.6vw, 38px)' }}
          >
            Four milestones, one continuous light
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-ink-soft font-sans text-sm sm:text-base leading-relaxed"
          >
            We guide children from safe, exploratory playgroup steps to robust, phonics-fluent kindergarten preparation. Choose an age group to see their custom path.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2.5 rounded-full font-display font-medium text-xs sm:text-sm tracking-wide transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-twilight border-2 ${
                activeFilter === filter.value
                  ? 'bg-twilight border-twilight text-cream-soft shadow-md hover:bg-twilight-deep'
                  : 'bg-white/40 border-twilight/10 hover:border-twilight/20 text-ink-soft hover:text-ink'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Programs Grid */}
        <div className="relative min-h-[400px]">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((prog) => (
                <motion.div
                  key={prog.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-2xl p-6 lg:p-8 border border-cream-soft shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full relative group hover:scale-[1.01]"
                  data-age={prog.ageRange}
                >
                  {/* Decorative Background Glow on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-marigold/0 to-marigold/[0.03] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none" />

                  <div>
                    {/* Star Level Progression device instead of numbers */}
                    <div className="flex items-center space-x-1 text-marigold mb-5 select-none" aria-label={`Star level ${prog.stars}`}>
                      {Array.from({ length: 4 }).map((_, i) => (
                        <HandDrawnStar
                          key={i}
                          size={16}
                          filled={i < prog.stars}
                          className={i < prog.stars ? 'text-marigold' : 'text-cream-soft'}
                        />
                      ))}
                    </div>

                    {/* Program Header */}
                    <div className="space-y-1.5 mb-6">
                      <h3 className="text-ink font-display font-bold text-xl lg:text-2xl tracking-tight">
                        {prog.name}
                      </h3>
                      <div className="inline-block bg-coral/10 text-coral font-sans text-xs font-bold tracking-wide px-2.5 py-0.5 rounded-md">
                        {prog.ageRange}
                      </div>
                    </div>

                    {/* Bullet Highlights using stars */}
                    <ul className="space-y-3 mb-8">
                      {prog.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-ink-soft leading-relaxed">
                          <span className="text-marigold mt-1 shrink-0 select-none">
                            <HandDrawnStar size={12} />
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footnote details */}
                  <div className="pt-6 border-t border-cream-soft space-y-2 mt-auto">
                    <div className="flex justify-between items-center text-[11px] font-mono tracking-wide">
                      <span className="text-ink-soft/60 uppercase">DAILY TIMING:</span>
                      <span className="text-twilight font-bold">{prog.timing}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] font-mono tracking-wide">
                      <span className="text-ink-soft/60 uppercase">EST. VALUE:</span>
                      <span className="text-ink font-bold font-sans">₹{prog.annualFee.toLocaleString()}/yr</span>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
