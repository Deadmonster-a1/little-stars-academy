import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Star } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import { HandDrawnStar, MapIllustration } from './SVGIcons';
import { VisitInquiry } from '../types';

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFormSubmit = () => {
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

    // Success State Swap
    setIsSuccess(true);
  };

  return (
    <section id="book-visit" className="py-20 bg-cream scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main twilight container */}
        <div className="bg-twilight text-cream rounded-3xl overflow-hidden shadow-2xl border border-twilight-deep relative">
          
          {/* Subtle star elements inside card */}
          <div className="absolute top-8 right-12 text-marigold/10 pointer-events-none select-none">
            <HandDrawnStar size={80} />
          </div>
          <div className="absolute bottom-16 left-8 text-coral/10 pointer-events-none select-none">
            <HandDrawnStar size={60} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Contact details (5-cols) */}
            <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 bg-twilight-deep/60 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 relative z-10">
              <div className="space-y-6">
                <span className="text-marigold font-display font-semibold uppercase tracking-wider text-xs sm:text-sm bg-white/10 px-3 py-1 rounded-full">
                  Step Inside
                </span>
                <h3 className="text-cream font-display font-bold text-2xl sm:text-3xl leading-tight">
                  Book a visits to see the starry magic
                </h3>
                <p className="text-cream-soft font-sans text-xs sm:text-sm leading-relaxed">
                  We invite parents to witness the drop-off calm, physical sandbox play, and sensory oak circles. Complete the booking slip, and we will schedule your warm orientation.
                </p>

                {/* Info List */}
                <div className="space-y-4 pt-4">
                  
                  {/* Address */}
                  <div className="flex gap-3 text-xs sm:text-sm">
                    <MapPin size={18} className="text-marigold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-white">Academy Location</span>
                      <span className="text-cream-soft font-mono text-[12.5px] leading-relaxed block">
                        {CONTACT_INFO.address}
                      </span>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-3 text-xs sm:text-sm">
                    <Phone size={18} className="text-coral shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-white">Admissions Desk</span>
                      <span className="text-cream-soft font-mono text-[12.5px] block">
                        {CONTACT_INFO.phone}
                      </span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-3 text-xs sm:text-sm">
                    <Mail size={18} className="text-meadow shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-white">Digital Mailbox</span>
                      <span className="text-cream-soft font-mono text-[12.5px] block">
                        {CONTACT_INFO.email}
                      </span>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex gap-3 text-xs sm:text-sm">
                    <Clock size={18} className="text-marigold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block text-white">Visitor Hours</span>
                      <span className="text-cream-soft font-sans text-[12.5px] block">
                        {CONTACT_INFO.hours}
                      </span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Hand-drawn Map Illustration Embedded Directly */}
              <div className="mt-10 select-none border border-white/10 rounded-2xl overflow-hidden shadow-inner h-44">
                <MapIllustration />
              </div>
            </div>

            {/* Right Column: Controlled inquiry form (7-cols) */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative z-10">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="inquiry-form-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-1">
                      <h4 className="text-white font-display font-semibold text-lg tracking-tight">
                        Request a Free Visit Tour
                      </h4>
                      <p className="text-cream-soft font-sans text-xs">
                        Enter your contact details. Our team will coordinate your visit date.
                      </p>
                    </div>

                    {/* Div wrapped fields (no native form element as required) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      {/* Parent Name */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-cream-soft block">
                          Parent Full Name *
                        </label>
                        <input
                          type="text"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleInputChange}
                          placeholder="Aarav Mehta"
                          className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-sm text-white placeholder-cream-soft/30 focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all ${
                            errors.parentName ? 'border-coral ring-1 ring-coral' : 'border-white/10'
                          }`}
                        />
                        {errors.parentName && (
                          <span className="text-xs text-coral font-medium block">{errors.parentName}</span>
                        )}
                      </div>

                      {/* Phone */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-cream-soft block">
                          Phone Number *
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+91 98765 43210"
                          className={`w-full bg-white/5 border rounded-xl py-3 px-4 text-sm text-white placeholder-cream-soft/30 focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all ${
                            errors.phone ? 'border-coral ring-1 ring-coral' : 'border-white/10'
                          }`}
                        />
                        {errors.phone && (
                          <span className="text-xs text-coral font-medium block">{errors.phone}</span>
                        )}
                      </div>

                      {/* Child's Age Select */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-cream-soft block">
                          Child's Current Age
                        </label>
                        <select
                          name="childAge"
                          value={formData.childAge}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all"
                        >
                          <option value="" className="bg-twilight text-cream">Select age group</option>
                          <option value="2-3" className="bg-twilight text-cream">2 – 3 Years</option>
                          <option value="3-4" className="bg-twilight text-cream">3 – 4 Years</option>
                          <option value="4-5" className="bg-twilight text-cream">4 – 5 Years</option>
                          <option value="5-6" className="bg-twilight text-cream">5 – 6 Years</option>
                        </select>
                      </div>

                      {/* Preferred Program */}
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-cream-soft block">
                          Preferred Program
                        </label>
                        <select
                          name="preferredProgram"
                          value={formData.preferredProgram}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all"
                        >
                          <option value="" className="bg-twilight text-cream">Select milestone</option>
                          <option value="playgroup" className="bg-twilight text-cream">Playgroup (★)</option>
                          <option value="nursery" className="bg-twilight text-cream">Nursery (★★)</option>
                          <option value="lkg" className="bg-twilight text-cream">LKG (★★★)</option>
                          <option value="ukg" className="bg-twilight text-cream">UKG (★★★★)</option>
                        </select>
                      </div>

                      {/* Preferred Visit Day */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-cream-soft block">
                          Preferred Visit Date
                        </label>
                        <input
                          type="date"
                          name="visitDate"
                          value={formData.visitDate}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all"
                        />
                      </div>

                      {/* Optional message */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-cream-soft block">
                          Optional Message / Notes
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="Let us know if your little star has any specific needs or sensory goals..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm text-white placeholder-cream-soft/30 focus:outline-none focus:ring-2 focus:ring-marigold focus:border-transparent transition-all resize-none"
                        />
                      </div>

                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        onClick={handleFormSubmit}
                        className="w-full bg-marigold hover:bg-marigold-deep text-ink font-display font-semibold text-sm tracking-wide uppercase py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-[1.01] active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-marigold"
                      >
                        Request a Visit
                      </button>
                    </div>

                  </motion.div>
                ) : (
                  <motion.div
                    key="success-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="text-center py-10 px-4 space-y-6 flex flex-col items-center"
                  >
                    {/* Glowing success star illustration */}
                    <div className="w-20 h-20 rounded-full bg-marigold/15 flex items-center justify-center text-marigold animate-pulse-glow relative select-none">
                      <CheckCircle2 size={36} className="text-marigold" />
                      <div className="absolute top-0 right-0 text-marigold"><HandDrawnStar size={16} /></div>
                    </div>

                    <div className="space-y-2 max-w-md">
                      <h4 className="text-white font-display font-bold text-2xl tracking-tight">
                        Thank you, {formData.parentName}!
                      </h4>
                      <p className="text-cream-soft font-sans text-sm sm:text-base leading-relaxed">
                        Your visit inquiry slip has been registered in our cosmos system. An admissions counselor will reach out to you via <strong className="text-marigold font-mono">{formData.phone}</strong> within 12 hours to lock in your private tour.
                      </p>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setIsSuccess(false);
                          setFormData({
                            parentName: '',
                            phone: '',
                            childAge: '',
                            preferredProgram: '',
                            visitDate: '',
                            message: '',
                          });
                        }}
                        className="bg-white/10 hover:bg-white/15 text-white font-display font-medium text-xs tracking-wider uppercase px-6 py-2.5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-marigold"
                      >
                        Submit another inquiry
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
