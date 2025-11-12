'use client'

import React, { useState, useEffect } from 'react';
import { easeOut, motion, Variants } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/ProjectsData';

interface ProjectsSectionProps {
  darkMode: boolean;
  projectsInView: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  darkMode,
  projectsInView
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const { getAllProjects } = await import('@/lib/ProjectsData');
        const projectsData = await getAllProjects();
        setProjects(projectsData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading projects:', error);
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const handleProjectClick = (projectId: number) => {
    router.push(`/project/${projectId}`);
  };

  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut },
    },
  };

  // Layout configurations with VALID Tailwind classes only
  const getLayoutConfig = (index: number) => {
    const layouts = [
      // Layout 0 - Left aligned
      {
        badge: "top-0 left-1/3 transform -translate-x-1/2",
        main: {
          initial: "top-8 left-4",
          hover: "group-hover:left-0 group-hover:-translate-y-2",
          size: "w-64 h-48"
        },
        add1: {
          initial: "top-16 right-8",
          hover: "group-hover:right-0 group-hover:-translate-y-2",
          size: "w-44 h-32"
        },
        add2: {
          initial: "top-44 left-16",
          hover: "group-hover:left-10 group-hover:translate-y-1",
          size: "w-36 h-28"
        }
      },
      // Layout 1 - Center large
      {
        badge: "top-0 right-1/4 transform translate-x-1/2",
        main: {
          initial: "top-6 right-4",
          hover: "group-hover:right-0 group-hover:-translate-y-2",
          size: "w-72 h-48"
        },
        add1: {
          initial: "top-32 left-4",
          hover: "group-hover:left-0 group-hover:translate-y-1",
          size: "w-32 h-32"
        },
        add2: {
          initial: "bottom-0 right-16",
          hover: "group-hover:right-10 group-hover:translate-y-2",
          size: "w-44 h-32"
        }
      },
      // Layout 2 - Right aligned
      {
        badge: "top-0 right-1/3 transform translate-x-1/2",
        main: {
          initial: "top-8 right-4",
          hover: "group-hover:right-0 group-hover:-translate-y-2",
          size: "w-64 h-48"
        },
        add1: {
          initial: "top-20 left-2",
          hover: "group-hover:left-0 group-hover:-translate-y-2",
          size: "w-40 h-36"
        },
        add2: {
          initial: "bottom-0 right-20",
          hover: "group-hover:right-16 group-hover:translate-y-2",
          size: "w-36 h-28"
        }
      }
    ];
    
    return layouts[index % layouts.length];
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-20 px-4 border-t border-b">
        <div className="container mx-auto flex justify-center items-center h-64">
          <div className="w-12 h-12 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className={`py-20 px-4 border-t border-b ${borderClass}`}
    >
      <div className="container mx-auto">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate={projectsInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Projects</h2>
          <p className={`max-w-xl mx-auto ${secondaryTextClass}`}>
            A showcase of my recent work, designs, and creative explorations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
          {projects.map((project, index) => {
            const layout = getLayoutConfig(index);
            
            return (
              <div
                key={project.id}
                className="relative mb-12 group cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                {/* Fixed height container for images */}
                <div className="relative h-72 mb-6 overflow-visible">
                  {/* Badge */}
                  <div className={`absolute ${layout.badge} z-30`}>
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-500 text-white">
                      {project.category}
                    </span>
                  </div>

                  {/* Main image - z-20 */}
                  <motion.div
                    className={`absolute ${layout.main.initial} ${layout.main.size} ${layout.main.hover} rounded-lg overflow-hidden shadow-lg z-20 transition-all duration-300 ease-out`}
                  >
                    <img
                      src={project.image || "/api/placeholder/400/320"}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Additional image 1 - z-10 (behind main) */}
                  {project.additionalImages?.length > 0 && (
                    <motion.div
                      className={`absolute ${layout.add1.initial} ${layout.add1.size} ${layout.add1.hover} rounded-lg overflow-hidden shadow-md z-10 transition-all duration-300 ease-out`}
                    >
                      <img
                        src={project.additionalImages[0] || "/api/placeholder/400/320"}
                        alt={`${project.title} additional view`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}

                  {/* Additional image 2 - z-10 (behind main) */}
                  {project.additionalImages?.length > 1 && (
                    <motion.div
                      className={`absolute ${layout.add2.initial} ${layout.add2.size} ${layout.add2.hover} rounded-lg overflow-hidden shadow-md z-10 transition-all duration-300 ease-out`}
                    >
                      <img
                        src={project.additionalImages[1] || "/api/placeholder/400/320"}
                        alt={`${project.title} third view`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </div>

                {/* Project details - Always visible */}
                <div className="relative z-30">
                  <h3 className="text-xl font-bold text-indigo-500 mb-2">
                    {project.title}
                  </h3>
                  <p className={`${secondaryTextClass} mb-3 text-sm line-clamp-2`}>
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag} 
                        className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View project link */}
                  <motion.div
                    className="inline-flex items-center text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Project
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-1" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;