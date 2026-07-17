/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StickyNav } from './components/StickyNav';
import { Hero } from './components/Hero';
import { WhyUs } from './components/WhyUs';
import { Programs } from './components/Programs';
import { DayHere } from './components/DayHere';
import { LittleMoments } from './components/LittleMoments';
import { Teachers } from './components/Teachers';
import { Testimonials } from './components/Testimonials';
import { FeesAdmissions } from './components/FeesAdmissions';
import { BookVisit } from './components/BookVisit';
import { Footer } from './components/Footer';
import { FloatingElements } from './components/FloatingElements';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const scrollToInquiryForm = () => {
    const section = document.getElementById('book-visit');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-cream text-ink select-none selection:bg-marigold/30">
      <CustomCursor />
      {/* Sticky Navigation */}
      <StickyNav onBookVisitClick={scrollToInquiryForm} />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onBookVisitClick={scrollToInquiryForm} />

        {/* Why Little Stars Section */}
        <WhyUs />

        {/* Core Milestones Curriculum Section */}
        <Programs />

        {/* Interactive Day Timeline Section */}
        <DayHere />

        {/* Storybook Illustrated Vignettes Section */}
        <LittleMoments />

        {/* Teachers and Founders Section */}
        <Teachers />

        {/* Testimonials High Contrast Section */}
        <Testimonials />

        {/* Fees & Admissions Accordion Section */}
        <FeesAdmissions />

        {/* Contact slip Inquiry Form Section */}
        <BookVisit />
      </main>

      {/* Footer Area */}
      <Footer />

      {/* Floating Call CTA Widgets */}
   