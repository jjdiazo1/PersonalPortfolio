'use client'

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import SkillsCarousel from './SkillCarousel';

interface HomeSectionProps {
  darkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

export default function HomeSection({ darkMode, scrollToSection }: HomeSectionProps) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Loading animation
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} id="home" className="relative min-h-screen flex flex-col px-4 py-20 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className={`absolute inset-0 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900' : 'bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50'}`} />
          
          {/* Floating orbs with mouse parallax */}
          <motion.div
            style={{
              x: mousePosition.x * 0.02,
              y: mousePosition.y * 0.02,
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          />
          <motion.div
            style={{
              x: mousePosition.x * -0.015,
              y: mousePosition.y * -0.015,
            }}
            className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"
          />
          <motion.div
            style={{
              x: mousePosition.x * 0.01,
              y: mousePosition.y * 0.01,
            }}
            className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 -z-10" style={{
          backgroundImage: darkMode 
            ? 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.15) 1px, transparent 0)'
            : 'radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />

        {/* Main Content - Flex grow to push carousel to bottom */}
        <motion.div style={{ y, opacity }} className="container mx-auto relative z-10 flex-grow flex items-center">
          <div className="w-full flex flex-col-reverse md:flex-row md:items-center gap-12">
            {/* Content */}
            <div className="md:w-1/2 space-y-8">
              {/* Main heading with gradient text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  Juan José{' '}
                  <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Díaz
                  </span>
                </h1>
              </motion.div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4"
              >
                <h2 className="text-2xl md:text-3xl font-light">
                  Systems & Computer Engineer
                </h2>
                <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} max-w-xl leading-relaxed`}>
                  Making technology feel{' '}
                  <span className="font-semibold text-indigo-500">human</span>
                  {' '}through innovative digital experiences
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group relative px-8 py-4 bg-indigo-500 text-white rounded-lg font-medium overflow-hidden transition-all hover:shadow-2xl hover:shadow-indigo-500/50"
                >
                  <span className="relative z-10">View Projects</span>
                  <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                
                <button
                  onClick={() => scrollToSection('profile')}
                  className={`px-8 py-4 border-2 ${darkMode ? 'border-gray-700 hover:border-indigo-500' : 'border-gray-300 hover:border-indigo-500'} rounded-lg font-medium transition-all hover:scale-105`}
                >
                  About Me
                </button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className={`flex gap-8 pt-8 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
              >
                {[
                  { label: 'Projects', value: '10+' },
                  { label: 'Languages', value: '4' },
                  { label: 'Technologies', value: '20+' }
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="text-2xl md:text-3xl font-bold text-indigo-500">
                      {stat.value}
                    </div>
                    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Profile Image with 3D effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="md:w-1/2 flex justify-center"
            >
              <div className="relative group">
                {/* Animated rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 -m-8"
                >
                  <div className="w-full h-full border-2 border-indigo-500/30 rounded-full" />
                </motion.div>
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 -m-16"
                >
                  <div className="w-full h-full border-2 border-purple-500/20 rounded-full border-dashed" />
                </motion.div>

                {/* Glowing background */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Profile container */}
                <div className="relative w-72 h-72 md:w-96 md:h-96">
                  <div className={`absolute inset-0 rounded-full border-4 ${darkMode ? 'border-gray-800' : 'border-white'} shadow-2xl overflow-hidden`}>
                    <img
                      src="/Profile.png"
                      alt="Juan José Díaz"
                      className="w-full h-full object-cover object-center object-[center_20%] group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Carousel - Sticky at bottom, hidden on mobile */}
        <div className="hidden md:block relative z-20 mt-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <SkillsCarousel darkMode={darkMode} />
          </motion.div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.1); }
            66% { transform: translate(-20px, 20px) scale(0.9); }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </section>
    </>
  );
}