'use client';

import Header from './Header';
import Footer from './Footer';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './ProjectsSection';
import AboutSection from './sections/AboutSection';
import EducationSection from './sections/EducationSection';

export default function Portfolio() {
  return (
    <div className="bg-paper text-charcoal min-h-screen">
      <Header />
      {/* Outer editorial frame: hairline borders on both sides, full height */}
      <div className="border-b border-charcoal min-h-screen flex flex-col">
        <main className="pt-12 md:pt-14 flex-1">
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
