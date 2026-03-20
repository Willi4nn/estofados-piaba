'use client';

import {
  AlertCircle,
  Armchair,
  Palette,
  Scissors,
  Sparkles,
} from 'lucide-react';
import { useRef, useState, type ElementType } from 'react';
import { SERVICES } from '../../constants';

const icons: Record<string, ElementType> = {
  Sofa: Armchair,
  Scissors: Scissors,
  Sparkles: Sparkles,
  Palette: Palette,
  Default: AlertCircle,
};

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollIndex = Math.round(scrollLeft / clientWidth);
      setActiveIndex(scrollIndex);
    }
  };

  return (
    <section
      id="services"
      className="py-16 bg-stone-100 pb-10"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xs md:text-sm font-bold text-stone-400 uppercase tracking-[0.2em] mb-3">
            Nossa Expertise
          </h2>
          <h3
            id="services-heading"
            className="font-serif text-3xl md:text-5xl text-stone-800"
          >
            Serviços de <span className="text-primary italic">Estofaria</span>
          </h3>
          <p className="mt-4 text-stone-500 max-w-2xl mx-auto text-sm md:text-base">
            Trazendo vida nova aos seus móveis com maestria artesanal e os
            melhores materiais do mercado em Patos de Minas.
          </p>
        </div>

        {/* Container dos Cards */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4  snap-x snap-mandatory no-scrollbar scroll-smooth items-stretch"
        >
          {SERVICES.map((service) => {
            const Icon = icons[service.iconName] || icons.Default;
            return (
              <div
                key={service.id}
                // CORREÇÃO AQUI: Troquei border-stone-100 para border-stone-200
                // e o hover:border-primary/20 para hover:border-stone-300
                className="min-w-[85vw] mt-1 md:min-w-0 snap-center group relative p-6 bg-white border border-stone-200 rounded-2xl hover:border-stone-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex"
              >
                {/* Gradiente de fundo sutil no hover */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/0 via-transparent to-primary/3 duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Ícone */}
                  <div className="mb-6 md:mb-8 p-4 bg-stone-50 rounded-xl self-start group-hover:bg-primary/5 group-hover:scale-110 transition-all duration-300 border border-stone-100">
                    <Icon
                      className="w-6 h-6 md:w-8 md:h-8 text-stone-600 group-hover:text-primary transition-colors duration-500"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Textos */}
                  <h4 className="font-serif text-xl md:text-2xl mb-3 text-stone-800 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h4>

                  <p className="text-stone-500 leading-relaxed text-sm grow mb-2">
                    {service.description}
                  </p>
                </div>

                {/* Efeito visual decorativo no canto inferior */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bolinhas de paginação mobile */}
        <div className="md:hidden flex justify-center gap-2 mt-2">
          {SERVICES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * scrollRef.current.clientWidth,
                    behavior: 'smooth',
                  });
                }
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-stone-200 hover:bg-stone-300'
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
