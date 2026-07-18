import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TEACHERS_DATA } from '../data';
import { supabase } from '../lib/supabaseClient';
import { Teacher } from '../types';

const IMAGES = [
  "https://images.unsplash.com/photo-1544717302-de2939b7ef71?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590650153855-d9e808231d41?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531590878845-12627191e687?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
];

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

  return (
    <section id="teachers" className="py-24 md:py-48 bg-white relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24 relative">
          
          {/* Sticky Left Column */}
          <div className="lg:w-5/12 lg:sticky lg:top-48 z-10 pt-12">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-ink text-editorial-hero font-bold tracking-tight leading-[1.05]"
            >
              Meet the hearts <br/>
              <span className="text-ink/30 italic font-serif font-normal">behind our stars.</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-8 text-ink/60 font-sans text-xl leading-relaxed max-w-md text-balance"
            >
              Not just instructors, but gentle facilitators of discovery. Grounded in child development psychology and active play methodology.
            </motion.p>
          </div>

          {/* Scrolling Right Column (Gallery) */}
          <div className="lg:w-7/12 flex flex-col gap-16 lg:gap-32">
            {teachers.map((teacher, index) => {
              const bgImg = IMAGES[index % IMAGES.length];
              return (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col md:flex-row gap-8 lg:gap-12 items-center md:items-start"
                >
                  {/* High-end Image Reveal */}
                  <div className="w-full md:w-1/2 shrink-0 overflow-hidden rounded-[2rem] aspect-[4/5] bg-cream shadow-paper">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.1,1)] group-hover:scale-110 filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100"
                      style={{ backgroundImage: `url(${bgImg})` }}
                    />
                  </div>
                  
                  {/* Teacher Content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 pt-4 md:pt-12">
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-display font-bold text-ink tracking-tight mb-2 group-hover:text-coral transition-colors duration-500">
                        {teacher.name}
                      </h3>
                      <p className="text-marigold font-mono text-xs uppercase tracking-[0.2em] font-bold">
                        {teacher.role} • {teacher.experienceYears} Yrs
                      </p>
                    </div>
                    
                    <p className="font-serif italic text-ink/70 text-xl lg:text-2xl leading-relaxed">
                      "{teacher.quote}"
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
};
