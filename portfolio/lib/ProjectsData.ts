// Definición del tipo Project
export interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    fullDescription: string;
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
  
  // Función para obtener todos los proyectos
  export async function getAllProjects(): Promise<Project[]> {
    try {
      // En un entorno real, podrías hacer una solicitud API aquí
      // Por ahora, simplemente importamos el archivo JSON
      const projectsData = await import('../lib/projects.json');
      
      // Verificamos que projectsData.projects exista y sea un array
      if (projectsData && Array.isArray(projectsData.projects)) {
        return projectsData.projects;
      } else {
        console.warn('Projects data is not in expected format');
        return [];
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      return [];
    }
  }
  
  // Función para obtener un proyecto por su ID
  export async function getProjectById(id: number | string): Promise<Project | null> {
    try {
      const numericId = typeof id === 'string' ? parseInt(id) : id;
      const projects = await getAllProjects();
      return projects.find(project => project.id === numericId) || null;
    } catch (error) {
      console.error('Error finding project:', error);
      return null;
    }
  }
  
  // Exportar un hook personalizado para proyectos (opcional)
  export function useProjects() {
    // Aquí podrías implementar lógica adicional, como ordenamiento o filtrado
    return { getAllProjects, getProjectById };
  }