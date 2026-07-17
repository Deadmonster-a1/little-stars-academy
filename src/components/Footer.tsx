import React from 'react';
import { CONTACT_INFO } from '../data';
import { HandDrawnStar, MapIllustration } from './SVGIcons';
import { Mail, Phone, MapPin, Instagram, Facebook, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-twilight-deep text-cream pt-16 pb-8 border-t border-white/5 relative overflow-hidden select-none">
      
      {/* Background Star watermarks */}
      <div className="absolute top-10 left-10 text-white/[0.02] pointer-events-none">
        <HandDrawnStar size={100} />
      </div>
      <div className="absolute bottom-10 right-10 text-white/[0.02] pointer-events-none">
        <HandDrawnStar size={140} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/5">
          
          {/* Column 1: Brand (4-cols) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center space-x-2">
              <span className="text-marigold text-2xl font-semibold select-none animate-pulse-glow">✦</span>
              <span className="font-display font-semibold text-lg tracking-tight text-white">
                Little Stars Academy
              </span>
            </div>
            <p className="text-cream-soft/70 font-sans text-xs sm:text-sm leading-relaxed max-w-sm">
              An offline early childhood learning haven nurturing stars ages 2–6 through tactile play, nature observation, and peer support.
            </p>
            {/* Social Anchors */}
            <div className="flex space-x-3 pt-2">
              <a
                href="#"
                aria-label="Visit Facebook"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-cream-soft hover:text-marigold hover:bg-white/10 transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                aria-label="Visit Instagram"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-cream-soft hover:text-marigold hover:bg-white/10 transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:hello@littlestars.academy"
                aria-label="Write to us"
                className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-cream-soft hover:text-marigold hover:bg-white/10 transition-colors"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links (2-cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs sm:text-sm">
              <a
                href="#why-us"
                onClick={(e) => handleLinkClick(e, '#why-us')}
                className="text-cream-soft/75 hover:text-marigold transition-colors"
              >
                Why Us
              </a>
              <a
                href="#programs"
                onClick={(e) => handleLinkClick(e, '#programs')}
                className="text-cream-soft/75 hover:text-marigold transition-colors"
              >
                Programs
              </a>
              <a
                href="#day-here"
                onClick={(e) => handleLinkClick(e, '#day-here')}
                className="text-cream-soft/75 hover:text-marigold transition-colors"
              >
                A Day Here
              </a>
              <a
                href="#teachers"
                onClick={(e) => handleLinkClick(e, '#teachers')}
                className="text-cream-soft/75 hover:text-marigold transition-colors"
              >
                Teachers
              </a>
              <a
                href="#admissions"
                onClick={(e) => handleLinkClick(e, '#admissions')}
                className="text-cream-soft/75 hover:text-marigold transition-colors"
              >
                Admissions
              </a>
            </div>
          </div>

          {/* Column 3: Contact Coordinates (3-cols) */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-cream-soft/85">
              <div className="flex items-start space-x-2.5">
                <MapPin size={16} className="text-marigold mt-0.5 shrink-0" />
                <span className="font-mono text-xs leading-relaxed">{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone size={15} className="text-coral shrink-0" />
                <span className="font-mono text-xs">{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail size={15} className="text-meadow shrink-0" />
                <span className="font-mono text-xs">{CONTACT_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Map Placeholder Box (3-cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider">
              Academy Hub
            </h4>
            <div className="rounded-xl overflow-hidden border border-white/10 h-28 bg-white/5 shadow-inner">
              <MapIllustration />
            </div>
            <span className="text-[10px] font-mono tracking-wide text-cream-soft/50 block text-center lg:text-left">
              ★ Serving playgroups in Green Fields zone
            </span>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-soft/50 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Little Stars Academy. All rights reserved.
          </div>
          <div>
            Website design by <span className="text-marigold font-bold">GRAVIT</span>
          </div>
          <div>
            <button
              onClick={handleScrollToTop}
              className="flex items-center space-x-1.5 hover:text-marigold transition-colors focus:outline-none"
              aria-label="Scroll back to top of page"
            >
              <span>Back to star sky</span>
              <ArrowUp size={12} className="text-marigold animate-bounce" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
