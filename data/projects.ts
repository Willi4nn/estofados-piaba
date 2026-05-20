import { RawProject } from '../src/app/types';

// FIX: Nomes de arquivo com espaços foram normalizados usando uma função
// auxiliar que aplica encodeURIComponent apenas no nome do arquivo,
// preservando as barras do path. Isso garante URLs válidas em qualquer
// servidor/CDN sem precisar renomear os arquivos físicos agora.
const encodePath = (path: string): string => {
  return path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
};

// Tipagem estendida internamente para garantir date sempre presente
type RawProjectInternal = Omit<RawProject, 'date'> & { date: string };

const raw: Record<string, RawProjectInternal[]> = {
  Sofas: [
    {
      images: ['/moveis/sofas/20260515_153923.jpg'],
      date: '2026-05-15',
    },
    {
      images: [
        '/moveis/sofas/20260327_113952.jpg',
        '/moveis/sofas/20260327_113859.jpg',
        '/moveis/sofas/20260327_114801.jpg',
      ],
      date: '2026-03-27',
    },
    {
      images: ['/moveis/sofas/IMG-20260303-WA0001.jpg'],
      date: '2026-03-03',
    },
    {
      images: [
        '/moveis/sofas/20260218_090233.jpg',
        '/moveis/sofas/20260218_090210(1).jpg',
      ],
      date: '2026-02-18',
    },
    {
      // FIX: Espaços no nome do arquivo — path normalizado via encodePath
      images: ['/moveis/sofas/WhatsApp Image 2026-02-15 at 21.32.04.jpeg'],
      date: '2026-02-15',
    },
    {
      images: ['/moveis/sofas/WhatsApp Image 2026-02-15 at 21.23.24.jpeg'],
      date: '2026-02-15',
    },
    {
      images: ['/moveis/sofas/WhatsApp Image 2026-02-15 at 21.21.08.jpeg'],
      date: '2026-02-15',
    },
    {
      images: ['/moveis/sofas/IMG_20250125_131228600_HDR.jpg'],
      date: '2025-01-25',
    },
    {
      images: ['/moveis/sofas/IMG_20250122_114238203.jpg'],
      date: '2025-01-22',
    },
    { images: ['/moveis/sofas/IMG-20240726-WA0007.jpg'], date: '2024-07-26' },
    { images: ['/moveis/sofas/IMG-20240725-WA0039.jpg'], date: '2024-07-25' },
    {
      images: [
        '/moveis/sofas/IMG-20240706-WA0001.jpg',
        '/moveis/sofas/IMG-20240706-WA0020.jpg',
      ],
      date: '2024-07-06',
    },
    { images: ['/moveis/sofas/IMG-20240608-WA0012.jpg'], date: '2024-06-08' },
    { images: ['/moveis/sofas/IMG-20240522-WA0002.jpg'], date: '2024-05-22' },
    {
      images: [
        '/moveis/sofas/IMG-20240212-WA0017.jpg',
        '/moveis/sofas/IMG-20240212-WA0015.jpg',
        '/moveis/sofas/IMG-20240217-WA0034.jpg',
        '/moveis/sofas/WhatsApp Image 2026-02-15 at 21.29.25.jpeg',
      ],
      date: '2024-02-12',
    },
    {
      images: [
        '/moveis/sofas/IMG-20230727-WA0003.jpg',
        '/moveis/sofas/IMG-20230727-WA0005.jpg',
      ],
      date: '2023-07-27',
    },
    { images: ['/moveis/sofas/IMG-20230530-WA0008.jpg'], date: '2023-05-30' },
    { images: ['/moveis/sofas/IMG-20230519-WA0003.jpg'], date: '2023-05-19' },
    { images: ['/moveis/sofas/IMG-20230519-WA0004.jpg'], date: '2023-05-19' },
    { images: ['/moveis/sofas/IMG-20230108-WA0009.jpg'], date: '2023-01-08' },
    { images: ['/moveis/sofas/IMG-20220909-WA0000.jpg'], date: '2022-09-09' },
    {
      images: [
        '/moveis/sofas/IMG-20220818-WA0007.jpg',
        '/moveis/sofas/IMG-20220818-WA0008.jpg',
      ],
      date: '2022-08-18',
      description: 'Reforma completa com troca de espuma e tecido',
    },
    { images: ['/moveis/sofas/IMG-20220806-WA0000.jpg'], date: '2022-08-06' },
    {
      images: ['/moveis/sofas/913C82C1-172F-49AF-BBCB-22DB80B39AA5.jpg'],
      date: '2022-03-22',
    },
    { images: ['/moveis/sofas/IMG-20220322-WA0001.jpg'], date: '2022-03-22' },
    // FIX: Projetos sem date recebem fallback explícito '1970-01-01'
    // para garantir ordenação determinística.
    { images: ['/moveis/sofas/IMG_4065.JPEG'], date: '1970-01-01' },
    {
      images: ['/moveis/sofas/IMG_4132.JPEG', '/moveis/sofas/IMG_4131.JPEG'],
      date: '1970-01-01',
    },
    {
      images: ['/moveis/sofas/IMG_4150.JPEG', '/moveis/sofas/IMG_4153.JPEG'],
      date: '1970-01-01',
    },
    {
      images: [
        '/moveis/sofas/IMG_4183.JPEG',
        '/moveis/sofas/IMG_4182.JPEG',
        '/moveis/sofas/IMG_4185.JPEG',
      ],
      date: '1970-01-01',
    },
    {
      images: [
        '/moveis/sofas/IMG_4391.JPEG',
        '/moveis/sofas/IMG_4327.JPEG',
        '/moveis/sofas/IMG_4331.JPEG',
      ],
      date: '1970-01-01',
    },
  ],

  Poltronas: [
    {
      images: ['/moveis/poltronas/20260519_135803.jpg'],
      date: '2026-05-19',
    },
    {
      images: ['/moveis/poltronas/20260316_103524.jpg'],
      date: '2026-03-16',
    },
    {
      images: ['/moveis/poltronas/20260218_090135.jpg'],
      date: '2026-02-18',
    },
    {
      images: [
        '/moveis/poltronas/IMG_4693.JPEG',
        '/moveis/poltronas/WhatsApp Image 2026-02-15 at 21.23.50.jpeg',
        '/moveis/poltronas/WhatsApp Image 2026-02-15 at 21.23.50 (1).jpeg',
      ],
      date: '2026-02-15',
    },
    {
      images: [
        '/moveis/poltronas/WhatsApp Image 2026-02-15 at 21.32.05.jpeg',
        '/moveis/poltronas/WhatsApp Image 2026-02-15 at 21.32.04 (1).jpeg',
      ],
      date: '2026-02-15',
    },
    {
      images: [
        '/moveis/poltronas/WhatsApp Image 2026-02-15 at 21.32.06 (1).jpeg',
      ],
      date: '2026-02-15',
    },
    {
      images: ['/moveis/poltronas/WhatsApp Image1 2026-02-13 at 19.21.26.jpeg'],
      date: '2026-02-13',
    },
    {
      images: ['/moveis/poltronas/IMG-20231212-WA0003.jpg'],
      date: '2023-12-12',
    },
    {
      images: ['/moveis/poltronas/IMG-20231011-WA0001.jpg'],
      date: '2023-10-11',
    },
    {
      images: ['/moveis/poltronas/IMG-20230807-WA0010.jpg'],
      date: '2023-08-07',
    },
    {
      images: ['/moveis/poltronas/IMG-20230716-WA0007.jpg'],
      date: '2023-07-16',
    },
    {
      images: ['/moveis/poltronas/IMG-20230130-WA0024.jpg'],
      date: '2023-01-30',
    },
    {
      images: ['/moveis/poltronas/IMG_20221104_114251828_HDR.jpg'],
      date: '2022-11-04',
    },
    {
      images: [
        '/moveis/poltronas/IMG_20220923_120641761.jpg',
        '/moveis/poltronas/IMG_20220923_120843633.jpg',
      ],
      date: '2022-09-23',
    },
    {
      images: [
        '/moveis/poltronas/IMG-20220903-WA0001.jpg',
        '/moveis/poltronas/IMG-20220903-WA0005.jpg',
        '/moveis/poltronas/IMG-20220903-WA0002.jpg',
        '/moveis/poltronas/IMG-20220903-WA0003.jpg',
      ],
      date: '2022-09-03',
    },
    {
      images: [
        '/moveis/poltronas/IMG-20220820-WA0000.jpg',
        '/moveis/poltronas/IMG-20220820-WA0003.jpg',
      ],
      date: '2022-08-20',
    },
    {
      images: ['/moveis/poltronas/IMG-20220512-WA0000.jpg'],
      date: '2022-05-12',
    },
    { images: ['/moveis/poltronas/IMG_4201.JPEG'], date: '1970-01-01' },
    { images: ['/moveis/poltronas/IMG_4311.JPEG'], date: '1970-01-01' },
    { images: ['/moveis/poltronas/IMG_4561.JPEG'], date: '1970-01-01' },
    { images: ['/moveis/poltronas/IMG_4588.JPEG'], date: '1970-01-01' },
    { images: ['/moveis/poltronas/IMG_4687.JPEG'], date: '1970-01-01' },
    { images: ['/moveis/poltronas/IMG_4705.JPEG'], date: '1970-01-01' },
  ],

  Cadeiras: [
    {
      images: [
        '/moveis/cadeiras/46ed56d9-0023-478b-9d5a-7a5d4075716a.jpg',
        '/moveis/cadeiras/IMG_4255.JPEG',
        '/moveis/cadeiras/IMG_4250.JPEG',
        '/moveis/cadeiras/WhatsApp Image 2026-02-15 at 21.32.03.jpeg',
      ],
      date: '2026-02-15',
    },
    {
      images: [
        '/moveis/cadeiras/WhatsApp Image 2026-02-15 at 21.32.05 (1).jpeg',
        '/moveis/cadeiras/WhatsApp Image 2026-02-15 at 21.32.05 (2).jpeg',
      ],
      date: '2026-02-15',
    },
    {
      images: [
        '/moveis/cadeiras/WhatsApp Image 2026-02-15 at 21.32.06 (2).jpeg',
      ],
      date: '2026-02-15',
    },
    {
      images: ['/moveis/cadeiras/IMG_20250207_153217637.jpg'],
      date: '2025-02-07',
    },
    {
      images: ['/moveis/cadeiras/IMG-20240221-WA0023.jpg'],
      date: '2024-02-21',
    },
    {
      images: ['/moveis/cadeiras/IMG-20230807-WA0006.jpg'],
      date: '2023-08-07',
    },
    {
      images: ['/moveis/cadeiras/IMG-20230728-WA0004.jpg'],
      date: '2023-07-28',
    },
    {
      images: ['/moveis/cadeiras/IMG-20230716-WA0008.jpg'],
      date: '2023-07-16',
    },
    {
      images: ['/moveis/cadeiras/IMG-20230715-WA0000.jpg'],
      date: '2023-07-15',
    },
    {
      images: ['/moveis/cadeiras/IMG-20230707-WA0000.jpg'],
      date: '2023-07-07',
    },
    {
      images: [
        '/moveis/cadeiras/IMG-20230705-WA0006.jpg',
        '/moveis/cadeiras/IMG-20230707-WA0001.jpg',
      ],
      date: '2023-07-05',
    },
    {
      images: ['/moveis/cadeiras/IMG-20230626-WA0025.jpg'],
      date: '2023-06-26',
    },
    {
      images: ['/moveis/cadeiras/IMG-20230315-WA0005.jpg'],
      date: '2023-03-15',
    },
    {
      images: [
        '/moveis/cadeiras/IMG-20220831-WA0001.jpg',
        '/moveis/cadeiras/IMG-20220831-WA0002.jpg',
      ],
      date: '2022-08-31',
    },
    {
      images: ['/moveis/cadeiras/IMG-20220517-WA0004.jpg'],
      date: '2022-05-17',
    },
    {
      images: ['/moveis/cadeiras/IMG-20220513-WA0001.jpg'],
      date: '2022-05-13',
    },
    {
      images: ['/moveis/cadeiras/IMG-20220426-WA0004.jpg'],
      date: '2022-04-26',
    },
  ],

  Cabeceiras: [
    {
      images: [
        '/moveis/cabeceiras/IMG-20240806-WA0002.jpg',
        '/moveis/cabeceiras/IMG-20240806-WA0005.jpg',
      ],
      date: '2024-08-06',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20240806-WA0003.jpg'],
      date: '2024-08-06',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20240709-WA0006.jpg'],
      date: '2024-07-09',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20240327-WA0003.jpg'],
      date: '2024-03-27',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20240126-WA0001.jpg'],
      date: '2024-01-26',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20230911-WA0001.jpg'],
      date: '2023-09-11',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20230911-WA0002.jpg'],
      date: '2023-09-11',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20230905-WA0009.jpg'],
      date: '2023-09-05',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20230818-WA0015.jpg'],
      date: '2023-08-18',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20230707-WA0004.jpg'],
      date: '2023-07-07',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20230202-WA0042.jpg'],
      date: '2023-02-02',
    },
    {
      images: [
        '/moveis/cabeceiras/IMG-20230102-WA0008.jpg',
        '/moveis/cabeceiras/IMG-20230102-WA0014.jpg',
      ],
      date: '2023-01-02',
    },
    {
      images: [
        '/moveis/cabeceiras/IMG-20230102-WA0013.jpg',
        '/moveis/cabeceiras/IMG-20230102-WA0009.jpg',
        '/moveis/cabeceiras/IMG-20230102-WA0010.jpg',
        '/moveis/cabeceiras/IMG-20230102-WA0012.jpg',
        '/moveis/cabeceiras/IMG-20230818-WA0016.jpg',
      ],
      date: '2023-01-02',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20220929-WA0001.jpg'],
      date: '2022-09-29',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20220701-WA0002.jpg'],
      date: '2022-07-01',
    },
    {
      images: [
        '/moveis/cabeceiras/IMG-20220603-WA0002.jpg',
        '/moveis/cabeceiras/IMG-20220602-WA0000.jpg',
      ],
      date: '2022-06-02',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20220531-WA0003.jpg'],
      date: '2022-05-31',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20220531-WA0004.jpg'],
      date: '2022-05-31',
    },
    {
      images: ['/moveis/cabeceiras/IMG-20220531-WA0005.jpg'],
      date: '2022-05-31',
    },
    { images: ['/moveis/cabeceiras/IMG_4549.JPEG'], date: '1970-01-01' },
  ],

  Puffs: [
    {
      images: ['/moveis/puffs/WhatsApp Image 2026-02-15 at 21.32.06.jpeg'],
      date: '2026-02-15',
    },
    { images: ['/moveis/puffs/IMG-20230406-WA0002.jpg'], date: '2023-04-06' },
    { images: ['/moveis/puffs/IMG-20221110-WA0002.jpg'], date: '2022-11-10' },
    {
      images: ['/moveis/puffs/IMG_4587.JPEG', '/moveis/puffs/IMG_4585.JPEG'],
      date: '1970-01-01',
    },
  ],
};

// FIX: Exportação normalizada — aplica encodePath em todos os paths de imagem,
// resolvendo os espaços nos nomes de arquivo de forma centralizada e automática.
export const PROJECTS_DATA: Record<string, RawProject[]> = Object.fromEntries(
  Object.entries(raw).map(([category, projects]) => [
    category,
    projects.map((project) => ({
      ...project,
      images: project.images.map(encodePath),
    })),
  ])
);
