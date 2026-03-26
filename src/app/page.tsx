// src/app/page.tsx — SERVER COMPONENT (sem 'use client')
// Motivo: Server Components não enviam JS ao cliente, renderizam HTML puro
// no servidor — o Google indexa o conteúdo com mais confiança e velocidade.

import { BUSINESS } from './constants';
import { HomeClient } from './HomeClient';

// ─── Schema: LocalBusiness (enriquecido) ──────────────────────────────────────
const jsonLdLocalBusiness = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${BUSINESS.url}/#negocio`,
  name: BUSINESS.name,
  url: BUSINESS.url,
  image: `${BUSINESS.url}${BUSINESS.ogImagePath}`,
  telephone: BUSINESS.phoneE164,
  email: BUSINESS.email,
  sameAs: BUSINESS.sameAs,
  foundingDate: '1979',
  description:
    'Estofaria especializada em reforma de sofás, poltronas, cadeiras e cabeceiras em Patos de Minas-MG. Atendemos desde 1979 com materiais premium e acabamento impecável.',
  priceRange: '$$',
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
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '13:00',
    },
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Patos de Minas',
      containedInPlace: { '@type': 'State', name: 'Minas Gerais' },
    },
    { '@type': 'City', name: 'Lagoa Formosa' },
    { '@type': 'City', name: 'Presidente Olegário' },
    { '@type': 'City', name: 'Varjão de Minas' },
  ],
  // Avaliação agregada — atualize com os dados reais do Google Business
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '10',
    bestRating: '5',
    worstRating: '1',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Serviços de Estofaria em Patos de Minas',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Reforma de Sofá em Patos de Minas',
          description:
            'Reforma completa de sofá com troca de tecido, espuma de alta resiliência e recuperação da estrutura.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Reforma de Poltrona em Patos de Minas',
          description:
            'Reforma de poltrona com materiais premium, costura de alta precisão e acabamento impecável.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cabeceira Sob Medida em Patos de Minas',
          description:
            'Fabricação de cabeceiras personalizadas para cama box, casal, queen e king size.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Reforma de Cadeira em Patos de Minas',
          description:
            'Reforma de cadeiras estofadas, de escritório e de jantar com tecidos técnicos de alta durabilidade.',
        },
      },
    ],
  },
};

// ─── Schema: FAQPage (gera rich snippets no Google) ──────────────────────────
const jsonLdFAQ = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quanto custa reformar um sofá?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O valor da reforma de sofá varia conforme o tamanho (2, 3 ou 4 lugares), o modelo do sofá e o tecido escolhido. Oferecemos orçamento gratuito. Entre em contato pelo WhatsApp para uma avaliação personalizada.',
      },
    },
    {
      '@type': 'Question',
      name: 'A Estofados Piaba faz retirada e entrega em domicílio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sim! Realizamos retirada e entrega do móvel na sua residência em Patos de Minas e região. Entre em contato pelo WhatsApp para agendar um horário conveniente para você.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais tipos de estofados a Estofados Piaba reforma?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Reformamos sofás, poltronas, cadeiras, cabeceiras de cama e puffs. Também fabricamos almofadas decorativas sob medida com os mais variados tecidos.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quais tecidos estão disponíveis para reforma de estofados?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Trabalhamos com Linho Misto, Camurça Michigan, Veludo Londres/Ônix, Bouclé, Couro Ecológico, Pet Friendly (resistente a pelos e arranhões), Acqua Block (impermeável) e Sarja Peletizada, entre outros.',
      },
    },
    {
      '@type': 'Question',
      name: 'Há quanto tempo a Estofados Piaba atua no mercado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A Estofados Piaba está no mercado desde 1979 — mais de 45 anos de experiência em reforma e confecção de estofados em Patos de Minas-MG.',
      },
    },
  ],
};

// ─── Schema: BreadcrumbList ───────────────────────────────────────────────────
const jsonLdBreadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Início',
      item: BUSINESS.url,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdLocalBusiness),
        }}
      />
      <script
        id="schema-faq" // <-- ID ADICIONADO
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFAQ) }}
      />
      <script
        id="schema-breadcrumb" // <-- ID ADICIONADO
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <HomeClient />
    </>
  );
}
