import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Helmet } from 'react-helmet-async';
import { StickyNav } from '../components/StickyNav';
import { Global3DScene } from '../components/Global3DScene';
import { Hero } from '../components/Hero';
import { WhyUs } from '../components/WhyUs';
import { Programs } from '../components/Programs';
import { DayHere } from '../components/DayHere';
import { LittleMoments } from '../components/LittleMoments';
import { Teachers } from '../components/Teachers';
import { Testimonials } from '../components/Testimonials';
import { FeesAdmissions } from '../components/FeesAdmissions';
import { BookVisit } from '../components/BookVisit';
import { Footer } from '../components/Footer';
import { FloatingElements } from '../components/FloatingElements';
import { AnnouncementPopup } from '../components/AnnouncementPopup';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  const scrollToInquiryForm = () => {
    const section = document.getElementById('book-visit');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-cream text-ink selection:bg-marigold/30 relative">
      <Helmet>
        <title>Little Stars Academy | A Cosmic Sandbox for Early Childhood</title>
        <meta name="description" content="Experience our nurturing preschool environment firsthand. We believe early childhood is a cosmic sandbox. Explore our curriculum and book a free visit today." />
        <meta property="og:title" content="Little Stars Academy" />
        <meta property="og:description" content="A premium kindergarten and preschool focused on structured, play-first curriculum and warm guidance." />
      </Helmet>
      
      <AnnouncementPopup />
      
      {/* Sticky Navigation */}
      <StickyNav onBookVisitClick={scrollToInquiryForm} />
      
      {/* Global 3D Background Scene */}
      <Global3DScene />

      <main className="flex-grow w-full max-w-full">
        <Hero onBookVisitClick={scrollToInquiryForm} />
        <WhyUs />
        <Programs />
        <DayHere />
        <LittleMoments />
        <Teachers />
        <Testimonials />
        <FeesAdmissions />
        <BookVisit />
      </main>

      <Footer />
      <FloatingElements onBookVisitClick={scrollToInquiryForm} />
    </div>
  );
}
