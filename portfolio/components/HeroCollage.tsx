'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Project, getAllProjects } from '@/lib/ProjectsData';

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
      {/* Base image — scale + desaturate on hover */}
      <motion.img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover select-none"
        animate={{
          scale: hovered ? 1.04 : 1,
          filter: hovered
            ? 'brightness(1.15) contrast(1.2) grayscale(0.3)'
            : 'brightness(1) contrast(1) grayscale(0)',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      />

      {/* Glitch ghost layer — second copy sliced with clip-path animation */}
      {hovered && (
        <img
          src={project.image}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover glitch-layer pointer-events-none"
          style={{
            filter: 'brightness(2) contrast(3) grayscale(1)',
            mixBlendMode: 'screen',
          }}
        />
      )}

      {/* Horizontal scan line that sweeps on hover */}
      {hovered && (
        <motion.div
          className="absolute inset-x-0 h-px bg-charcoal pointer-events-none"
          initial={{ top: '0%', opacity: 0 }}
          animate={{ top: ['0%', '100%'], opacity: [0, 0.6, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* Index stamp — always visible, top-left */}
      <div className="absolute top-2 left-2 pointer-events-none">
        <span className="font-mono text-[9px] text-paper bg-charcoal px-1 py-0.5 leading-none">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Label — slides up from bottom on hover */}
      <motion.div
        className="absolute bottom-0 inset-x-0 bg-charcoal px-2 pt-1.5 pb-2 pointer-events-none"
        initial={{ y: '100%' }}
        animate={{ y: hovered ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
      >
        <p
          className="font-condensed text-[10px] uppercase tracking-[0.12em] text-paper leading-tight truncate"
          style={hovered ? { animation: 'none' } : {}}
        >
          {project.title}
        </p>
        <p className="font-mono text-[9px] text-graphite leading-none mt-0.5">{project.year}</p>
      </motion.div>

      {/* Jitter wrapper — subtle X shake on hover */}
      {hovered && (
        <div className="absolute inset-0 pointer-events-none glitch-jitter" />
      )}
    </div>
  );
}

/* ─── Collage strip ─── */
export default function HeroCollage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const router = useRouter();

  useEffect(() => {
    getAllProjects().then(setProjects).catch(console.error);
  }, []);

  if (!projects.length) return null;

  return (
    <div className="border-t border-charcoal">
      {/* Desktop: all projects side by side */}
      <div className="hidden md:flex divide-x-0">
        {projects.map((p, i) => (
          <GlitchTile
            key={p.id}
            project={p}
            index={i}
            onClick={() => router.push(`/project/${p.id}`)}
          />
        ))}
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory scrollbar-none">
        {projects.map((p, i) => (
          <div key={p.id} className="snap-start shrink-0 w-[52vw] border-r border-charcoal last:border-r-0">
            <GlitchTile
              project={p}
              index={i}
              onClick={() => router.push(`/project/${p.id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
