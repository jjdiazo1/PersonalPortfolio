'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Project, getProjectById } from '@/lib/ProjectsData';

// Componente de página de detalle de proyecto
export default function ProjectDetail({ id: propId }: { id?: string | string[] }) {
  const params = useParams();
  const id = propId || params?.id;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Fetch project data
  useEffect(() => {
    const loadProject = async () => {
      if (id) {
        try {
          const projectData = await getProjectById(Array.isArray(id) ? id[0] : id);
          setProject(projectData);
        } catch (error) {
          console.error('Error loading project:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadProject();
  }, [id]);

  // Theme classes
  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const accentClass = darkMode ? 'bg-indigo-600' : 'bg-indigo-500';
  const borderClass = darkMode ? 'border-gray-800' : 'border-gray-200';
  const secondaryTextClass = darkMode ? 'text-gray-400' : 'text-gray-600';

  if (loading) {
    return (
      <div className={`${bgClass} ${textClass} min-h-screen flex items-center justify-center`}>
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className={`${bgClass} ${textClass} min-h-screen flex flex-col items-center justify-center p-4`}>
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-8">The project you're looking for doesn't exist or has been removed.</p>
        <Link href="/" className={`px-6 py-3 ${accentClass} text-white rounded-md`}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className={`${bgClass} ${textClass} min-h-screen font-sans transition-colors duration-300`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <div className={`${bgClass} border-b ${borderClass} transition-colors duration-300`}>
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link href="/" className="text-xl font-bold">Juanjo Diaz</Link>
              
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-sm uppercase tracking-wider">
                  Back to Projects
                </Link>
                
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`p-2 rounded-full border ${borderClass} transition-colors`}
                  aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-20 pb-20">
        <article className="container mx-auto px-4 max-w-6xl">
          {/* Hero */}
          <div className="mb-12">
            <span className={`inline-block px-3 py-1 text-sm rounded ${accentClass} text-white mb-4`}>
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{project.title}</h1>
            
            {/* Hero image */}
            <div className={`w-full aspect-video overflow-hidden rounded-xl border ${borderClass} mb-8`}>
              <img 
                src={project.fullImage} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Project content */}
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3">
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
                <div className={`prose ${textClass} max-w-none`}>
                  <p className="text-lg leading-relaxed mb-6">
                    {project.fullDescription || project.description}
                  </p>
                  
                  {/* Contenido adicional del proyecto - puedes agregar más secciones según necesites */}
                  <h3 className="text-xl font-bold mt-8 mb-4">Challenge</h3>
                  <p className="mb-6">
                    The primary challenge was to create a solution that would effectively meet the needs of the client
                    while maintaining high standards of usability, accessibility, and visual appeal.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-8 mb-4">Solution</h3>
                  <p className="mb-6">
                    We developed a comprehensive approach that combined cutting-edge technology with thoughtful
                    design to create a seamless and engaging user experience that fulfilled all project requirements.
                  </p>
                  
                  <h3 className="text-xl font-bold mt-8 mb-4">Results</h3>
                  <p>
                    The final product exceeded client expectations, resulting in improved engagement metrics
                    and positive feedback from users. The project demonstrates our ability to deliver
                    high-quality solutions that combine technical excellence with compelling design.
                  </p>
                </div>
              </div>
              
              {/* Project gallery */}
              <div className="mb-10">
                <h2 className="text-2xl font-bold mb-6">Project Gallery</h2>
                <div className="grid grid-cols-2 gap-4">
                  {/* Imágenes del proyecto con verificación segura */}
                  {project.additionalImages?.map((image, index) => (
                    <div key={`image-${index}`} className={`border ${borderClass} rounded-lg overflow-hidden aspect-video`}>
                      <img src={image} alt={`${project.title} image ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                  
                  {/* Si no hay suficientes imágenes adicionales, mostramos placeholders */}
                  {Array.from({ length: 4 - (project.additionalImages?.length || 0) }).map((_, index) => (
                    <div 
                      key={`placeholder-${index}`} 
                      className={`border ${borderClass} rounded-lg overflow-hidden aspect-video bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}
                    >
                      <span className={`${secondaryTextClass} text-sm`}>Image Placeholder</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar with project info */}
            <div className="lg:w-1/3">
              <div className={`border ${borderClass} rounded-lg p-6 sticky top-28`}>
                <h2 className="text-xl font-bold mb-6">Project Details</h2>
                
                <div className="space-y-6">
                  {project.client && (
                    <div>
                      <h3 className="text-sm uppercase font-semibold mb-2">Client</h3>
                      <p>{project.client}</p>
                    </div>
                  )}
                  
                  {project.role && (
                    <div>
                      <h3 className="text-sm uppercase font-semibold mb-2">My Role</h3>
                      <p>{project.role}</p>
                    </div>
                  )}
                  
                  {project.year && (
                    <div>
                      <h3 className="text-sm uppercase font-semibold mb-2">Year</h3>
                      <p>{project.year}</p>
                    </div>
                  )}
                  
                  {project.timeline && (
                    <div>
                      <h3 className="text-sm uppercase font-semibold mb-2">Timeline</h3>
                      <p>{project.timeline}</p>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-sm uppercase font-semibold mb-2">Technologies</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map(tag => (
                        <span key={tag} className={`text-sm px-3 py-1 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {project.liveUrl && (
                    <div className="pt-4">
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className={`block w-full py-3 text-center ${accentClass} text-white rounded-md transition-transform hover:scale-105`}
                      >
                        View Live Project
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Navegación entre proyectos */}
          <div className={`flex justify-between items-center mt-20 pt-10 border-t ${borderClass}`}>
            <Link href={`/project/${project.id > 1 ? project.id - 1 : 6}`} className={`flex items-center text-sm group`}>
              <span className="mr-2">←</span>
              <span className="group-hover:underline">Previous Project</span>
            </Link>
            
            <Link href="/" className={`px-4 py-2 border ${borderClass} rounded-md hover:border-indigo-500 transition-colors`}>
              All Projects
            </Link>
            
            <Link href={`/project/${project.id < 6 ? project.id + 1 : 1}`} className={`flex items-center text-sm group`}>
              <span className="group-hover:underline">Next Project</span>
              <span className="ml-2">→</span>
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className={`${bgClass} ${borderClass} border-t py-8`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`${secondaryTextClass} text-sm`}>
            © {new Date().getFullYear()} Juan Jose Diaz. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}