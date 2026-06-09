'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const TYPEWRITER_TEXT = 'Systems Engineer · Founder · Building in public';
const TICKER_ITEMS = [
  '3 projects in production',
  'Bogotá, Colombia',
  'Available for projects',
  'Q2 2026',
  '2 own products',
];
const TICKER_CONTENT = TICKER_ITEMS.join('  ··  ') + '  ··  ';

const STATS = [
  { value: '3', label: 'In Production' },
  { value: '2', label: 'Own Products' },
  { value: 'Open', label: 'For Work' },
  { value: 'Q2 2026', label: 'Current Quarter' },
  { value: 'BOG', label: 'Bogotá, CO' },
];

export default function HeroSection() {
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const revealDelay = setTimeout(() => setRevealed(true), 200);
    const typeDelay = setTimeout(() => {
      setShowCursor(true);
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setTyped(TYPEWRITER_TEXT.slice(0, i));
        if (i >= TYPEWRITER_TEXT.length) clearInterval(interval);
      }, 35);
      return () => clearInterval(interval);
    }, 700);
    return () => {
      clearTimeout(revealDelay);
      clearTimeout(typeDelay);
    };
  }, []);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative border-b border-charcoal overflow-hidden">

      {/* ── Main hero area: name (left) + photo (right) ── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] lg:grid-cols-[1fr_380px] min-h-[65svh] md:min-h-[72svh]">

        {/* Left: name + role + scroll cue */}
        <div className="flex flex-col justify-between px-5 md:px-12 py-10 md:py-14 border-r border-charcoal">
          <div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ clipPath: 'inset(100% 0 0 0)', y: 12 }}
                animate={revealed ? { clipPath: 'inset(0% 0 0 0)', y: 0 } : {}}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0 }}
                className="font-editorial font-[100] text-[48px] md:text-[64px] leading-[1.00] tracking-[-0.04em] text-charcoal"
              >
                Juan Jose
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ clipPath: 'inset(100% 0 0 0)', y: 12 }}
                animate={revealed ? { clipPath: 'inset(0% 0 0 0)', y: 0 } : {}}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                className="font-editorial font-[100] text-[48px] md:text-[64px] leading-[1.00] tracking-[-0.04em] text-charcoal"
              >
                Diaz
              </motion.h1>
            </div>

            {/* Typewriter role */}
            <div className="mt-4 flex items-baseline">
              <span className="font-editorial font-[400] text-[16px] leading-[1.50] tracking-[-0.01em] text-charcoal">
                {typed}
              </span>
              {showCursor && <span className="cursor-blink">|</span>}
            </div>
          </div>

          {/* Scroll cue */}
          <button
            onClick={scrollToWork}
            className="self-start font-condensed text-[11px] font-[400] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px mt-6"
          >
            ↓ Work
          </button>
        </div>

        {/* Right: profile photo */}
        <div className="hidden md:block h-full">
          <div className="w-full h-full overflow-hidden">
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

      {/* ── Stats strip — 5 equal columns ── */}
      <div className="border-t border-charcoal">
        <div className="grid grid-cols-5 divide-x divide-charcoal">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={revealed ? { opacity: 1, y: 0 } : {}}
              transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.4 + i * 0.06 }}
              className="flex flex-col gap-1 px-3 md:px-5 py-4"
            >
              <span className="font-mono text-[12px] md:text-[15px] font-[400] text-ink leading-none">
                {stat.value}
              </span>
              <span className="font-condensed text-[9px] md:text-[11px] font-[400] uppercase tracking-[0.12em] text-graphite leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Ticker ── */}
      <div className="border-t border-charcoal overflow-hidden">
        <div
          className={`ticker-track${tickerPaused ? ' paused' : ''} py-2`}
          onMouseEnter={() => setTickerPaused(true)}
          onMouseLeave={() => setTickerPaused(false)}
          onTouchStart={() => {
            setTickerPaused(true);
            if (timerRef.current) clearTimeout(timerRef.current);
          }}
          onTouchEnd={() => {
            timerRef.current = setTimeout(() => setTickerPaused(false), 300);
          }}
        >
          {[0, 1].map((copy) => (
            <span
              key={copy}
              className="font-condensed text-[11px] font-[400] uppercase tracking-[0.12em] text-graphite whitespace-nowrap px-8"
            >
              {TICKER_CONTENT}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
