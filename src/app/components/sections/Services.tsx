'use client';
import {
  AlertCircle,
  Armchair,
  ChevronRight,
  Scissors,
  Sparkles,
} from 'lucide-react';
import { useRef, useState, type ElementType } from 'react';
import { SERVICES } from '../../constants';

const icons: Record<string, ElementType> = {
  Sofa: Armchair,
  Scissors: Scissors,
  Sparkles: Sparkles,
  Default: AlertCircle,
};

export function Services() {
  // 1. Estado para saber qual slide está ativo (0, 1 ou 2)
  const [activeIndex, setActiveIndex] = useState(0);

  // 2. Referência para pegar o elemento de scroll
  const scrollRef = useRef<HTMLDivElement>(null);

  // 3. Função que calcula qual slide está visível
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      // Calcula o índice arredondando a posição do scroll dividido pela largura
      const scrollIndex = Math.round(scrollLeft / clientWidth);
      setActiveIndex(scrollIndex);
    }
  };

  return (
    <section
      id="services"
      className="py-10 md:py-24 bg-white"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-2">
            Serviços de Estofaria
          </h2>
          <h3
            id="services-heading"
            className="font-serif text-2xl md:text-4xl text-primary"
          >
            Reforma de móveis em Patos de Minas
          </h3>
        </div>

        {/* Container dos Cards */}
        <div
          ref={scrollRef} // Conectamos a referência aqui
          onScroll={handleScroll} // Dispara a função ao rolar
          className="flex overflow-x-auto md:grid md:grid-cols-3 gap-3 md:gap-10 pb-4 md:pb-0 snap-x snap-mandatory no-scrollbar -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
        >
          {SERVICES.map((service) => {
            const Icon = icons[service.iconName] || icons.Default;
            return (
              <div
                key={service.id}
                className="min-w-[85vw] md:min-w-0 snap-center group relative p-5 md:p-8 bg-stone-50 border border-stone-100 hover:shadow-xl hover:border-stone-200 transition-all duration-500 overflow-hidden rounded-sm"
              >
                <div className="absolute top-0 left-0 w-1 h-0 bg-primary group-hover:h-full transition-all duration-500" />

                <div className="flex justify-between items-start">
                  <div className="mb-3 md:mb-5 p-3 md:p-4 bg-white inline-block shadow-sm rounded-full group-hover:scale-110 transition-transform duration-300 relative z-10">
                    <Icon
                      className="w-5 h-5 md:w-8 md:h-8 text-stone-700"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                <h4 className="font-serif text-lg md:text-xl mb-2 md:mb-3 text-primary group-hover:translate-x-2 transition-transform duration-300 relative z-10 flex items-center gap-2">
                  {service.title}
                  <ChevronRight className="w-4 h-4 md:hidden text-stone-400" />
                </h4>

                <p className="text-stone-600 leading-relaxed text-sm mb-3 md:mb-5 relative z-10">
                  {service.description}
                </p>

                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-stone-200/50 rounded-full blur-3xl group-hover:bg-stone-300/50 transition-colors" />
              </div>
            );
          })}
        </div>

        {/* 4. Bolinhas agora reagem ao estado activeIndex */}
        <div className="md:hidden flex justify-center gap-2 mt-4">
          {SERVICES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                // Opcional: Clique na bolinha leva ao card
                if (scrollRef.current) {
                  scrollRef.current.scrollTo({
                    left: index * scrollRef.current.clientWidth,
                    behavior: 'smooth',
                  });
                }
              }}
              // Lógica da cor: Se o índice atual for igual ao ativo, fica escuro, senão claro.
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-6 bg-primary' // Ativo: mais largo e cor principal (ex: marrom/preto)
                  : 'w-2 bg-stone-300' // Inativo: bolinha pequena cinza
              }`}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
