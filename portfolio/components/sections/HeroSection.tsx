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

export default function HeroSection() {
  const [typed, setTyped] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [tickerPaused, setTickerPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Gridlines draw → hero reveal → typewriter
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
    <section className="relative min-h-[88svh] flex flex-col pt-12 md:pt-14 border-b border-charcoal overflow-hidden">
      {/* Gridline columns — draw animation */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 border-l border-charcoal gridline-animate"
            style={{
              left: `${(i + 1) * 25}%`,
              animationDelay: `${i * 80}ms`,
              opacity: 0.12,
            }}
          />
        ))}
      </div>

      <div className="max-w-page mx-auto px-5 md:px-12 flex flex-col flex-1 pt-16 md:pt-24">
        {/* Name */}
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

        {/* Role + cursor */}
        <div className="mt-4 flex items-baseline">
          <span className="font-editorial font-[400] text-[16px] leading-[1.50] tracking-[-0.01em] text-charcoal">
            {typed}
          </span>
          {showCursor && <span className="cursor-blink">|</span>}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Ticker */}
        <div className="border-t border-charcoal border-b border-charcoal py-2 overflow-hidden -mx-5 md:-mx-12">
          <div
            className={`ticker-track${tickerPaused ? ' paused' : ''}`}
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
                className="font-condensed text-[11px] font-[400] uppercase tracking-[0.12em] text-graphite whitespace-nowrap px-5 md:px-12"
              >
                {TICKER_CONTENT}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={scrollToWork}
          className="absolute bottom-6 left-5 md:left-12 font-condensed text-[11px] font-[400] uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px"
        >
          ↓ WORK
        </button>
      </div>
    </section>
  );
}
