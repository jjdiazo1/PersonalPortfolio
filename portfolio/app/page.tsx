'use client';
import { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { Link as ScrollLink } from 'react-scroll';

export default function Home() {
  // Dark mode toggle (if you still want to keep it)
  const [darkMode, setDarkMode] = useState(true);

  // Loading animation state
  const [isLoading, setIsLoading] = useState(true);
  const loadingTransition = useSpring({
    opacity: isLoading ? 1 : 0,
    delay: 500,
    config: { tension: 120, friction: 14 },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  // Intersection Observers for each section
  const [profileRef, profileInView] = useInView({ triggerOnce: true });
  const [experienceRef, experienceInView] = useInView({ triggerOnce: true });
  const [educationRef, educationInView] = useInView({ triggerOnce: true });
  const [languagesRef, languagesInView] = useInView({ triggerOnce: true });

  // Animations for sections
  const sectionAnimation = (inView: boolean) =>
    useSpring({
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0px)' : 'translateY(50px)',
      config: { tension: 150, friction: 20 },
    });

  const profileAnimation = sectionAnimation(profileInView);
  const experienceAnimation = sectionAnimation(experienceInView);
  const educationAnimation = sectionAnimation(educationInView);
  const languagesAnimation = sectionAnimation(languagesInView);

  return (
    <>
      {/* LOADING OVERLAY */}
      {isLoading && (
        <animated.div
          style={loadingTransition}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
        >
          <div className="flex flex-col items-center space-y-4 uppercase text-sm font-bold">
            <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
            <span>Loading...</span>
          </div>
        </animated.div>
      )}

      <main
        className={`${
          darkMode ? 'bg-black text-white' : 'bg-white text-black'
        } min-h-screen transition-all duration-500 font-sans relative`}
      >
        {/* DARK/LIGHT MODE BUTTON */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-4 right-4 p-2 border border-white hover:bg-white hover:text-black transition-colors z-40 text-xs uppercase font-bold"
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        {/* HERO SECTION */}
        <section
          id="hero"
          className="flex flex-col items-center justify-center min-h-screen text-center px-4 border-b-4 border-white relative"
        >
          <animated.div
            style={useSpring({
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' },
              delay: 1600,
              config: { tension: 120, friction: 14 },
            })}
            className="flex flex-col items-center space-y-6"
          >
            <h1 className="text-5xl md:text-7xl font-bold uppercase">Juan Jose Diaz</h1>
            <p className="text-sm md:text-lg uppercase font-light tracking-wider">
              Systems and Computer Engineer
            </p>
            <p className="text-xs md:text-sm uppercase font-light tracking-wider max-w-sm mx-auto">
              Welcome to my professional portfolio. Below you'll find my experience, education, and more.
            </p>

            <div className="mt-8 space-x-2 md:space-x-4 flex flex-wrap justify-center">
              <ScrollLink
                to="experience"
                smooth={true}
                duration={500}
                className="cursor-pointer border border-white px-4 py-2 text-xs uppercase hover:bg-white hover:text-black transition-colors"
              >
                Experience
              </ScrollLink>
              <ScrollLink
                to="languages"
                smooth={true}
                duration={500}
                className="cursor-pointer border border-white px-4 py-2 text-xs uppercase hover:bg-white hover:text-black transition-colors"
              >
                Languages
              </ScrollLink>
              <ScrollLink
                to="education"
                smooth={true}
                duration={500}
                className="cursor-pointer border border-white px-4 py-2 text-xs uppercase hover:bg-white hover:text-black transition-colors"
              >
                Education
              </ScrollLink>
              <ScrollLink
                to="profile"
                smooth={true}
                duration={500}
                className="cursor-pointer border border-white px-4 py-2 text-xs uppercase hover:bg-white hover:text-black transition-colors"
              >
                Profile
              </ScrollLink>
            </div>
          </animated.div>
        </section>

        {/* PROFILE SECTION (INTEGRATED VISUALLY WITH HERO) */}
        <section
          ref={profileRef}
          id="profile"
          className="p-8 border-b-4 border-white"
        >
          <animated.div
            style={profileAnimation}
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
              Universidad de Los Andes, characterized by a calm and collaborative mindset. I strive to
              continuously improve my technical skills, explore innovative solutions, and enhance team
              dynamics to deliver outstanding results.
            </p>
          </animated.div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section
          ref={experienceRef}
          id="experience"
          className="p-8 border-b-4 border-white"
        >
          <animated.div style={experienceAnimation}>
            <h2 className="text-3xl font-bold uppercase text-center mb-8">Experience</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job 1 */}
              <div className="border border-white p-6 flex hover:scale-[1.02] transition-transform">
                <div className="w-2/3 pr-4">
                  <h3 className="font-bold text-lg uppercase">Graphic Designer - Pilos Creativos</h3>
                  <p className="text-xs uppercase font-light">Jan 2022 - Apr 2022</p>
                  <ul className="mt-2 text-xs list-disc pl-4 uppercase font-light space-y-1">
                    <li>Managed social media pages and created innovative posts.</li>
                    <li>Handled client communication with the graphic team.</li>
                    <li>Controlled product photography for social media campaigns.</li>
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
                    <li>Provided translation services for international clients.</li>
                    <li>Enhanced the hotel’s catalog with updated photography.</li>
                  </ul>
                </div>
                {/* Logo frame */}
                <div className="w-1/3 flex items-center justify-center border-l border-white">
                  <div className="h-16 w-16 border border-white flex items-center justify-center text-xs uppercase">Logo</div>
                </div>
              </div>
            </div>
          </animated.div>
        </section>

        {/* EDUCATION SECTION */}
        <section
          ref={educationRef}
          id="education"
          className="p-8 border-b-4 border-white"
        >
          <animated.div style={educationAnimation} className="max-w-3xl mx-auto">
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
          </animated.div>
        </section>

        {/* LANGUAGES SECTION */}
        <section
          ref={languagesRef}
          id="languages"
          className="p-8 border-b-4 border-white"
        >
          <animated.div style={languagesAnimation}>
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
          </animated.div>
        </section>

        {/* FOOTER */}
        <footer className="p-8 text-center border-t-4 border-white relative">
          <div className="flex flex-col items-center space-y-4">
            <img
              src="/Profile.jpg"
              alt="Profile in Footer"
              className="rounded-full h-16 w-16 border-4 border-white"
            />
            <p className="text-xs uppercase font-light">
              © {new Date().getFullYear()} Juan Jose Diaz. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4">
              <a
                href="https://github.com/yourusername"
                className="text-white hover:invert transition-transform duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github text-xl"></i>
              </a>
              <a
                href="https://linkedin.com/in/yourprofile"
                className="text-white hover:invert transition-transform duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="https://instagram.com/yourprofile"
                className="text-white hover:invert transition-transform duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
