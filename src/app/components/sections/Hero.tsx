'use client';

// src/app/components/sections/Hero.tsx
// SEO: Esta seção contém o único <h1> da página.
// O H1 deve ser único, relevante e conter a palavra-chave principal.

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative h-svh min-h-150 flex items-center justify-center overflow-hidden"
      aria-label="Apresentação — Estofados Piaba"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: 'easeOut' }}
          src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop"
          // Alt descritivo com contexto local para SEO de imagem
          alt="Sofá elegante reformado pela Estofados Piaba em Patos de Minas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-b from-stone-900/60 via-stone-900/40 to-stone-900/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pb-20 md:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Eyebrow: inclui localidade + experiência — bom para snippets */}
          <p className="flex items-center gap-4 mb-6">
            <span className="h-px w-8 bg-stone-400" aria-hidden="true" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-stone-300 font-medium">
              Estofados em Patos de Minas há 45 Anos
            </span>
            <span className="h-px w-8 bg-stone-400" aria-hidden="true" />
          </p>
        </motion.div>

        {/*
          H1 ÚNICO DA PÁGINA — regras:
          • Único H1 por página (o preloader usa <p> e <span> agora)
          • Inclui a keyword principal de forma natural
          • Não precisa ser só keyword — Google avalia contexto da página inteira
        */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-[6rem] font-light mb-8 leading-[1.1] tracking-tight text-balance"
        >
          Reforma de Estofados <br />
          <span className="italic text-stone-300">em Patos de Minas</span>
        </motion.h1>

        {/*
          Parágrafo de suporte: inclui keywords secundárias de forma natural.
          "estofaria", "reforma de móveis", "Patos de Minas-MG", "orçamento grátis"
          são termos que usuários realmente pesquisam.
        */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-base md:text-xl text-stone-200 mb-8 md:mb-12 font-light leading-relaxed text-pretty"
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
        className="absolute bottom-6 md:bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
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
