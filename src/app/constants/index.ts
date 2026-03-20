import { PROJECTS_DATA } from '@/data/projects';
import { Material, Project, Service } from '../types';

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://www.estofadospiaba.site';

const R2_URL =
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
  mapsUrl: 'https://maps.app.goo.gl/96R12cHqHsK7x9v49',
  ogImagePath: '/piaba-logo.png',
} as const;

// ==========================================
// 1. SERVIÇOS (Página Inicial)
// ==========================================
export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Reforma de Sofá e Poltrona',
    description:
      'Reforma completa de sofá, poltrona, cadeira e puff em Patos de Minas. Trocamos tecido, espuma e recuperamos a estrutura do seu móvel.',
    iconName: 'Sofa',
  },
  {
    id: '2',
    title: 'Cabeceira Sob Medida',
    description:
      'Cabeceiras personalizadas para cama box, casal, queen e king size. Criamos o design perfeito para o seu quarto com acabamento profissional.',
    iconName: 'Scissors',
  },
  {
    id: '3',
    title: 'Estofamentos Premium',
    description:
      'Trabalhamos com tecidos nobres: couro natural, suede, linho e veludo. Restauração de móveis antigos e de valor sentimental.',
    iconName: 'Sparkles',
  },
];

// ==========================================
// 2. PORTFÓLIO
// ==========================================

/**
 * Função auxiliar para formatar data para exibição
 * @param dateStr - Data no formato YYYY-MM-DD
 * @returns Data formatada (ex: "Agosto 2023") ou null
 */

/**
 * Processa os dados brutos e gera projetos com metadados completos
 */
export const PORTFOLIO: Project[] = Object.entries(PROJECTS_DATA).flatMap(
  ([category, projects]) =>
    projects.map((project, index) => {
      const images = project.images.filter((img) => !!img);

      // Gera título automaticamente: sempre "Sofá #N" (ou poltrona, etc, se quiser customizar por categoria)
      const baseName = category.slice(0, -1); // Ex: "Sofás" -> "Sofá"
      const title = project.title || `${baseName} #${index + 1}`;

      return {
        id: `${category.toLowerCase()}-${index}`,
        title,
        category,
        imageUrl: `${R2_URL}${images[0] || ''}`,
        allImages: images.map((img) => `${R2_URL}${img}`),
        date: project.date,
        description: project.description,
      };
    })
);

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
    name: 'Suede Premium',
    type: 'Tecido',
    textureUrl: `${R2_URL}/tecidos/suede.jpg`,
  },
  {
    id: 'm3',
    name: 'Veludo Soft',
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
    name: 'Acquablock',
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
