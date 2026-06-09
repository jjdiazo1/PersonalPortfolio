'use client';

import { useRef } from 'react';
import { motion, useInView, type Transition } from 'framer-motion';

const SCHOOLS = [
  {
    name: 'National Institute of Applied Sciences Lyon',
    short: 'INSA Lyon',
    degree: 'Master in Computer Science',
    period: '2025 – 2027',
    location: 'Lyon, France',
    logo: '/Logos/insa.png',
  },
  {
    name: 'Universidad de Los Andes',
    short: 'Uniandes',
    degree: 'Systems and Computer Science Engineering',
    period: '2022 – 2026',
    location: 'Bogotá, Colombia',
    logo: '/Logos/uniandes.png',
  },
  {
    name: 'National Service of Apprenticeship',
    short: 'SENA',
    degree: 'Computer and Systems Technician',
    period: '2019 – 2021',
    location: 'Colombia',
    logo: '/Logos/sena.png',
  },
];

export default function EducationSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const spring: Transition = { type: 'spring', stiffness: 280, damping: 24, mass: 1 };

  return (
    <section id="education" ref={ref} className="border-b border-charcoal">
      {/* Section label */}
      <div className="px-5 md:px-12">
        <div className="flex items-center justify-between py-3 border-b border-charcoal">
          <span className="font-condensed text-[11px] font-[500] uppercase tracking-[0.12em] text-charcoal">
            Education
          </span>
          <span className="font-mono text-[11px] text-graphite">03</span>
        </div>
      </div>

      {/* Rows */}
      <div className="px-5 md:px-12">
        {SCHOOLS.map((school, i) => (
          <motion.div
            key={school.name}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: i * 0.07 }}
            className={`flex items-center gap-5 md:gap-8 py-6${i < SCHOOLS.length - 1 ? ' border-b border-charcoal' : ''}`}
          >
            {/* Logo */}
            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 overflow-hidden border border-charcoal flex items-center justify-center bg-paper">
              <img
                src={school.logo}
                alt={school.short}
                className="w-full h-full object-contain p-1"
              />
            </div>

            {/* Institution + degree */}
            <div className="flex-1 min-w-0">
              <p className="font-editorial font-[300] text-[15px] md:text-[20px] leading-[1.20] tracking-[-0.02em] text-charcoal">
                {school.name}
              </p>
              <p className="font-editorial font-[400] text-[13px] md:text-[15px] leading-[1.50] tracking-[-0.01em] text-graphite mt-0.5">
                {school.degree}
              </p>
            </div>

            {/* Period + location — right */}
            <div className="shrink-0 text-right hidden sm:block">
              <p className="font-mono text-[11px] text-charcoal">{school.period}</p>
              <p className="font-mono text-[11px] text-graphite mt-0.5">{school.location}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
