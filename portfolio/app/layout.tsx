import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Montserrat } from 'next/font/google';
import "./globals.css";

// Fuentes personalizadas
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata personalizada
export const metadata: Metadata = {
  title: "Juan Jose Diaz - Portfolio",
  description: "Portafolio de Juan Jose Diaz, Systems and Computer Engineer.",
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