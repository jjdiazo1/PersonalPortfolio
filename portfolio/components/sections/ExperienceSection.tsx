'use client';

import { useRef } from 'react';
import { motion, useInView, type Transition } from 'framer-motion';
import type { Job } from '@/lib/types';

interface ExperienceSectionProps {
  jobs: Job[];
}

export default function ExperienceSection({ jobs }: ExperienceSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const spring: Transition = { type: 'spring', stiffness: 280, damping: 24, mass: 1 };

  return (
    <section id="experience" ref={ref} className="border-b border-charcoal">
      {/* Section label */}
      <div className="px-5 md:px-12">
        <div className="flex items-center justify-between py-3 border-b border-charcoal">
          <span className="font-condensed text-[11px] font-[500] uppercase tracking-[0.12em] text-charcoal">
            Experience
          </span>
          <span className="font-mono text-[11px] text-graphite">04</span>
        </div>
      </div>

      {/* Rows */}
      <div className="px-5 md:px-12">
        {jobs.map((job, i) => (
          <motion.div
            key={job.title + job.company}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: i * 0.07 }}
            className={`py-6${i < jobs.length - 1 ? ' border-b border-charcoal' : ''}`}
          >
            <div className="flex items-start gap-5 md:gap-8">
              {/* Logo */}
              <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 overflow-hidden border border-charcoal flex items-center justify-center bg-paper mt-0.5">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="w-full h-full object-contain p-1"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title + period */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                  <div>
                    <p className="font-editorial font-[300] text-[15px] md:text-[20px] leading-[1.20] tracking-[-0.02em] text-charcoal">
                      {job.title}
                    </p>
                    <p className="font-editorial font-[400] text-[13px] md:text-[15px] leading-[1.50] tracking-[-0.01em] text-graphite mt-0.5">
                      {job.company} · {job.type}
                    </p>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <p className="font-mono text-[11px] text-charcoal">{job.period}</p>
                    <p className="font-mono text-[11px] text-graphite mt-0.5">{job.location}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="font-condensed text-[12px] md:text-[13px] text-graphite leading-[1.6] mt-3">
                  {job.description}
                </p>

                {/* Bullets */}
                {(job.bullets ?? []).length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {(job.bullets ?? []).map((b) => (
                      <li
                        key={b}
                        className="font-condensed text-[12px] md:text-[13px] text-graphite leading-[1.6] pl-3 relative before:content-['—'] before:absolute before:left-0 before:text-graphite"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Skills */}
                {(job.skills ?? []).length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {(job.skills ?? []).map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] uppercase tracking-[0.08em] text-charcoal border border-charcoal px-2 py-0.5"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
