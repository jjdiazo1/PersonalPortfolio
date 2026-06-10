'use client';

import { useRef } from 'react';
import { motion, useInView, type Transition } from 'framer-motion';
import type { AboutData } from '@/lib/types';

export default function AboutSection({ aboutData }: { aboutData: AboutData }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const spring: Transition = { type: 'spring', stiffness: 280, damping: 24, mass: 1 };

  return (
    <section id="about" ref={ref} className="border-b border-charcoal">
      <div className="px-5 md:px-12">
        <div className="flex items-center justify-between py-3 border-b border-charcoal">
          <span className="font-condensed text-[11px] font-[500] uppercase tracking-[0.12em] text-charcoal">
            About
          </span>
          <span className="font-mono text-[11px] text-graphite">02</span>
        </div>
      </div>

      <div className="px-5 md:px-12 py-10 md:py-16">
        <div className="md:grid md:grid-cols-5 md:gap-0 md:divide-x md:divide-charcoal">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring }}
            className="md:col-span-3 md:pr-10 pb-8 md:pb-0"
          >
            <p className="font-editorial font-[200] text-[32px] leading-[1.20] tracking-[-0.02em] text-charcoal">
              {aboutData.statement}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...spring, delay: 0.08 }}
            className="md:col-span-2 md:pl-10 flex flex-col gap-4"
          >
            {aboutData.bio.map((paragraph, i) => (
              <p key={i} className="font-editorial font-[400] text-[16px] leading-[1.50] tracking-[-0.01em] text-graphite">
                {paragraph}
              </p>
            ))}

            <div className="flex gap-4 mt-2">
              {aboutData.links.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-condensed text-[13px] font-[400] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
