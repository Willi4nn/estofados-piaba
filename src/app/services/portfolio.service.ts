import { PROJECTS_DATA } from '@/data/projects';
import { R2_URL } from '../constants';
import type { Project } from '../types';

const CACHE_KEY = 'v=20260326';

export const PortfolioService = {
  /**
   * Obtém e transforma os dados brutos de projetos em objetos tipados para a UI.
   */
  getAllProjects(): Project[] {
    return Object.entries(PROJECTS_DATA).flatMap(([category, projects]) =>
      projects.map((project, index) => {
        const images = project.images.filter(Boolean);
        const baseName = category.slice(0, -1);
        const title = project.title || `${baseName} #${index + 1}`;

        return {
          id: `${category.toLowerCase()}-${index}`,
          title,
          category,
          imageUrl: `${R2_URL}${images[0] || ''}?${CACHE_KEY}`,
          allImages: images.map((img) => `${R2_URL}${img}?${CACHE_KEY}`),
          date: project.date,
          description: project.description,
        };
      })
    );
  },

  getCategories(projects: Project[] = []): string[] {
    // Blindagem defensiva: garante que se projects for undefined, tratamos como array vazio
    const safeProjects = Array.isArray(projects) ? projects : [];
    return ['Todos', ...new Set(safeProjects.map((p) => p.category))].sort();
  },
};
