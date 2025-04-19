'use client'

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/ProjectsData';

// Define props interface
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
  
  // Load projects from ProjectsData service
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

  // Navigate to project detail page
  const handleProjectClick = (projectId: number) => {
    router.push(`/project/${projectId}`);
  };

  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.12, 0, 0.39, 0] }
    }
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
        
        {/* Projects grid - preserving the original design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-20">
          {/* First Project - School of Architecture */}
          {projects[0] && (
            <div 
              className="relative mb-12 group cursor-pointer" 
              onClick={() => handleProjectClick(projects[0].id)}
            >
              {/* Images group with collapse-expand hover behavior */}
              <div className="relative h-64 mb-6">
                {/* Badge */}
                <div className="absolute top-0 left-1/3 z-30 transform -translate-x-1/2">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-500 text-white">
                    {projects[0].category}
                  </span>
                </div>
                
                {/* Main image */}
                <motion.div 
                  className="absolute top-7 left-4 w-64 rounded-lg overflow-hidden shadow-md z-10
                            group-hover:left-0 group-hover:-translate-y-2 transition-all duration-300"
                >
                  <img 
                    src={projects[0].image || "/api/placeholder/400/320"} 
                    alt={projects[0].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Additional image 1 */}
                {projects[0].additionalImages?.length > 0 && (
                  <motion.div 
                    className="absolute top-16 right-8 w-44 h-32 rounded-lg overflow-hidden shadow-md z-20
                              group-hover:right-0 group-hover:-translate-y-2 transition-all duration-300"
                  >
                    <img 
                      src={projects[0].additionalImages[0] || "/api/placeholder/400/320"} 
                      alt={`${projects[0].title} additional view`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
                
                {/* Additional image 2 */}
                {projects[0].additionalImages?.length > 1 && (
                  <motion.div 
                    className="absolute top-40 left-16 w-36 h-28 rounded-lg overflow-hidden shadow-md z-20
                              group-hover:left-10 group-hover:translate-y-1 transition-all duration-300"
                  >
                    <img 
                      src={projects[0].additionalImages[1] || "/api/placeholder/400/320"} 
                      alt={`${projects[0].title} third view`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </div>
              
              {/* Project details */}
              <div>
                <h3 className="text-xl font-bold text-indigo-500 mb-2">{projects[0].title}</h3>
                <p className={`${secondaryTextClass} mb-3 text-sm`}>
                  {projects[0].description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[0].tags.slice(0, 3).map(tag => (
                    <span key={tag} className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
            </div>
          )}
          
          {/* Second Project - Pavilion Website */}
          {projects[1] && (
            <div 
              className="relative mb-12 group cursor-pointer" 
              onClick={() => handleProjectClick(projects[1].id)}
            >
              <div className="relative h-64 mb-6">
                {/* Badge */}
                <div className="absolute top-0 right-1/4 z-30 transform translate-x-1/2">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-500 text-white">
                    {projects[1].category}
                  </span>
                </div>
                
                {/* Main image (larger, centered) */}
                <motion.div 
                  className="absolute top-5 right-4 w-72 h-48 rounded-lg overflow-hidden shadow-md z-20
                            group-hover:right-0 group-hover:-translate-y-2 transition-all duration-300"
                >
                  <img 
                    src={projects[1].image || "/api/placeholder/400/320"} 
                    alt={projects[1].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Additional image 1 */}
                {projects[1].additionalImages?.length > 0 && (
                  <motion.div 
                    className="absolute top-28 left-4 w-32 h-32 rounded-lg overflow-hidden shadow-md z-10
                              group-hover:left-0 group-hover:translate-y-1 transition-all duration-300"
                  >
                    <img 
                      src={projects[1].additionalImages[0] || "/Pilos.jpg"} 
                      alt={`${projects[1].title} additional view`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
                
                {/* Additional image 2 */}
                {projects[1].additionalImages?.length > 1 && (
                  <motion.div 
                    className="absolute bottom-0 right-16 w-44 h-32 rounded-lg overflow-hidden shadow-md z-10
                              group-hover:right-10 group-hover:translate-y-2 transition-all duration-300"
                  >
                    <img 
                      src={projects[1].additionalImages[1] || "/Hotel.png"} 
                      alt={`${projects[1].title} third view`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </div>
              
              {/* Project details */}
              <div>
                <h3 className="text-xl font-bold text-indigo-500 mb-2">{projects[1].title}</h3>
                <p className={`${secondaryTextClass} mb-3 text-sm`}>
                  {projects[1].description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[1].tags.slice(0, 3).map(tag => (
                    <span key={tag} className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
            </div>
          )}
          
          {/* Third Project - Times to Listen */}
          {projects[2] && (
            <div 
              className="relative mb-12 group cursor-pointer" 
              onClick={() => handleProjectClick(projects[2].id)}
            >
              <div className="relative h-64 mb-6">
                {/* Badge */}
                <div className="absolute top-0 right-1/3 z-30 transform translate-x-1/2">
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-500 text-white">
                    {projects[2].category}
                  </span>
                </div>
                
                {/* Main image */}
                <motion.div 
                  className="absolute top-7 right-4 w-64 rounded-lg overflow-hidden shadow-md z-10
                            group-hover:right-0 group-hover:-translate-y-2 transition-all duration-300"
                >
                  <img 
                    src={projects[2].image || "/api/placeholder/400/320"} 
                    alt={projects[2].title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                
                {/* Additional image 1 */}
                {projects[2].additionalImages?.length > 0 && (
                  <motion.div 
                    className="absolute top-20 left-2 w-40 h-36 rounded-lg overflow-hidden shadow-md z-20
                               group-hover:left-0 group-hover:-translate-y-2 transition-all duration-300"
                  >
                    <img 
                      src={projects[2].additionalImages[0] || "/api/placeholder/400/320"} 
                      alt={`${projects[2].title} additional view`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
                
                {/* Additional image 2 */}
                {projects[2].additionalImages?.length > 1 && (
                  <motion.div 
                    className="absolute bottom-0 right-20 w-36 h-28 rounded-lg overflow-hidden shadow-md z-20
                              group-hover:right-16 group-hover:translate-y-2 transition-all duration-300"
                  >
                    <img 
                      src={projects[2].additionalImages[1] || "/api/placeholder/400/320"} 
                      alt={`${projects[2].title} third view`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </div>
              
              {/* Project details */}
              <div>
                <h3 className="text-xl font-bold text-indigo-500 mb-2">{projects[2].title}</h3>
                <p className={`${secondaryTextClass} mb-3 text-sm`}>
                  {projects[2].description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[2].tags.slice(0, 3).map(tag => (
                    <span key={tag} className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
            </div>
          )}
          
          {/* Remaining projects with dynamic creation and custom layouts */}
          {projects.slice(3).map((project, index) => {
            // Use a different layout for each remaining project
            const layoutStyles = [
              // Asterism layout
              {
                mainImage: "top-8 left-4 w-64 h-44 group-hover:left-0 group-hover:-translate-y-2",
                addImage1: "top-16 right-8 w-36 h-36 group-hover:right-2 group-hover:-translate-y-2",
                addImage2: "bottom-0 left-18 w-32 h-28 group-hover:left-14 group-hover:translate-y-2"
              },
              // Web Literacy layout
              {
                mainImage: "top-6 right-4 w-60 h-40 group-hover:right-0 group-hover:-translate-y-2",
                addImage1: "top-24 left-4 w-40 h-34 group-hover:left-0 group-hover:translate-y-2",
                addImage2: "bottom-0 right-12 w-34 h-28 group-hover:right-8 group-hover:translate-y-1"
              },
              // Typography layout
              {
                mainImage: "top-10 left-10 w-58 h-38 group-hover:left-6 group-hover:-translate-y-2",
                addImage1: "top-4 right-4 w-44 h-32 group-hover:right-0 group-hover:-translate-y-1",
                addImage2: "bottom-0 left-4 w-36 h-30 group-hover:left-0 group-hover:translate-y-2"
              }
            ];
            
            const style = layoutStyles[index % layoutStyles.length];
            
            return (
              <div 
                key={project.id} 
                className="relative mb-12 group cursor-pointer"
                onClick={() => handleProjectClick(project.id)}
              >
                <div className="relative h-64 mb-6">
                  {/* Badge */}
                  <div className="absolute top-0 left-1/2 z-30 transform -translate-x-1/2">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-indigo-500 text-white">
                      {project.category}
                    </span>
                  </div>
                  
                  {/* Main image */}
                  <motion.div 
                    className={`absolute ${style.mainImage} rounded-lg overflow-hidden shadow-md z-10 transition-all duration-300`}
                  >
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Additional image 1 */}
                  {project.additionalImages?.length > 0 && (
                    <motion.div 
                      className={`absolute ${style.addImage1} rounded-lg overflow-hidden shadow-md z-20 transition-all duration-300`}
                    >
                      <img 
                        src={project.additionalImages[0]} 
                        alt={`${project.title} additional view`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                  
                  {/* Additional image 2 */}
                  {project.additionalImages?.length > 1 && (
                    <motion.div 
                      className={`absolute ${style.addImage2} rounded-lg overflow-hidden shadow-md z-20 transition-all duration-300`}
                    >
                      <img 
                        src={project.additionalImages[1]} 
                        alt={`${project.title} third view`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </div>
                
                {/* Project details */}
                <div>
                  <h3 className="text-xl font-bold text-indigo-500 mb-2">{project.title}</h3>
                  <p className={`${secondaryTextClass} mb-3 text-sm`}>
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={`text-xs px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
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