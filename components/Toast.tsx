'use client';

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { gsap } from 'gsap';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((message: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToastMessage(message);

    // Wait for DOM update
    requestAnimationFrame(() => {
      if (!toastRef.current) return;
      gsap.killTweensOf(toastRef.current);
      gsap.fromTo(
        toastRef.current,
        { y: 50, scale: 0.88, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.6)' }
      );

      timerRef.current = setTimeout(() => {
        if (!toastRef.current) return;
        gsap.to(toastRef.current, {
          y: -15,
          scale: 0.94,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => setToastMessage(null),
        });
      }, 2600);
    });
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toastMessage && (
        <div
          ref={toastRef}
          className="toast"
          role="status"
          aria-live="polite"
          style={{ opacity: 0, pointerEvents: 'none' }}
        >
          {toastMessage}
        </div>
      )}
    </ToastContext.Provider>
  );
}
