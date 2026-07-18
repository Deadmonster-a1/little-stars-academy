import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Bell } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface Announcement {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  created_at: string;
}

export const AnnouncementPopup: React.FC = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const { data, error } = await supabase
          .from('announcements')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching announcement:', error);
          return;
        }

        if (data) {
          // Check if user already dismissed this specific announcement
          const dismissedIds = JSON.parse(localStorage.getItem('dismissedAnnouncements') || '[]');
          if (!dismissedIds.includes(data.id)) {
            setAnnouncement(data);
            setIsVisible(true);
          }
        }
      } catch (err) {
        console.error('Failed to load announcements', err);
      }
    };

    fetchAnnouncement();
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    if (announcement) {
      const dismissedIds = JSON.parse(localStorage.getItem('dismissedAnnouncements') || '[]');
      localStorage.setItem('dismissedAnnouncements', JSON.stringify([...dismissedIds, announcement.id]));
    }
  };

  return (
    <AnimatePresence>
      {isVisible && announcement && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 1 }}
          className="fixed bottom-6 right-6 z-[100] max-w-sm w-full bg-white rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-marigold to-coral"></div>
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 text-coral">
                <div className="p-2 bg-coral/10 rounded-full">
                  <Bell size={20} />
                </div>
                <h3 className="font-display font-semibold text-lg text-ink">
                  {announcement.title}
                </h3>
              </div>
              <button
                onClick={handleDismiss}
                className="text-ink/40 hover:text-ink/80 transition-colors p-1"
                aria-label="Close announcement"
              >
                <X size={18} />
              </button>
            </div>
            <p className="mt-3 text-ink/70 font-sans text-sm leading-relaxed">
              {announcement.content}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
