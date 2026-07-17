import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DAY_STOPS_DATA } from '../data';
import { HandDrawnStar } from './SVGIcons';
import { Sun, Sparkles, Clock, Compass, Coffee, Smile, BookOpen, LogOut } from 'lucide-react';

export const DayHere: React.FC = () => {
  const [activeStopId, setActiveStopId] = useState(DAY_STOPS_DATA[0].id);

  const activeStop = DAY_STOPS_DATA.find((stop) => stop.id === activeStopId) || DAY_STOPS_DATA[0];

  // Helper to map icons based on stop id
  const getStopIcon = (id: string, size = 32) => {
    switch (id) {
      case 'welcome':
        return <Sun size={size} className="text-marigold" />;
      case 'circle':
        return <Sparkles size={size} className="text-coral" />;
      case 'sensory':
        return <Compass size={size} className="text-meadow" />;
      case 'snack':
        return <Coffee size={size} className="text-marigold" />;
      case 'outdoor':
        return <Smile size={size} className="text-meadow" />;
      case 'creative':
        return <Sparkles size={size} className="text-coral" />;
      case 'story':
        return <BookOpen size={size} className="text-twilight" />;
      case 'dismissal':
        return <LogOut size={size} className="text-marigold" />;
      default:
        return <Clock size={size} className="text-marigold" />;
    }
  };

  return (
    <section id="day-here" className="py-20 md:py-28 bg-cream scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="text-coral font-display font-semibold uppercase tracking-wider text-xs sm:text-sm bg-coral/10 px-3 py-1 rounded-full"
          >
            The Cosmic Rhythm
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-ink font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(26px, 3.6vw, 38px)' }}
          >
            A day in our starry cosmos
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-ink-soft font-sans text-sm sm:text-base leading-relaxed"
          >
            From the soft morning drop-off under the starry arch to the high-five dismissals, we track a beautiful daily balance of sensory focus, creative expression, and outdoor exploration.
          </motion.p>
        </div>

        {/* Timeline Row Wrapper */}
        <div className="relative mb-14 bg-cream-soft rounded-3xl p-6 border border-marigold/10 shadow-sm">
          {/* Connecting dashed line - desktop only */}
          <div className="absolute top-[52px] left-[8%] right-[8%] h-0.5 border-t-2 border-dashed border-marigold/30 hidden md:block z-0" />

          {/* Swipe indicator for mobile */}
          <div className="block md:hidden text-center text-[10px] font-mono tracking-widest text-ink-soft/50 uppercase mb-4 animate-pulse select-none">
            ← Swipe to view complete timeline →
          </div>

          {/* Horizontal scroll container */}
          <div className="flex overflow-x-auto no-scrollbar pb-2 pt-4 px-2 md:px-6 flex-nowrap justify-between gap-6 md:gap-0 z-10 relative">
            {DAY_STOPS_DATA.map((stop, idx) => {
              const isActive = stop.id === activeStopId;
              return (
                <div
                  key={stop.id}
                  onClick={() => setActiveStopId(stop.id)}
                  className="flex flex-col items-center cursor-pointer min-w-[100px] shrink-0 text-center select-none group"
                >
                  {/* Time label */}
                  <span className={`text-[11px] font-mono font-bold tracking-wide transition-all duration-300 ${
                    isActive ? 'text-twilight text-xs' : 'text-ink-soft/60 group-hover:text-ink'
                  }`}>
                    {stop.time}
                  </span>

                  {/* Connecting Timeline Node */}
                  <div className="my-3 relative flex items-center justify-center">
                    {/* Pulsing ring behind active dot */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="active-timeline-ring"
                          className="absolute w-12 h-12 rounded-full bg-marigold/20"
                          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Timeline dot */}
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 z-10 ${
                      isActive
                        ? 'bg-marigold border-marigold text-twilight scale-110 shadow-md'
                        : 'bg-white border-marigold/30 text-ink-soft group-hover:border-marigold/60 group-hover:text-ink'
                    }`}>
                      {isActive ? (
                        <HandDrawnStar size={14} />
                      ) : (
                        <span className="text-xs font-bold">{idx + 1}</span>
                      )}
                    </div>
                  </div>

                  {/* Short description label */}
                  <span className={`text-[12px] font-display font-medium max-w-[110px] line-clamp-1 transition-all duration-300 ${
                    isActive ? 'text-twilight font-bold' : 'text-ink-soft/75 group-hover:text-ink'
                  }`}>
                    {stop.category}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Panel Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStop.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-white border border-cream-soft rounded-3xl p-6 md:p-10 shadow-[0_10px_30px_-5px_rgba(45,42,61,0.06)] flex flex-col md:flex-row gap-8 items-center"
            >
              {/* Left Column: Visual Icon Bubble */}
              <div className="shrink-0">
                <div className="w-24 h-24 rounded-2xl bg-cream-soft border border-marigold/20 flex items-center justify-center shadow-inner relative select-none">
                  {getStopIcon(activeStop.id, 42)}
                  <div className="absolute -top-2 -right-2 text-marigold animate-pulse-glow">
                    <HandDrawnStar size={14} />
                  </div>
                </div>
              </div>

              {/* Right Column: Descriptions */}
              <div className="space-y-4 flex-grow text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-cream-soft pb-4">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-widest font-mono font-bold text-coral">
                      {activeStop.category}
                    </span>
                    <h3 className="text-ink font-display font-bold text-2xl tracking-tight">
                      {activeStop.title}
                    </h3>
                  </div>
                  <div className="inline-flex items-center space-x-1.5 self-center md:self-start bg-twilight text-cream-soft px-4 py-1.5 rounded-full font-mono text-sm font-bold shadow-sm select-none">
                    <Clock size={14} className="text-marigold" />
                    <span>{activeStop.time}</span>
                  </div>
                </div>

                <p className="text-ink-soft font-sans text-sm sm:text-base leading-relaxed">
                  {activeStop.description}
                </p>

                {/* Caveat visual handwritten style touch note */}
                <p className="font-handwritten text-coral font-semibold text-lg md:text-xl pt-2">
                  ✦ A beautiful drop of child-led wonder in their daily routine.
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
