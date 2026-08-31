'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Plus, SearchX } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { PortfolioService } from '../../services/portfolio.service';
import { Button } from '../ui/Button';
import { Lightbox } from '../ui/Lightbox';
import { ProjectCard } from './ProjectCard';

export function Portfolio() {
  const allProjects = useMemo(() => PortfolioService.getAllProjects(), []);
  const categories = useMemo(
    () => PortfolioService.getCategories(allProjects),
    [allProjects]
  );

  const [activeFilter, setActiveFilter] = useState('Todos');
  const [visibleItems, setVisibleItems] = useState(6);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      activeFilter === 'Todos'
        ? allProjects
        : allProjects.filter((p) => p.category === activeFilter),
    [activeFilter, allProjects]
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
    <section id="portfolio" className="py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-xs md:text-sm font-bold text-primary-600 uppercase tracking-[0.2em] mb-4">
              Nosso Portfólio
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-secondary-900 mb-8 tracking-tight text-balance">
              Galeria de Projetos
            </h3>
          </motion.div>

          {/* FILTROS: Scroll horizontal no mobile, centralizado no desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex overflow-x-auto justify-start md:justify-center gap-2 pb-4 -mb-4 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveFilter(cat);
                    setVisibleItems(6);
                  }}
                  aria-pressed={isActive}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-medium tracking-wide whitespace-nowrap transition-colors duration-300 z-10 uppercase ${
                    isActive
                      ? 'text-white'
                      : 'text-secondary-600 hover:text-primary-600 bg-secondary-50 md:bg-transparent'
                  }`}
                >
                  {/* Pílula de fundo animada para o item ativo */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBubble"
                      className="absolute inset-0 bg-primary-500 rounded-full -z-10 shadow-md"
                      transition={{
                        type: 'spring',
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                  {cat}
                </button>
              );
            })}
          </motion.div>
        </header>

        {/* GRID DE PROJETOS */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.5,
                  delay: index < visibleItems ? index * 0.05 : 0,
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

        {/* EMPTY STATE */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 bg-secondary-50 rounded-full flex items-center justify-center mb-4">
                <SearchX className="w-8 h-8 text-secondary-400" />
              </div>
              <p className="text-secondary-600 text-lg font-medium">
                Nenhum projeto encontrado.
              </p>
              <p className="text-secondary-400 text-sm mt-1">
                Tente selecionar outra categoria.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTÃO CARREGAR MAIS */}
        {visibleItems < filtered.length && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-24 text-center"
          >
            <Button
              variant="outline"
              onClick={() => setVisibleItems((prev) => prev + 6)}
              className="gap-2 group px-8 py-3 rounded-full border-secondary-200 text-secondary-800 hover:border-primary-500 hover:text-primary-600"
            >
              Carregar Mais Projetos
              <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* LIGHTBOX */}
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
