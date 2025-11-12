'use client'

import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export default function Header({ darkMode, setDarkMode, activeSection, scrollToSection }: HeaderProps) {
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  const borderHoverClass = darkMode ? 'hover:border-indigo-500' : 'hover:border-indigo-600';
  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'profile', label: 'Profile' },
    { id: 'skills', label: 'Skills' },
    { id: 'languages', label: 'Languages' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className={`${darkMode ? 'bg-black' : 'bg-white'} border-b ${borderClass} transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="text-xl font-bold">JJD</Link>
          </motion.div>
          <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="hidden md:flex space-x-6">
            {navLinks.map(link => (
              <button key={link.id} onClick={() => scrollToSection(link.id)} className={`text-sm uppercase tracking-wider transition-colors hover:text-indigo-400 ${activeSection === link.id ? 'text-indigo-500' : secondaryTextClass}`}>
                {link.label}
              </button>
            ))}
          </motion.nav>
          <motion.button initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full border ${borderClass} ${borderHoverClass}`}>
            {darkMode ? '☀️' : '🌙'}
          </motion.button>
        </div>
      </div>
    </header>
  );
}
