import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#ffffff',
        charcoal: '#292929',
        ink: '#000000',
        graphite: '#888888',
        dim: '#f5f5f5',
      },
      fontFamily: {
        editorial: ['var(--font-inter)', 'sans-serif'],
        condensed: ['var(--font-barlow)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        'hero-xl': ['64px', { lineHeight: '1.00', letterSpacing: '-0.04em' }],
        'hero-lg': ['48px', { lineHeight: '1.10', letterSpacing: '-0.03em' }],
        heading: ['32px', { lineHeight: '1.20', letterSpacing: '-0.02em' }],
        subheading: ['24px', { lineHeight: '1.30', letterSpacing: '-0.02em' }],
        body: ['16px', { lineHeight: '1.50', letterSpacing: '-0.01em' }],
        label: ['13px', { lineHeight: '1.34', letterSpacing: '0.12em' }],
        caption: ['11px', { lineHeight: '1.34', letterSpacing: '0.12em' }],
        meta: ['11px', { lineHeight: '1.34', letterSpacing: '0em' }],
        'meta-lg': ['13px', { lineHeight: '1.34', letterSpacing: '0em' }],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '16px',
        '4': '24px',
        '5': '40px',
        '6': '64px',
        '7': '96px',
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '0px',
      },
      maxWidth: {
        page: '1120px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (u: Record<string, Record<string, string>>) => void }) {
      addUtilities({
        '.scrollbar-none': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        },
        '.scrollbar-none::-webkit-scrollbar': {
          display: 'none',
        },
      });
    },
  ],
};

export default config;
