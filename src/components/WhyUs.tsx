import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WHY_US_DATA } from '../data';
import { SafetyStarBurst, PlayGrowthPath, SmallGroupsCircles, UpdatesEnvelope } from './SVGIcons';

gsap.registerPlugin(ScrollTrigger);

export const WhyUs: React.FC = () => {
  const container = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const renderIcon = (id: string) => {
    switch (id) {
      case 'safety':
        return <SafetyStarBurst className="w-16 h-16 md:w-24 md:h-24" />;
      case 'play':
        return <PlayGrowthPath className="w-16 h-16 md:w-24 md:h-24" />;
      case 'size':
        return <SmallGroupsCircles className="w-16 h-16 md:w-24 md:h-24" />;
      case 'updates':
        return <UpdatesEnvelope className="w-16 h-16 md:w-24 md:h-24" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hover Physics via GSAP
      const cards = gsap.utils.toArray<HTMLElement>('.bento-card');
      
      cards.forEach((card) => {
        const bg = card.querySelector('.bento-bg');
        const content = card.querySelector('.bento-content');
        
        card.addEventListener('mouseenter', () => {
          gsap.to(bg, { scale: 1.05, duration: 0.7, ease: 'power2.out' });
          gsap.to(content, { y: -5, duration: 0.7, ease: 'power2.out' });
        });
        
        card.addEventListener('mouseleave', () => {
          gsap.to(bg, { scale: 1, duration: 0.7, ease: 'power2.out' });
          gsap.to(content, { y: 0, duration: 0.7, ease: 'power2.out' });
        });
      });
      
      // Scroll animation
      gsap.fromTo(cards, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          }
        }
      );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section id="why-us" ref={container} className="py-32 md:py-48 bg-white relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header - Massive AIDA Spacing */}
        <div className="max-w-4xl mb-24 md:mb-32">
          <h2 className="text-ink text-editorial-hero font-bold tracking-tight leading-[1.05] text-balance">
            Why parents trust <br/>
            <span className="text-ink/40 italic font-serif font-normal block mt-2">our starry world.</span>
          </h2>
          <p className="text-ink/70 font-sans text-xl md:text-2xl leading-relaxed mt-10 max-w-2xl text-balance">
            We don’t believe in dry, conveyor-belt teaching. Every corner of our academy is optimized for emotional grounding, safety, and immersive discovery.
          </p>
        </div>

        {/* Gapless Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[400px] grid-flow-dense gap-0 border-4 border-white shadow-2xl rounded-[3rem] overflow-hidden bg-white">
          
          {WHY_US_DATA.map((card, index) => {
            // Calculate spans to make a dense grid
            // 4 items: Let's do:
            // 1st item: col-span-2 row-span-1
            // 2nd item: col-span-1 row-span-2
            // 3rd item: col-span-1 row-span-1
            // 4th item: col-span-1 row-span-1
            let spanClasses = 'col-span-1 row-span-1';
            let bgClass = 'bg-[#FDF9F1]';
            let textClass = 'text-marigold';

            if (index === 0) {
              spanClasses = 'md:col-span-2 md:row-span-1';
              bgClass = 'bg-[#FDF9F1] text-marigold';
            } else if (index === 1) {
              spanClasses = 'md:col-span-1 md:row-span-2';
              bgClass = 'bg-[#FFF5F3] text-coral';
            } else if (index === 2) {
              spanClasses = 'md:col-span-1 md:row-span-1';
              bgClass = 'bg-[#F2FAF6] text-meadow';
            } else if (index === 3) {
              spanClasses = 'md:col-span-1 md:row-span-1';
              bgClass = 'bg-[#F4F6FB] text-twilight';
            }
            
            return (
              <div 
                key={card.id} 
                className={`bento-card relative overflow-hidden group border border-white/50 p-10 flex flex-col justify-between ${spanClasses}`}
              >
                {/* Background that scales on hover */}
                <div className={`bento-bg absolute inset-0 ${bgClass} opacity-50 z-0`}></div>
                
                {/* Content */}
                <div className="bento-content relative z-10 flex flex-col h-full justify-between">
                  <div className={`transform scale-125 origin-top-left drop-shadow-sm opacity-80 mix-blend-multiply ${bgClass.split(' ')[1]}`}>
                    {renderIcon(card.id)}
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="text-ink font-display font-bold text-3xl md:text-4xl tracking-tight mb-4">
                      {card.title}
                    </h3>
                    <p className="text-ink/80 font-sans text-lg md:text-xl leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
