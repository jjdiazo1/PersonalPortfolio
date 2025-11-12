'use client'

import { motion } from 'framer-motion';

interface EducationSectionProps {
  darkMode: boolean;
}

export default function EducationSection({ darkMode }: EducationSectionProps) {
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';

  const schools = [
    {
      name: "National institut of applied sciences Lyon",
      degree: "Master in Computer Science",
      period: "2025 - 2027",
      logo: "/Logos/insa.png",
    },
    {
      name: "Universidad de Los Andes",
      degree: "Systems and Computer Science Engineering",
      period: "2022 - 2026",
      logo: "/Logos/uniandes.png",
    },
    {
      name: "National service of apprenticeship (SENA)",
      degree: "Computer and Systems Technician",
      period: "2019- 2021",
      logo: "/Logos/sena.png",
    },
  ];

  return (
    <section id="education" className={`py-20 px-4 border-b ${borderClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-12">Education</h2>
        <div className="space-y-8">
          {schools.map((school, i) => (
            <motion.div
              key={school.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
              className={`border ${borderClass} p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row items-center gap-6`}
            >
              <div className="h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden border">
                <img src={school.logo} alt={school.name} className="object-contain w-full h-full" />
              </div>
              <div>
                <h3 className="font-bold text-2xl uppercase mb-2">{school.name}</h3>
                <p className="text-lg mb-1">{school.degree}</p>
                <p className={`${secondaryTextClass}`}>{school.period}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
