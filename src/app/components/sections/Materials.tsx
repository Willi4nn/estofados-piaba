'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { MATERIALS } from '../../constants';

export function Materials() {
  return (
    // Fundo alterado para bg-secondary-950
    <section className="py-16 md:py-24 bg-secondary-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-500/20 via-transparent to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-widest mb-2">
            Matérias-Primas
          </h2>
          <h3
            id="materials-heading"
            className="font-serif text-3xl md:text-5xl mb-6 md:mb-12 text-white tracking-tight"
          >
            Acabamentos Selecionados
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-y-6 gap-x-4 lg:gap-x-4">
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
              <div className="relative w-24 h-28 lg:w-28 lg:h-32 mb-3 lg:mb-4">
                <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 group-hover:ring-primary-500/50 group-hover:shadow-primary-500/20 transition-all duration-500 group-hover:-translate-y-1">
                  <Image
                    src={material.textureUrl}
                    alt={`Textura de ${material.name} para reforma de estofados - ${material.type}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                    loading="lazy"
                    sizes="(min-width: 1024px) 112px, 96px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-secondary-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              <div className="flex flex-col items-center min-h-14 justify-start">
                <span className="text-[11px] md:text-xs uppercase tracking-[0.1em] font-medium text-white/70 group-hover:text-primary-50 transition-colors duration-300 text-center px-1">
                  {material.name}
                </span>
                <div className="shrink-0 h-[2px] w-0 bg-primary-500 group-hover:w-8 transition-all duration-500 ease-out mt-1.5 md:mt-2 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-16 flex flex-col items-center gap-4">
          <div className="h-px w-12 bg-white/20" />
          <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed italic text-center font-serif">
            Trabalhamos com os melhores fornecedores de tecidos nacionais e
            importados, garantindo toque macio e alta durabilidade.
          </p>
        </div>
      </div>
    </section>
  );
}
