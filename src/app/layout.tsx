// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import { BUSINESS } from './constants';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

// ─── Metadata global ──────────────────────────────────────────────────────────
// Regras do title template:
//   - Página inicial: usa `default` (sem template)
//   - Outras páginas: "%s | Estofados Piaba"
export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),

  title: {
    default: 'Estofados Piaba | Reforma de Sofás e Estofados em Patos de Minas',
    template: '%s | Estofados Piaba',
  },

  // Description com 150-160 chars, incluindo cidade + serviços principais
  description:
    'Reforma de sofás, poltronas, cadeiras e cabeceiras em Patos de Minas-MG. Mais de 45 anos de experiência, materiais premium e orçamento grátis. Ligue ou chame no WhatsApp!',

  // Keywords locais e de serviço — Google não usa diretamente, mas
  // outros buscadores (Bing, DuckDuckGo) ainda consideram.
  keywords: [
    'estofados Patos de Minas',
    'reforma de sofá Patos de Minas',
    'reforma de estofados Patos de Minas',
    'estofaria Patos de Minas',
    'reforma de poltrona Patos de Minas',
    'cabeceira sob medida Patos de Minas',
    'reforma de cadeira Patos de Minas',
    'tapeceiro Patos de Minas',
    'tapeçaria Patos de Minas',
    'estofados MG',
    'reforma de puff Patos de Minas',
    'Estofados Piaba',
    'estofaria Minas Gerais',
    'reforma de móveis estofados',
    'tecido pet friendly estofado',
    'couro ecológico sofá',
  ],

  // Canonical aponta para a raiz — evita conteúdo duplicado
  alternates: {
    canonical: '/',
  },

  applicationName: BUSINESS.name,
  creator: BUSINESS.name,
  publisher: BUSINESS.name,

  // Robots: indexar tudo, Google pode exibir imagens grandes e snippets completos
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  // Open Graph — aparece ao compartilhar no WhatsApp, Facebook, etc.
  openGraph: {
    title: 'Estofados Piaba | Reforma de Sofás e Estofados em Patos de Minas',
    description:
      'Reforma de sofás, poltronas, cadeiras e cabeceiras em Patos de Minas-MG. Mais de 45 anos de experiência e materiais premium. Orçamento grátis!',
    url: BUSINESS.url,
    siteName: BUSINESS.name,
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: BUSINESS.ogImagePath,
        width: 1200,
        height: 630,
        alt: 'Estofados Piaba — Reforma de Estofados em Patos de Minas',
      },
    ],
  },

  // Twitter Card — usado pelo X (Twitter) e por alguns preview scrapers
  twitter: {
    card: 'summary_large_image',
    title: 'Estofados Piaba | Reforma de Sofás em Patos de Minas',
    description:
      'Estofaria com mais de 45 anos em Patos de Minas. Reforma de sofás, poltronas, cabeceiras e cadeiras. Orçamento grátis!',
    images: [BUSINESS.ogImagePath],
  },

  // Ícones
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    // Adicionar apple-touch-icon melhorando presença no iOS
    apple: '/apple-touch-icon.png',
  },

  // Verificação de domínio — adicione o código real após verificar no Google Search Console
  // verification: {
  //   google: 'SEU_CODIGO_GOOGLE_SEARCH_CONSOLE',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-background text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
