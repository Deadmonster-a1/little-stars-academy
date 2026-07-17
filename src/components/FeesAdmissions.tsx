import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA, PROGRAMS_DATA } from '../data';
import { HelpCircle } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { FAQItem, Program } from '../types';

export const FeesAdmissions: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>(FAQ_DATA);
  const [programs, setPrograms] = useState<Program[]>(PROGRAMS_DATA);

  useEffect(() => {
    const fetchFaqsAndPrograms = async () => {
      try {
        const [faqsRes, progRes] = await Promise.all([
          supabase.from('faqs').select('*').order('display_order', { ascending: true }),
          supabase.from('programs').select('*')
        ]);

        if (faqsRes.error) throw faqsRes.error;
        if (progRes.error) throw progRes.error;

        if (faqsRes.data && faqsRes.data.length > 0) {
          setFaqs(faqsRes.data);
        }
        if (progRes.data && progRes.data.length > 0) {
          const mapped: Program[] = progRes.data.map(item => ({
            id: item.id,
            name: item.name,
            stars: item.stars,
            ageRange: item.age_range,
            highlights: item.highlights,
            timing: item.timing,
            annualFee: item.annual_fee
          }));
          setPrograms(mapped);
        }
      } catch (err) {
        console.error('Failed to fetch FAQs/programs from Supabase, using local fallback:', err);
      }
    };

    fetchFaqsAndPrograms();
  }, []);

  const toggleFaq = (id: string) => {
    if (openFaqId === id) {
      setOpenFaqId(null);
    } else {
      setOpenFaqId(id);
    }
  };

  const steps = [
    {
      num: '01',
      title: 'Book an Academy Tour',
      desc: 'Submit our simple inquiry form to arrange a private morning session to tour our garden spaces and playrooms.',
    },
    {
      num: '02',
      title: 'Warm Discovery Orientation',
      desc: 'Bring your little star along for a gentle 30-minute sensory play session to observe their curiosity in action.',
    },
    {
      num: '03',
      title: 'Milestone Dialogue',
      desc: 'Connect with our lead educator to review cognitive readiness, emotional goals, and customized settling-in paths.',
    },
    {
      num: '04',
      title: 'Secure Star Placement',
      desc: 'Lock in your preferred cohort slot by completing our offline enrolment packet and stoking their star spark.',
    },
  ];

  return (
    <section id="admissions" className="py-24 md:py-32 bg-[#FDFDFD] scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-24 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center space-x-4"
          >
            <div className="h-[1px] w-12 bg-coral/40"></div>
            <span className="text-coral font-mono text-xs uppercase tracking-[0.2em]">
              Admissions & Investment
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-ink text-editorial-hero font-bold tracking-tight leading-[1.05]"
          >
            Clear paths, <br/>
            <span className="text-ink/40 italic font-serif font-normal block mt-2">straightforward terms.</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-ink/70 text-editorial-body max-w-xl"
          >
            We hold transparency as a core trust building block. Explore our standard structural program terms and sequential steps below.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start mb-32">
          
          {/* Left Column: Typographic Fee Structure */}
          <div className="space-y-12">
            <h3 className="text-ink font-serif italic text-2xl lg:text-3xl mb-8">
              Annual Term Value
            </h3>
            
            <div className="space-y-0 border-t border-black/[0.04]">
              {programs.map((prog) => (
                <div key={prog.id} className="group py-8 border-b border-black/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-all duration-500 hover:bg-white hover:shadow-paper-hover rounded-3xl px-6 -mx-6">
                  <div>
                    <h4 className="text-ink font-display font-bold text-2xl tracking-tight mb-2 group-hover:text-coral transition-colors duration-300">
                      {prog.name}
                    </h4>
                    <div className="flex items-center space-x-3 text-ink/50 font-mono text-[10px] uppercase tracking-[0.2em]">
                      <span>{prog.ageRange} Years</span>
                      <span className="w-1 h-1 bg-ink/20 rounded-full"></span>
                      <span>{prog.timing}</span>
                    </div>
                  </div>
                  <div className="font-display font-bold text-3xl lg:text-4xl tracking-tight text-ink">
                    ₹{prog.annualFee.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Subtle Fee Notice */}
            <div className="pt-8">
              <p className="text-ink/40 font-serif italic text-sm leading-relaxed max-w-md">
                Fees cover Montessori materials, safety monitoring, and organic fruit snacks. Star Bus transportation is calculated separately upon formal admission check.
              </p>
            </div>
          </div>

          {/* Right Column: Winding Path Admissions Steps */}
          <div className="relative">
            <h3 className="text-ink font-serif italic text-2xl lg:text-3xl mb-12">
              The Journey Inward
            </h3>
            
            <div className="relative space-y-16 pl-6 sm:pl-10 border-l border-ink/10">
              {steps.map((step, index) => (
                <div key={step.num} className="relative group">
                  {/* Floating Number Node */}
                  <div className="absolute -left-[45px] sm:-left-[60px] top-0 w-12 h-12 bg-white border border-ink/10 rounded-full flex items-center justify-center font-serif text-lg text-ink shadow-[0_8px_16px_-6px_rgba(0,0,0,0.05)] group-hover:border-coral group-hover:text-coral transition-all duration-300 z-10">
                    {step.num}
                  </div>
                  
                  <div className="pt-2 pb-6">
                    <h4 className="text-ink font-display font-bold text-xl lg:text-2xl tracking-tight mb-3 group-hover:text-coral transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-ink/60 font-sans text-base leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section (Editorial Style) */}
        <div className="max-w-3xl mx-auto pt-16 border-t border-black/[0.04]">
          <div className="mb-16 text-center space-y-4">
            <h3 className="text-ink font-display font-bold text-4xl lg:text-5xl tracking-tight">
              Curious Minds Ask
            </h3>
            <p className="text-ink/60 font-serif italic text-lg">
              Clear, practical answers about our curriculum and safety.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="group border-b border-black/[0.04]"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left py-6 flex items-start justify-between gap-6 font-display font-semibold text-lg lg:text-xl text-ink hover:text-twilight focus:outline-none transition-colors duration-200"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span className="tracking-tight leading-snug">{faq.question}</span>

                    <div className="mt-1 shrink-0">
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="text-coral"
                      >
                        <span className="text-2xl font-serif leading-none">+</span>
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 text-base text-ink/60 leading-relaxed font-sans pr-12">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

