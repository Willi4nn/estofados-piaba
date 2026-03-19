import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export function About() {
  return (
    <section
      id="about"
      className="py-10 md:py-24 bg-white overflow-hidden"
      aria-labelledby="about-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 md:gap-12">
          <div className="lg:w-1/2 relative w-full">
            <div className="relative z-10">
              <div className="relative w-full h-120 md:h-auto md:aspect-4/4 md:max-h-150">
                <Image
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
                  alt="Oficina de reforma de estofados"
                  fill
                  className="rounded-sm shadow-xl object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </div>
            {/* Decorative background element */}
            <div
              className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-full h-full border-2 border-stone-200 z-0 hidden md:block"
              aria-hidden="true"
            />
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-2">
              Sobre Nós
            </h2>
            <h3
              id="about-heading"
              className="font-serif text-2xl md:text-4xl text-primary mb-4 md:mb-6"
            >
              Tradição em Conforto
            </h3>
            <p className="text-stone-600 mb-4 md:mb-6 text-base md:text-lg leading-relaxed font-light">
              Na Estofados Piaba, acreditamos que cada móvel conta uma história.
              Há mais de 45 anos no mercado, somos especialistas em resgatar
              memórias.
            </p>
            <p className="text-stone-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base hidden md:block">
              Nosso ateliê combina técnicas artesanais tradicionais com
              materiais contemporâneos de alta performance. Seja reformando uma
              herança de família ou projetando o sofá dos seus sonhos, nossa
              missão é entregar excelência.
            </p>

            <div className="space-y-3 md:space-y-4">
              {[
                'Acabamento Impecável',
                'Materiais Premium',
                'Entrega e Retirada Inclusas',
                'Garantia Total',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-stone-400 w-4 h-4 md:w-5 md:h-5" />
                  <span className="text-primary font-medium text-sm md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
