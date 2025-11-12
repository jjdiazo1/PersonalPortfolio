'use client'

import { motion } from 'framer-motion';
import LanguageCard from '../ui/LanguageCard';

interface LanguagesSectionProps {
  darkMode: boolean;
}

export default function LanguagesSection({ darkMode }: LanguagesSectionProps) {
  const languages = [
    { lang: "Spanish", level: "Native" },
    { lang: "French", level: "B2" },
    { lang: "English", level: "C1" },
    { lang: "Japanese", level: "A2" },
  ];

  return (
    <section id="languages" className={`py-20 px-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Languages</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {languages.map(({ lang, level }) => <LanguageCard key={lang} lang={lang} level={level} darkMode={darkMode} />)}
        </div>
      </motion.div>
    </section>
  );
}
