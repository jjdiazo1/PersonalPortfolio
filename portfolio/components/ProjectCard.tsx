'use client';

import { useRef, useState } from 'react';
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

  const spring: Transition = { type: 'spring', stiffness: 280, damping: 24, mass: 1 };

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
      onMouseLeave={() => setHovered(false)}
      style={{ backgroundColor: hovered ? '#f5f5f5' : '#ffffff', transition: 'background-color 150ms cubic-bezier(0.16,1,0.3,1)' }}
    >
      {/* Image */}
      <div
        className={`w-full overflow-hidden relative ${featured ? 'aspect-video' : 'aspect-[4/3]'}`}
        style={{ clipPath: inView ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)', transition: 'clip-path 500ms cubic-bezier(0.16,1,0.3,1)' }}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          style={{
            transform: hovered ? 'scale(1.02)' : 'scale(1)',
            transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
          }}
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
