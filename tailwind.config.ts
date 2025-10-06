import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
    './src/styles/**/*.{ts,tsx,css}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    borderRadius: {
      none: '0px',
      xs: '6px',
      tiny: '12px',
      sm: '24px',
      DEFAULT: '24px',
      md: '24px',
      lg: '24px',
      xl: '24px',
      '2xl': '24px',
      '3xl': '24px',
      full: '9999px' // keep full for perfectly circular shapes like avatars
    },
    extend: {

      colors: {
        bg: 'hsl(var(--bg))',
        'bg-alt': 'hsl(var(--bg-alt))',
        fg: 'hsl(var(--fg))',
        'fg-muted': 'hsl(var(--fg-muted))',
        primary: 'hsl(var(--primary))',
        'primary-fg': 'hsl(var(--primary-foreground))',
        secondary: 'hsl(var(--secondary))',
        'secondary-fg': 'hsl(var(--secondary-foreground))',
        accent: 'hsl(var(--accent))',
        'accent-fg': 'hsl(var(--accent-foreground))',
        muted: 'hsl(var(--muted))',
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        danger: 'hsl(var(--danger))'
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease forwards',
        'slide-up': 'slideUp 0.7s ease forwards',
        'scroll-x': 'scroll-x 30s linear infinite'
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.radius-tiny': { borderRadius: '12px' },
        '.radius-xs': { borderRadius: '6px' }
      });
    })
  ]
};

export default config;
