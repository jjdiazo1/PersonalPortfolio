'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Importamos el componente ModernPortfolio dinámicamente para evitar problemas de hidratación
const ModernPortfolio = dynamic(() => import('@/components/ModernPortfolio'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ModernPortfolio />
    </Suspense>
  );
}