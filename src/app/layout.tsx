import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';

import './globals.css';
import { BUSINESS } from './constants';

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

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: 'Estofados Piaba | Reforma de móveis em Patos de Minas',
    template: '%s | Estofados Piaba',
  },
  description:
    'Estofaria especializada em reforma de sofás, poltronas e cabeceiras em Patos de Minas. Materiais premium e acabamento impecável.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
  alternates: {
    canonical: '/',
  },
  keywords: [
    'estofaria',
    'reforma de sofá',
    'reforma de poltrona',
    'cabeceira sob medida',
    'reforma de estofados',
    'estofados em Patos de Minas',
    'Patos de Minas',
    'MG',
  ],
  applicationName: BUSINESS.name,
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  openGraph: {
    title: BUSINESS.name,
    description:
      'Reforma de móveis em Patos de Minas com materiais premium e acabamento impecável.',
    url: '/',
    siteName: BUSINESS.name,
    type: 'website',
    locale: 'pt_BR',
    images: [
      {
        url: BUSINESS.ogImagePath,
        width: 1200,
        height: 630,
        alt: BUSINESS.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: BUSINESS.name,
    description:
      'Reforma de móveis em Patos de Minas com materiais premium e acabamento impecável.',
    images: [BUSINESS.ogImagePath],
  },
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

