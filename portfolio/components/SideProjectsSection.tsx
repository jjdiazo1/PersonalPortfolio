'use client';

import type { Project } from '@/lib/types';
import MiniProjectCard from './MiniProjectCard';

export default function SideProjectsSection({ projects }: { projects: Project[] }) {
  const mini = projects.filter(p => p.tier === 'mini');
  if (mini.length === 0) return null;

  return (
    <section id="side-projects">
      <div className="px-5 md:px-12 border-b border-charcoal">
        <div className="flex items-center justify-between py-3">
          <span className="font-condensed text-[11px] font-[500] uppercase tracking-[0.12em] text-charcoal">Side Projects</span>
          <span className="font-mono text-[11px] text-graphite">{String(mini.length).padStart(2, '0')}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 ring-1 ring-inset ring-charcoal">
        {mini.map((project, i) => (
          <div key={project._id} className="border-r border-b border-charcoal">
            <MiniProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
