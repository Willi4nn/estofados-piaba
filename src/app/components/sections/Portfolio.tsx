'use client';
import { Images, Plus } from 'lucide-react';
import Image from 'next/image';
import { memo, useCallback, useMemo, useState } from 'react';
import { PORTFOLIO } from '../../constants';
import { Lightbox } from '../ui/Lightbox';

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [visibleItems, setVisibleItems] = useState(6);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // FIX: deps corretas — embora PORTFOLIO seja constante, fica semanticamente
  // correto e à prova de futuras mudanças (ex: PORTFOLIO vir de uma prop/context).
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

  // FIX: slice dentro de useMemo para não recomputar a cada render.
  const visibleProjects = useMemo(
    () => filtered.slice(0, visibleItems),
    [filtered, visibleItems]
  );

  const handleOpenLightbox = useCallback((index: number) => {
    setSelectedIdx(index);
  }, []);

  // FIX: onNext e onPrev memoizados com useCallback, evitando recriação
  // inline a cada render e re-mounts desnecessários no Lightbox.
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
    <section id="portfolio" className="py-10 md:py-24 bg-stone-100">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header & Filtros */}
        <header className="text-center mb-10">
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-2">
            Nosso Portfólio
          </h2>
          <h3 className="font-serif text-2xl md:text-4xl text-primary mb-8">
            Galeria de Projetos
          </h3>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setVisibleItems(6);
                }}
                className={`px-4 py-2 rounded-full text-1xs md:text-2xs font-medium transition-all border ${
                  activeFilter === cat
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {visibleProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={handleOpenLightbox}
            />
          ))}
        </div>

        {/* Feedback Vazio */}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-stone-500">
            Nenhum projeto encontrado.
          </div>
        )}

        {/* Botão Carregar Mais */}
        {visibleItems < filtered.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleItems((prev) => prev + 6)}
              className="group inline-flex items-center px-6 py-3 bg-white border border-stone-300 text-stone-700 rounded-sm hover:border-primary transition-all uppercase text-xs font-bold tracking-widest"
            >
              Carregar Mais{' '}
              <Plus className="ml-2 w-4 h-4 group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        )}
      </div>

      {/* FIX: Renderização condicional — Lightbox só monta (e só registra
          event listeners / hooks) quando realmente está aberto. */}
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

// Componente de Card Extraído
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
      className="group relative overflow-hidden h-48 md:h-80 rounded-sm cursor-pointer shadow-sm hover:shadow-xl transition-all"
    >
      <Image
        src={project.imageUrl}
        alt={`${project.title} - Reforma de ${project.category.toLowerCase()} em Patos de Minas - Estofaria Piaba`}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {project.allImages.length > 1 && (
        <div className="absolute top-2 left-2 z-10 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-sm text-sm flex items-center gap-1">
          <Images size={16} /> +{project.allImages.length - 1}
        </div>
      )}

      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="absolute bottom-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all">
        <p className="text-[10px] text-stone-300 uppercase tracking-widest">
          {project.category}
        </p>
        <h4 className="text-white font-serif text-sm md:text-lg">
          {project.title}
        </h4>
      </div>
    </div>
  )
);

ProjectCard.displayName = 'ProjectCard';
