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
    title: "Co-Founder & AI Developer",
    company: "Early to Wear",
    period: "Mar 2024 - Present",
    location: "Lyon, France (Hybrid)",
    tasks: [
      "Built an AI-powered fashion recommendation platform integrating image embeddings and vector databases.",
      "Developed the frontend with Next.js and the backend using Python and FastAPI.",
      "Worked on AI models for trend analysis and personalized outfit generation."
    ],
    logo: "/Logos/etw.png"
  },
  {
    title: "Teaching Assistant – Mobile Application Development (iOS)",
    company: "Universidad de los Andes - Colombia",
    period: "Aug 2025 - Present",
    location: "Remote",
    tasks: [
      "Focused on building cross-platform apps using Flutter (Dart) and native iOS (Swift).",
      "Assisted students in debugging and improving mobile app performance.",
      "Supported the design and implementation of best UI/UX practices in apps."
    ],
    logo: "/Logos/uniandes.png"
  },
  {
    title: "Full Stack Developer",
    company: "Hotel Juan María",
    period: "Dec 2024 - Aug 2025",
    location: "Remote",
    tasks: [
      "Developed and maintained web systems using Next.js and Payload CMS.",
      "Integrated database solutions and optimized site performance.",
      "Contributed to improving the hotel's digital experience for clients."
    ],
    logo: "/Logos/hotel.png"
  },
  {
    title: "Graphic Designer",
    company: "Pilos Creativos",
    period: "Jan 2022 - Apr 2022",
    location: "Tuluá, Valle del Cauca, Colombia (On-site)",
    tasks: [
      "Designed custom graphics and marketing materials per client requests.",
      "Managed social media presence and created innovative digital campaigns."
    ],
    logo: "/Logos/Pilos.jpg"
  }
];


  return (
    <section id="experience" className={`py-20 px-4 border-b ${borderClass}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-4xl font-bold text-center mb-12">Experience</h2>
        <div className="grid grid-cols-1 gap-8">
          {jobs.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, rotateX: 2 }}
              className={`border ${borderClass} p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex-1">
                  <h3 className="font-bold text-xl uppercase mb-1">{job.title}</h3>
                  <p className={`text-sm ${secondaryTextClass} mb-4`}>{job.period}</p>
                  <ul className="list-disc pl-5 space-y-1">
                    {job.tasks.map(task => (
                      <li key={task}>{task}</li>
                    ))}
                  </ul>
                </div>
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  className={`h-24 w-24 rounded-lg border ${borderClass} flex items-center justify-center overflow-hidden shadow-sm`}
                >
                  <img src={job.logo} alt="Company Logo" className="object-contain w-full h-full" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
