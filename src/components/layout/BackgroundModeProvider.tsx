"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type BackgroundMode = 'simple' | 'waves' | 'ribbons' | 'mesh' | 'constellation' | 'full';

interface BackgroundContextValue {
  mode: BackgroundMode;
  setMode: (m: BackgroundMode) => void;
  cycle: () => void;
  options: BackgroundMode[];
}

const BackgroundContext = createContext<BackgroundContextValue | undefined>(undefined);

const ORDER: BackgroundMode[] = ['simple', 'waves', 'ribbons', 'mesh', 'constellation', 'full'];

export function BackgroundModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<BackgroundMode>('waves');

  useEffect(() => {
    const stored = localStorage.getItem('bg-mode') as BackgroundMode | null;
    if (stored && ORDER.includes(stored)) setMode(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('bg-mode', mode);
  }, [mode]);

  const cycle = () => {
    setMode((prev) => {
      const idx = ORDER.indexOf(prev);
      return ORDER[(idx + 1) % ORDER.length];
    });
  };

  return (
    <BackgroundContext.Provider value={{ mode, setMode, cycle, options: ORDER }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackgroundMode() {
  const ctx = useContext(BackgroundContext);
  if (!ctx) throw new Error('useBackgroundMode must be used within BackgroundModeProvider');
  return ctx;
}

export function BackgroundModeToggle() {
  const { cycle, mode } = useBackgroundMode();
  return (
    <button
      type="button"
      onClick={cycle}
      className="text-xs rounded-md border border-border/60 px-3 py-1.5 bg-bg/40 backdrop-blur hover:border-primary/50 hover:text-primary transition-colors"
      title="Cycle background style"
    >
      BG: {mode}
    </button>
  );
}
