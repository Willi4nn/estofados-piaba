import type { MetadataRoute } from 'next';

import { BUSINESS } from './constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: BUSINESS.url,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}

