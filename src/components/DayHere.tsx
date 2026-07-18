import React from 'react';
import { Sparkles, Sun, Compass, Coffee, Smile, BookOpen, LogOut, Clock } from 'lucide-react';
import { HandDrawnStar } from './SVGIcons';

const DAY_SCHEDULE = [
  {
    time: "8:45 AM",
    title: "Warm Starry Welcomes",
    desc: "Children are received by their teachers at our double-gated twilight-blue arch. Cozy cubbies store their backpacks, transitioning gently from home to school.",
    icon: <Sun className="w-6 h-6" />,
    span: "md:col-span-2 md:row-span-1",
    bgImage: "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=1600&auto=format&fit=crop",
    color: "bg-[#FDF9F1]",
    textColor: "text-marigold"
  },
  {
    time: "9:15 AM",
    title: "Morning Circle & Songs",
    desc: "We gather on the soft sky-blue rug. A daily 'Star Captain' is chosen to track the weather dial and update our interactive felt solar-system calendar.",
    icon: <Sparkles className="w-6 h-6" />,
    span: "md:col-span-1 md:row-span-1",
    bgImage: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1600&auto=format&fit=crop",
    color: "bg-[#FFF5F3]",
    textColor: "text-coral"
  },
  {
    time: "9:45 AM",
    title: "Sensory Exploration",
    desc: "Tactile play takes over. From sorting colored beans, measuring warm water patterns, to building heavy pine-block towers to explore gravity and balance.",
    icon: <Compass className="w-6 h-6" />,
    span: "md:col-span-1 md:row-span-1",
    bgImage: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1600&auto=format&fit=crop",
    color: "bg-[#F2FAF6]",
    textColor: "text-meadow"
  },
  {
    time: "10:30 AM",
    title: "Healthy Snack & Table Talk",
    desc: "A community meal where we share fresh fruits, organic honey bread, and practice social manners like asking politely, pouring water, and thanking classmates.",
    icon: <Coffee className="w-6 h-6" />,
    span: "md:col-span-1 md:row-span-2",
    bgImage: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1600&auto=format&fit=crop",
    color: "bg-[#F4F6FB]",
    textColor: "text-twilight"
  },
  {
    time: "11:00 AM",
    title: "Wild Garden Play",
    desc: "Outdoor gross motor play. Children scale our wooden climbing dome, plant heirloom cherry tomatoes in the garden patches, and hunt for ladybugs under leaves.",
    icon: <Smile className="w-6 h-6" />,
    span: "md:col-span-2 md:row-span-1",
    bgImage: "https://images.unsplash.com/photo-1472162072942-cd5147eb39bd?q=80&w=1600&auto=format&fit=crop",
    color: "bg-[#FDF9F1]",
    textColor: "text-marigold"
  },
  {
    time: "11:45 AM",
    title: "Creative Art Studio",
    desc: "A quiet, deeply creative zone for finger-painting, beeswax clay sculpting, or making custom collages with organic pressed leaves collected during garden play.",
    icon: <Sparkles className="w-6 h-6" />,
    span: "md:col-span-1 md:row-span-1",
    bgImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=1600&auto=format&fit=crop",
    color: "bg-[#FFF5F3]",
    textColor: "text-coral"
  },
  {
    time: "12:15 PM",
    title: "Story circle & Puppetry",
    desc: "Lights are dimmed, and we sit under our constellation canopy. Teachers lead oral storytelling paired with handmade wool felt puppets to wind down.",
    icon: <BookOpen className="w-6 h-6" />,
    span: "md:col-span-1 md:row-span-1",
    bgImage: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1600&auto=format&fit=crop",
    color: "bg-[#F2FAF6]",
    textColor: "text-meadow"
  },
  {
    time: "12:30 PM",
    title: "Afternoon Dawn & Dismissal",
    desc: "Stow slippers, collect note-home envelopes, and transition back. We share a high-five and a warm hug, leaving energized for the next day.",
    icon: <LogOut className="w-6 h-6" />,
    span: "md:col-span-2 md:row-span-1",
    bgImage: "https://images.unsplash.com/photo-1503437313881-503a91226402?q=80&w=1600&auto=format&fit=crop",
    color: "bg-[#F4F6FB]",
    textColor: "text-twilight"
  }
];

export const DayHere: React.FC = () => {
  return (
    <section id="day-here" className="py-24 md:py-32 bg-white relative overflow-hidden">
      
      {/* Background Star watermarks */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 -left-20 text-ink/[0.02] rotate-12">
          <HandDrawnStar size={400} />
        </div>
        <div className="absolute bottom-20 -right-20 text-ink/[0.02] -rotate-12">
          <HandDrawnStar size={600} />
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Massive Editorial Header for the Bento Grid */}
        <div className="mb-20 max-w-5xl">
          <h2 className="text-ink text-editorial-hero font-bold tracking-tight leading-[1.05] text-balance">
            A day in our <br/>
            <span className="text-ink/40 italic font-serif font-normal block mt-2">starry cosmos</span>
          </h2>
        </div>

        {/* Gapless Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[400px] gap-6 grid-flow-dense">
          {DAY_SCHEDULE.map((stop, idx) => (
            <div 
              key={idx}
              className={`group relative overflow-hidden rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between border border-black/5 ${stop.span} ${stop.color}`}
            >
              {/* Background Image on Hover */}
              <div 
                className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out bg-cover bg-center mix-blend-luminosity scale-105 group-hover:scale-100"
                style={{ backgroundImage: `url(${stop.bgImage})` }}
              />
              {/* Dark Wash on Hover */}
              <div className="absolute inset-0 z-0 bg-ink/70 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out" />

              {/* Content (Z-10 to stay above background) */}
              <div className="relative z-10 flex justify-between items-start transition-transform duration-700 group-hover:-translate-y-2">
                <div className={`w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center transition-colors duration-700 group-hover:bg-transparent group-hover:text-white border border-black/5 group-hover:border-white/20 ${stop.textColor}`}>
                  {stop.icon}
                </div>
                <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-black/5 group-hover:bg-white/10 group-hover:border-white/20 transition-colors duration-700">
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink group-hover:text-white transition-colors duration-700">
                    {stop.time}
                  </span>
                </div>
              </div>

              <div className="relative z-10 transition-transform duration-700 group-hover:translate-y-2">
                <h3 className="text-ink font-display font-bold text-3xl lg:text-4xl tracking-tight leading-tight mb-4 group-hover:text-white transition-colors duration-700">
                  {stop.title}
                </h3>
                <p className="text-ink/70 font-sans text-lg leading-relaxed max-w-md group-hover:text-white/80 transition-colors duration-700">
                  {stop.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
