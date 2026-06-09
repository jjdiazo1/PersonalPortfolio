'use client';

import Header from './Header';
import Footer from './Footer';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './ProjectsSection';
import AboutSection from './sections/AboutSection';

export default function Portfolio() {
  return (
    <div className="bg-paper text-charcoal min-h-screen">
      <Header />
      <main className="pt-12 md:pt-14">
        <HeroSection />
        <ProjectsSection />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
