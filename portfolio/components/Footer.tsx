'use client';

import type { SiteConfig } from '@/lib/types';

export default function Footer({ siteConfig }: { siteConfig: SiteConfig }) {
  return (
    <footer className="mt-auto">
      <div className="px-5 md:px-12 py-5 flex items-center justify-between">
        <span className="font-condensed text-[13px] font-medium uppercase tracking-[0.12em] text-charcoal">
          {siteConfig.logo}
        </span>
        <div className="flex items-center gap-4">
          {siteConfig.footerLinks.map(({ label, href }, i) => (
            <span key={label} className="flex items-center gap-4">
              {i > 0 && <span className="font-condensed text-[11px] text-graphite">·</span>}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-condensed text-[11px] font-normal uppercase tracking-[0.12em] text-charcoal hover:border-b hover:border-charcoal pb-px"
              >
                {label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
