import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TEACHERS_DATA } from '../data';
import { HandDrawnStar } from './SVGIcons';
import { supabase } from '../lib/supabaseClient';
import { Teacher } from '../types';

export const Teachers: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>(TEACHERS_DATA);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { data, error } = await supabase
          .from('teachers')
          .select('*');

        if (error) throw error;
        if (data && data.length > 0) {
          const mapped: Teacher[] = data.map(item => ({
            id: item.id,
            initials: item.initials,
            name: item.name,
            role: item.role,
            quote: item.quote,
            experienceYears: item.experience_years
          }));
          setTeachers(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch teachers from Supabase, using local fallback:', err);
      }
    };

    fetchTeachers();
  }, []);

  const getCardStyle = (idx: number) => {
    // Deterministic random-like values for a "scattered" pile look
    const styles = [
      { rotate: -4, x: -10, y: 10, bg: 'bg-[#FDF9F1] border-marigold/10' },
      { rotate: 6, x: 10, y: -20, bg: 'bg-[#FFF5F3] border-coral/10' },
      { rotate: -8, x: -5, y: -5, bg: 'bg-[#F2FAF6] border-meadow/10' },
      { rotate: 3, x: 20, y: 15, bg: 'bg-[#F4F6FB] border-twilight/10' },
      { rotate: -2, x: 0, y: -10, bg: 'bg-white border-black/5' },
    ];
    return styles[idx % styles.length];
  };

  return (
    <section id="teachers" className="py-24 md:py-48 bg-white scroll-mt-12 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 md:mb-32 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center space-x-4"
          >
            <div className="h-[1px] w-8 bg-coral/40"></div>
            <span className="text-coral font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
              Our Educators
            </span>
            <div className="h-[1px] w-8 bg-coral/40"></div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-ink text-editorial-hero font-bold tracking-tight leading-[1.05]"
          >
            Meet the hearts <br/>
            <span className="text-ink/30 italic font-serif font-normal block mt-2">behind our stars.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-ink/60 text-editorial-body max-w-xl mx-auto pt-4"
          >
            Not just instructors, but gentle facilitators of discovery. Grounded in child development psychology and active play methodology.
          </motion.p>
        </div>

        {/* Scattered Polaroid Pile */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 lg:gap-12 pb-24">
          {teachers.map((teacher, index) => {
            const styleInfo = getCardStyle(index);
            
            return (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 60, rotate: 0 }}
                whileInView={{ 
                  opacity: 1, 
                  y: styleInfo.y, 
                  x: styleInfo.x,
                  rotate: styleInfo.rotate 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  y: -10, // slightly lift up
                  zIndex: 50,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 20,
                  mass: 0.8
                }}
                className={`group relative flex flex-col w-[300px] md:w-[340px] bg-white p-6 md:p-8 rounded-2xl border-[3px] shadow-paper z-10 cursor-pointer ${styleInfo.bg}`}
              >
                {/* Pin tape / clip illusion */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/80 backdrop-blur-sm border border-black/5 rotate-2 shadow-sm z-20"></div>

                {/* Top Section: Avatar & Name */}
                <div className="flex items-center space-x-4 relative z-10 mb-8 border-b border-black/[0.04] pb-6">
                  <div className={`w-16 h-16 rounded-full border border-black/5 flex items-center justify-center font-display font-bold text-xl select-none bg-white shadow-sm text-ink group-hover:scale-110 transition-transform duration-500`}>
                    {teacher.initials}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-ink font-display font-bold text-xl tracking-tight leading-none group-hover:text-coral transition-colors duration-300">
                      {teacher.name}
                    </h3>
                    <p className="text-ink/40 font-mono text-[9px] uppercase tracking-widest font-bold">
                      {teacher.role}
                    </p>
                  </div>
                </div>

                {/* Middle Section: Quote */}
                <div className="relative z-10 flex-grow mb-8">
                  <span className="absolute -top-6 -left-2 text-ink/10 text-6xl font-serif leading-none select-none">"</span>
                  <p className="font-serif italic text-ink/70 text-lg leading-relaxed relative z-10 pl-2">
                    {teacher.quote}
                  </p>
                </div>

                {/* Bottom Section: Details */}
                <div className="mt-auto flex items-center justify-between relative z-10">
                  <span className="text-ink/30 font-mono text-[9px] uppercase tracking-widest font-bold">Experience</span>
                  <span className="text-ink font-sans text-sm font-medium bg-black/5 px-3 py-1 rounded-full">
                    {teacher.experienceYears}+ Yrs
                  </span>
                </div>
                
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
