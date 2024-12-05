'use client';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

export default function Home() {
  const [profileRef, profileInView] = useInView({ triggerOnce: true });
  const profileAnimation = useSpring({
    opacity: profileInView ? 1 : 0,
    transform: profileInView ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 150, friction: 20 },
  });

  const [experienceRef, experienceInView] = useInView({ triggerOnce: true });
  const experienceAnimation = useSpring({
    opacity: experienceInView ? 1 : 0,
    transform: experienceInView ? 'scale(1)' : 'scale(0.9)',
    config: { tension: 170, friction: 25 },
  });

  const [educationRef, educationInView] = useInView({ triggerOnce: true });
  const educationAnimation = useSpring({
    opacity: educationInView ? 1 : 0,
    transform: educationInView ? 'translateY(0px)' : 'translateY(50px)',
    config: { tension: 120, friction: 18 },
  });

  // Light/Dark Mode Toggle
  const [darkMode, setDarkMode] = useState(true);

  return (
    <main
      className={`${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } min-h-screen transition-all duration-500`}
    >
      {/* Light/Dark Mode Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full shadow-lg bg-gray-800 text-white hover:bg-gray-700"
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-700 text-center shadow-lg">
        <h1 className="text-5xl md:text-7xl font-bold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600">
          Juan Jose Diaz
        </h1>
        <p className="text-xl md:text-3xl mt-4 font-light">Systems and Computer Engineer</p>
        <p className="mt-6 text-lg text-gray-200">Welcome to my portfolio! 👨‍💻</p>
        <div className="mt-8 space-x-4">
          <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium">
            View Projects
          </button>
          <button className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-600 text-white px-6 py-3 rounded-lg font-medium">
            Contact Me
          </button>
        </div>
      </section>

      {/* Profile Section */}
      <section ref={profileRef} className="p-8">
        <animated.div style={profileAnimation} className="bg-gray-800 rounded-lg shadow-xl p-6">
          <h2 className="text-4xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-600">
            Profile
          </h2>
          <div className="flex flex-col items-center">
            <img
              src="/Profile.jpg"
              alt="Profile"
              className="rounded-full h-32 w-32 mx-auto shadow-lg border-4 border-indigo-500 mt-4"
            />
            <p className="mt-4 text-gray-300 text-lg text-center">
              Dedicated, hardworking Software Engineering and Computer Science student at
              Universidad de Los Andes, with a calm and collaborative mindset.
            </p>
          </div>
        </animated.div>
      </section>

      {/* Experience Section */}
      <section ref={experienceRef} className="p-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-red-600">
          Experience
        </h2>
        <animated.div
          style={experienceAnimation}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Job 1 */}
          <div className="bg-gradient-to-tr from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <h3 className="font-semibold text-xl flex items-center space-x-2">
              <i className="fas fa-pencil-alt"></i> Graphic Designer - Pilos Creativos
            </h3>
            <p className="text-sm text-gray-400">Jan 2022 - Apr 2022</p>
            <ul className="mt-2 text-gray-300 text-sm list-disc pl-4">
              <li>Managed social media pages and created innovative posts.</li>
              <li>Handled client communication with the graphic team.</li>
              <li>Controlled product photography for social media.</li>
            </ul>
          </div>

          {/* Job 2 */}
          <div className="bg-gradient-to-tr from-gray-700 to-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform">
            <h3 className="font-semibold text-xl flex items-center space-x-2">
              <i className="fas fa-globe"></i> Translator - Juan Maria Hotel
            </h3>
            <p className="text-sm text-gray-400">Nov 2019 - Jan 2020</p>
            <ul className="mt-2 text-gray-300 text-sm list-disc pl-4">
              <li>Provided translation services for international clients.</li>
              <li>Enhanced the hotel’s catalog with updated photos.</li>
            </ul>
          </div>
        </animated.div>
      </section>

      {/* Education Section */}
      <section ref={educationRef} className="p-8">
        <animated.div style={educationAnimation}>
          <h2 className="text-4xl font-bold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-600">
            Education
          </h2>
          <ul className="space-y-6">
            <li className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-lg">Universidad de Los Andes</h3>
              <p className="text-sm text-gray-400">Systems and Computer Science Engineering</p>
            </li>
            <li className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="font-semibold text-lg">SENA</h3>
              <p className="text-sm text-gray-400">Computer and Systems Technician</p>
            </li>
          </ul>
        </animated.div>
      </section>

      {/* Languages Section */}
      <section className="p-8">
        <h2 className="text-4xl font-bold mb-6 text-center text-gradient bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Languages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-lg">Español</h3>
        <p className="text-sm text-gray-400">Nativo</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-lg">Francés</h3>
        <p className="text-sm text-gray-400">B2</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-lg">Inglés</h3>
        <p className="text-sm text-gray-400">C1</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="font-semibold text-lg">Japonés</h3>
        <p className="text-sm text-gray-400">A2</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-6 bg-black text-center">
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="https://github.com/yourusername"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="fab fa-github text-xl"></i>
          </a>
          <a
            href="https://linkedin.com/in/yourprofile"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="fab fa-linkedin text-xl"></i>
          </a>
        </div>
        <p className="text-gray-400 mt-4">
          © {new Date().getFullYear()} Juan Jose Diaz. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
