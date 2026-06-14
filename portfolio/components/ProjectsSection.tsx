'use client';

import type { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';
import SecondaryProjectCard from './SecondaryProjectCard';

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const primary = projects.filter(p => !p.tier || p.tier === 'primary');
  const secondary = projects.filter(p => p.tier === 'secondary');

  return (
    <section id="work">

      {/* ── PRIMARY ── Currently working on, 2 columns */}
      <div className="px-5 md:px-12 border-b border-charcoal">
        <div className="flex items-center justify-between py-3">
          <span className="font-condensed text-[11px] font-[500] uppercase tracking-[0.12em] text-charcoal">Currently working on</span>
          <span className="font-mono text-[11px] text-graphite">01</span>
        </div>
      </div>

      {primary.length > 0 && (
        <div className="md:grid md:grid-cols-2 border-b border-charcoal">
          {primary.map((project, i) => (
            <div
              key={project._id}
              className={`px-5 md:px-12${i % 2 === 1 ? ' md:border-l md:border-charcoal' : ''}`}
            >
              <ProjectCard project={project} index={i} />
            </div>
          ))}
        </div>
      )}

      {/* ── SECONDARY ── Work, 3 columns */}
      {secondary.length > 0 && (
        <>
          <div className="px-5 md:px-12 border-b border-charcoal">
            <div className="flex items-center justify-between py-3">
              <span className="font-condensed text-[11px] font-[500] uppercase tracking-[0.12em] text-charcoal">Work</span>
              <span className="font-mono text-[11px] text-graphite">{String(secondary.length).padStart(2, '0')}</span>
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 border-b border-charcoal">
            {secondary.map((project, i) => (
              <div
                key={project._id}
                className={`px-5 md:px-8${i % 3 !== 0 ? ' md:border-l md:border-charcoal' : ''}`}
              >
                <SecondaryProjectCard project={project} index={i} />
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
