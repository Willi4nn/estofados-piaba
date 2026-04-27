'use client';
import { motion } from 'framer-motion';
import { Images, Plus } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useMemo, useState } from 'react';
import { PORTFOLIO } from '../../constants';
import { Button } from '../ui/Button';
import { Lightbox } from '../ui/Lightbox';

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [visibleItems, setVisibleItems] = useState(6);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const categories = useMemo(
    () => ['Todos', ...new Set(PORTFOLIO.map((p) => p.category))].sort(),
    []
  );

  const filtered = useMemo(
    () =>
      activeFilter === 'Todos'
        ? PORTFOLIO
        : PORTFOLIO.filter((p) => p.category === activeFilter),
    [activeFilter]
  );

  const visibleProjects = useMemo(
    () => filtered.slice(0, visibleItems),
    [filtered, visibleItems]
  );

  const handleOpenLightbox = useCallback((index: number) => {
    setSelectedIdx(index);
  }, []);

  const handleNext = useCallback(() => {
    setSelectedIdx((prev) =>
      prev !== null && prev < filtered.length - 1 ? prev + 1 : prev
    );
  }, [filtered.length]);

  const handlePrev = useCallback(() => {
    setSelectedIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedIdx(null);
  }, []);

  const selectedProject = selectedIdx !== null ? filtered[selectedIdx] : null;

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xs md:text-sm font-bold text-secondary-800 uppercase tracking-widest mb-2">
              Nosso Portfólio
            </h2>
            <h3 className="font-serif text-3xl md:text-4xl text-secondary-900 mb-6 tracking-tight">
              Galeria de Projetos
            </h3>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setVisibleItems(6);
                }}
                className={`px-4 py-2 rounded-full text-xs md:text-[13px] font-medium tracking-wide transition-all duration-300 border ${
                  activeFilter === cat
                    ? 'bg-secondary-900 text-white border-secondary-900 shadow-md'
                    : 'bg-white text-text-secondary border-border-light hover:bg-primary-50 hover:text-primary-600 hover:border-primary-500/30 hover:shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <ProjectCard
                project={project}
                index={index}
                onClick={handleOpenLightbox}
              />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-secondary">
            Nenhum projeto encontrado.
          </div>
        )}

        {visibleItems < filtered.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-10 md:mt-12 text-center"
          >
            <Button
              variant="outline"
              onClick={() => setVisibleItems((prev) => prev + 6)}
              className="gap-2 group"
            >
              Carregar Mais
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>

      {selectedIdx !== null && (
        <Lightbox
          isOpen
          images={selectedProject?.allImages}
          title={selectedProject?.title}
          onClose={handleCloseLightbox}
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={selectedIdx < filtered.length - 1}
          hasPrev={selectedIdx > 0}
        />
      )}
    </section>
  );
}

type Project = {
  id: string | number;
  title: string;
  category: string;
  imageUrl: string;
  allImages: string[];
};

const ProjectCard = memo(
  ({
    project,
    index,
    onClick,
  }: {
    project: Project;
    index: number;
    onClick: (idx: number) => void;
  }) => (
    <div
      onClick={() => onClick(index)}
      className="group relative overflow-hidden aspect-[4/3] rounded-xl cursor-pointer shadow-sm hover:shadow-xl hover:shadow-secondary-900/10 transition-all duration-500 border border-border-light bg-surface"
    >
      <Image
        src={project.imageUrl}
        alt={`${project.title} - Reforma de ${project.category.toLowerCase()} em Patos de Minas`}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-[0.16,1,0.3,1] group-hover:scale-105"
      />

      {project.allImages.length > 1 && (
        <div className="absolute top-3 left-3 z-10 bg-secondary-950/80 backdrop-blur-md text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium flex items-center gap-1 shadow-sm border border-white/10">
          <Images size={14} /> +{project.allImages.length - 1}
        </div>
      )}

      {/* Overlay mais sutil e enxuto */}
      <div className="absolute inset-0 bg-linear-to-t from-secondary-950/80 via-secondary-950/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Textos com margens menores para caberem bem em telas pequenas */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 w-full flex flex-col justify-end h-full">
        <p className="text-[9px] md:text-[10px] text-primary-500 font-bold uppercase tracking-[0.2em] mb-1 transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-500 delay-100">
          {project.category}
        </p>
        <h4 className="text-white font-serif text-sm md:text-xl leading-tight transform -translate-y-1 group-hover:translate-y-0 transition-transform duration-500 delay-75 line-clamp-2">
          {project.title}
        </h4>
      </div>
    </div>
  )
);

ProjectCard.displayName = 'ProjectCard';
