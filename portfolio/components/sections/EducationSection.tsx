'use client'

import { motion } from 'framer-motion';

interface EducationSectionProps {
  darkMode: boolean;
}

export default function EducationSection({ darkMode }: EducationSectionProps) {
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';

  return (
    <section id="education" className={`py-20 px-4 border-b ${borderClass}`}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
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
  );
}
