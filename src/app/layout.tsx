import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Tiro_Devanagari_Hindi, Noto_Serif_Devanagari } from 'next/font/google';
import StoreProvider from '@/store/StoreProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const tiro = Tiro_Devanagari_Hindi({
  subsets: ['devanagari'],
  weight: '400',
  variable: '--font-tiro',
});

const notoDeva = Noto_Serif_Devanagari({
  subsets: ['devanagari'],
  weight: ['500', '600', '700'],
  variable: '--font-noto-deva',
});

export const metadata: Metadata = {
  title: {
    default: 'Hardoi Parivar NCR — Our Roots, Our Pride',
    template: '%s · Hardoi Parivar NCR',
  },
  description:
    'A community of Hardoi families in Delhi NCR — culture, values and a shared sense of belonging.',
  icons: {
    icon: [{ url: '/assets/logo.png', type: 'image/png' }],
    apple: [{ url: '/assets/logo.png', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${tiro.variable} ${notoDeva.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
