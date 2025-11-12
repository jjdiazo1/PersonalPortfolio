'use client'

import { motion } from 'framer-motion';
import SkillCard from '../ui/SkillCard';

interface SkillsSectionProps {
  darkMode: boolean;
}



export default function SkillsSection({ darkMode }: SkillsSectionProps) {

    const skills = [
    { skill: "Python", logo: "/Logos/python.png" },
    { skill: "Java", logo: "/Logos/java.png" },
    { skill: "C", logo: "/Logos/c.png" },
    { skill: "JavaScript", logo: "/Logos/js.png" },
    { skill: "Flutter", logo: "/Logos/flutter.png" },
    { skill: "Swift", logo: "/Logos/swift.png" },
    { skill: "React", logo: "/Logos/react.png" },
    { skill: "DBs", logo: "/Logos/postgre.png" },
    ];
    
  return (
    <section id="skills" className={`py-20 px-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map(({ skill, logo }) => (
                <SkillCard key={skill} skill={skill} logo={logo} darkMode={darkMode} />
            ))}
            </div>
      </motion.div>
    </section>
  );
}
