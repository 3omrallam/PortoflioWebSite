"use client";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';
interface ToastItem {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
  duration: number; // ms
}

interface ToastContextValue {
  push: (t: Omit<ToastItem, 'id' | 'duration' | 'type'> & { type?: ToastType; duration?: number }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export const ToastProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const remove = useCallback((id: string) => {
    setToasts(t => t.filter(x => x.id !== id));
    if (timers.current[id]) {
      clearTimeout(timers.current[id]);
      delete timers.current[id];
    }
  }, []);

  const push: ToastContextValue['push'] = useCallback(({ message, title, type = 'info', duration = 4500 }) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2);
    const toast: ToastItem = { id, message, title, type, duration };
    setToasts(t => [...t, toast]);
    if (duration > 0) {
      timers.current[id] = setTimeout(() => remove(id), duration);
    }
  }, [remove]);

  useEffect(() => () => { Object.values(timers.current).forEach(clearTimeout); }, []);

  return (
    <ToastContext.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[300] flex max-w-sm flex-col gap-3 w-full">
        {toasts.map(t => (
          <div
            key={t.id}
            role="status"
            aria-live="polite"
            className={[
              'group relative overflow-hidden rounded-lg border p-4 pr-10 shadow-lg backdrop-blur-md',
              t.type === 'success' && 'border-green-400/40 bg-green-500/10 text-green-100',
              t.type === 'error' && 'border-red-400/40 bg-red-500/10 text-red-100',
              t.type === 'info' && 'border-border/50 bg-bg/80 text-fg'
            ].filter(Boolean).join(' ')}
          >
            {t.title && <p className="mb-1 text-sm font-semibold leading-tight">{t.title}</p>}
            <p className="text-xs leading-relaxed opacity-90">{t.message}</p>
            <button
              onClick={() => remove(t.id)}
              className="absolute top-2 right-2 inline-flex size-6 items-center justify-center rounded-md text-current/70 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current/50"
              aria-label="Close notification"
            >
              <X className="h-4 w-4" />
            </button>
            {t.duration > 0 && (
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 animate-[grow_4.2s_linear_forwards] bg-current/40"
                style={{ animationDuration: `${Math.min(t.duration - 300, 6000)}ms` }}
              />
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes grow { to { transform: scaleX(1); } }
      `}</style>
    </ToastContext.Provider>
  );
};
