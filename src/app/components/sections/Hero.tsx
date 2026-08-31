'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';
import { Button } from '../ui/Button';

const MotionImage = motion.create(Image);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  // Rastreia o scroll apenas enquanto a seção Hero estiver visível na tela
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: Move a imagem para baixo na metade da velocidade do scroll
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  // Escurece a imagem conforme o usuário desce a página
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-svh flex items-center justify-center overflow-hidden bg-secondary-950"
      aria-label="Apresentação — Estofados Piaba"
    >
      {/* WRAPPER FIXO/PARALLAX */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 z-0 w-full h-full"
      >
        <MotionImage
          // Efeito Ken Burns: Zoom in infinito, de vai e vem, extremamente sutil
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop"
          alt="Sofá elegante reformado pela Estofados Piaba em Patos de Minas"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* OVERLAY SUAVE: Mantido o seu gradiente, mas com um fundo base para garantir o contraste */}
        <div className="absolute inset-0 bg-secondary-950/20" />
        <div className="absolute inset-0 bg-linear-to-b from-secondary-950/70 via-transparent to-secondary-950/80" />
      </motion.div>

      {/* CONTEÚDO */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-28 pb-28 md:pt-0 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <p className="flex items-center gap-3 md:gap-4 mb-6">
            <span
              className="h-px w-6 md:w-8 bg-primary-500"
              aria-hidden="true"
            />
            <span className="text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/90 font-medium">
              Estofados em Patos de Minas há 45 Anos
            </span>
            <span
              className="h-px w-6 md:w-8 bg-primary-500"
              aria-hidden="true"
            />
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-[6rem] font-light mb-6 md:mb-8 leading-[1.1] tracking-tight text-balance text-white"
        >
          Reforma de Estofados <br />
          <span className="italic text-primary-500">em Patos de Minas</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-sm sm:text-base md:text-xl text-white/90 mb-8 md:mb-12 font-light leading-relaxed text-pretty"
        >
          Estofaria especializada em reforma de sofás, poltronas e cadeiras em{' '}
          <strong className="font-semibold text-white">
            Patos de Minas-MG
          </strong>
          . Materiais premium, acabamento impecável e{' '}
          <strong className="font-semibold text-white">orçamento grátis</strong>
          !
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center w-full max-w-md mx-auto"
        >
          <Button
            href="#contact"
            variant="primary"
            className="w-full sm:max-w-55"
          >
            Solicitar Orçamento
          </Button>
          <Button
            href="#portfolio"
            variant="outline"
            className="text-white border-white hover:bg-white hover:text-secondary-950 w-full sm:max-w-55"
          >
            Ver Projetos <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-white/80">
          Descubra
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
