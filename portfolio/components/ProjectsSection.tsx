'use client';

import type { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="border-b border-charcoal">
      <div className="px-5 md:px-12">
        <div className="flex items-center justify-between py-3 border-b border-charcoal">
          <span className="font-condensed text-[11px] font-[500] uppercase tracking-[0.12em] text-charcoal">
            Work
          </span>
          <span className="font-mono text-[11px] text-graphite">01</span>
        </div>
      </div>

      {projects.length > 0 && (
        <div className="md:grid md:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project._id}
              className={`px-5 md:px-12${i % 2 === 1 ? ' md:border-l md:border-charcoal' : ''}`}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
