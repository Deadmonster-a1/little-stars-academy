import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { HandDrawnStar } from './SVGIcons';
import { VisitInquiry } from '../types';
import { supabase } from '../lib/supabaseClient';

export const BookVisit: React.FC = () => {
  const [formData, setFormData] = useState<VisitInquiry>({
    parentName: '',
    phone: '',
    childAge: '',
    preferredProgram: '',
    visitDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ parentName?: string; phone?: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = async () => {
    const tempErrors: typeof errors = {};
    if (!formData.parentName.trim()) {
      tempErrors.parentName = 'Parent Name is required';
    }
    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone Number is required';
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { error } = await supabase
        .from('visit_inquiries')
        .insert([
          {
            parent_name: formData.parentName,
            phone: formData.phone,
            child_age: formData.childAge || null,
            preferred_program: formData.preferredProgram || null,
            visit_date: formData.visitDate || null,
            message: formData.message || null,
          },
        ]);

      if (error) throw error;
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error submitting visit inquiry:', err);
      setSubmitError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-visit" className="relative bg-twilight-deep text-cream scroll-mt-12 overflow-hidden flex flex-col">
      
      {/* Contact Info Strip */}
      <div className="w-full border-b border-cream/10 py-8 px-4 sm:px-8">
        <div className="max-w-[1400px] mx-auto flex flex-wrap gap-8 justify-between items-center text-sm font-mono tracking-widest uppercase">
           <div className="flex items-center space-x-3 text-cream/70 hover:text-cream transition-colors">
              <MapPin size={16} className="text-marigold" />
              <span>{CONTACT_INFO.address}</span>
           </div>
           <div className="flex items-center space-x-3 text-cream/70 hover:text-cream transition-colors">
              <Clock size={16} className="text-coral" />
              <span>{CONTACT_INFO.hours}</span>
           </div>
           <div className="flex items-center space-x-3 text-cream/70 hover:text-cream transition-colors">
              <Phone size={16} className="text-meadow" />
              <span>{CONTACT_INFO.phone}</span>
           </div>
        </div>
      </div>

      {/* Professional Corporate/Academy Link Area */}
      <div className="flex-grow flex flex-col justify-center items-center py-24 md:py-32 relative z-10 px-4">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center w-full max-w-4xl mx-auto"
        >
          {/* Professional Eyebrow Label */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="h-[1px] w-12 bg-marigold/40"></div>
            <span className="text-marigold font-mono text-sm uppercase tracking-widest font-bold">
              The Next Step
            </span>
            <div className="h-[1px] w-12 bg-marigold/40"></div>
          </div>

          <h2 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.15] tracking-tight text-white mb-8">
            Begin your child's <br className="hidden md:block" />
            <span className="italic font-serif font-light text-cream/80">journey with us.</span>
          </h2>
          
          <p className="text-cream/60 font-sans text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Experience our nurturing environment firsthand. We invite you to schedule a visit, explore our classrooms, and meet the educators who make our academy special.
          </p>

          <button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="group inline-flex items-center justify-center gap-4 bg-marigold hover:bg-white text-twilight-deep font-sans font-bold text-lg tracking-wide px-12 py-5 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 focus:outline-none"
          >
            Request A Tour
            <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>

      {/* Expandable Form Section */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-white text-ink w-full"
          >
            <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="inquiry-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-12"
                  >
                    <div className="text-center space-y-4">
                      <h4 className="text-ink font-display font-bold text-4xl tracking-tight">
                        Fill out your details
                      </h4>
                      <p className="text-ink/60 font-sans">
                        Our admissions team will reach out within 12 hours.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      {/* Parent Name */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono font-bold uppercase tracking-widest text-ink/40">
                          Parent Name *
                        </label>
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b-2 border-black/10 py-3 px-0 text-xl text-ink focus:outline-none focus:border-marigold transition-colors rounded-none placeholder-black/20"
                          placeholder="Your full name"
                        />
                        {errors.parentName && <span className="text-xs text-coral font-medium block">{errors.parentName}</span>}
                      </div>

                      {/* Phone */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono font-bold uppercase tracking-widest text-ink/40">
                          Phone Number *
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b-2 border-black/10 py-3 px-0 text-xl text-ink focus:outline-none focus:border-marigold transition-colors rounded-none placeholder-black/20"
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && <span className="text-xs text-coral font-medium block">{errors.phone}</span>}
                      </div>

                      {/* Child Age */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono font-bold uppercase tracking-widest text-ink/40">
                          Child's Age
                        </label>
                        <select
                          name="childAge"
                          value={formData.childAge}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b-2 border-black/10 py-3 px-0 text-xl text-ink focus:outline-none focus:border-marigold transition-colors rounded-none appearance-none"
                        >
                          <option value="">Select age</option>
                          <option value="2-3">2 – 3 Years</option>
                          <option value="3-4">3 – 4 Years</option>
                          <option value="4-5">4 – 5 Years</option>
                          <option value="5-6">5 – 6 Years</option>
                        </select>
                      </div>

                      {/* Program */}
                      <div className="space-y-3">
                        <label className="text-xs font-mono font-bold uppercase tracking-widest text-ink/40">
                          Preferred Program
                        </label>
                        <select
                          name="preferredProgram"
                          value={formData.preferredProgram}
                          onChange={handleInputChange}
                          className="w-full bg-transparent border-b-2 border-black/10 py-3 px-0 text-xl text-ink focus:outline-none focus:border-marigold transition-colors rounded-none appearance-none"
                        >
                          <option value="">Select program</option>
                          <option value="playgroup">Playgroup</option>
                          <option value="nursery">Nursery</option>
                          <option value="lkg">LKG</option>
                          <option value="ukg">UKG</option>
                        </select>
                      </div>
                      
                      <div className="space-y-3 md:col-span-2">
                         <label className="text-xs font-mono font-bold uppercase tracking-widest text-ink/40">
                           Optional Notes
                         </label>
                         <textarea
                           name="message"
                           value={formData.message}
                           onChange={handleInputChange}
                           rows={1}
                           className="w-full bg-transparent border-b-2 border-black/10 py-3 px-0 text-xl text-ink focus:outline-none focus:border-marigold transition-colors rounded-none resize-none placeholder-black/20"
                           placeholder="Any specific needs or sensory goals..."
                         />
                      </div>
                    </div>

                    <div className="pt-12 text-center">
                      <button
                        onClick={handleFormSubmit}
                        disabled={isSubmitting}
                        className="bg-twilight-deep hover:bg-ink text-white font-display font-semibold text-xl tracking-tight px-12 py-5 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:hover:translate-y-0 flex items-center justify-center gap-3 mx-auto"
                      >
                        {isSubmitting ? 'Sending Request...' : 'Submit Request'}
                        {!isSubmitting && <ArrowRight size={24} />}
                      </button>
                      {submitError && (
                        <p className="text-sm text-coral font-medium mt-4">{submitError}</p>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-32 h-32 mx-auto rounded-full bg-[#FFF5F3] flex items-center justify-center text-coral relative mb-12">
                      <CheckCircle2 size={64} className="text-coral" />
                      <div className="absolute -top-4 -right-4 text-marigold"><HandDrawnStar size={40} /></div>
                    </div>
                    <h4 className="text-ink font-display font-bold text-5xl tracking-tight mb-6">
                      Thank you, {formData.parentName}!
                    </h4>
                    <p className="text-ink/60 font-sans text-xl max-w-lg mx-auto">
                      An admissions counselor will reach out to you via <strong className="text-ink">{formData.phone}</strong> within 12 hours.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
