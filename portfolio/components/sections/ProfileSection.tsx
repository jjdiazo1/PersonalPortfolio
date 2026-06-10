'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

interface ProfileSectionProps {
  darkMode: boolean;
}

export default function ProfileSection({ darkMode }: ProfileSectionProps) {
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} id="profile" className={`py-20 px-4 border-b ${borderClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto flex flex-col items-center text-center space-y-6"
      >
        <h2 className="text-4xl font-bold mb-4">Profile</h2>
        <div className={`border ${borderClass} p-8 rounded-lg`}>
          <div className="relative w-32 h-32 mx-auto mb-6 group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-0 transition-opacity group-hover:opacity-20"></div>
            <Image
              src="/Profile.jpg"
              alt="Profile"
              fill
              className={`rounded-full object-cover border-4 ${borderClass} relative z-10`}
            />
          </div>
          <p className="text-lg mb-4">
            I am a dedicated, hardworking software engineering and computer science student at
            Universidad de Los Andes, with a calm and collaborative mindset.
          </p>
          <p className={`${secondaryTextClass}`}>
            I continuously seek to improve my technical expertise, leverage innovative solutions, 
            and enhance teamwork to deliver exceptional results.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
