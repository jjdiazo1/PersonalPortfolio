'use client';

import { useState, useEffect } from 'react';
import { Project, getAllProjects } from '@/lib/ProjectsData';
import ProjectCard from './ProjectCard';

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getAllProjects().then(setProjects).catch(console.error);
  }, []);

  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="work" className="border-b border-charcoal">
      {/* Section label */}
      <div className="max-w-page mx-auto px-5 md:px-12">
        <div className="flex items-center justify-between py-3 border-b border-charcoal">
          <span className="font-condensed text-[11px] font-[500] uppercase tracking-[0.12em] text-charcoal">
            Work
          </span>
          <span className="font-mono text-[11px] text-graphite">01</span>
        </div>
      </div>

      <div className="max-w-page mx-auto">
        {/* Featured project — full width */}
        {featured && (
          <div className="px-5 md:px-12">
            <ProjectCard project={featured} featured index={0} />
          </div>
        )}

        {/* Rest — 2 columns on desktop */}
        {rest.length > 0 && (
          <div className="border-t border-charcoal md:grid md:grid-cols-2 md:divide-x md:divide-charcoal">
            {rest.map((project, i) => (
              <div key={project.id} className="px-5 md:px-12">
                <ProjectCard project={project} index={i + 1} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
