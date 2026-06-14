'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, type Transition } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Project } from '@/lib/types';

export default function SecondaryProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const [hovered, setHovered] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const extras = project.additionalImages ?? [];
  const hasExtras = extras.length > 0;
  const spring: Transition = { type: 'spring', stiffness: 280, damping: 24, mass: 1 };

  useEffect(() => {
    if (!hovered || !hasExtras) return;
    setActiveIdx(0);
    const id = setInterval(() => setActiveIdx(i => (i + 1) % extras.length), 700);
    return () => clearInterval(id);
  }, [hovered, hasExtras, extras.length]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: index * 0.05 }}
      className="cursor-pointer border-b border-charcoal last:border-b-0"
      onClick={() => router.push(`/project/${project.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActiveIdx(0); }}
    >
      {/* Image */}
      {project.image && (
        <div
          className="w-full aspect-[4/3] overflow-hidden relative"
          style={{ clipPath: inView ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)', transition: 'clip-path 500ms cubic-bezier(0.16,1,0.3,1)' }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)' }}
          />
          {hasExtras && extras.map((src, i) => (
            <motion.div key={src} className="absolute inset-0" animate={{ opacity: hovered && activeIdx === i ? 1 : 0 }} transition={{ duration: 0.25 }}>
              <Image src={src} alt="" fill className="object-cover" loading="lazy" />
            </motion.div>
          ))}
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-paper pointer-events-none" style={{ opacity: hovered ? 0.7 : 0, transition: 'opacity 200ms' }} />
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-paper pointer-events-none" style={{ opacity: hovered ? 0.7 : 0, transition: 'opacity 200ms' }} />
        </div>
      )}

      {/* Metadata */}
      <div className="border-t border-charcoal px-3 py-2 flex items-center justify-between">
        <span
          className="font-editorial font-[300] text-[14px] leading-[1.34] tracking-[-0.01em] text-charcoal"
          style={{ transform: hovered ? 'translateX(3px)' : 'translateX(0)', transition: 'transform 150ms cubic-bezier(0.16,1,0.3,1)' }}
        >
          {project.title}
        </span>
        <span className="font-mono text-[11px] text-graphite whitespace-nowrap ml-3">
          {project.year}
        </span>
      </div>

      <div className="px-3 pb-2">
        <span className="font-condensed text-[11px] font-[400] uppercase tracking-[0.12em] text-graphite">
          {project.tags.slice(0, 3).join('  ·  ')}
        </span>
      </div>
    </motion.div>
  );
}
