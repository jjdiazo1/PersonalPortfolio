'use client';

import { Suspense } from 'react';
import ProjectDetail from '@/components/ProjectDetail';

export default function ProjectPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <span className="font-mono text-[11px] text-graphite">Loading…</span>
      </div>
    }>
      <ProjectDetail />
    </Suspense>
  );
}
