'use client';

// src/app/HomeClient.tsx
// Este componente contém toda a lógica client-side (preloader, animações).
// A separação permite que page.tsx seja um Server Component puro.

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { FAQ } from './components/sections/Faq';
import { Hero } from './components/sections/Hero';
import { Materials } from './components/sections/Materials';
import { Portfolio } from './components/sections/Portfolio';
import { Services } from './components/sections/Services';

// ─── Preloader ────────────────────────────────────────────────────────────────
// IMPORTANTE: Não usar <h1> aqui — a página já tem um H1 no Hero.
export function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-secondary-950 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden py-4"
        >
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <p className="relative z-10 font-serif text-[1.26rem] md:text-[2.26rem] text-primary-50 tracking-[0.4em] md:tracking-[0.6em] uppercase ml-[0.4em] md:ml-[0.7em]">
              Estofados
            </p>
            <span className="font-serif text-6xl md:text-[8rem] font-bold text-primary-50 uppercase -mt-2 md:-mt-6">
              Piaba
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-primary-500 mt-2 md:mt-4"
        />

        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm md:text-base font-sans uppercase tracking-[0.3em] text-primary-50/80 mt-6"
        >
          Desde 1979
        </motion.span>
      </div>
    </motion.div>
  );
}

// ─── HomeClient ───────────────────────────────────────────────────────────────
export function HomeClient() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : '';
  }, [isLoading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col font-sans text-primary bg-background">
        <Header />
        <main className="grow">
          <Hero />
          <Services />
          <About />
          <Portfolio />
          <Materials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
