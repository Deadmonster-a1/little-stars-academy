import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Phone, Calendar, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../data';

interface FloatingElementsProps {
  onBookVisitClick: () => void;
}

export const FloatingElements: React.FC<FloatingElementsProps> = ({ onBookVisitClick }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileCta, setShowMobileCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Scroll to top button visibility threshold
      if (scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }

      // Mobile Sticky CTA bar visibility threshold
      if (scrollY > 600) {
        setShowMobileCta(true);
      } else {
        setShowMobileCta(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppClick = () => {
    // Standard secure WhatsApp redirection
    const message = encodeURIComponent("Hello Little Stars Academy! I would like to inquire about booking an academy tour.");
    window.open(`https://wa.me/919999999999?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleCallClick = () => {
    // Phone protocol trigger
    window.location.href = 'tel:+919999999999';
  };

  return (
    <>
      {/* Right Side Floating Widgets (WhatsApp & Scroll to top) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-3.5 select-none">
        {/* Scroll-to-top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              key="scroll-top-btn"
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.25 }}
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full bg-twilight text-cream shadow-lg hover:shadow-xl hover:bg-twilight-deep flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border border-white/5 focus:outline-none focus:ring-2 focus:ring-marigold"
              aria-label="Scroll back to top"
            >
              <ArrowUp size={18} className="animate-bounce" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* WhatsApp Click Widget */}
        <button
          onClick={handleWhatsAppClick}
          className="w-13 h-13 rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#25D366] group relative"
          aria-label="Chat on WhatsApp"
        >
          {/* Pulsing beacon behind WhatsApp button */}
          <span className="absolute inset-0 rounded-full bg-[#25D366]/40 animate-ping -z-10 group-hover:animate-none" />
          <MessageCircle size={24} fill="currentColor" className="text-white" />
        </button>
      </div>

      {/* Mobile Sticky CTA Bar (hidden on desktop) */}
      <AnimatePresence>
        {showMobileCta && (
          <motion.div
            key="mobile-sticky-cta"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-t border-cream-soft py-3 px-4 shadow-[0_-8px_30px_rgba(45,42,61,0.08)] flex items-center justify-between gap-3 md:hidden"
          >
            {/* Call Us Button */}
            <button
              onClick={handleCallClick}
              className="flex-1 bg-cream-soft hover:bg-cream-soft/80 text-ink font-display font-semibold text-xs tracking-wider uppercase py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 active:scale-95 border border-marigold/10"
              aria-label="Call Admissions desk"
            >
              <Phone size={14} className="text-coral shrink-0" />
              <span>Call Us</span>
            </button>

            {/* Book Visit Button */}
            <button
              onClick={onBookVisitClick}
              className="flex-1 bg-marigold hover:bg-marigold-deep text-ink font-display font-semibold text-xs tracking-wider uppercase py-3.5 px-4 rounded-xl flex items-center justify-center space-x-2 shadow-md transition-all duration-300 active:scale-95"
              aria-label="Book academy visit tour"
            >
              <Calendar size={14} className="text-ink shrink-0" />
              <span>Book Visit</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
