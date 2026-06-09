'use client';

import Header from './Header';
import Footer from './Footer';
import GridlineOverlay from './GridlineOverlay';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './ProjectsSection';
import AboutSection from './sections/AboutSection';
import EducationSection from './sections/EducationSection';

export default function Portfolio() {
  return (
    <div className="bg-paper text-charcoal min-h-screen relative">
      {/* Persistent vertical gridlines behind everything */}
      <GridlineOverlay />

      <Header />

      {/*
        Outer frame: a single centered column bounded by hairline borders
        on both sides — this is the "editorial grid frame" that ties all
        sections together visually.
      */}
      <div className="relative z-10 max-w-page mx-auto border-l border-r border-charcoal min-h-screen">
        <main className="pt-12 md:pt-14">
          <HeroSection />
          <ProjectsSection />
          <AboutSection />
          <EducationSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
