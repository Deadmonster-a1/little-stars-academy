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
                    <div className={`card-playful flex flex-col w-full min-h-[55vh] md:min-h-[500px] p-6 md:p-10 ${bgClass}`}>
                       {/* Top Identity Block */}
                       <div className="flex justify-between items-start mb-auto">
                         <div className="inline-block bg-white text-ink font-display font-bold text-sm tracking-wide px-5 py-2.5 rounded-full border-2 border-ink shadow-[2px_2px_0_#2C3E50]">
                           Ages {prog.ageRange}
                         </div>
                         <div className="flex items-center space-x-1.5 bg-white px-4 py-2.5 rounded-full border-2 border-ink shadow-[2px_2px_0_#2C3E50]">
                           {Array.from({ length: 4 }).map((_, i) => (
                             <HandDrawnStar
                               key={i}
                               size={20}
                               filled={i < prog.stars}
                               className={i < prog.stars ? textClass : 'text-black/10'}
                             />
                           ))}
                         </div>
                       </div>

                       {/* Middle Content */}
                       <div className="flex flex-col md:flex-row gap-8 mt-8 mb-auto">
                          <div className="md:w-1/2">
                             <h3 className="text-ink font-display font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1]">
                               {prog.name}
                             </h3>
                          </div>
                          <div className="md:w-1/2 flex flex-col justify-end pt-4 md:pt-0">
                             <ul className="space-y-5">
                               {prog.highlights.slice(0, 3).map((highlight, idx) => (
                                 <li key={idx} className="flex items-start">
                                   <span className={`mt-2.5 mr-5 shrink-0 w-2 h-2 rounded-full ${textClass.replace('text-', 'bg-')}`} />
                                   <span className="text-ink/80 font-sans text-base md:text-lg leading-relaxed">
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
