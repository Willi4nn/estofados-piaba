import Script from 'next/script';
import { Suspense } from 'react';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { About } from './components/sections/About';
import { Contact } from './components/sections/Contact';
import { Hero } from './components/sections/Hero';
import { Materials } from './components/sections/Materials';
import { Portfolio } from './components/sections/Portfolio';
import { Services } from './components/sections/Services';
import { BUSINESS } from './constants';

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

  return (
    <>
      <Script
        id="ld-json-localbusiness"
        type="application/ld+json"
        strategy="beforeInteractive"
      >
        {JSON.stringify(jsonLd)}
      </Script>
      <div className="min-h-screen flex flex-col font-sans text-primary">
        <Header />
        <main className="grow">
          <Hero />
          <Suspense fallback={<div className="h-20" />}>
            <Services />
            <About />
            <Portfolio />
            <Materials />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
