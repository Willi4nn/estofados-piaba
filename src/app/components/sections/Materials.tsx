'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MATERIALS } from '../../constants';

export function Materials() {
  return (
    <section className="py-8 md:py-18 bg-stone-950 text-stone-200 relative overflow-hidden">
      {/* Subtle background texture/gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center "
        >
          <h2 className="text-sm font-semibold text-stone-400 uppercase tracking-widest mb-2">
            Matérias-Primas
          </h2>
          <h3
            id="materials-heading"
            className="font-serif text-2xl md:text-4xl mb-8 md:mb-12 text-white tracking-tight"
          >
            Acabamentos Selecionados
          </h3>
        </motion.div>

        {/* Mobile: Grid 2x2 | Desktop: Flex */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-20">
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
              {/* Moldura da Imagem */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 mb-4">
                <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-1 ring-stone-700 group-hover:ring-stone-500 transition-[box-shadow,transform,ring-color] duration-500">
                  <Image
                    src={material.textureUrl}
                    alt={`Textura de ${material.name} para reforma de estofados - ${material.type}`}
                    fill
                    className="rounded-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    loading="lazy"
                    sizes="(min-width: 768px) 144px, 112px"
                  />
                </div>
              </div>

              {/* Texto com tipografia mais refinada */}
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-stone-400 group-hover:text-white transition-colors duration-300 text-center px-2">
                {material.name}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 flex flex-col items-center gap-3">
          <div className="h-px w-12 bg-stone-700" />
          <p className="text-stone-400 text-xs md:text-sm max-w-md mx-auto leading-relaxed italic">
            Trabalhamos com os melhores fornecedores de tecidos nacionais e
            importados.
          </p>
        </div>
      </div>
    </section>
  );
}
