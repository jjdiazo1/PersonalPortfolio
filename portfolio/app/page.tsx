'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Home() {
  // Dark mode toggle (if still desired)
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
  const [projectsRef, projectsInView] = useInView({ triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ triggerOnce: true });

  // Variants for fade-in sections
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  // Typing animation for hero subtitle
  const heroSubtitle = "Systems and Computer Engineer - A Passion for Innovation";
  const heroChars = heroSubtitle.split("");

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
            className="h-16 w-16 border-4 border-white border-t-transparent rounded-full"
          ></motion.div>
        </motion.div>
      )}

      <main
        className={`${
          darkMode ? 'bg-black text-white' : 'bg-white text-black'
        } min-h-screen transition-all duration-500 font-sans relative`}
      >
        {/* DARK/LIGHT MODE BUTTON */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-20 right-4 p-2 border border-white hover:bg-white hover:text-black transition-colors z-40 text-xs uppercase font-bold"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 border-b border-white overflow-hidden"
        >
          {/* Background moving text */}
          <motion.div
            className="absolute text-[10rem] font-extrabold uppercase text-white opacity-5 select-none pointer-events-none"
            initial={{ x: "-50%" }}
            animate={{ x: ["-50%", "50%", "-50%"], rotate: [0, 0, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ top: "40%" }}
          >
            Portfolio
          </motion.div>

          <div className="z-10 flex flex-col items-center space-y-6 max-w-lg">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.5 }}
              className="text-5xl md:text-7xl font-bold uppercase"
            >
              Juan Jose Diaz
            </motion.h1>

            {/* Typing animation */}
            <div className="text-sm md:text-lg uppercase font-light tracking-wider overflow-hidden h-6 md:h-8 flex justify-center items-center">
              {heroChars.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.3 + index * 0.03, duration: 0.2 }}
                >
                  {char}
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
          className="p-8 border-b border-white"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={profileInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-4 border border-white p-6"
          >
            <h2 className="text-3xl font-bold uppercase">Profile</h2>
            <img
              src="/Profile.jpg"
              alt="Profile"
              className="rounded-full h-32 w-32 mx-auto border-4 border-white"
            />
            <p className="text-sm uppercase font-light">
              I am a dedicated, hardworking software engineering and computer science student at
              Universidad de Los Andes, with a calm and collaborative mindset. I continuously seek to
              improve my technical expertise, leverage innovative solutions, and enhance teamwork to deliver
              exceptional results.
            </p>
          </motion.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section
          ref={experienceRef}
          id="experience"
          className="p-8 border-b border-white"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={experienceInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl font-bold uppercase text-center mb-8">Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job 1 */}
              <div className="border border-white p-6 flex hover:scale-[1.02] transition-transform">
                <div className="w-2/3 pr-4">
                  <h3 className="font-bold text-lg uppercase">Graphic Designer - Pilos Creativos</h3>
                  <p className="text-xs uppercase font-light">Jan 2022 - Apr 2022</p>
                  <ul className="mt-2 text-xs list-disc pl-4 uppercase font-light space-y-1">
                    <li>Managed social media pages & created innovative posts.</li>
                    <li>Coordinated client communication with the design team.</li>
                    <li>Oversaw product photography for social campaigns.</li>
                  </ul>
                </div>
                {/* Logo frame */}
                <div className="w-1/3 flex items-center justify-center border-l border-white">
                  <div className="h-16 w-16 border border-white flex items-center justify-center text-xs uppercase">Logo</div>
                </div>
              </div>

              {/* Job 2 */}
              <div className="border border-white p-6 flex hover:scale-[1.02] transition-transform">
                <div className="w-2/3 pr-4">
                  <h3 className="font-bold text-lg uppercase">Translator - Juan Maria Hotel</h3>
                  <p className="text-xs uppercase font-light">Nov 2019 - Jan 2020</p>
                  <ul className="mt-2 text-xs list-disc pl-4 uppercase font-light space-y-1">
                    <li>Provided translation services to international clientele.</li>
                    <li>Enhanced hotel’s catalog & updated visual materials.</li>
                  </ul>
                </div>
                {/* Logo frame */}
                <div className="w-1/3 flex items-center justify-center border-l border-white">
                  <div className="h-16 w-16 border border-white flex items-center justify-center text-xs uppercase">Logo</div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PROJECTS SECTION */}
        <section
          ref={projectsRef}
          id="projects"
          className="p-8 border-b border-white"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={projectsInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold uppercase text-center mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-white p-6 hover:scale-[1.02] transition-transform">
                <h3 className="font-bold text-md uppercase">E-Commerce Platform</h3>
                <p className="text-xs uppercase font-light mt-2">
                  Built a scalable React & Next.js e-commerce platform integrating secure payment gateways and responsive UI.
                </p>
              </div>
              <div className="border border-white p-6 hover:scale-[1.02] transition-transform">
                <h3 className="font-bold text-md uppercase">Data Visualization Tool</h3>
                <p className="text-xs uppercase font-light mt-2">
                  Developed a D3.js-based data visualization dashboard for complex datasets, enabling insightful analytics.
                </p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SKILLS SECTION */}
        <section
          ref={skillsRef}
          id="skills"
          className="p-8 border-b border-white"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={skillsInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold uppercase text-center mb-8">Skills</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="border border-white p-4 hover:scale-[1.02] transition-transform">
                <p className="font-bold uppercase text-xs">React</p>
              </div>
              <div className="border border-white p-4 hover:scale-[1.02] transition-transform">
                <p className="font-bold uppercase text-xs">Next.js</p>
              </div>
              <div className="border border-white p-4 hover:scale-[1.02] transition-transform">
                <p className="font-bold uppercase text-xs">Node.js</p>
              </div>
              <div className="border border-white p-4 hover:scale-[1.02] transition-transform">
                <p className="font-bold uppercase text-xs">Typescript</p>
              </div>
              <div className="border border-white p-4 hover:scale-[1.02] transition-transform">
                <p className="font-bold uppercase text-xs">Tailwind CSS</p>
              </div>
              <div className="border border-white p-4 hover:scale-[1.02] transition-transform">
                <p className="font-bold uppercase text-xs">D3.js</p>
              </div>
              <div className="border border-white p-4 hover:scale-[1.02] transition-transform">
                <p className="font-bold uppercase text-xs">GraphQL</p>
              </div>
              <div className="border border-white p-4 hover:scale-[1.02] transition-transform">
                <p className="font-bold uppercase text-xs">Docker</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* EDUCATION SECTION */}
        <section
          ref={educationRef}
          id="education"
          className="p-8 border-b border-white"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={educationInView ? "visible" : "hidden"}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold uppercase text-center mb-8">Education</h2>
            <ul className="space-y-6">
              <li className="border border-white p-6 hover:scale-[1.02] transition-transform">
                <h3 className="font-bold text-lg uppercase">Universidad de Los Andes</h3>
                <p className="text-xs uppercase font-light">Systems and Computer Science Engineering</p>
              </li>
              <li className="border border-white p-6 hover:scale-[1.02] transition-transform">
                <h3 className="font-bold text-lg uppercase">SENA</h3>
                <p className="text-xs uppercase font-light">Computer and Systems Technician</p>
              </li>
            </ul>
          </motion.div>
        </section>

        {/* LANGUAGES SECTION */}
        <section
          ref={languagesRef}
          id="languages"
          className="p-8 border-b border-white"
        >
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={languagesInView ? "visible" : "hidden"}
          >
            <h2 className="text-3xl font-bold uppercase text-center mb-8">Languages</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="border border-white p-6 hover:scale-[1.02] transition-transform text-center">
                <h3 className="font-bold text-md uppercase">Spanish</h3>
                <p className="text-xs uppercase font-light">Native</p>
              </div>
              <div className="border border-white p-6 hover:scale-[1.02] transition-transform text-center">
                <h3 className="font-bold text-md uppercase">French</h3>
                <p className="text-xs uppercase font-light">B2</p>
              </div>
              <div className="border border-white p-6 hover:scale-[1.02] transition-transform text-center">
                <h3 className="font-bold text-md uppercase">English</h3>
                <p className="text-xs uppercase font-light">C1</p>
              </div>
              <div className="border border-white p-6 hover:scale-[1.02] transition-transform text-center">
                <h3 className="font-bold text-md uppercase">Japanese</h3>
                <p className="text-xs uppercase font-light">A2</p>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}
