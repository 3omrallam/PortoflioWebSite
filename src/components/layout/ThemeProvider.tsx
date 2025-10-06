"use client";
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  // hydrate
  useEffect(() => {
    const stored = (localStorage.getItem('theme') as Theme) || undefined;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = stored || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  // expose setter via custom event (ThemeToggle will dispatch)
  useEffect(() => {
    function handler(e: Event) {
      const detail = (e as CustomEvent<Theme>).detail;
      if (!detail) return;
      setTheme(detail);
      localStorage.setItem('theme', detail);
      document.documentElement.classList.toggle('dark', detail === 'dark');
    }
    window.addEventListener('theme-change', handler as EventListener);
    return () => window.removeEventListener('theme-change', handler as EventListener);
  }, []);

  return <>{children}</>;
}
