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
    <section id="teachers" className="py-24 md:py-48 bg-white relative z-10">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24 relative">
          
          {/* Sticky Left Column */}
          <div className="lg:w-5/12 lg:sticky lg:top-48 z-10 pt-12">
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-ink text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.05]"
            >
              Meet the hearts <br/>
              <span className="text-twilight inline-block -rotate-2 bg-twilight/10 px-6 py-2 rounded-3xl mt-4 border-4 border-twilight border-dashed">behind our stars.</span>
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
                  {/* Playful Polaroid Image Reveal */}
                  <div className="w-full md:w-1/2 shrink-0 overflow-hidden rounded-[2rem] aspect-[4/5] bg-cream card-playful">
                    <div 
                      className="w-full h-full bg-cover bg-center transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.1,1)] group-hover:scale-110"
                      style={{ backgroundImage: `url(${bgImg})` }}
                    />
                  </div>
                  
                  {/* Teacher Content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 pt-4 md:pt-12">
                    <div>
                      <h3 className="text-4xl lg:text-5xl font-display font-black text-ink tracking-tight mb-2 transition-colors duration-500">
                        {teacher.name}
                      </h3>
                      <p className="inline-block bg-marigold px-4 py-1.5 rounded-full border-2 border-ink shadow-[2px_2px_0_#2C3E50] font-display font-bold text-sm uppercase tracking-wider text-ink mt-2">
                        {teacher.role} • {teacher.experienceYears} Yrs
                      </p>
                    </div>
                    
                    <div className="bg-white p-6 rounded-[2rem] border-4 border-ink shadow-[4px_4px_0_#2C3E50] relative">
                      {/* Little decorative quote mark */}
                      <span className="absolute -top-6 -left-2 text-6xl text-twilight font-display animate-bounce">"</span>
                      <p className="font-sans font-bold text-ink/80 text-xl leading-relaxed relative z-10 pt-2">
                        {teacher.quote}
                      </p>
                    </div>
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
