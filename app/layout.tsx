import type { Metadata } from 'next';
import { Cormorant_Garamond, Poppins } from 'next/font/google';
import './globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

const body = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Pamela Rosa Tardem | Designer de Interiores',
  description: 'Projetos exclusivos de Design de Interiores que unem funcionalidade, sofisticação e personalidade.',
  metadataBase: new URL('https://pamelarosatardem.com'),
  openGraph: {
    title: 'Pamela Rosa Tardem | Designer de Interiores',
    description: 'Projetos exclusivos de Design de Interiores que unem funcionalidade, sofisticação e personalidade.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pamela Rosa Tardem | Designer de Interiores',
    description: 'Projetos exclusivos de Design de Interiores que unem funcionalidade, sofisticação e personalidade.',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable}`}>
        {children}
      </body>
    </html>
  );
}
