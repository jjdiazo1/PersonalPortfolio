'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import type { Project } from '@/lib/types';


/* ─── Individual collage tile ─── */
function GlitchTile({
  project,
  index,
  onClick,
}: {
  project: Project;
  index: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden cursor-pointer flex-1 border-r border-charcoal last:border-r-0`}
      style={{ minWidth: 0, aspectRatio: '3/4' }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Base image — subtle scale on hover */}
      <motion.img
        src={project.heroImage}
        alt={project.title}
        className="w-full h-full object-cover select-none"
        animate={{
          scale: hovered ? 1.04 : 1,
          filter: hovered
            ? 'brightness(0.75) contrast(1.05) grayscale(0.1)'
            : 'brightness(1) contrast(1) grayscale(0)',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      />

      {/* Editorial overlay — dark vignette tint */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(20,20,20,0.55) 0%, rgba(20,20,20,0.05) 55%, transparent 100%)' }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      />

      {/* Crosshair corner marks — top-right */}
      <motion.div
        className="absolute top-3 right-3 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-3 h-3 border-t border-r border-paper opacity-70" />
      </motion.div>

      {/* Crosshair corner marks — bottom-left */}
      <motion.div
        className="absolute bottom-12 left-2 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-3 h-3 border-b border-l border-paper opacity-70" />
      </motion.div>

      {/* Index stamp — always visible, top-left */}
      <div className="absolute top-2 left-2 pointer-events-none">
        <span className="font-mono text-[9px] text-paper bg-charcoal px-1 py-0.5 leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Label — slides up from bottom on hover */}
      <motion.div
        className="absolute bottom-0 inset-x-0 px-2 pt-1.5 pb-2 pointer-events-none"
        initial={{ y: '100%' }}
        animate={{ y: hovered ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      >
        <p className="font-condensed text-[10px] uppercase tracking-[0.12em] text-paper leading-tight truncate">
          {project.title}
        </p>
        <p className="font-mono text-[9px] text-graphite leading-none mt-0.5">{project.year}</p>
      </motion.div>
    </div>
  );
}

/* ─── Collage strip ─── */
export default function HeroCollage({ projects }: { projects: Project[] }) {
  const router = useRouter();

  if (!projects.length) return null;

  return (
    <div className="border-t border-charcoal">
      {/* Desktop: all projects side by side */}
      <div className="hidden md:flex divide-x divide-charcoal">
        {projects.map((p, i) => (
          <GlitchTile
            key={p._id}
            project={p}
            index={i}
            onClick={() => router.push(`/project/${p.slug}`)}
          />
        ))}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-none">
        {projects.map((p, i) => (
          <div key={p._id} className="snap-start shrink-0 w-[52vw] border-r border-charcoal last:border-r-0">
            <GlitchTile
              project={p}
              index={i}
              onClick={() => router.push(`/project/${p.slug}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
