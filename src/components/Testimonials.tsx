import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS_DATA } from '../data';
import { HandDrawnStar } from './SVGIcons';
import { supabase } from '../lib/supabaseClient';
import { Testimonial } from '../types';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    // We only want to run this once testimonials are loaded/rendered
    if (!containerRef.current || !scrollWrapperRef.current) return;
    
    // Slight delay to ensure DOM is painted (especially useful if dynamically sized)
    const ctx = gsap.context(() => {
      const wrapper = scrollWrapperRef.current;
      
      if (wrapper) {
        // Calculate how far to translate the wrapper horizontally
        const xOffset = -(wrapper.scrollWidth - document.documentElement.clientWidth + 100);

        gsap.to(wrapper, {
          x: xOffset,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            start: "center center", // Pin when the container is in the center
            end: () => `+=${wrapper.scrollWidth - document.documentElement.clientWidth + 100}`, // Scroll duration exactly matches width of content
            invalidateOnRefresh: true
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [testimonials]);

  return (
    <section id="testimonials" ref={containerRef} className="py-24 md:py-32 bg-white relative z-10 overflow-hidden h-screen flex flex-col justify-center">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full shrink-0">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
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
              className="text-ink text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.05]"
            >
              Parent voices from <br/>
              <span className="text-marigold inline-block rotate-2 bg-marigold/10 px-6 py-2 rounded-3xl mt-4 border-4 border-marigold border-dashed">our community.</span>
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
        <div className="flex w-full pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-1400px)/2))] py-8">
          <div 
            ref={scrollWrapperRef}
            className="flex space-x-8 md:space-x-16 pr-32 w-max pb-16"
          >
            {testimonials.map((test, index) => {
              return (
                <div
                  key={test.id}
                  className="relative flex flex-col justify-between w-[85vw] md:w-[600px] lg:w-[800px] bg-white card-playful p-10 md:p-16 lg:p-20 group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                >
                  {/* Playful Wash on Hover */}
                  <div className="absolute inset-0 bg-marigold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Quote Icon */}
                  <div className="relative z-10 mb-10 lg:mb-14">
                    <div className="w-16 h-16 bg-coral rounded-full border-4 border-ink shadow-[4px_4px_0_#2C3E50] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">
                      <Quote size={28} className="text-white fill-current" />
                    </div>
                  </div>

                  {/* Massive Typography Quote */}
                  <div className="relative z-10 flex-grow mb-16 lg:mb-24">
                    <p className="font-display font-bold text-ink text-3xl md:text-4xl lg:text-5xl leading-tight tracking-tight transition-colors duration-500 group-hover:text-twilight-deep">
                      "{test.quote}"
                    </p>
                  </div>

                  {/* Footer Data */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-t-4 border-ink/10 pt-8 gap-4">
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

                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
