"use client";
import { motion, useReducedMotion } from 'framer-motion';
import React from 'react';

/**
 * AnimatedBackground
 * Site-wide decorative animated vector & gradient system.
 * Respects prefers-reduced-motion (falls back to static gradients & subtle grid).
 */
// Single fixed variant: FULL (reduced-motion safe fallback still supported)

export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();

  // Predefined positions & configs (avoid runtime randomness for hydration consistency)
  const frontendMotifs = [
    { x: 8, y: 18, s: 1, d: 22, del: 0, type: 'brackets' },
    { x: 78, y: 22, s: 0.9, d: 28, del: 2, type: 'hash' },
    { x: 18, y: 65, s: 1.15, d: 30, del: 1.5, type: 'palette' },
    { x: 60, y: 70, s: 1, d: 34, del: 0.8, type: 'grid' },
    { x: 85, y: 55, s: 0.85, d: 26, del: 1.2, type: 'component' },
    { x: 42, y: 40, s: 1.05, d: 24, del: 0.4, type: 'angle' },
    { x: 68, y: 32, s: 0.95, d: 36, del: 2.4, type: 'curly' }
  ];

  const renderMotif = (m: (typeof frontendMotifs)[number]) => {
    const common = 'w-12 h-12';
    const stroke = 'hsl(var(--primary)/0.6)';
    const strokeAlt = 'hsl(var(--secondary)/0.55)';
    const accent = 'hsl(var(--accent)/0.5)';
    switch (m.type) {
      case 'brackets':
        return (
          <svg viewBox="0 0 100 100" className={common} aria-hidden>
            <path d="M30 15 L18 15 L18 85 L30 85" fill="none" stroke={stroke} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
            <path d="M70 15 L82 15 L82 85 L70 85" fill="none" stroke={strokeAlt} strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'hash':
        return (
          <svg viewBox="0 0 100 100" className={common} aria-hidden>
            <path d="M32 18 L22 82 M60 18 L50 82 M15 38 L85 38 M12 60 L82 60" stroke={strokeAlt} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case 'palette':
        return (
          <svg viewBox="0 0 100 100" className={common} aria-hidden>
            <circle cx="50" cy="50" r="30" stroke={stroke} strokeWidth={5} fill="none" />
            <circle cx="40" cy="42" r="5" fill={stroke} />
            <circle cx="60" cy="40" r="5" fill={strokeAlt} />
            <circle cx="64" cy="56" r="5" fill={accent} />
            <circle cx="46" cy="62" r="5" fill={strokeAlt} />
          </svg>
        );
      case 'grid':
        return (
          <svg viewBox="0 0 100 100" className={common} aria-hidden>
            <rect x="18" y="18" width="64" height="64" rx="6" stroke={stroke} strokeWidth={4} fill="none" />
            <path d="M18 50 H82 M50 18 V82" stroke={strokeAlt} strokeWidth={4} />
            <rect x="28" y="28" width="18" height="18" rx="3" fill={accent} opacity="0.4" />
            <rect x="54" y="54" width="18" height="18" rx="3" fill={strokeAlt} opacity="0.35" />
          </svg>
        );
      case 'component':
        return (
          <svg viewBox="0 0 120 80" className={common} aria-hidden>
            <rect x="8" y="10" width="104" height="60" rx="10" stroke={stroke} strokeWidth={4} fill="none" />
            <rect x="8" y="10" width="104" height="16" rx="10" fill={stroke} opacity="0.15" />
            <circle cx="26" cy="18" r="4" fill={strokeAlt} />
            <circle cx="40" cy="18" r="4" fill={accent} />
            <rect x="26" y="34" width="68" height="24" rx="4" stroke={strokeAlt} strokeWidth={3} fill="none" />
          </svg>
        );
      case 'angle':
        return (
          <svg viewBox="0 0 100 100" className={common} aria-hidden>
            <path d="M34 20 L18 50 L34 80" stroke={stroke} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <path d="M66 20 L82 50 L66 80" stroke={strokeAlt} strokeWidth={7} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        );
      case 'curly':
        return (
            <svg viewBox="0 0 100 100" className={common} aria-hidden>
              <path d="M55 18 C45 18 44 26 44 34 C44 43 42 48 34 52 C42 56 44 61 44 70 C44 78 45 82 55 82" stroke={strokeAlt} strokeWidth={6} fill="none" strokeLinecap="round" />
              <path d="M45 18 C55 18 56 26 56 34 C56 43 58 48 66 52 C58 56 56 61 56 70 C56 78 55 82 45 82" stroke={stroke} strokeWidth={6} fill="none" strokeLinecap="round" />
            </svg>
        );
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
  

      {/* Static fallback (reduced motion) */}
      {prefersReducedMotion && (
        <>
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/25 blur-3xl mix-blend-screen" />
          <div className="absolute top-1/4 -right-40 h-[30rem] w-[30rem] rounded-full bg-secondary/25 blur-3xl mix-blend-screen" />
          <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/25 blur-2xl mix-blend-screen" />
        </>
      )}

      {!prefersReducedMotion && (
        <>
          {/* Front-end motif layer */}
          <div className="absolute inset-0 pointer-events-none">
            {frontendMotifs.map((m, i) => (
              <motion.div
                key={i}
                aria-hidden
                className="absolute mix-blend-screen opacity-[0.28] hover:opacity-50 transition-opacity"
                style={{ top: `${m.y}%`, left: `${m.x}%`, scale: m.s }}
                animate={{ y: [0, -8, 0], rotate: [0, 4, -2, 0] }}
                transition={{ duration: m.d, delay: m.del, repeat: Infinity, ease: 'easeInOut' }}
              >
                {renderMotif(m)}
              </motion.div>
            ))}
          </div>
  
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/25 blur-2xl mix-blend-screen"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] opacity-40"
            viewBox="0 0 1100 1100"
            fill="none"
            aria-hidden
            animate={{ rotate: 360 }}
            transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
          >
            {[180, 260, 360, 480].map((r, i) => (
              <circle
                key={r}
                cx="550"
                cy="550"
                r={r}
                stroke={`url(#orbit-gradient-${i})`}
                strokeWidth="1"
                className="[stroke-dasharray:4_12]"
              />
            ))}
            <defs>
              <linearGradient id="orbit-gradient-0" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary)/0.65)" />
                <stop offset="100%" stopColor="hsl(var(--secondary)/0.0)" />
              </linearGradient>
              <linearGradient id="orbit-gradient-1" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--secondary)/0.55)" />
                <stop offset="100%" stopColor="hsl(var(--accent)/0.0)" />
              </linearGradient>
              <linearGradient id="orbit-gradient-2" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--accent)/0.55)" />
                <stop offset="100%" stopColor="hsl(var(--primary)/0.0)" />
              </linearGradient>
              <linearGradient id="orbit-gradient-3" x1="1" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="hsl(var(--primary)/0.45)" />
                <stop offset="100%" stopColor="hsl(var(--secondary)/0.0)" />
              </linearGradient>
            </defs>
          </motion.svg>
          <motion.div
            className="absolute left-10 top-1/3 h-20 w-20 rounded-xl bg-gradient-to-br from-primary/40 via-secondary/40 to-accent/40 backdrop-blur-md border border-border/40"
            animate={{ y: [0, -18, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-16 top-20 h-16 w-16 rounded-full bg-gradient-to-br from-accent/40 via-primary/30 to-secondary/40 backdrop-blur-md border border-border/40"
            animate={{ y: [0, 22, 0], rotate: [0, -12, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
    </div>
  );
}
