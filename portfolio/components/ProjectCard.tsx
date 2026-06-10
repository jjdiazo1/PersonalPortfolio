'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, type Transition } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  index?: number;
}

export default function ProjectCard({ project, featured = false, index = 0 }: ProjectCardProps) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const [hovered, setHovered] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  const extras = project.additionalImages ?? [];
  const hasExtras = extras.length > 0;

  const spring: Transition = { type: 'spring', stiffness: 280, damping: 24, mass: 1 };

  // Cycle through additional images while hovered
  useEffect(() => {
    if (!hovered || !hasExtras) return;
    setActiveIdx(0);
    const id = setInterval(() => {
      setActiveIdx(i => (i + 1) % extras.length);
    }, 700);
    return () => clearInterval(id);
  }, [hovered, hasExtras, extras.length]);

  const handleClick = () => router.push(`/project/${project.slug}`);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: index * 0.05 }}
      className="cursor-pointer border-b border-charcoal last:border-b-0"
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setActiveIdx(0); }}
    >
      {/* Image */}
      <div
        className={`w-full overflow-hidden relative ${featured ? 'aspect-video' : 'aspect-[4/3]'}`}
        style={{ clipPath: inView ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)', transition: 'clip-path 500ms cubic-bezier(0.16,1,0.3,1)' }}
      >
        {/* Base image */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          style={{
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
          }}
        />

        {/* Additional images cycling on hover */}
        {hasExtras && extras.map((src, i) => (
          <motion.div
            key={src}
            className="absolute inset-0"
            animate={{ opacity: hovered && activeIdx === i ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <Image src={src} alt="" fill className="object-cover" />
          </motion.div>
        ))}

        {/* Dot indicators */}
        {hasExtras && hovered && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 pointer-events-none">
            {extras.map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-paper transition-opacity duration-150"
                style={{ opacity: activeIdx === i ? 1 : 0.35 }}
              />
            ))}
          </div>
        )}

        {/* Crosshair — top-right */}
        <div
          className="absolute top-3 right-3 w-3 h-3 border-t border-r border-paper pointer-events-none"
          style={{ opacity: hovered ? 0.7 : 0, transition: 'opacity 200ms cubic-bezier(0.16,1,0.3,1)' }}
        />

        {/* Crosshair — bottom-left */}
        <div
          className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-paper pointer-events-none"
          style={{ opacity: hovered ? 0.7 : 0, transition: 'opacity 200ms cubic-bezier(0.16,1,0.3,1)' }}
        />
      </div>

      {/* Metadata row */}
      <div className="border-t border-charcoal px-4 py-3 flex items-center justify-between">
        <span
          className="font-editorial font-[300] text-[16px] leading-[1.50] tracking-[-0.01em] text-charcoal"
          style={{
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 150ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {project.title}
        </span>
        <span className="font-mono text-[11px] text-graphite whitespace-nowrap ml-4">
          {project.year} · {project.category.split('/')[0].trim()}
        </span>
      </div>

      {/* Stack tags */}
      <div className="px-4 pb-3">
        <span className="font-condensed text-[11px] font-[400] uppercase tracking-[0.12em] text-graphite">
          {project.tags.join('  ·  ')}
        </span>
      </div>

      {featured && (
        <div className="px-4 pb-4">
          <p className="font-editorial font-[400] text-[16px] leading-[1.50] tracking-[-0.01em] text-graphite line-clamp-1">
            {project.description}
          </p>
        </div>
      )}
    </motion.div>
  );
}
