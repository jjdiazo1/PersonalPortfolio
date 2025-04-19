'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { useParams } from 'next/navigation';

// Importamos el componente ProjectDetail dinámicamente
const ProjectDetail = dynamic(() => import('@/components/ProjectDetail'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
});

export default function ProjectPage() {
  const params = useParams();
  const id = params?.id;

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ProjectDetail id={id} />
    </Suspense>
  );
}