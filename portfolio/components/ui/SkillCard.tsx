'use client'

import { motion } from 'framer-motion';

interface SkillCardProps {
  skill: string;
  logo?: string;
  darkMode: boolean;
}

export default function SkillCard({ skill, logo, darkMode }: SkillCardProps) {
  const bgClass = darkMode ? 'bg-gray-900/70' : 'bg-white/90';
  const borderClass = darkMode ? 'border-gray-800/60' : 'border-gray-200';
  const textClass = darkMode ? 'text-gray-100' : 'text-gray-800';

  return (
    <motion.div
      whileHover={{ scale: 1.04, rotateX: 2 }}
      transition={{ type: "spring", stiffness: 220, damping: 20, duration: 0.25 }}
      className={`relative border ${borderClass} ${bgClass} p-4 rounded-2xl shadow-md flex flex-col items-center justify-center h-32 w-32 md:h-36 md:w-36 overflow-hidden`}
    >
      {/* Decorative glow - non interactive and cheaper (no big scale) */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.18 }}
        transition={{ duration: 0.22 }}
        className={`pointer-events-none absolute inset-0 rounded-2xl ${
          darkMode ? 'bg-gradient-to-br from-indigo-500/30 via-purple-500/25 to-pink-500/20'
                   : 'bg-gradient-to-br from-indigo-400/20 via-purple-400/15 to-pink-400/12'
        } blur-lg`}
      />

      {/* Logo */}
      {logo ? (
        <img
          src={logo}
          alt={skill}
          className="relative z-10 h-12 w-12 object-contain"
          style={{ maxWidth: '64px', maxHeight: '64px' }}
        />
      ) : (
        <p className={`relative z-10 font-semibold text-center text-sm ${textClass}`}>{skill}</p>
      )}

      {/* Skill name: VISIBLE siempre (no dependemos del hover) */}
      <p className={`relative z-10 mt-2 text-sm font-medium ${textClass} text-center`}>
        {skill}
      </p>
    </motion.div>
  );
}
