'use client'

import { useEffect, useState } from 'react';

interface Skill {
  skill: string;
  logo: string;
}

interface SkillsCarouselProps {
  darkMode: boolean;
}

export default function SkillsCarousel({ darkMode }: SkillsCarouselProps) {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    // Fetch skills from JSON
    fetch('/skills.json')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setSkills(data))
      .catch(() => {
        // Fallback data if fetch fails
        setSkills([
          { skill: "Python", logo: "/Logos/python.png" },
          { skill: "Java", logo: "/Logos/java.png" },
        ]);
      });
  }, []);

  // Duplicate skills for seamless infinite scroll
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className={`py-12 ${darkMode ? 'bg-gray-900/50' : 'bg-gray-50/50'} backdrop-blur-sm`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h3 className={`text-sm font-medium tracking-wider uppercase ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Technologies & Tools
          </h3>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient masks */}
          <div className={`absolute left-0 top-0 bottom-0 w-24 z-10 ${darkMode ? 'bg-gradient-to-r from-gray-900 to-transparent' : 'bg-gradient-to-r from-gray-50 to-transparent'}`} />
          <div className={`absolute right-0 top-0 bottom-0 w-24 z-10 ${darkMode ? 'bg-gradient-to-l from-gray-900 to-transparent' : 'bg-gradient-to-l from-gray-50 to-transparent'}`} />

          {/* Scrolling container */}
          <div className="flex animate-scroll hover:pause">
            {duplicatedSkills.map((skill, index) => (
              <div
                key={`${skill.skill}-${index}`}
                className={`flex-shrink-0 mx-8 group`}
              >
                <div className={`flex flex-col items-center gap-3 p-4 rounded-lg transition-all duration-300 ${
                  darkMode 
                    ? 'hover:bg-gray-800/50' 
                    : 'hover:bg-white/50'
                }`}>
                  <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-110">
                    <img
                      src={skill.logo}
                      alt={skill.skill}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-600 group-hover:text-gray-900'} transition-colors`}>
                    {skill.skill}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}