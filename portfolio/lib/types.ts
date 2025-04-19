export interface Project {
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