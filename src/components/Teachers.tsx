import React from 'react';
import { motion } from 'motion/react';
import { TEACHERS_DATA } from '../data';
import { HandDrawnStar } from './SVGIcons';

export const Teachers: React.FC = () => {
  // Cycle monogram colors
  const getAvatarBgColor = (idx: number) => {
    const colors = [
      'bg-marigold/15 text-marigold-deep border-marigold/30',
      'bg-coral/15 text-coral border-coral/30',
      'bg-meadow/15 text-meadow border-meadow/30',
      'bg-twilight/15 text-twilight border-twilight/30',
    ];
    return colors[idx % colors.length];
  };

  return (
    <section id="teachers" className="py-20 md:py-28 bg-cream scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-meadow font-display font-semibold uppercase tracking-wider text-xs sm:text-sm bg-meadow/10 px-3 py-1 rounded-full"
          >
            Nurturing Hearts
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-ink font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(26px, 3.6vw, 38px)' }}
          >
            Meet the hearts behind our stars
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-ink-soft font-sans text-sm sm:text-base leading-relaxed"
          >
            Our educators aren’t instructors; they are gentle facilitators of discovery. Grounded in child development psychology and active play methodology.
          </motion.p>
        </div>

        {/* 4-Card Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEACHERS_DATA.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-cream-soft shadow-[0_4px_20px_-4px_rgba(45,42,61,0.04)] hover:shadow-[0_12px_24px_-4px_rgba(45,42,61,0.08)] hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between text-center relative group"
            >
              {/* Outer floating star decoration on card hover */}
              <div className="absolute top-4 right-4 text-marigold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <HandDrawnStar size={14} />
              </div>

              {/* Avatar Column */}
              <div className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full border-2 flex items-center justify-center font-display font-bold text-xl select-none mb-4 shadow-sm ${getAvatarBgColor(index)}`}>
                  {teacher.initials}
                </div>

                <div className="space-y-1">
                  <h3 className="text-ink font-display font-bold text-lg tracking-tight">
                    {teacher.name}
                  </h3>
                  <p className="text-coral font-sans text-xs font-semibold uppercase tracking-wider">
                    {teacher.role}
                  </p>
                </div>
              </div>

              {/* First-person Handwritten Quote */}
              <div className="my-6 relative py-3 bg-cream-soft/40 rounded-2xl px-4 border border-marigold/5">
                <span className="absolute top-1 left-2 text-marigold text-2xl select-none font-serif">“</span>
                <p className="font-handwritten text-ink text-lg leading-snug">
                  {teacher.quote}
                </p>
                <span className="absolute bottom-1 right-2 text-marigold text-2xl select-none font-serif">”</span>
              </div>

              {/* Experience badge */}
              <div className="pt-4 border-t border-cream-soft flex items-center justify-between text-[11px] font-mono font-semibold tracking-wider text-ink-soft/50 uppercase">
                <span>DEDICATED VISITS</span>
                <span className="text-twilight font-bold">{teacher.experienceYears}+ Years Exp</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
