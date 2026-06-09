'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Project, getProjectById, getAllProjects } from '@/lib/ProjectsData';

export default function ProjectDetail({ id: propId }: { id?: string | string[] }) {
  const params = useParams();
  const rawId = propId || params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    Promise.all([getProjectById(id), getAllProjects()])
      .then(([p, all]) => { setProject(p); setAllProjects(all); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center">
        <span className="font-mono text-[11px] text-graphite">Loading…</span>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center gap-4 p-4">
        <h1 className="font-editorial font-[300] text-heading text-charcoal">Project not found</h1>
        <Link href="/" className="font-condensed text-[13px] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px">
          ← Back to home
        </Link>
      </div>
    );
  }

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-paper text-charcoal">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-charcoal">
        <div className="max-w-page mx-auto px-5 md:px-12 h-12 md:h-14 flex items-center justify-between">
          <Link href="/" className="font-condensed text-[13px] font-[500] uppercase tracking-[0.12em] text-charcoal">
            JJD
          </Link>
          <Link href="/" className="font-condensed text-[13px] font-[400] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px">
            ← Work
          </Link>
        </div>
      </header>

      <main className="pt-12 md:pt-14">
        {/* Hero image */}
        <motion.div
          layoutId={`project-image-${project.id}`}
          className="w-full aspect-video overflow-hidden"
        >
          <img
            src={project.fullImage || project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="border-t border-charcoal" />

        {/* Content */}
        <div className="max-w-page mx-auto px-5 md:px-12 py-10 md:py-16">
          <div className="md:grid md:grid-cols-[65fr_35fr] md:divide-x md:divide-charcoal">
            {/* Left: description */}
            <div className="md:pr-10 pb-10 md:pb-0">
              <h1 className="font-editorial font-[300] text-[32px] leading-[1.20] tracking-[-0.02em] text-charcoal mb-4">
                {project.title}
              </h1>
              <div className="space-y-4">
                {(project.fullDescription || project.description).split('\n\n').map((para, i) => (
                  <p key={i} className="font-editorial font-[400] text-[16px] leading-[1.50] tracking-[-0.01em] text-charcoal">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Right: metadata */}
            <div className="md:pl-10 space-y-6">
              {/* Metadata strip */}
              <div className="space-y-2">
                {[
                  { label: 'Role', value: project.role },
                  { label: 'Client', value: project.client },
                  { label: 'Year', value: project.year },
                  { label: 'Timeline', value: project.timeline },
                ].filter((r) => r.value).map(({ label, value }) => (
                  <div key={label} className="flex gap-2">
                    <span className="font-mono text-[13px] text-graphite w-20 shrink-0">{label}</span>
                    <span className="font-mono text-[13px] text-charcoal">{value}</span>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div>
                <span className="font-condensed text-[11px] font-[500] uppercase tracking-[0.12em] text-graphite block mb-2">Stack</span>
                <span className="font-condensed text-[11px] font-[400] uppercase tracking-[0.12em] text-graphite">
                  {project.tags.join('  ·  ')}
                </span>
              </div>

              {/* Live URL */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-condensed text-[13px] font-[400] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px block"
                >
                  → View live
                </a>
              )}
            </div>
          </div>

          {/* Gallery */}
          {project.additionalImages?.length > 0 && (
            <div className="mt-10 border-t border-charcoal pt-10">
              <div className="grid grid-cols-2 divide-x divide-y divide-charcoal border border-charcoal">
                {project.additionalImages.map((img, i) => (
                  <div key={i} className="aspect-video overflow-hidden">
                    <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project nav */}
          <div className="mt-10 pt-6 border-t border-charcoal flex items-center justify-between">
            {prev ? (
              <Link href={`/project/${prev.id}`} className="font-condensed text-[13px] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px">
                ← {prev.title}
              </Link>
            ) : <span />}
            <Link href="/" className="font-condensed text-[11px] uppercase tracking-[0.12em] text-graphite hover:text-charcoal">
              All Work
            </Link>
            {next ? (
              <Link href={`/project/${next.id}`} className="font-condensed text-[13px] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px">
                {next.title} →
              </Link>
            ) : <span />}
          </div>
        </div>
      </main>
    </div>
  );
}
