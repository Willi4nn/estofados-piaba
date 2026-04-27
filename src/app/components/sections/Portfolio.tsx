'use client';
import { AnimatePresence, motion } from 'framer-motion';
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
    <section id="portfolio" className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xs md:text-sm font-bold text-secondary-800 uppercase tracking-widest mb-3">
              Nosso Portfólio
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl text-secondary-900 mb-10 tracking-tight">
              Galeria de Projetos
            </h3>
          </motion.div>

          {/* Filtros */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap justify-center gap-2 md:gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setVisibleItems(6);
                }}
                className={`px-5 py-2 md:py-2.5 rounded-full text-xs md:text-[13px] font-medium tracking-wide transition-all duration-300 border ${
                  activeFilter === cat
                    ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                    : 'bg-white text-text-secondary border-border-light hover:bg-primary-50 hover:text-primary-600 hover:border-primary-500/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </header>

        {/* Grid com AnimatePresence para suavizar a troca de filtros */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8"
          layout // Permite que os cards se movam suavemente ao filtrar
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05, // Stagger effect suave
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
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-secondary">
            Nenhum projeto encontrado nesta categoria.
          </div>
        )}

        {/* Botão Carregar Mais */}
        {visibleItems < filtered.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button
              variant="outline"
              onClick={() => setVisibleItems((prev) => prev + 6)}
              className="gap-2 group px-8"
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
      className="group relative overflow-hidden aspect-[4/3] rounded-2xl cursor-pointer shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500 border border-border-light bg-surface"
    >
      <Image
        src={project.imageUrl}
        alt={`${project.title} - Reforma de ${project.category.toLowerCase()} em Patos de Minas - Estofaria Piaba`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
      />

      {project.allImages.length > 1 && (
        <div className="absolute top-4 left-4 z-10 bg-secondary-950/70 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-sm border border-white/10">
          <Images size={14} /> +{project.allImages.length - 1}
        </div>
      )}

      {/* Overlay escuro que sobe do rodapé */}
      <div className="absolute inset-0 bg-linear-to-t from-secondary-950/90 via-secondary-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Informações do projeto */}
      <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1] w-full flex flex-col justify-end h-full">
        <p className="text-[10px] text-primary-500 font-bold uppercase tracking-[0.2em] mb-2 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">
          {project.category}
        </p>
        <h4 className="text-white font-serif text-xl md:text-2xl leading-tight transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-[100ms] line-clamp-2">
          {project.title}
        </h4>
      </div>
    </div>
  )
);

ProjectCard.displayName = 'ProjectCard';
