'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import ProjectsSection from './ProjectsSection';

export default function ModernPortfolio() {
  // IMPORTANTE: Mantener TODOS los hooks al principio, sin condiciones entre ellos
  
  // Estados para el control de la interfaz
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [mounted, setMounted] = useState(false);
  
  // Refs para la animación de entrada
  const [profileRef, profileInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [languagesRef, languagesInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [educationRef, educationInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [experienceRef, experienceInView] = useInView({ triggerOnce: true, threshold: 0.3 });
    
  // Verificar que estamos en el cliente antes de usar funcionalidades del cliente
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Loading effect - todos los useEffects juntos
  useEffect(() => {
    if (mounted) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [mounted]);

  // Observar la sección activa al hacer scroll
  useEffect(() => {
    if (mounted) {
      const handleScroll = () => {
        const sections = ['home', 'projects', 'profile', 'skills', 'languages', 'education', 'experience'];
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });

        if (currentSection) {
          setActiveSection(currentSection);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [mounted]);

  // IMPORTANTE: Colocar todo el resto de la lógica después de los hooks
  
  // Si no está montado, devuelve un estado de carga o un div vacío
  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Theme classes
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const accentClass = darkMode ? 'bg-indigo-600' : 'bg-indigo-500';
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  const borderHoverClass = darkMode ? 'hover:border-indigo-500' : 'hover:border-indigo-600';
  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';

  // Animación fadeInUp para secciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  // Navegar a sección
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Navigation links
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'profile', label: 'Profile' },
    { id: 'skills', label: 'Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' }
  ];

  return (
    <div className={`${bgClass} ${textClass} min-h-screen font-sans transition-colors duration-300`}>
      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-50 flex items-center justify-center ${darkMode ? 'bg-black' : 'bg-white'}`}
            >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.2, rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="w-16 h-16 border-2 border-t-transparent border-indigo-500 rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className={`${bgClass} border-b ${borderClass} transition-colors duration-300`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="flex items-center"
              >
                <Link href="/" className="text-xl font-bold">Juanjo Diaz</Link>
              </motion.div>
              
              <motion.nav 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
                className="hidden md:flex space-x-6"
              >
                {navLinks.map(link => (
                  <button 
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`text-sm uppercase tracking-wider transition-colors hover:text-indigo-400 ${activeSection === link.id ? 'text-indigo-500' : secondaryTextClass}`}
                  >
                    {link.label}
                  </button>
                ))}
              </motion.nav>
              
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full border ${borderClass} ${borderHoverClass} transition-colors`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? '☀️' : '🌙'}
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - mostrado solo en dispositivos móviles */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-opacity-90 backdrop-blur-sm">
        <div className={`${bgClass} border-t ${borderClass} py-2 px-3`}>
          <div className="flex justify-between items-center">
            {navLinks.slice(0, 5).map(link => (
              <button 
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-xs uppercase py-2 transition-colors ${activeSection === link.id ? 'text-indigo-500' : secondaryTextClass}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="pt-20 pb-20">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="md:w-1/2 space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.2, duration: 0.8 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-bold"
                >
                  Juan Jose <span className="text-indigo-500">Diaz</span>
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.4, duration: 0.8 }}
                >
                  <h2 className="text-xl md:text-2xl font-light">
                    Systems and Computer Engineer
                  </h2>
                  <p className={`mt-4 max-w-md ${secondaryTextClass}`}>
                    A passionate creator with expertise in web development, design,
                    and innovative digital solutions. Transforming ideas into impactful experiences.
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.6, duration: 0.8 }}
                  className="flex space-x-4 pt-4"
                >
                  <button 
                  onClick={() => scrollToSection('projects')}
                  className={`px-6 py-3 ${accentClass} text-white rounded-md transition-transform hover:scale-105`}
                  >
                  View Projects
                  </button>
                  <button 
                  onClick={() => scrollToSection('profile')}
                  className={`px-6 py-3 border ${borderClass} ${borderHoverClass} rounded-md transition-transform hover:scale-105`}
                  >
                  About Me
                  </button>
                </motion.div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.8, duration: 0.8 }}
                  className="md:w-1/2 mt-12 md:mt-0 flex justify-center"
                >
                  <div className="relative">
                    {/* Fondo morado circular */}
                    <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full border-4 ${borderClass} bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 absolute top-0 left-0 z-0`} />
                    
                    {/* Imagen de perfil por encima */}
                    <div className="w-64 h-64 md:w-80 md:h-80 relative z-10">
                      <img 
                        src="/Profile.png" 
                        alt="Profile Picture" 
                        className="w-full h-full object-cover rounded-full object-center object-[center_15%]"
                      />
                    </div>
                  </div>
                </motion.div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <div ref={projectsRef}>
          <ProjectsSection 
            darkMode={darkMode} 
            projectsInView={projectsInView} 
          />
        </div>

        {/* PROFILE SECTION */}
        <section
          ref={profileRef}
          id="profile"
          className={`py-20 px-4 border-b ${borderClass}`}
        >
            <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={profileInView ? "visible" : "hidden"}
            className={`max-w-3xl mx-auto flex flex-col items-center text-center space-y-6`}
            >
            <h2 className="text-4xl font-bold mb-4">Profile</h2>
            <div className={`border ${borderClass} p-8 rounded-lg`}>
              <div className="relative w-32 h-32 mx-auto mb-6 group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 transition-opacity group-hover:opacity-20"></div>
                <img
                  src="/Profile.jpg"
                  alt="Profile"
                  className={`rounded-full h-full w-full object-cover border-4 ${borderClass} relative z-10`}
                />
              </div>
              <p className="text-lg mb-4">
              I am a dedicated, hardworking software engineering and computer science student at
              Universidad de Los Andes, with a calm and collaborative mindset.
              </p>
              <p className={`${secondaryTextClass}`}>
              I continuously seek to improve my technical expertise, leverage innovative solutions, 
              and enhance teamwork to deliver exceptional results.
              </p>
            </div>
            </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section
          ref={skillsRef}
          id="skills"
          className={`py-20 px-4 border-b ${borderClass}`}
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "Python",
                "Java",
                "Webflow",
                "Flutter",
                "UI & Graphic Design",
                "Video Editing",
                "Photography",
                "React",
              ].map((skill) => (
                <div
                  key={skill}
                  className={`border ${borderClass} p-6 rounded-lg hover:scale-[1.05] transition-transform flex flex-col items-center justify-center text-center h-32`}
                >
                  <p className="font-bold uppercase break-words">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* LANGUAGES SECTION */}
        <section
          ref={languagesRef}
          id="languages"
          className={`py-20 px-4 border-b ${borderClass}`}
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={languagesInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Languages</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { lang: "Spanish", level: "Native" },
                { lang: "French", level: "B2" },
                { lang: "English", level: "C1" },
                { lang: "Japanese", level: "A2" },
              ].map(({ lang, level }) => (
                <div 
                  key={lang} 
                  className={`border ${borderClass} p-6 rounded-lg hover:scale-[1.05] transition-transform flex flex-col items-center justify-center h-40`}
                >
                  <h3 className="font-bold text-xl uppercase text-center mb-2">{lang}</h3>
                  <p className="text-sm uppercase font-light text-center">{level}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* EDUCATION SECTION */}
        <section
          ref={educationRef}
          id="education"
          className={`py-20 px-4 border-b ${borderClass}`}
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={educationInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Education</h2>
            <div className="space-y-6">
              <div className={`border ${borderClass} p-8 rounded-lg hover:scale-[1.02] transition-transform`}>
                <h3 className="font-bold text-2xl uppercase mb-2">Universidad de Los Andes</h3>
                <p className="text-lg mb-1">Systems and Computer Science Engineering</p>
                <p className={`${secondaryTextClass}`}>2020 - Present</p>
              </div>
              <div className={`border ${borderClass} p-8 rounded-lg hover:scale-[1.02] transition-transform`}>
                <h3 className="font-bold text-2xl uppercase mb-2">SENA</h3>
                <p className="text-lg mb-1">Computer and Systems Technician</p>
                <p className={`${secondaryTextClass}`}>2018 - 2020</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section
          ref={experienceRef}
          id="experience"
          className={`py-20 px-4 border-b ${borderClass}`}
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={experienceInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
            <div className="grid grid-cols-1 gap-6">
              {/* Job 1 */}
              <div className={`border ${borderClass} p-6 rounded-lg hover:scale-[1.02] transition-transform`}>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-3/4 pr-0 md:pr-8">
                    <h3 className="font-bold text-xl uppercase mb-1">Graphic Designer - Pilos Creativos</h3>
                    <p className={`text-sm ${secondaryTextClass} mb-4`}>Jan 2022 - Apr 2022</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Designed custom graphics as per client requests.</li>
                      <li>Managed social media pages & created innovative posts.</li>
                    </ul>
                  </div>
                  <div className="w-full md:w-1/4 mt-4 md:mt-0 flex justify-center items-center">
                    <div className={`h-24 w-24 rounded-lg border ${borderClass} flex items-center justify-center overflow-hidden`}>
                      <img src="/Pilos.jpg" alt="Company Logo" className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Job 2 */}
              <div className={`border ${borderClass} p-6 rounded-lg hover:scale-[1.02] transition-transform`}>
                <div className="flex flex-wrap">
                  <div className="w-full md:w-3/4 pr-0 md:pr-8">
                    <h3 className="font-bold text-xl uppercase mb-1">Translator - Juan Maria Hotel</h3>
                    <p className={`text-sm ${secondaryTextClass} mb-4`}>Nov 2019 - Jan 2020</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Provided translation services to international clientele.</li>
                      <li>Enhanced hotel's catalog & updated visual materials.</li>
                    </ul>
                  </div>
                  <div className="w-full md:w-1/4 mt-4 md:mt-0 flex justify-center items-center">
                    <div className={`h-24 w-24 rounded-lg border ${borderClass} flex items-center justify-center overflow-hidden`}>
                      <img src="/Hotel.png" alt="Company Logo" className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
            <div className={`border ${borderClass} p-8 rounded-lg mb-8`}>
              <p className="text-lg text-center mb-8">
                Interested in working together? Feel free to reach out through any of the following channels.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <a href="mailto:jj.diazorg@gmail.com" className="group">
                  <div className={`p-4 border ${borderClass} rounded-lg group-hover:border-indigo-500 transition-colors`}>
                    <span className="block text-2xl mb-2">✉️</span>
                    <span className="block font-medium">Email</span>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/jjdiazo1/" target="_blank" rel="noopener noreferrer" className="group">
                  <div className={`p-4 border ${borderClass} rounded-lg group-hover:border-indigo-500 transition-colors`}>
                    <span className="block text-2xl mb-2">🔗</span>
                    <span className="block font-medium">LinkedIn</span>
                  </div>
                </a>
                <a href="https://github.com/jjdiazo1" target="_blank" rel="noopener noreferrer" className="group">
                  <div className={`p-4 border ${borderClass} rounded-lg group-hover:border-indigo-500 transition-colors`}>
                    <span className="block text-2xl mb-2">📁</span>
                    <span className="block font-medium">GitHub</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={`${bgClass} ${borderClass} border-t py-8`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`${secondaryTextClass} text-sm`}>
            © {new Date().getFullYear()} Juan Jose Diaz. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}