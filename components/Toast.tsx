'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        className={`toast ${visible ? 'is-visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        {toastMessage}
      </div>
    </ToastContext.Provider>
  );
}
