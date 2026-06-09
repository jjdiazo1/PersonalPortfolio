'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import heroData from '@/lib/hero-data.json';
import HeroCollage from '@/components/HeroCollage';

const TYPEWRITER_TEXT = 'Systems Engineer · Founder · Making cool stuff';

/* Ticker content: items joined with separator, NO padding on spans —
   spacing lives entirely in the string so both copies are pixel-identical. */
/* Leading space is part of the string so both copies are byte-identical
   and translateX(-50%) lands pixel-perfectly at the loop point. */
const TICKER_CONTENT = '     ' + heroData.tickerItems.join('     ··     ') + '     ··  ';

export default function HeroSection() {
  const [typed, setTyped]         = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [revealed, setRevealed]   = useState(false);
  const [paused, setPaused]       = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const r = setTimeout(() => setRevealed(true), 200);
    const t = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setTyped(TYPEWRITER_TEXT.slice(0, i));
        if (i >= TYPEWRITER_TEXT.length) clearInterval(iv);
      }, 35);
      return () => clearInterval(iv);
    }, 700);
    return () => { clearTimeout(r); clearTimeout(t); };
  }, []);

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
            {/* Name — one line: "Juan Jose" (Inter 100) + "Díaz" (Barlow Condensed 500) */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0)', y: 12 }}
                animate={revealed ? { clipPath: 'inset(0% 0 0 0)', y: 0 } : {}}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                className="flex flex-wrap items-baseline gap-x-3 md:gap-x-4"
              >
                <span className="font-editorial font-[100] text-[44px] md:text-[60px] lg:text-[68px] leading-[1.00] tracking-[-0.04em] text-charcoal">
                  Juan Jose
                </span>
                <span className="font-condensed font-[500] text-[52px] md:text-[70px] lg:text-[80px] leading-[1.00] tracking-[0.01em] uppercase text-charcoal">
                  Díaz
                </span>
              </motion.div>
            </div>

            {/* Typewriter role */}
            <div className="mt-3 flex items-baseline">
              <span className="font-editorial font-[400] text-[16px] leading-[1.50] tracking-[-0.01em] text-charcoal">
                {typed}
              </span>
              {showCursor && <span className="cursor-blink">|</span>}
            </div>
          </div>

          {/* Scroll cue */}
          <button
            onClick={scrollToWork}
            className="self-start mt-8 font-condensed text-[11px] font-[400] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px"
          >
            ↓ Work
          </button>
        </div>

        {/* Right: profile photo */}
        <div className="relative border-t border-charcoal md:border-t-0">
          {/* Mobile: fixed-height strip */}
          <div className="md:hidden h-[220px] overflow-hidden">
            <img
              src="/Profile.png"
              alt="Juan Jose Diaz"
              className="w-full h-full object-cover object-[center_15%]"
              style={{
                clipPath: revealed ? 'inset(0 0 0% 0)' : 'inset(0 0 100% 0)',
                transition: 'clip-path 600ms cubic-bezier(0.16, 1, 0.3, 1) 0.25s',
              }}
            />
          </div>
          {/* Desktop: absolute fill — stretches to match the left column's height */}
          <div className="hidden md:block absolute inset-0 overflow-hidden">
            <img
              src="/Profile.png"
              alt="Juan Jose Diaz"
              className="w-full h-full object-cover object-[center_15%]"
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

      {/* ── Stats strip — 5 equal columns ── */}
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

      {/* ── Ticker — seamless infinite loop ── */}
      <div className="border-t border-charcoal ticker-viewport">
        <div
          className={`ticker-inner py-2${paused ? ' paused' : ''}`}
          onMouseEnter={pauseTicker}
          onMouseLeave={() => resumeTicker(300)}
          onTouchStart={pauseTicker}
          onTouchEnd={() => resumeTicker(300)}
        >
          {/* Both spans are byte-identical — no padding/margin anywhere */}
          {[0, 1].map((n) => (
            <span key={n} className="font-condensed text-[11px] uppercase tracking-[0.12em] text-graphite whitespace-nowrap">
              {TICKER_CONTENT}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
