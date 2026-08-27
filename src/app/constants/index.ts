import { Material, Service } from '../types';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.estofadospiaba.site';

export const R2_URL =
  process.env.NEXT_PUBLIC_R2_URL ||
  'https://pub-e7e92268921342d8b8a850537a5cc877.r2.dev';

export const BUSINESS = {
  name: 'Estofados Piaba',
  url: SITE_URL,
  phoneE164: '+5534997659558',
  whatsappE164: '+5534997659558',
  email: 'josepiabasilva@gmail.com',
  address: {
    streetAddress: 'R. Alaor de Melo Ribeiro, 35',
    addressLocality: 'Patos de Minas',
    addressRegion: 'MG',
    postalCode: '',
    addressCountry: 'BR',
  },
  geo: {
    latitude: -18.5959283,
    longitude: -46.4936849,
  },
  openingHours: ['Mo-Fr 07:00-18:00', 'Sa 08:00-13:00'],
  sameAs: [
    'https://www.instagram.com/estofados_piaba/',
    'https://www.facebook.com/profile.php?id=100091404635850',
  ],
  mapsUrl: 'https://maps.google.com/',
  ogImagePath: '/piaba-logo.png',
} as const;

// ==========================================
// 1. SERVIÇOS (Página Inicial - Copywriting para Conversão)
// ==========================================
export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Restauração de Sofás e Poltronas',
    description:
      'Transforme seu estofado antigo em uma verdadeira peça de luxo. Reforçamos a estrutura, renovamos as espumas e aplicamos um acabamento impecável para devolver o conforto e a elegância à sua sala.',
    iconName: 'Sofa',
  },
  {
    id: '2',
    title: 'Cabeceiras Sob Medida',
    description:
      'O toque de sofisticação que o seu quarto pede. Projetamos cabeceiras exclusivas com design personalizado, entregando um acabamento digno de hotel cinco estrelas para o seu refúgio de descanso.',
    iconName: 'Scissors',
  },
  {
    id: '3',
    title: 'Almofadas Decorativas',
    description:
      'Pequenos detalhes, um impacto visual gigante. Confeccionamos almofadas personalizadas com costura de alta precisão e tecidos nobres, trazendo harmonia, cor e um aconchego extra ao seu ambiente.',
    iconName: 'Palette',
  },
  {
    id: '4',
    title: 'Nosso Padrão de Qualidade',
    description:
      'A nossa assinatura é a excelência. Unimos a técnica artesanal aos melhores materiais do mercado: linhos, tecidos impermeáveis e pet friendly garantindo que todo serviço tenha máxima durabilidade e beleza.',
    iconName: 'Sparkles',
  },
];

// ==========================================
// 3. MATERIAIS
// ==========================================
export const MATERIALS: Material[] = [
  {
    id: 'm1',
    name: 'Linho e Linho Misto',
    type: 'Tecido',
    textureUrl: `${R2_URL}/tecidos/linho-e-linho-misto.jpg`,
  },
  {
    id: 'm2',
    name: 'Camurça Michigan',
    type: 'Tecido',
    textureUrl: `${R2_URL}/tecidos/camurca-michigan.jpg`,
  },
  {
    id: 'm3',
    name: 'Veludo Londres / Ônix',
    type: 'Veludo',
    textureUrl: `${R2_URL}/tecidos/veludo-soft.jpg`,
  },
  {
    id: 'm4',
    name: 'Couro Ecológico',
    type: 'Sintético',
    textureUrl: `${R2_URL}/tecidos/couro-ecologico.jpg`,
  },
  {
    id: 'm5',
    name: 'Bouclé',
    type: 'Tecido',
    textureUrl: `${R2_URL}/tecidos/boucle.jpg`,
  },
  {
    id: 'm6',
    name: 'Pet Friendly',
    type: 'Tecido Técnico',
    textureUrl: `${R2_URL}/tecidos/pet-friendly.jpg`,
  },
  {
    id: 'm7',
    name: 'Acqua Block',
    type: 'Impermeável',
    textureUrl: `${R2_URL}/tecidos/acquablock.jpg`,
  },
  {
    id: 'm8',
    name: 'Sarja Peletizada',
    type: 'Algodão',
    textureUrl: `${R2_URL}/tecidos/sarja-peletizada.jpg`,
  },
];

export const WHATSAPP_NUMBER = '5534997659558';
