'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  // Dark mode toggle
  const [darkMode, setDarkMode] = useState(true);

  // Loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Intersection observers
  const [profileRef, profileInView] = useInView({ triggerOnce: true });
  const [experienceRef, experienceInView] = useInView({ triggerOnce: true });
  const [educationRef, educationInView] = useInView({ triggerOnce: true });
  const [languagesRef, languagesInView] = useInView({ triggerOnce: true });
  // const [projectsRef, projectsInView] = useInView({ triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true });

  // Variants for fade-in sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Typing animation for hero subtitle
  const heroSubtitle = "Systems and Computer Engineer - A Passion for Innovation";
  const heroWords = heroSubtitle.split(" "); // Dividimos por palabras

  // Color classes depending on mode
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const borderClass = darkMode ? 'border-white' : 'border-black';
  const faintTextClass = darkMode ? 'text-white/10' : 'text-black/10';

  // Infinite background lines
  // We'll create several lines of "PORTFOLIO" repeated horizontally
  // and animate them horizontally for a continuous scroll.
  const lineText = "PORTFOLIO ".repeat(10); // Repeat word enough times
  const lineVariantsLeft = {
    animate: { x: [0, -1000] },
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  };
  const lineVariantsRight = {
    animate: { x: [0, -1500] },
    transition: { duration: 20, repeat: Infinity, ease: "linear" },
  };

  return (
    <>
      {/* LOADING OVERLAY */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
        >
          <motion.div
            initial={{ scale: 0.8, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="h-30 w-16 border-4 border-white border-t-transparent rounded-full"
          ></motion.div>
        </motion.div>
      )}

      <main
        className={`${bgClass} ${textClass} min-h-screen transition-all duration-500 font-sans relative`}
      >
        {/* DARK/LIGHT MODE BUTTON */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`fixed top-20 right-4 p-2 border ${borderClass} hover:${bgClass === 'bg-black' ? 'bg-white text-black' : 'bg-black text-white'} transition-colors z-40 text-xs uppercase font-bold`}
          style={{ 
            backgroundColor: darkMode ? 'transparent' : 'transparent',
            color: darkMode ? 'white' : 'black'
          }}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* HERO SECTION WITH INFINITE SCROLLING BACKGROUND */}
        <section
          id="hero"
          className={`relative flex flex-col items-center justify-center min-h-screen text-center px-4 border-b ${borderClass} overflow-hidden`}
        >
          {/* BACKGROUND SCROLLING TEXT */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Multiple lines of scrolling text */}
            <div className="absolute top-[10%] w-full overflow-visible">
              <motion.div
          className={`whitespace-nowrap ${faintTextClass} font-extrabold text-4xl md:text-[6rem] uppercase`}
          {...lineVariantsLeft}
              >
          {lineText}
              </motion.div>
            </div>
            <div className="absolute top-[30%] w-full overflow-visible">
              <motion.div
          className={`whitespace-nowrap ${faintTextClass} font-extrabold text-4xl md:text-[6rem] uppercase`}
          {...lineVariantsRight}
              >
          {lineText}
              </motion.div>
            </div>
            <div className="absolute top-[50%] w-full overflow-visible">
              <motion.div
          className={`whitespace-nowrap ${faintTextClass} font-extrabold text-4xl md:text-[6rem] uppercase`}
          {...lineVariantsLeft}
              >
          {lineText}
              </motion.div>
            </div>
            <div className="absolute top-[70%] w-full overflow-visible">
              <motion.div
          className={`whitespace-nowrap ${faintTextClass} font-extrabold text-4xl md:text-[6rem] uppercase`}
          {...lineVariantsRight}
              >
          {lineText}
              </motion.div>
            </div>
            <div className="absolute top-[90%] w-full overflow-visible">
              <motion.div
          className={`whitespace-nowrap ${faintTextClass} font-extrabold text-4xl md:text-[6rem] uppercase`}
          {...lineVariantsLeft}
              >
          {lineText}
              </motion.div>
            </div>
          </div>

          <div className="z-10 flex flex-col items-center space-y-6 max-w-full px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold uppercase text-center"
            >
              Juan Jose Diaz Ortega
            </motion.h1>

          {/* Typing animation */}
          <div className="text-center text-sm md:text-lg lg:text-xl font-light uppercase tracking-wider px-4 whitespace-pre-wrap break-words">
            {heroWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3 + index * 0.2, duration: 0.4 }}
                className="inline-block mr-1" // Espaciado entre palabras
              >
                {word}
              </motion.span>
            ))}
          </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3, duration: 0.5 }}
              className="text-xs md:text-sm uppercase font-light tracking-wider max-w-sm mx-auto"
            >
              Welcome to my professional portfolio. Scroll down to discover my experience, projects, skills, education, and more.
            </motion.p>
          </div>
        </section>

        {/* PROFILE SECTION */}
        <section
          ref={profileRef}
          id="profile"
          className={`p-8 border-b ${borderClass}`}
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={profileInView ? "visible" : "hidden"}
            className={`max-w-3xl mx-auto flex flex-col items-center text-center space-y-4 border ${borderClass} p-6`}
          >
            <h2 className="text-3xl font-bold uppercase">Profile</h2>
            <img
              src="/Profile.jpg"
              alt="Profile"
              className={`rounded-full h-32 w-32 mx-auto border-4 ${borderClass}`}
            />
            <p className="text-sm uppercase font-light">
              I am a dedicated, hardworking software engineering and computer science student at
              Universidad de Los Andes, with a calm and collaborative mindset. I continuously seek to
              improve my technical expertise, leverage innovative solutions, and enhance teamwork to deliver
              exceptional results.
            </p>
          </motion.div>
        </section>

{/* EDUCATION SECTION */}
<section
          ref={educationRef}
          id="education"
          className={`p-8 border-b ${borderClass}`}
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={educationInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold uppercase text-center mb-8">Education</h2>
            <ul className="space-y-6">
              <li className={`border ${borderClass} p-6 hover:scale-[1.02] transition-transform`}>
                <h3 className="font-bold text-lg uppercase">Universidad de Los Andes</h3>
                <p className="text-xs uppercase font-light">Systems and Computer Science Engineering</p>
              </li>
              <li className={`border ${borderClass} p-6 hover:scale-[1.02] transition-transform`}>
                <h3 className="font-bold text-lg uppercase">SENA</h3>
                <p className="text-xs uppercase font-light">Computer and Systems Technician</p>
              </li>
            </ul>
          </motion.div>
        </section>

        {/* PROJECTS SECTION
        <section
          ref={projectsRef}
          id="projects"
          className={`p-8 border-b ${borderClass}`}
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold uppercase text-center mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`border ${borderClass} p-6 hover:scale-[1.02] transition-transform`}>
                <h3 className="font-bold text-md uppercase">E-Commerce Platform</h3>
                <p className="text-xs uppercase font-light mt-2">
                  Built a scalable React & Next.js e-commerce platform integrating secure payment gateways and responsive UI.
                </p>
              </div>
              <div className={`border ${borderClass} p-6 hover:scale-[1.02] transition-transform`}>
                <h3 className="font-bold text-md uppercase">Data Visualization Tool</h3>
                <p className="text-xs uppercase font-light mt-2">
                  Developed a D3.js-based data visualization dashboard for complex datasets, enabling insightful analytics.
                </p>
              </div>
            </div>
          </motion.div>
        </section> */}

        {/* SKILLS SECTION */}
        <section
  ref={skillsRef}
  id="skills"
  className={`p-8 border-b ${borderClass}`}
>
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    animate={skillsInView ? "visible" : "hidden"}
    className="max-w-3xl mx-auto"
  >
    <h2 className="text-3xl font-bold uppercase text-center mb-8">Skills</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        "Python",
        "Java",
        "Webflow",
        "Pytorch",
        "UI & Graphic Design",
        "Video Editing",
        "Photography",
        "React",
      ].map((skill) => (
        <div
          key={skill}
          className={`border ${borderClass} p-6 hover:scale-[1.02] transition-transform flex flex-col items-center justify-center`}
        >
          <p
            className="font-bold uppercase text-center break-words whitespace-normal leading-tight"
            style={{
              fontSize: "clamp(0.75rem, 2vw, 1.25rem)", // Tamaño dinámico del texto
            }}
          >
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
  className={`p-8 border-b ${borderClass}`}
>
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    animate={languagesInView ? "visible" : "hidden"}
    className="max-w-3xl mx-auto"
  >
    <h2 className="text-3xl font-bold uppercase text-center mb-8">Languages</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { lang: "Spanish", level: "Native" },
        { lang: "French", level: "B2" },
        { lang: "English", level: "C1" },
        { lang: "Japanese", level: "A2" },
      ].map(({ lang, level }) => (
        <div 
          key={lang} 
          className={`border ${borderClass} p-6 hover:scale-[1.02] transition-transform flex flex-col items-center justify-center`}
        >
          <h3 className="font-bold text-md md:text-lg lg:text-xl uppercase text-center">{lang}</h3>
          <p className="text-xs md:text-sm uppercase font-light text-center mt-2">{level}</p>
        </div>
      ))}
    </div>
  </motion.div>
</section>

         {/* EXPERIENCE SECTION */}
         <section
  ref={experienceRef}
  id="experience"
  className={`p-8 border-b ${borderClass}`}
>
  <motion.div
    variants={fadeInUp}
    initial="hidden"
    animate={experienceInView ? "visible" : "hidden"}
  >
    <h2 className="text-3xl font-bold uppercase text-center mb-8">Experience</h2>
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Job 1 */}
      <div className={`border ${borderClass} p-6 flex flex-wrap hover:scale-[1.02] transition-transform`}>
        <div className="w-full md:w-2/3 pr-0 md:pr-4 mb-4 md:mb-0">
          <h3 className="font-bold text-lg uppercase">Graphic Designer - Pilos Creativos</h3>
          <p className="text-xs uppercase font-light">Jan 2022 - Apr 2022</p>
          <ul className="mt-2 text-xs list-disc pl-4 uppercase font-light space-y-1">
            <li>Designed custom graphics as per client requests.</li>
            <li>Managed social media pages & created innovative posts.</li>
          </ul>
        </div>
        {/* Logo frame */}
        <div className="w-full md:w-1/3 flex items-center justify-center border-t md:border-t-0 md:border-l ${borderClass} mt-4 md:mt-0 pt-4 md:pt-0">
          <div className={`h-24 w-24 border ${borderClass} flex items-center justify-center text-xs uppercase`}>
            <Image src="/Pilos.jpg" alt="Pilos Creativos Logo" className="object-contain w-full h-full" width={60} height={60} />
          </div>
        </div>
      </div>

      {/* Job 2 */}
      <div className={`border ${borderClass} p-6 flex flex-wrap hover:scale-[1.02] transition-transform`}>
        <div className="w-full md:w-2/3 pr-0 md:pr-4 mb-4 md:mb-0">
          <h3 className="font-bold text-lg uppercase">Translator - Juan Maria Hotel</h3>
          <p className="text-xs uppercase font-light">Nov 2019 - Jan 2020</p>
          <ul className="mt-2 text-xs list-disc pl-4 uppercase font-light space-y-1">
            <li>Provided translation services to international clientele.</li>
            <li>Enhanced hotel’s catalog & updated visual materials.</li>
          </ul>
        </div>
        {/* Logo frame */}
        <div className="w-full md:w-1/3 flex items-center justify-center border-t md:border-t-0 md:border-l ${borderClass} mt-4 md:mt-0 pt-4 md:pt-0">
          <div className={`h-24 w-24 border ${borderClass} flex items-center justify-center text-xs uppercase`}>
            <Image src="/Hotel.png" alt="Hotel Juan Maria Logo" className="object-contain w-full h-full" width={60} height={60} />
          </div>
        </div>
      </div>
    </div>
  </motion.div>
</section>


      </main>
    </>
  );
}
