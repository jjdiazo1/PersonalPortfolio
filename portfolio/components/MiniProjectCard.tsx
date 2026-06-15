'use client';

import { useRef, useState } from 'react';
import { motion, useInView, type Transition } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Project } from '@/lib/types';

export default function MiniProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const [hovered, setHovered] = useState(false);
  const spring: Transition = { type: 'spring', stiffness: 280, damping: 24, mass: 1 };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...spring, delay: index * 0.03 }}
      className="cursor-pointer h-full flex flex-col"
      style={{ backgroundColor: hovered ? '#f5f5f5' : '#ffffff', transition: 'background-color 150ms cubic-bezier(0.16,1,0.3,1)' }}
      onClick={() => router.push(`/project/${project.slug}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Small image */}
      {project.image && (
        <div className="w-full aspect-[4/3] overflow-hidden relative shrink-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            loading="lazy"
            style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)', transition: 'transform 300ms cubic-bezier(0.16,1,0.3,1)' }}
          />
        </div>
      )}

      {/* Text */}
      <div className="border-t border-charcoal px-2.5 pt-2 pb-2 flex-1">
        <div className="flex items-baseline justify-between gap-1 mb-1">
          <span
            className="font-editorial font-[300] text-[12px] leading-[1.34] tracking-[-0.01em] text-charcoal truncate"
            style={{ transform: hovered ? 'translateX(2px)' : 'translateX(0)', transition: 'transform 150ms cubic-bezier(0.16,1,0.3,1)' }}
          >
            {project.title}
          </span>
          <span className="font-mono text-[10px] text-graphite whitespace-nowrap shrink-0">{project.year}</span>
        </div>
        <span className="font-condensed text-[10px] font-[400] uppercase tracking-[0.12em] text-graphite line-clamp-1">
          {(project.tags ?? []).slice(0, 2).join('  ·  ')}
        </span>
      </div>
    </motion.div>
  );
}
