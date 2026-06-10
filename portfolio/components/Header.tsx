'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SiteConfig } from '@/lib/types';

export default function Header({ siteConfig }: { siteConfig: SiteConfig }) {
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY.current || y < 60);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        animate={{ y: visible ? 0 : -64 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-charcoal"
      >
        <div className="px-5 md:px-12 h-12 md:h-14 flex items-center justify-between">
          <span className="font-condensed text-[13px] font-medium uppercase tracking-[0.12em] text-charcoal">
            {siteConfig.logo}
          </span>

          <span className="hidden md:block font-mono text-[11px] text-graphite">
            {siteConfig.statusLabel}
          </span>

          <nav className="hidden md:flex gap-6">
            {siteConfig.navItems.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="font-condensed text-[13px] font-normal uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px"
              >
                {id}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden font-mono text-[18px] text-charcoal leading-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? '×' : '≡'}
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 160, damping: 30, mass: 1.2 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-paper border-t border-charcoal"
          >
            {siteConfig.navItems.map((id, i) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`w-full text-left px-5 py-5 font-condensed text-[14px] font-medium uppercase tracking-[0.12em] text-charcoal${i > 0 ? ' border-t border-charcoal' : ''}`}
              >
                {id}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
