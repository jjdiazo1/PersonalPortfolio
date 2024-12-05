import type { Metadata } from "next";
import localFont from "next/font/local";
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

// Layout principal
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}
      >
        {/* Header */}
        <header className="p-4 bg-gray-800 text-center">
          <h1 className="text-lg font-bold">Juan Jose Diaz</h1>
        </header>

        {/* Contenido principal */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="p-4 bg-gray-800 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Juan Jose Diaz. Todos los derechos reservados.
        </footer>
      </body>
    </html>
  );
}
