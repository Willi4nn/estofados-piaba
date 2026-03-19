'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Hero } from './components/sections/Hero';
import { Materials } from './components/sections/Materials';
import { Portfolio } from './components/sections/Portfolio';
import { Services } from './components/sections/Services';
import { BUSINESS } from './constants';

function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-100 bg-stone-950 flex items-center justify-center overflow-hidden"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="overflow-hidden"
        >
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* ESTOFADOS bem menor e centralizado com precisão */}
            <span className="font-serif text-[1.14rem] md:text-[2.07rem] text-stone-100 tracking-[0.4em] md:tracking-[0.6em] uppercase leading-none mb-1 md:mb-2 ml-[0.4em] md:ml-[0.6em]">
              Estofados
            </span>
            {/* PIABA gigante para criar o contraste correto */}
            <h1 className="font-serif text-6xl md:text-[8rem] font-bold text-stone-100 tracking-tighter uppercase leading-[0.75] -mt-1 md:-mt-3">
              Piaba
            </h1>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-stone-500 mt-6 md:mt-10"
        />

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-sm md:text-md uppercase tracking-[0.3em] text-stone-400 mt-6"
        >
          Desde 1979
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: BUSINESS.name,
    url: BUSINESS.url,
    image: `${BUSINESS.url}${BUSINESS.ogImagePath}`,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    sameAs: BUSINESS.sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address.streetAddress,
      addressLocality: BUSINESS.address.addressLocality,
      addressRegion: BUSINESS.address.addressRegion,
      postalCode: BUSINESS.address.postalCode,
      addressCountry: BUSINESS.address.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    openingHours: BUSINESS.openingHours,
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isLoading]);

  return (
    <>
      <Script
        id="ld-json-localbusiness"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <div className="min-h-screen flex flex-col font-sans text-primary bg-stone-50">
        <Header />
        <main className="grow">
          <Hero />
          <Services />
          <About />
          <Portfolio />
          <Materials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
