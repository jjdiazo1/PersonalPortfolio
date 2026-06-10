'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import HeroCollage from '@/components/HeroCollage';
import type { HeroData } from '@/lib/types';

export default function HeroSection({ heroData }: { heroData: HeroData }) {
  const [typed, setTyped]           = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [revealed, setRevealed]     = useState(false);
  const [paused, setPaused]         = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const typewriterText = heroData.typewriterText;
  const tickerContent  = '     ' + heroData.tickerItems.join('     ··     ') + '     ··  ';

  useEffect(() => {
    const r = setTimeout(() => setRevealed(true), 200);
    const t = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTyped(typewriterText.slice(0, i));
        if (i >= typewriterText.length) clearInterval(iv);
      }, 35);
      return () => clearInterval(iv);
    }, 700);
    return () => { clearTimeout(r); clearTimeout(t); };
  }, [typewriterText]);

  const pauseTicker  = () => { if (resumeTimer.current) clearTimeout(resumeTimer.current); setPaused(true); };
  const resumeTicker = (delay = 0) => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), delay);
  };

  const scrollToWork = () => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="relative border-b border-charcoal">

      {/* ── Top area: name + photo ── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px]">

        {/* Left: name block */}
        <div className="flex flex-col justify-between px-5 md:px-12 pt-10 pb-8 md:py-14 md:border-r md:border-charcoal">
          <div>
            <div className="overflow-hidden">
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)', y: 12 }}
                animate={revealed ? { clipPath: 'inset(0% 0 0 0)', y: 0 } : {}}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                className="flex flex-wrap items-baseline gap-x-3 md:gap-x-4"
              >
                <span className="font-editorial font-[100] text-[44px] md:text-[60px] lg:text-[68px] leading-[1.00] tracking-[-0.04em] text-charcoal">
                  {heroData.firstName}
                </span>
                <span className="font-condensed font-[500] text-[52px] md:text-[70px] lg:text-[80px] leading-[1.00] tracking-[0.01em] uppercase text-charcoal">
                  {heroData.lastName}
                </span>
              </motion.div>
            </div>

            <div className="mt-3 flex items-baseline">
              <span className="font-editorial font-[400] text-[16px] leading-[1.50] tracking-[-0.01em] text-charcoal">
                {typed}
              </span>
              {showCursor && <span className="cursor-blink">|</span>}
            </div>
          </div>

          <button
            onClick={scrollToWork}
            className="self-start mt-8 font-condensed text-[11px] font-[400] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px"
          >
            ↓ Work
          </button>
        </div>

        {/* Right: profile photo */}
        <div className="relative border-t border-charcoal md:border-t-0">
          <div className="md:hidden h-[220px] overflow-hidden">
            <Image
              src={heroData.profilePhotoUrl}
              alt={`${heroData.firstName} ${heroData.lastName}`}
              fill
              className="object-cover object-[center_15%]"
              style={{
                clipPath: revealed ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                transition: 'clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
              }}
            />
          </div>
          <div className="hidden md:block absolute inset-0 overflow-hidden">
            <Image
              src={heroData.profilePhotoUrl}
              alt={`${heroData.firstName} ${heroData.lastName}`}
              fill
              className="object-cover object-[center_15%]"
              style={{
                clipPath: revealed ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                transition: 'clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Project collage ── */}
      <HeroCollage />

      {/* ── Stats strip ── */}
      <div className="border-t border-charcoal grid grid-cols-5 divide-x divide-charcoal">
        {heroData.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 8 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.5 + i * 0.06 }}
            className="flex flex-col gap-1 px-3 md:px-5 py-4"
          >
            <span className="font-mono text-[13px] md:text-[16px] text-ink leading-none">
              {stat.value}
            </span>
            <span className="font-condensed text-[9px] md:text-[10px] uppercase tracking-[0.12em] text-graphite leading-tight">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* ── Ticker ── */}
      <div className="border-t border-charcoal ticker-viewport">
        <div
          className={`ticker-inner py-2${paused ? ' paused' : ''}`}
          onMouseEnter={pauseTicker}
          onMouseLeave={() => resumeTicker(300)}
          onTouchStart={pauseTicker}
          onTouchEnd={() => resumeTicker(300)}
        >
          {[0, 1].map((n) => (
            <span key={n} className="font-condensed text-[11px] uppercase tracking-[0.12em] text-graphite whitespace-nowrap">
              {tickerContent}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
