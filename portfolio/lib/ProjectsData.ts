// Definición del tipo Project
export interface Project {
    heroImage: any;
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


      // {
      //   "id": 6,
      //   "title": "Pawsitivity DogSpa",
      //   "category": "Web Application / UX Design",
      //   "description": "A full-stack pet spa platform with booking, packages, and playful visuals.",
      //   "fullDescription": "Pawsitivity DogSpa is a web application designed to bring joy and convenience to pet owners by offering a seamless digital experience for booking spa services, exploring service packages, filtering locations, and browsing pet products. The platform features real-time package filtering by branch, interactive reservation management, and dynamic service previews with random dog images using DogAPI. Built with a user-centered design, the project emphasizes clarity, accessibility, and a touch of fun through canine-themed elements.",
      //   "tags": ["Website", "Angular", "Spring", "Pet Services", "UX/UI", "DogAPI"],
      //  "image": "/Project 5/1.png",
      //   "fullImage": "/Project 5/6.png",
      //   "additionalImages": ["/Project 5/2.png", "/Project 5/3.png", "/Project 5/3.jpg", "/Project 5/5.jpg"],
      //   "client": "Academic Project – Universidad de Los Andes",
      //   "year": "2025",
      //   "timeline": "2 months",
      //   "role": "Frontend Developer & UX Designer",
      //   "liveUrl": "https://dogspa.vercel.app"
      // }
