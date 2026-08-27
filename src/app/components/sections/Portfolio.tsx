'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
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
                className={`px-5 py-2 md:py-2.5 rounded-full text-xs md:text-[13px] font-bold tracking-wide transition-all duration-300 border uppercase ${
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

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4"
          layout
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                // Suavizamos a animação inicial para não atrapalhar o LCP
                initial={{ opacity: 0.5, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.4,
                  delay: index < 6 ? 0 : index * 0.05, // Removemos o delay dos primeiros cards!
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
