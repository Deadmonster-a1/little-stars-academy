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
    <footer className="bg-ink text-cream pt-20 pb-12 relative z-20 overflow-hidden border-t-2 border-coral">
      
      {/* Background Star watermarks */}
      <div className="absolute top-10 left-10 text-white/[0.02] pointer-events-none">
        <HandDrawnStar size={120} />
      </div>
      <div className="absolute bottom-10 right-10 text-white/[0.02] pointer-events-none">
        <HandDrawnStar size={200} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-white/10">
          
          <div className="lg:col-span-4 space-y-6 text-left">
            <div className="flex items-center space-x-3">
              <span className="text-marigold text-3xl font-semibold select-none animate-pulse-glow">✦</span>
              <span className="text-white text-editorial-hero text-3xl tracking-tight leading-none">
                Little Stars<br/>Academy
              </span>
            </div>
            <p className="text-white/60 text-editorial-body text-sm max-w-sm">
              An offline early childhood learning haven nurturing stars ages 2–6 through tactile play, nature observation, and peer support.
            </p>
            {/* Social Anchors */}
            <div className="flex space-x-4 pt-2">
              <a
                href="#"
                aria-label="Visit Facebook"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-marigold hover:bg-white/10 hover:border-marigold/50 transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Visit Instagram"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-marigold hover:bg-white/10 hover:border-marigold/50 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:hello@littlestars.academy"
                aria-label="Write to us"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-marigold hover:bg-white/10 hover:border-marigold/50 transition-all duration-300"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick links (2-cols) */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-white font-mono text-[10px] uppercase tracking-[0.2em]">
              Quick Links
            </h4>
            <div className="flex flex-col space-y-4 text-sm font-sans">
              <a
                href="#why-us"
                onClick={(e) => handleLinkClick(e, '#why-us')}
                className="text-white/70 hover:text-marigold transition-colors"
              >
                Why Us
              </a>
              <a
                href="#programs"
                onClick={(e) => handleLinkClick(e, '#programs')}
                className="text-white/70 hover:text-marigold transition-colors"
              >
                Programs
              </a>
              <a
                href="#day-here"
                onClick={(e) => handleLinkClick(e, '#day-here')}
                className="text-white/70 hover:text-marigold transition-colors"
              >
                A Day Here
              </a>
              <a
                href="#teachers"
                onClick={(e) => handleLinkClick(e, '#teachers')}
                className="text-white/70 hover:text-marigold transition-colors"
              >
                Teachers
              </a>
              <a
                href="#admissions"
                onClick={(e) => handleLinkClick(e, '#admissions')}
                className="text-white/70 hover:text-marigold transition-colors"
              >
                Admissions
              </a>
            </div>
          </div>

          {/* Column 3: Contact Coordinates (3-cols) */}
          <div className="lg:col-span-3 space-y-6 text-left">
            <h4 className="text-white font-mono text-[10px] uppercase tracking-[0.2em]">
              Contact Us
            </h4>
            <div className="space-y-4 text-sm text-white/80 font-mono">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="text-marigold mt-0.5 shrink-0" />
                <span className="leading-relaxed">{CONTACT_INFO.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-coral shrink-0" />
                <span>{CONTACT_INFO.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-meadow shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Map Placeholder Box (3-cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-white font-mono text-[10px] uppercase tracking-[0.2em]">
              Academy Hub
            </h4>
            <div className="rounded-2xl overflow-hidden border border-white/10 h-32 bg-white/5 shadow-inner">
              <MapIllustration />
            </div>
            <span className="text-[10px] font-mono tracking-[0.1em] text-white/40 block text-center lg:text-left">
              ★ Serving playgroups in Green Fields zone
            </span>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/40 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Little Stars Academy. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <div>
            <button
              onClick={handleScrollToTop}
              className="flex items-center space-x-2 text-white/60 hover:text-marigold transition-colors focus:outline-none bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10"
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
