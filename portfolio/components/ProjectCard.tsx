import { motion } from 'framer-motion';
import { Project } from '@/lib/types'; // Asegúrate de que la ruta sea correcta

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
  index: number;
  darkMode: boolean;
}

export default function ProjectCard({ project, onClick, index, darkMode }: ProjectCardProps) {
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group cursor-pointer border ${borderClass} overflow-hidden rounded-lg`}
      onClick={() => onClick(project)}
    >
      <div className="relative overflow-hidden aspect-video">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <span className="inline-block px-2 py-1 text-xs rounded bg-indigo-500 text-white mb-2">
              {project.category}
            </span>
            <h3 className="text-white font-bold text-lg">{project.title}</h3>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{project.title}</h3>
        <p className={`text-sm ${secondaryTextClass} mb-4`}>
          {project.description.substring(0, 100)}...
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <span key={tag} className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}