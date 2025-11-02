/**
 * ToastContext - Sistema global de notificaciones
 */
import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import ToastContainer from '../components/ui/ToastContainer';
import type { ToastType } from '../components/ui/Toast';

interface ToastData {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (type: ToastType, message: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36);
    const newToast: ToastData = { id, type, message };
    
    setToasts((prev) => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const success = useCallback((message: string) => {
    showToast('success', message);
  }, [showToast]);

  const error = useCallback((message: string) => {
    showToast('error', message);
  }, [showToast]);

  const info = useCallback((message: string) => {
    showToast('info', message);
  }, [showToast]);

  const warning = useCallback((message: string) => {
    showToast('warning', message);
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
