'use client'

import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import HomeSection from './sections/HomeSection';
import ProfileSection from './sections/ProfileSection';
import SkillsSection from './sections/SkillsSection';
import LanguagesSection from './sections/LanguagesSection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import ContactSection from './sections/ContactSection';
import ProjectsSection from './ProjectsSection';

export default function ModernPortfolio() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projectsInView, setProjectsInView] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const sections = ['home','projects','profile','skills','languages','education','experience','contact'];
    const onScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const sec of sections) {
        const element = document.getElementById(sec);
        if (element && scrollPos >= element.offsetTop) setActiveSection(sec);
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`${darkMode ? 'bg-black text-white' : 'bg-white text-black'} transition-colors duration-500`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} activeSection={activeSection} scrollToSection={scrollToSection} />
      <main>
        <HomeSection darkMode={darkMode} scrollToSection={scrollToSection} />
        <ProjectsSection darkMode={darkMode} projectsInView={projectsInView} />
        <ProfileSection darkMode={darkMode} />
        <SkillsSection darkMode={darkMode} />
        <LanguagesSection darkMode={darkMode} />
        <EducationSection darkMode={darkMode} />
        <ExperienceSection darkMode={darkMode} />
        <ContactSection darkMode={darkMode} />
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
}
