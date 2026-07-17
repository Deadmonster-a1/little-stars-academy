import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_DATA, PROGRAMS_DATA } from '../data';
import { ChevronDown, HelpCircle, Star } from 'lucide-react';
import { HandDrawnStar } from './SVGIcons';

export const FeesAdmissions: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

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
    <section id="admissions" className="py-20 md:py-28 bg-cream-soft scroll-mt-12">
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
            Admissions & Fees
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-ink font-display font-bold tracking-tight"
            style={{ fontSize: 'clamp(26px, 3.6vw, 38px)' }}
          >
            Clear paths, straightforward terms
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-ink-soft font-sans text-sm sm:text-base leading-relaxed"
          >
            We hold transparency as a core trust building block. Explore our standard structural program terms, sequential steps, and core questions below.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Fee Structure Table (8-cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-soft shadow-[0_4px_24px_-6px_rgba(45,42,61,0.04)] overflow-hidden">
              <h3 className="text-ink font-display font-bold text-xl mb-6 flex items-center space-x-2">
                <span className="text-marigold"><Star size={20} fill="#FFB84D" /></span>
                <span>Annual Fee Structure</span>
              </h3>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-cream-soft text-[11px] font-mono tracking-wider text-ink-soft/60 uppercase">
                      <th className="pb-3 pr-4">Program</th>
                      <th className="pb-3 px-4">Ages</th>
                      <th className="pb-3 px-4">Timing</th>
                      <th className="pb-3 pl-4 text-right">Annual Term Fee</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-soft font-sans text-sm">
                    {PROGRAMS_DATA.map((prog) => (
                      <tr key={prog.id} className="hover:bg-cream-soft/20 transition-colors duration-150">
                        <td className="py-4 pr-4 font-display font-semibold text-ink">
                          {prog.name}
                        </td>
                        <td className="py-4 px-4 text-ink-soft font-medium">
                          {prog.ageRange}
                        </td>
                        <td className="py-4 px-4 text-ink-soft font-mono text-xs">
                          {prog.timing}
                        </td>
                        <td className="py-4 pl-4 text-right font-bold text-twilight font-mono">
                          ₹[{prog.annualFee.toLocaleString()}]
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Fee Notice footnote as specified */}
              <div className="mt-6 pt-4 border-t border-cream-soft">
                <p className="text-[12px] italic text-ink-soft/70 leading-relaxed">
                  * Note: The fee amounts listed above in bracketed ₹[amount] format are placeholder figures representing standard ranges. These can be adjusted by the academy administration during formal admission checks.
                </p>
                <div className="mt-4 flex items-center space-x-2 bg-marigold/10 p-3.5 rounded-xl border border-marigold/20 text-[12.5px] text-ink-soft">
                  <span className="text-marigold"><HandDrawnStar size={16} /></span>
                  <span className="font-sans leading-snug">
                    Fees cover Montessori materials, double-gated safety monitoring, and organic fruit snacks. Star Bus transportation is calculated separately.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Admission Steps (5-cols) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-ink font-display font-bold text-xl mb-2 flex items-center space-x-2">
              <span className="text-coral">✦</span>
              <span>Our Enrolment Steps</span>
            </h3>
            
            <div className="space-y-6">
              {steps.map((step) => (
                <div key={step.num} className="flex gap-4 group">
                  {/* Step Number in Plain Fredoka Marigold */}
                  <div className="shrink-0 font-display font-bold text-3xl sm:text-4xl text-marigold tracking-tight select-none">
                    {step.num}
                  </div>
                  <div className="space-y-1 pt-1.5">
                    <h4 className="text-ink font-display font-semibold text-base tracking-tight group-hover:text-twilight transition-colors duration-200">
                      {step.title}
                    </h4>
                    <p className="text-ink-soft font-sans text-xs sm:text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-4xl mx-auto pt-8">
          <div className="text-center mb-10 space-y-2">
            <h3 className="text-ink font-display font-bold text-2xl tracking-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-ink-soft font-sans text-xs sm:text-sm">
              Clear, practical answers about our curriculum, safety gates, and transport lines.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-cream-soft rounded-2xl shadow-sm overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left py-4.5 px-6 flex items-center justify-between gap-4 font-display font-medium text-sm sm:text-base text-ink hover:text-twilight focus:outline-none focus:bg-cream-soft/10 transition-colors duration-200"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <div className="flex items-center space-x-3">
                      <HelpCircle size={18} className="text-coral shrink-0" />
                      <span className="font-semibold tracking-tight">{faq.question}</span>
                    </div>

                    {/* Rotating Plus/Minus Icon */}
                    <div className={`w-6 h-6 rounded-full bg-cream-soft/60 flex items-center justify-center text-ink shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45 text-coral' : ''}`}>
                      <span className="text-lg font-bold select-none leading-none">+</span>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5 border-t border-cream-soft/40 text-xs sm:text-sm text-ink-soft leading-relaxed font-sans pt-3">
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
