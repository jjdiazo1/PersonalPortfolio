'use client';

/**
 * Full-page vertical gridline overlay — the structural skeleton that persists
 * across every section. Three lines at 25 / 50 / 75% of the max-page width,
 * drawn with a scaleY animation on mount.
 */
export default function GridlineOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden
      style={{ maxWidth: '1120px', margin: '0 auto', left: 0, right: 0 }}
    >
      {[25, 50, 75].map((pct, i) => (
        <div
          key={pct}
          className="absolute top-0 bottom-0 border-l border-charcoal gridline-animate"
          style={{
            left: `${pct}%`,
            animationDelay: `${i * 80}ms`,
            opacity: 0.08,
          }}
        />
      ))}
    </div>
  );
}
