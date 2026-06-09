import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Barlow_Condensed } from 'next/font/google';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Juan Jose Diaz — Portfolio',
  description: 'Systems Engineer · Founder · Building cool stuff',
  icons: { icon: '/favicon.ico' },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['100', '200', '300', '400'],
  display: 'swap',
});

const barlow = Barlow_Condensed({
  subsets: ['latin'],
  variable: '--font-barlow',
  weight: ['300', '400', '500'],
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  weight: ['400'],
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable} ${jetbrains.variable}`}>
      <body className="bg-paper text-charcoal antialiased">{children}</body>
    </html>
  );
}
