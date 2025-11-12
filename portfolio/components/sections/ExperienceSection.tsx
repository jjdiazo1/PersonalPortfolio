'use client'

import { motion } from 'framer-motion';

interface ExperienceSectionProps {
  darkMode: boolean;
}

export default function ExperienceSection({ darkMode }: ExperienceSectionProps) {
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';

  const jobs = [
    {
      title: "Graphic Designer - Pilos Creativos",
      period: "Jan 2022 - Apr 2022",
      tasks: [
        "Designed custom graphics as per client requests.",
        "Managed social media pages & created innovative posts."
      ],
      logo: "/Pilos.jpg"
    },
    {
      title: "Translator - Juan Maria Hotel",
      period: "Nov 2019 - Jan 2020",
      tasks: [
        "Provided translation services to international clientele.",
        "Enhanced hotel's catalog & updated visual materials."
      ],
      logo: "/Hotel.png"
    }
  ];

  return (
    <section id="experience" className={`py-20 px-4 border-b ${borderClass}`}>
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
        <div className="grid grid-cols-1 gap-6">
          {jobs.map(job => (
            <div key={job.title} className={`border ${borderClass} p-6 rounded-lg hover:scale-[1.02] transition-transform`}>
              <div className="flex flex-wrap">
                <div className="w-full md:w-3/4 pr-0 md:pr-8">
                  <h3 className="font-bold text-xl uppercase mb-1">{job.title}</h3>
                  <p className={`text-sm ${secondaryTextClass} mb-4`}>{job.period}</p>
                  <ul className="list-disc pl-5 space-y-1">{job.tasks.map(task => <li key={task}>{task}</li>)}</ul>
                </div>
                <div className="w-full md:w-1/4 mt-4 md:mt-0 flex justify-center items-center">
                  <div className={`h-24 w-24 rounded-lg border ${borderClass} flex items-center justify-center overflow-hidden`}>
                    <img src={job.logo} alt="Company Logo" className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
