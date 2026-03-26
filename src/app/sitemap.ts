// src/app/sitemap.ts
// Sitemap enriquecido com changeFrequency e priority apropriados.
// Para sites com muitas imagens, considere um image sitemap separado.

import type { MetadataRoute } from 'next';
import { BUSINESS } from './constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: BUSINESS.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Se futuramente criar páginas individuais por serviço ou portfólio,
    // adicione-as aqui com priority 0.8 e changeFrequency 'monthly'.
    // Exemplo:
    // {
    //   url: `${BUSINESS.url}/servicos/reforma-de-sofa`,
    //   lastModified: now,
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ];
}
