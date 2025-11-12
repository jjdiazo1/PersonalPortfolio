'use client'

import { motion } from 'framer-motion';

interface HomeSectionProps {
  darkMode: boolean;
  scrollToSection: (sectionId: string) => void;
}

export default function HomeSection({ darkMode, scrollToSection }: HomeSectionProps) {
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  const accentClass = darkMode ? 'bg-indigo-600' : 'bg-indigo-500';

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/2 space-y-6">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-6xl lg:text-7xl font-bold">
              Juan José <span className="text-indigo-500">Díaz</span>
            </motion.h1>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h2 className="text-xl md:text-2xl font-light">Systems and Computer Engineer</h2>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-4 max-w-md`}>
                A passionate creator with expertise in web development, design, and innovative digital solutions.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="flex space-x-4 pt-4">
              <button onClick={() => scrollToSection('projects')} className={`px-6 py-3 ${accentClass} text-white rounded-md transition-transform hover:scale-105`}>View Projects</button>
              <button onClick={() => scrollToSection('profile')} className={`px-6 py-3 border ${borderClass} rounded-md transition-transform hover:scale-105`}>About Me</button>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
            <div className="relative">
              <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full border-4 ${borderClass} bg-gradient-to-br from-indigo-500 to-purple-600 opacity-20 absolute top-0 left-0 z-0`} />
              <div className="w-64 h-64 md:w-80 md:h-80 relative z-10">
                <img src="/Profile.png" alt="Profile Picture" className="w-full h-full object-cover rounded-full object-center object-[center_20%]" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
