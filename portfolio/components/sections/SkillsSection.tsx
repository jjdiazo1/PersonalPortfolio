'use client'

import { motion } from 'framer-motion';
import SkillCard from '../ui/SkillCard';

interface SkillsSectionProps {
  darkMode: boolean;
}

export default function SkillsSection({ darkMode }: SkillsSectionProps) {
  const skills = ["Python","Java","Webflow","Flutter","UI & Graphic Design","Video Editing","Photography","React"];
  return (
    <section id="skills" className={`py-20 px-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map(skill => <SkillCard key={skill} skill={skill} darkMode={darkMode} />)}
        </div>
      </motion.div>
    </section>
  );
}
