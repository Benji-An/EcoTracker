/**
 * Logo Component - EcoTracker
 * Componente reutilizable del logo con tamaños estandarizados
 */
import { Leaf } from 'lucide-react';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showName = false, className = '' }: LogoProps) {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizeClasses[size]} rounded-full bg-green-600 shadow-md flex items-center justify-center`}>
        <Leaf className={`${iconSizes[size]} text-white`} />
      </div>
      {showName && (
        <span className={`${textSizes[size]} font-bold text-gray-900`}>
          EcoTracker
        </span>
      )}
    </div>
  );
}
