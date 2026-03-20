'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MATERIALS } from '../../constants';

export function Materials() {
  return (
    <section className="py-8 md:py-18 bg-stone-950 text-stone-200 relative overflow-hidden">
      {/* Textura de fundo sutil */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-widest mb-2">
            Matérias-Primas
          </h2>
          <h3
            id="materials-heading"
            className="font-serif text-2xl md:text-4xl mb-6 md:mb-12 text-white tracking-tight"
          >
            Acabamentos Selecionados
          </h3>
        </motion.div>

        {/* 2 colunas mobile, 4 tablet, 8 desktop na mesma linha. gap-y-5 reduz bem o espaço no mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-2 gap-x-2 lg:gap-x-4">
          {MATERIALS.map((material, index) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col items-center"
            >
              {/* Tamanhos válidos do Tailwind, mais próximos de um quadrado. */}
              <div className="relative w-24 h-28 lg:w-28 lg:h-32 mb-2 lg:mb-4">
                <div className="relative w-full h-full rounded-md overflow-hidden shadow-lg ring-1 ring-white/10 group-hover:ring-white/30 group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1">
                  <Image
                    src={material.textureUrl}
                    alt={`Textura de ${material.name} para reforma de estofados - ${material.type}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                    loading="lazy"
                    sizes="(min-width: 1024px) 112px, 96px"
                  />
                  {/* Overlay sutil para profundidade no hover */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Texto com tipografia refinada */}
              <div className="flex flex-col items-center min-h-14 justify-start">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-stone-400 group-hover:text-white transition-colors duration-300 text-center px-1">
                  {material.name}
                </span>
                {/* 2. Adicionamos shrink-0 na linha */}
                <div className="shrink-0 h-px w-0 bg-stone-300 group-hover:w-6 transition-all duration-500 ease-out mt-1 md:mt-2" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 flex flex-col items-center gap-3">
          <div className="h-px w-12 bg-stone-700" />
          <p className="text-stone-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed italic text-center">
            Trabalhamos com os melhores fornecedores de tecidos nacionais e
            importados.
          </p>
        </div>
      </div>
    </section>
  );
}
