import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data';
import { HandDrawnStar } from './SVGIcons';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-cream scroll-mt-12">
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
            Heartfelt Echoes
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-ink font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(26px, 3.6vw, 38px)' }}
          >
            Parent voices from our community
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-ink-soft font-sans text-sm sm:text-base leading-relaxed"
          >
            Read how our twilight-to-dawn transition, physical gardening hubs, and custom cognitive paces have supported families just like yours.
          </motion.p>
        </div>

        {/* 3-Card High-Contrast Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS_DATA.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="bg-twilight text-cream rounded-3xl p-8 shadow-xl border border-twilight-deep/40 flex flex-col justify-between hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
            >
              {/* Star graphic background watermarks */}
              <div className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none select-none group-hover:scale-110 transition-transform duration-500">
                <HandDrawnStar size={120} />
              </div>

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center space-x-1 text-marigold mb-6 select-none">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <HandDrawnStar key={i} size={18} />
                  ))}
                </div>

                {/* Testimonial Core Quote */}
                <p className="font-handwritten text-cream-soft text-xl sm:text-2xl leading-relaxed mb-8 relative">
                  <span className="text-marigold font-serif text-3xl absolute -left-5 -top-3">“</span>
                  {test.quote}
                  <span className="text-marigold font-serif text-3xl absolute -right-3 bottom-[-15px]">”</span>
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between mt-auto">
                <div className="space-y-0.5">
                  <span className="font-display font-semibold text-sm tracking-wide text-white block">
                    {test.parentName}
                  </span>
                  <span className="font-sans text-[11px] font-bold tracking-wider text-marigold/80 uppercase">
                    {test.programName}
                  </span>
                </div>
                {/* Visual badge */}
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-marigold text-xs font-bold font-mono">
                  ★
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
