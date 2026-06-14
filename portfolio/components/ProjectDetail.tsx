'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import type { Project } from '@/lib/types';

interface ProjectDetailProps {
  project: Project | null;
  allProjects: Project[];
}

export default function ProjectDetail({ project, allProjects }: ProjectDetailProps) {
  if (!project) {
    return (
      <div className="min-h-screen bg-paper flex flex-col items-center justify-center gap-4 p-4">
        <h1 className="font-editorial font-[300] text-[32px] text-charcoal">Project not found</h1>
        <Link href="/" className="font-condensed text-[13px] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px">
          ← Back to home
        </Link>
      </div>
    );
  }

  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-paper text-charcoal">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-charcoal">
        <div className="px-5 md:px-12 h-12 md:h-14 flex items-center justify-between">
          <Link href="/" className="font-condensed text-[13px] font-[500] uppercase tracking-[0.12em] text-charcoal">
            JJD
          </Link>
          <Link href="/" className="font-condensed text-[13px] font-[400] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px">
            ← Work
          </Link>
        </div>
      </header>

      <main className="pt-12 md:pt-14">
        <div className="border-t border-charcoal" />

        {/* Content */}
        <div className="px-5 md:px-12 py-10 md:py-16">
          <div className="md:grid md:grid-cols-[65fr_35fr] md:divide-x md:divide-charcoal">
            {/* Left: description */}
            <div className="md:pr-10 pb-10 md:pb-0">
              <h1 className="font-editorial font-[300] text-[32px] leading-[1.20] tracking-[-0.02em] text-charcoal mb-4">
                {project.title}
              </h1>
              <div className="prose prose-charcoal max-w-none space-y-4 font-editorial font-[400] text-[16px] leading-[1.50] tracking-[-0.01em] text-charcoal [&_p]:mb-4 [&_h1]:font-editorial [&_h1]:font-[300] [&_h1]:text-[24px] [&_h2]:font-editorial [&_h2]:font-[300] [&_h2]:text-[20px] [&_h3]:font-editorial [&_h3]:font-[300] [&_h3]:text-[17px] [&_strong]:font-[600] [&_em]:italic [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_a]:underline [&_a]:underline-offset-2 [&_code]:font-mono [&_code]:text-[14px] [&_blockquote]:border-l-2 [&_blockquote]:border-charcoal [&_blockquote]:pl-4 [&_blockquote]:italic">
                <ReactMarkdown>
                  {project.fullDescription || project.description}
                </ReactMarkdown>
              </div>
            </div>

            {/* Right: metadata */}
            <div className="md:pl-10 space-y-6">
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

              <div>
                <span className="font-condensed text-[11px] font-[500] uppercase tracking-[0.12em] text-graphite block mb-2">Stack</span>
                <span className="font-condensed text-[11px] font-[400] uppercase tracking-[0.12em] text-graphite">
                  {project.tags.join('  ·  ')}
                </span>
              </div>

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
                  <div key={i} className="aspect-video overflow-hidden relative">
                    <Image src={img} alt={`${project.title} ${i + 1}`} fill className="object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project nav */}
          <div className="mt-10 pt-6 border-t border-charcoal flex items-center justify-between">
            {prev ? (
              <Link href={`/project/${prev.slug}`} className="font-condensed text-[13px] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px">
                ← {prev.title}
              </Link>
            ) : <span />}
            <Link href="/" className="font-condensed text-[11px] uppercase tracking-[0.12em] text-graphite hover:text-charcoal">
              All Work
            </Link>
            {next ? (
              <Link href={`/project/${next.slug}`} className="font-condensed text-[13px] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px">
                {next.title} →
              </Link>
            ) : <span />}
          </div>
        </div>
      </main>
    </div>
  );
}
