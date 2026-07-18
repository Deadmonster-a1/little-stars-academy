import React, { useState } from 'react';
import { StoryCircleIllustration, OutdoorIllustration, ArtIllustration, HandDrawnStar } from './SVGIcons';

const MOMENTS = [
  {
    id: '01',
    category: 'Literacy Core',
    title: 'Story circles and sensory canopy loops',
    desc: 'Under the reading oak, where stories come alive',
    color: 'bg-[#FDF9F1]', // Marigold tinted cream
    textColor: 'text-marigold',
    illustration: <StoryCircleIllustration className="w-full h-full text-twilight opacity-80" />
  },
  {
    id: '02',
    category: 'Bio Garden',
    title: 'Exploring ecosystems in cherry tomato fields',
    desc: 'Tiny hands exploring wormholes and wild tomato gardens',
    color: 'bg-[#F2FAF6]', // Meadow tinted cream
    textColor: 'text-meadow',
    illustration: <OutdoorIllustration className="w-full h-full text-twilight opacity-80" />
  },
  {
    id: '03',
    category: 'Creative Studio',
    title: 'Expressive finger-painting and pressed art projects',
    desc: 'Mini masterworks with fingerpaint and boundless wonder',
    color: 'bg-[#FFF5F3]', // Coral tinted cream
    textColor: 'text-coral',
    illustration: <ArtIllustration className="w-full h-full text-twilight opacity-80" />
  }
];

export const LittleMoments: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  return (
    <section id="moments" className="py-24 md:py-48 bg-white relative">
      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Cinematic Center Hero */}
        <div className="text-center max-w-5xl mx-auto mb-20 md:mb-32 flex flex-col items-center">
          <h2 className="text-ink text-editorial-hero font-bold tracking-tight leading-[1.05] text-balance mb-6">
            Little moments of <span className="italic font-serif font-normal text-ink/40">infinite wonder</span>
          </h2>
          <p className="text-ink/60 font-sans text-xl leading-relaxed max-w-2xl">
            Instead of sterile stock photography of staged children, we share these hand-illustrated storybook windows into our classroom rituals.
          </p>
        </div>

        {/* Horizontal Accordion Gallery */}
        <div 
          className="flex flex-col lg:flex-row w-full h-[800px] lg:h-[700px] gap-4"
          onMouseLeave={() => setHoveredIndex(0)}
        >
          {MOMENTS.map((moment, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={moment.id}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`relative overflow-hidden rounded-[2.5rem] transition-all duration-[800ms] ease-[cubic-bezier(0.25,1,0.1,1)] cursor-pointer flex flex-col justify-end p-6 md:p-10 border border-black/5 ${moment.color} ${isHovered ? 'lg:flex-[3] flex-[3]' : 'lg:flex-1 flex-[1]'}`}
              >
                
                {/* Illustration Container (Fades in slightly and scales when active) */}
                <div className={`absolute inset-0 pointer-events-none p-12 lg:p-24 flex items-center justify-center transition-all duration-1000 ease-out ${isHovered ? 'scale-100 opacity-100' : 'scale-95 opacity-50'}`}>
                  <div className="w-full h-full max-w-[500px] max-h-[500px]">
                    {moment.illustration}
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full">
                  <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 transition-opacity duration-500 delay-100 ${isHovered ? 'opacity-100' : 'opacity-0 lg:opacity-100 lg:scale-100'}`}>
                    
                    <div className="space-y-4">
                      {/* Meta Tag */}
                      <div className="flex items-center space-x-2 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
                        <HandDrawnStar size={12} className={moment.textColor} />
                        <span className="text-ink/50">NURTURED DISCOVERY INDEX · ✦ {moment.id}</span>
                      </div>
                      
                      {/* Only visible when hovered on desktop, always visible on mobile if flexed */}
                      <div className={`transition-all duration-700 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 hidden lg:block lg:opacity-0'}`}>
                        <h3 className="text-ink font-display font-bold text-3xl md:text-4xl tracking-tight leading-tight mb-2 max-w-lg">
                          {moment.title}
                        </h3>
                        <p className="text-ink/70 font-sans text-lg max-w-md">
                          {moment.desc}
                        </p>
                      </div>
                    </div>
                    
                    {/* Category Pill */}
                    <div className="shrink-0">
                      <div className={`inline-flex px-5 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-md font-mono text-xs font-bold uppercase tracking-widest ${moment.textColor}`}>
                        {moment.category}
                      </div>
                    </div>

                  </div>
                </div>

                {/* Desktop collapsed state title (Vertical text) */}
                {!isHovered && (
                  <div className="absolute inset-0 z-20 hidden lg:flex items-center justify-center pointer-events-none">
                    <span className="font-display font-bold text-3xl text-ink tracking-tight whitespace-nowrap -rotate-90 opacity-40 transition-opacity duration-300">
                      {moment.category}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Editorial Philosophy Quote */}
        <div className="mt-32 md:mt-48 text-center max-w-5xl mx-auto px-4">
          <h3 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl leading-[1.1] text-ink text-balance tracking-tight">
            "We believe childhood is a <span className="text-coral italic font-serif font-normal">sandbox</span>, not a race. Our stars find their glow because we let them explore without worksheets."
          </h3>
          <div className="mt-12 flex items-center justify-center gap-4 text-ink/50 font-mono text-sm tracking-[0.2em] uppercase font-semibold">
            <HandDrawnStar size={16} className="text-marigold" />
            <span>Little Stars Philosophy</span>
            <HandDrawnStar size={16} className="text-marigold" />
          </div>
        </div>

      </div>
    </section>
  );
};
