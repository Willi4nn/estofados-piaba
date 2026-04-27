'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export function About() {
  return (
    <section
      id="about"
      className="py-24 md:py-32 bg-primary-50/30 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2 relative w-full"
          >
            <div className="relative z-10 aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl shadow-xl border border-primary-500/10">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop"
                alt="Oficina de tapeçaria de luxo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-black/5 pointer-events-none rounded-2xl" />
            </div>
            {/* Decorative background element com a cor secundária e borda turquesa */}
            <div
              className="absolute -top-6 -left-6 md:-top-10 md:-left-10 w-full h-full border-2 border-primary-500/30 rounded-2xl z-0 hidden md:block"
              aria-hidden="true"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:w-1/2"
          >
            <h2 className="text-sm font-semibold text-secondary-800 uppercase tracking-widest mb-2">
              Nossa História
            </h2>
            <h3 className="font-serif text-4xl md:text-5xl text-secondary-900 mb-8 leading-tight">
              Onde o tempo <br />
              <span className="italic text-primary-500">
                encontra a perfeição
              </span>
            </h3>

            <div className="space-y-6 text-text-secondary font-light text-base md:text-lg leading-relaxed mb-10 text-pretty">
              <p>
                Na Estofados Piaba, acreditamos que cada móvel carrega uma alma
                e uma história. Há mais de quatro décadas, dedicamos nossas mãos
                para preservar memórias e elevar o conforto do seu lar.
              </p>
              <p>
                Nosso ateliê é um santuário onde técnicas artesanais passadas de
                geração em geração se encontram com os materiais mais nobres e
                inovadores do mercado mundial. O resultado é uma tapeçaria de
                excelência, feita para durar uma vida inteira.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
              {[
                'Costura de Alta Precisão',
                'Espumas de Alta Resiliência',
                'Estruturas Reforçadas',
                'Acabamento Impecável',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group">
                  <div className="shrink-0 w-6 h-6 rounded-full border border-primary-500/30 flex items-center justify-center group-hover:border-primary-500 group-hover:bg-primary-500 transition-colors duration-300">
                    <Check
                      className="w-3 h-3 text-primary-500 group-hover:text-white transition-colors duration-300"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="text-secondary-900 font-medium text-sm tracking-wide">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
