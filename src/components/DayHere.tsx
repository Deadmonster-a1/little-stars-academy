import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { DAY_STOPS_DATA } from '../data';
import { HandDrawnStar } from './SVGIcons';
import { Sun, Sparkles, Compass, Coffee, Smile, BookOpen, LogOut, Clock } from 'lucide-react';

const getStopIcon = (id: string, size = 32) => {
  switch (id) {
    case 'welcome': return <Sun size={size} className="text-marigold" />;
    case 'circle': return <Sparkles size={size} className="text-coral" />;
    case 'sensory': return <Compass size={size} className="text-meadow" />;
    case 'snack': return <Coffee size={size} className="text-marigold" />;
    case 'outdoor': return <Smile size={size} className="text-meadow" />;
    case 'creative': return <Sparkles size={size} className="text-coral" />;
    case 'story': return <BookOpen size={size} className="text-twilight" />;
    case 'dismissal': return <LogOut size={size} className="text-marigold" />;
    default: return <Clock size={size} className="text-marigold" />;
  }
};

const TimelineItem = ({ stop, index, total }: { stop: typeof DAY_STOPS_DATA[0], index: number, total: number }) => {
  return (
    <motion.div 
      initial={{ opacity: 0.2, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ margin: '-40% 0px -40% 0px' }} // Only fully visible when centered vertically
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-[70vh] flex flex-col justify-center relative py-12"
    >
      {/* Visual connecting line */}
      {index !== total - 1 && (
        <div className="absolute top-[50%] bottom-[-50%] left-6 w-[2px] bg-gradient-to-b from-black/10 to-transparent -z-10" />
      )}

      <div className="flex items-start space-x-8">
        <div className="w-12 h-12 shrink-0 rounded-full bg-white border-2 border-cream shadow-sm flex items-center justify-center relative z-10 mt-2">
          {getStopIcon(stop.id, 20)}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-ink/40 font-mono text-sm tracking-widest">{stop.time}</span>
            <span className="text-coral font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 bg-coral/5 rounded-full">
              {stop.category}
            </span>
          </div>
          
          <h3 className="text-ink font-display font-bold text-4xl lg:text-5xl tracking-tight leading-[1.1]">
            {stop.title}
          </h3>
          
          <p className="text-ink/60 font-sans text-xl lg:text-2xl leading-relaxed max-w-xl">
            {stop.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const DayHere: React.FC = () => {
  const containerRef = useRef(null);
  
  return (
    <section id="day-here" ref={containerRef} className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      
      {/* Background Star watermarks */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-40 -left-20 text-ink/[0.02] rotate-12">
          <HandDrawnStar size={400} />
        </div>
        <div className="absolute bottom-40 -right-20 text-ink/[0.02] -rotate-12">
          <HandDrawnStar size={600} />
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          
          {/* Left: Sticky Cinematic Header */}
          <div className="lg:w-1/3 lg:relative">
            <div className="lg:sticky lg:top-32 space-y-6 pt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center space-x-4"
              >
                <div className="h-[1px] w-12 bg-coral/40"></div>
                <span className="text-coral font-mono text-[10px] uppercase tracking-[0.2em] font-bold">
                  The Cosmic Rhythm
                </span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="text-ink text-editorial-hero font-bold tracking-tight leading-[1.05]"
              >
                A day in our <br/>
                <span className="text-ink/40 italic font-serif font-normal block mt-2">starry cosmos</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="text-ink/60 text-editorial-body pt-6"
              >
                Scroll to explore the gentle, balanced flow of discovery, connection, and joy.
              </motion.p>
            </div>
          </div>

          {/* Right: Scrolling Timeline */}
          <div className="lg:w-2/3">
            <div className="flex flex-col">
              {DAY_STOPS_DATA.map((stop, idx) => (
                <TimelineItem 
                  key={stop.id} 
                  stop={stop} 
                  index={idx} 
                  total={DAY_STOPS_DATA.length} 
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
