import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROGRAMS_DATA } from '../data';
import { HandDrawnStar } from './SVGIcons';
import { supabase } from '../lib/supabaseClient';
import { Program } from '../types';

type AgeFilter = 'all' | '2-3' | '3-4' | '4-5' | '5-6';

export const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>(PROGRAMS_DATA);
  const [activeFilter, setActiveFilter] = useState<AgeFilter>('all');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from('programs')
          .select('*');
        
        if (error) throw error;
        if (data && data.length > 0) {
          const mapped: Program[] = data.map(item => ({
            id: item.id,
            name: item.name,
            stars: item.stars,
            ageRange: item.age_range,
            highlights: item.highlights,
            timing: item.timing,
            annualFee: item.annual_fee
          }));
          setPrograms(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch programs from Supabase, using local fallback:', err);
      }
    };

    fetchPrograms();
  }, []);

  const filters: { label: string; value: AgeFilter }[] = [
    { label: 'All Programs', value: 'all' },
    { label: 'Ages 2 – 3', value: '2-3' },
    { label: 'Ages 3 – 4', value: '3-4' },
    { label: 'Ages 4 – 5', value: '4-5' },
    { label: 'Ages 5 – 6', value: '5-6' },
  ];

  const filteredPrograms = programs.filter((prog) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '2-3') return prog.id === 'playgroup';
    if (activeFilter === '3-4') return prog.id === 'nursery';
    if (activeFilter === '4-5') return prog.id === 'lkg';
    if (activeFilter === '5-6') return prog.id === 'ukg';
    return true;
  });

  const getBgClass = (index: number) => {
    const colors = [
      'bg-[#FDF9F1] border-marigold/10',
      'bg-[#FFF5F3] border-coral/10',
      'bg-[#F2FAF6] border-meadow/10',
      'bg-[#F4F6FB] border-twilight/10'
    ];
    return colors[index % colors.length];
  };

  const getTextColor = (index: number) => {
    const colors = ['text-marigold', 'text-coral', 'text-meadow', 'text-twilight'];
    return colors[index % colors.length];
  };

  return (
    <section id="programs" className="py-24 md:py-32 bg-white scroll-mt-12 relative z-10 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center space-x-4"
          >
            <div className="h-[1px] w-12 bg-coral/40"></div>
            <span className="text-coral font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
              Curriculum Architecture
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-ink text-editorial-hero font-bold tracking-tight leading-[1.05]"
          >
            Four milestones. <br/>
            <span className="text-ink/30 italic font-serif font-normal block mt-2">One continuous light.</span>
          </motion.h2>
        </div>

        {/* Minimalist Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-16">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs tracking-wide transition-colors duration-300 border ${
                activeFilter === filter.value
                  ? 'bg-ink border-ink text-cream'
                  : 'bg-transparent border-black/10 text-ink/60 hover:border-black/30 hover:text-ink'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Ultra-Wide Interactive Accordion Grid */}
        <div 
          className="flex flex-col lg:flex-row w-full h-[800px] lg:h-[650px] gap-4"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((prog, index) => {
              const isHovered = hoveredIndex === index;
              const isAnyHovered = hoveredIndex !== null;
              // If none hovered, they are equal. If one is hovered, it gets flex 3 or 4, rest get 1.
              const flexValue = isHovered ? 5 : (isAnyHovered ? 1 : 2);
              
              return (
                <motion.div
                  layout
                  key={prog.id}
                  onMouseEnter={() => setHoveredIndex(index)}
                  style={{ flex: flexValue }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className={`relative overflow-hidden rounded-[2.5rem] border-[3px] shadow-sm transition-shadow hover:shadow-paper ${getBgClass(index)} group`}
                >
                  <div className="absolute inset-0 w-full h-full flex flex-col p-8 lg:p-12">
                    
                    {/* Top Identity Block - Always visible but reorients */}
                    <div className="flex justify-between items-start z-10 relative">
                      <div className="inline-block bg-white text-ink font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-black/5 shadow-sm">
                        Ages {prog.ageRange}
                      </div>
                      <div className="flex items-center space-x-0.5">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <HandDrawnStar
                            key={i}
                            size={14}
                            filled={i < prog.stars}
                            className={i < prog.stars ? getTextColor(index) : 'text-black/10'}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Collapsed Title (Rotated on Desktop, Normal on Mobile) */}
                    <div className={`absolute left-0 bottom-8 lg:bottom-12 w-full px-8 lg:px-0 transition-opacity duration-500 z-10 ${isHovered ? 'opacity-0 pointer-events-none' : 'opacity-100'} ${!isAnyHovered ? 'lg:opacity-100' : 'lg:opacity-0'}`}>
                      {/* Desktop Rotated Text */}
                      <h3 className="hidden lg:block text-ink font-display font-bold text-3xl whitespace-nowrap origin-bottom-left -rotate-90 absolute left-12 bottom-0 pb-12 translate-y-full tracking-tight">
                        {prog.name}
                      </h3>
                      {/* Mobile Normal Text */}
                      <h3 className="lg:hidden text-ink font-display font-bold text-3xl tracking-tight">
                        {prog.name}
                      </h3>
                    </div>

                    {/* Expanded Content Details */}
                    <div className={`mt-auto transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-20 ${isHovered || (!isAnyHovered && window.innerWidth < 1024) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none lg:opacity-0'}`}>
                      <h3 className="text-ink font-display font-bold text-4xl lg:text-5xl tracking-tight mb-8">
                        {prog.name}
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Highlights */}
                        <div>
                          <p className="text-ink/40 font-mono text-[10px] uppercase tracking-widest mb-4 font-bold">Key Developmental Focus</p>
                          <ul className="space-y-3">
                            {prog.highlights.slice(0, 3).map((highlight, idx) => (
                              <li key={idx} className="flex items-start">
                                <span className={`mt-1 mr-3 shrink-0 ${getTextColor(index)}`}>
                                  <HandDrawnStar size={12} />
                                </span>
                                <span className="text-ink/80 font-sans text-sm md:text-base">
                                  {highlight}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Meta Info */}
                        <div className="space-y-4 md:border-l border-black/5 md:pl-8">
                          <div>
                            <span className="text-ink/40 font-mono text-[10px] uppercase tracking-widest block mb-1 font-bold">Timing</span>
                            <span className="text-ink font-medium font-sans text-sm">{prog.timing}</span>
                          </div>
                          <div>
                            <span className="text-ink/40 font-mono text-[10px] uppercase tracking-widest block mb-1 font-bold">Est. Value</span>
                            <span className="text-ink font-medium font-sans text-sm">₹{prog.annualFee.toLocaleString()}/yr</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Giant background abstract shape based on name length to give character */}
                    <div className={`absolute -right-20 -bottom-20 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none z-0 ${getBgClass(index).replace('bg-', 'bg-gradient-to-tr from-transparent to-')}`} />

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
