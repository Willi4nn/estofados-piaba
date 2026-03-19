'use client';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-150 flex items-center justify-center overflow-hidden" // <--- MUDANÇA PRINCIPAL AQUI: h-screen para h-[100svh]
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop"
          alt="Interior luxuoso com estofados elegantes"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-stone-900/60 via-stone-900/40 to-stone-900/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pb-20 md:pb-0">
        {' '}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-stone-400"></span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-stone-300 font-medium">
              Estofados em Patos de Minas há 45 Anos
            </span>
            <span className="h-px w-8 bg-stone-400"></span>
          </span>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-[6.5rem] font-light mb-8 leading-[1.1] tracking-tight text-balance"
        >
          Renove a Alma <br />
          <span className="italic text-stone-300">do seu Lar</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-base md:text-xl text-stone-200 mb-8 md:mb-12 font-light leading-relaxed text-pretty"
        >
          Estofaria especializada em reforma de móveis em Patos de Minas-MG.
          Unimos o design contemporâneo à durabilidade dos materiais e
          acabamento impecável. Orçamento grátis!
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-md mx-auto"
        >
          <Button href="#contact" variant="white" className="w-full max-w-55">
            Solicitar Orçamento
          </Button>
          <Button
            href="#portfolio"
            variant="outline"
            className="text-white border-white hover:bg-white/10 hover:text-white w-full max-w-55"
          >
            Ver Projetos <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" // Mantive o posicionamento responsivo para o mobile
      >
        <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-stone-400">
          Descubra
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-stone-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}
