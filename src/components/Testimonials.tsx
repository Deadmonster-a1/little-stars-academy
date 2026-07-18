import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TESTIMONIALS_DATA } from '../data';
import { HandDrawnStar } from './SVGIcons';
import { supabase } from '../lib/supabaseClient';
import { Testimonial } from '../types';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cinematic horizontal scroll based on vertical scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*');

        if (error) throw error;
        if (data && data.length > 0) {
          const mapped: Testimonial[] = data.map(item => ({
            id: item.id,
            quote: item.content,
            parentName: item.parent_name,
            programName: item.role_desc,
            rating: item.rating
          }));
          setTestimonials(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch testimonials from Supabase, using local fallback:', err);
      }
    };

    fetchTestimonials();
  }, []);



  return (
    <section id="testimonials" ref={containerRef} className="py-32 md:py-48 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 md:mb-32">
          <div className="max-w-2xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center space-x-4"
            >
              <div className="h-[1px] w-12 bg-coral/40"></div>
              <span className="text-coral font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                Heartfelt Echoes
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-ink text-editorial-hero font-bold tracking-tight leading-[1.05]"
            >
              Parent voices from <br/>
              <span className="text-ink/30 italic font-serif font-normal block mt-2">our community.</span>
            </motion.h2>
          </div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: '-100px' }}
             transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
             className="hidden md:flex items-center space-x-2 text-ink/40 font-mono text-[10px] uppercase tracking-widest font-bold"
          >
             <span>Scroll to explore</span>
             <span>→</span>
          </motion.div>
        </div>
      </div>

      {/* Massive Typographic Overlapping Carousel */}
      <div className="relative w-full">
        {/* Horizontal wrapping container */}
        <div className="flex w-full overflow-hidden">
          <motion.div 
            style={{ x }}
            className="flex space-x-8 md:space-x-16 px-4 md:px-12 w-max pb-16"
          >
            {testimonials.map((test, index) => {
              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 200, damping: 30 }}
                  className="relative flex flex-col justify-between w-[85vw] md:w-[600px] lg:w-[800px] bg-white border border-black/10 p-10 md:p-16 lg:p-20 overflow-hidden group cursor-pointer transition-colors duration-500"
                >
                  <div className="absolute inset-0 bg-ink/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Quote Icon */}
                  <div className="relative z-10 mb-12 lg:mb-16">
                    <div className="w-16 h-16 bg-ink flex items-center justify-center transition-colors duration-500 group-hover:bg-coral">
                      <Quote size={24} className="text-white fill-current" />
                    </div>
                  </div>

                  {/* Massive Typography Quote */}
                  <div className="relative z-10 flex-grow mb-16 lg:mb-24">
                    <p className="font-serif italic text-ink text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight">
                      "{test.quote}"
                    </p>
                  </div>

                  {/* Footer Data */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-t border-black/10 pt-8 gap-4">
                    <div className="space-y-1">
                      <h4 className="font-display font-bold text-xl md:text-2xl tracking-tight text-ink">
                        {test.parentName}
                      </h4>
                      <span className="font-mono text-[10px] font-bold tracking-widest text-ink/40 uppercase block">
                        {test.programName}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-1 bg-white border border-black/10 px-4 py-2 rounded-full shadow-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <HandDrawnStar key={i} size={14} className={i < test.rating ? 'text-marigold' : 'text-black/10'} />
                      ))}
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
