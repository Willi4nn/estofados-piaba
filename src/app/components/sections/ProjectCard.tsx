import { Images } from 'lucide-react';
import Image from 'next/image';
import { memo } from 'react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (idx: number) => void;
}

export const ProjectCard = memo(
  ({ project, index, onClick }: ProjectCardProps) => (
    <button
      type="button"
      onClick={() => onClick(index)}
      className="group relative w-full overflow-hidden aspect-4/3 rounded-lg cursor-pointer shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500 border border-border-light bg-surface text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      aria-label={`Ver detalhes do projeto: ${project.title}`}
    >
      <Image
        src={project.imageUrl}
        alt={`${project.title} - Reforma de ${project.category.toLowerCase()}`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
      />

      {project.allImages.length > 1 && (
        <div className="absolute top-4 left-4 z-10 bg-secondary-950/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm border border-white/10">
          <Images size={14} aria-hidden="true" /> +
          {project.allImages.length - 1}
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-secondary-950/90 via-secondary-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1] flex flex-col justify-end">
        <p className="text-[10px] text-primary-500 font-bold uppercase tracking-[0.2em] mb-2">
          {project.category}
        </p>
        <h4 className="text-white font-serif text-xl md:text-2xl leading-tight line-clamp-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
          {project.title}
        </h4>
      </div>
    </button>
  )
);

ProjectCard.displayName = 'ProjectCard';
