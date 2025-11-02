/**
 * Toast - Sistema de notificaciones emergentes
 */
import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export default function Toast({ id, type, message, duration = 5000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-500',
          text: 'text-green-800',
          icon: <CheckCircle className="w-5 h-5 text-green-500" />,
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-500',
          text: 'text-red-800',
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-500',
          text: 'text-yellow-800',
          icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-500',
          text: 'text-blue-800',
          icon: <Info className="w-5 h-5 text-blue-500" />,
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-500',
          text: 'text-gray-800',
          icon: <Info className="w-5 h-5 text-gray-500" />,
        };
    }
  };

  const styles = getToastStyles();

  return (
    <div
      className={`
        ${styles.bg} ${styles.border} ${styles.text}
        flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-lg
        animate-slide-in-right max-w-md w-full
      `}
    >
      <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
