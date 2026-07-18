import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { PROGRAMS_DATA } from '../data';
import { HandDrawnStar } from './SVGIcons';
import { supabase } from '../lib/supabaseClient';
import { Program } from '../types';
import ScrollStack, { ScrollStackItem } from './ScrollStack/ScrollStack';

export const Programs: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>(PROGRAMS_DATA);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end bottom"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const { data, error } = await supabase
          .from('programs')
          .select('*')
          .order('id', { ascending: true });
        
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
          
          const order = ['playgroup', 'nursery', 'lkg', 'ukg'];
          mapped.sort((a, b) => order.indexOf(a.id) - order.indexOf(b.id));
          
          setPrograms(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch programs from Supabase, using local fallback:', err);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <section id="programs" className="bg-white scroll-mt-12 relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 py-24 md:py-32">
        
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-24 relative">
          
          {/* Left Side: Sticky Text */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 lg:self-start lg:h-fit z-20 pb-12 lg:pb-0">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-ink text-editorial-hero font-bold tracking-tight leading-[1.05] text-balance"
              >
                Four milestones. <br/>
                <span className="text-ink/40 italic font-serif font-normal block mt-2">One continuous light.</span>
              </motion.h2>

              {/* Progress Indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-12 relative h-48 md:h-64 w-3 ml-2"
              >
                {/* Background line */}
                <div className="absolute top-0 left-[4px] w-1 h-full bg-black/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 w-full bg-marigold shadow-[0_0_15px_rgba(255,184,0,0.8)]"
                    style={{ height: lineHeight }}
                  />
                </div>
                
                {/* Milestone Dots */}
                <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-between py-1">
                  {programs.map((prog, idx) => {
                    const stepProgress = (idx) / Math.max(1, programs.length - 1);
                    const isActive = useTransform(scrollYProgress, (v) => v >= stepProgress - 0.1);
                    
                    return (
                      <motion.div 
                        key={prog.id}
                        className="w-3 h-3 rounded-full bg-white border-2 border-black/10 transition-colors duration-300 z-10"
                        style={{
                          borderColor: useTransform(isActive, (active) => active ? '#FFB800' : 'rgba(0,0,0,0.1)'),
                          backgroundColor: useTransform(isActive, (active) => active ? '#FFB800' : '#ffffff')
                        }}
                      />
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Sticky Card Stacking Container */}
          <div ref={containerRef} className="w-full lg:w-2/3 relative pt-12 lg:pt-0 pb-[80vh]">
            <ScrollStack
              useWindowScroll={true}
              itemDistance={50}
              itemStackDistance={30}
              stackPosition="20%"
              scaleEndPosition="5%"
              baseScale={0.85}
              itemScale={0.03}
              blurAmount={0}
            >
              {programs.map((prog, index) => {
                const bgColors = ['bg-[#FDF9F1]', 'bg-[#FFF5F3]', 'bg-[#F2FAF6]', 'bg-[#F4F6FB]'];
                const textColors = ['text-marigold', 'text-coral', 'text-meadow', 'text-twilight'];
                const bgClass = bgColors[index % bgColors.length];
                const textClass = textColors[index % textColors.length];

                return (
                  <ScrollStackItem key={prog.id} itemClassName="w-full">
                    <div className={`flex flex-col w-full h-[65vh] md:h-[600px] rounded-[3rem] p-8 md:p-12 border border-black/5 ${bgClass}`}>
                       {/* Top Identity Block */}
                       <div className="flex justify-between items-start mb-auto">
                         <div className="inline-block bg-white text-ink font-mono text-xs uppercase tracking-[0.2em] px-5 py-2.5 rounded-full shadow-sm border border-black/5">
                           Ages {prog.ageRange}
                         </div>
                         <div className="flex items-center space-x-1.5 bg-white px-5 py-2.5 rounded-full shadow-sm border border-black/5">
                           {Array.from({ length: 4 }).map((_, i) => (
                             <HandDrawnStar
                               key={i}
                               size={16}
                               filled={i < prog.stars}
                               className={i < prog.stars ? textClass : 'text-black/10'}
                             />
                           ))}
                         </div>
                       </div>

                       {/* Middle Content */}
                       <div className="flex flex-col md:flex-row gap-12 mt-12 mb-auto">
                          <div className="md:w-1/2">
                             <h3 className="text-ink font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.9]">
                               {prog.name}
                             </h3>
                          </div>
                          <div className="md:w-1/2 flex flex-col justify-end pt-4 md:pt-0">
                             <ul className="space-y-5">
                               {prog.highlights.slice(0, 3).map((highlight, idx) => (
                                 <li key={idx} className="flex items-start">
                                   <span className={`mt-2.5 mr-5 shrink-0 w-2 h-2 rounded-full ${textClass.replace('text-', 'bg-')}`} />
                                   <span className="text-ink/80 font-sans text-lg md:text-xl leading-relaxed">
                                     {highlight}
                                   </span>
                                 </li>
                               ))}
                             </ul>
                          </div>
                       </div>

                       {/* Footer Meta */}
                       <div className="pt-8 border-t border-black/10 flex justify-between items-center mt-auto">
                          <div>
                             <span className="text-ink/40 font-mono text-[10px] uppercase tracking-widest block mb-2">Timing</span>
                             <span className="text-ink font-medium text-lg">{prog.timing}</span>
                          </div>
                          <div className="text-right">
                             <span className="text-ink/40 font-mono text-[10px] uppercase tracking-widest block mb-2">Value</span>
                             <span className="text-ink font-medium text-lg">₹{prog.annualFee.toLocaleString()}/yr</span>
                          </div>
                       </div>
                    </div>
                  </ScrollStackItem>
                );
              })}
            </ScrollStack>
          </div>

        </div>
      </div>
    </section>
  );
};
