import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Montserrat } from 'next/font/google';
import "./globals.css";

// Metadata personalizada
export const metadata: Metadata = {
  title: "Juan Jose Diaz - Portfolio",
  description: "Juan Jose Diaz's portfolio, Systems and Computer Engineer.",
  icons: {
    icon: '/favicon.svg',
  },
};

// Fonts
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ 
  subsets: ['latin'], 
  variable: '--font-montserrat',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <title>Juan Jose Diaz | Portfolio</title>
        <meta name="description" content="Systems and Computer Engineer with a passion for innovation" />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}