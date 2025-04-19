'use client'

import React from 'react';
import { motion } from 'framer-motion';

// Using the same Project interface as ModernPortfolio
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  fullImage: string;
  additionalImages: string[];
  client?: string;
  year?: string;
  timeline?: string;
  role?: string;
  liveUrl?: string;
}

// Define props interface with correct typing
interface ProjectsSectionProps {
  darkMode: boolean;
  projects: Project[];
  projectsInView: boolean;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  darkMode, 
  projects, 
  projectsInView 
}) => {
  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.12, 0, 0.39, 0] }
    }
  };

  // Function to determine the layout style for each project
  const getLayoutStyle = (index: number) => {
    const styles = [
      {
        mainImage: "w-full h-44 md:h-48",
        additionalImage1: "-right-3 top-3 w-28 h-28 rotate-3",
        additionalImage2: "-left-4 -bottom-3 w-24 h-24 -rotate-6"
      },
      {
        mainImage: "w-full h-40 md:h-44",
        additionalImage1: "-right-5 -bottom-4 w-32 h-32 rotate-6",
        additionalImage2: "-left-6 top-5 w-20 h-20 -rotate-3"
      },
      {
        mainImage: "w-full h-48 md:h-52",
        additionalImage1: "-left-3 top-4 w-26 h-26 -rotate-3",
        additionalImage2: "-right-4 -bottom-5 w-22 h-22 rotate-6"
      },
      {
        mainImage: "w-full h-44 md:h-48",
        additionalImage1: "-left-5 -bottom-6 w-30 h-30 -rotate-6",
        additionalImage2: "-right-3 top-6 w-24 h-24 rotate-3"
      },
      {
        mainImage: "w-full h-42 md:h-46",
        additionalImage1: "-right-6 top-2 w-28 h-28 rotate-6",
        additionalImage2: "-left-3 -bottom-4 w-22 h-22 -rotate-3"
      },
      {
        mainImage: "w-full h-46 md:h-50",
        additionalImage1: "-left-4 top-5 w-28 h-28 -rotate-4",
        additionalImage2: "-right-5 -bottom-3 w-24 h-24 rotate-6"
      }
    ];
    
    return styles[index % styles.length];
  };

  return (
    <section 
      id="projects" 
      className="py-20 px-4 border-t border-b"
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
        
        {/* Dynamic project grid with visual interest */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {projects.map((project, index) => {
            const style = getLayoutStyle(index);
            
            return (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                initial="hidden"
                animate={projectsInView ? "visible" : "hidden"}
                transition={{ delay: index * 0.1 }}
                className={`
                  mb-8 relative
                  ${index % 3 === 0 ? 'md:mt-0' : ''}
                  ${index % 3 === 1 ? 'md:mt-12' : ''}
                  ${index % 3 === 2 ? 'md:mt-6' : ''}
                `}
              >
                {/* Project images with dynamic composition */}
                <div className="relative mb-4 h-64">
                  {/* Main project image */}
                  <motion.div 
                    className={`absolute z-10 rounded-lg overflow-hidden shadow-md ${style.mainImage}`}
                    whileHover={{ 
                      scale: 1.02, 
                      rotate: -1,
                      y: -5,
                      transition: { duration: 0.3 } 
                    }}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Category badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-500 text-white">
                        {project.category}
                      </span>
                    </div>
                  </motion.div>
                  
                  {/* Additional images - visible by default with different positions per project */}
                  {project.additionalImages && project.additionalImages[0] && (
                    <motion.div 
                      className={`absolute ${style.additionalImage1} rounded-lg overflow-hidden shadow-md z-20`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: '8deg',
                        transition: { duration: 0.3 } 
                      }}
                    >
                      <img 
                        src={project.additionalImages[0]} 
                        alt={`${project.title} additional view`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                  
                  {project.additionalImages && project.additionalImages[1] && (
                    <motion.div 
                      className={`absolute ${style.additionalImage2} rounded-lg overflow-hidden shadow-md z-20`}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: '-8deg',
                        transition: { duration: 0.3 } 
                      }}
                    >
                      <img 
                        src={project.additionalImages[1]} 
                        alt={`${project.title} third view`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </div>
                
                {/* Project information - below the images */}
                <div>
                  <h3 className="text-xl font-bold text-indigo-500 mb-2">{project.title}</h3>
                  <p className={`${secondaryTextClass} mb-3 text-sm`}>
                    {project.description}
                  </p>
                  
                  {/* Tags as pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* View project link */}
                  <motion.a
                    className="inline-flex items-center text-sm font-medium text-indigo-500 hover:text-indigo-600 transition-colors"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;