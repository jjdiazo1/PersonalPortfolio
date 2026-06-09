'use client';

import { useState, useEffect } from 'react';
import { Project, getAllProjects } from '@/lib/ProjectsData';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getAllProjects().then(setProjects).catch(console.error);
  }, []);

  return (
    <section id="work" className="border-b border-charcoal">
      {/* Section label */}
      <div className="px-5 md:px-12">
        <div className="flex items-center justify-between py-3 border-b border-charcoal">
          <span className="font-condensed text-[11px] font-[500] uppercase tracking-[0.12em] text-charcoal">
            Work
          </span>
          <span className="font-mono text-[11px] text-graphite">01</span>
        </div>
      </div>

      {/* All projects — 2 columns on desktop.
          IMPORTANT: do NOT use divide-x on a multi-row grid — it adds border-left
          to every non-first child, including left-column items in rows 2+, which
          doubles the outer frame's border-l. Instead, add border-l only to
          right-column items (odd index in 0-based). */}
      {projects.length > 0 && (
        <div className="md:grid md:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.id}
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
