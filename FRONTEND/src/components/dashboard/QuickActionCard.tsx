/**
 * QuickActionCard - Tarjeta de acción rápida con navegación
 */
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  to: string;
  color?: 'green' | 'blue' | 'purple' | 'orange';
}

export default function QuickActionCard({
  title,
  description,
  icon: Icon,
  to,
  color = 'green',
}: QuickActionCardProps) {
  const colorClasses = {
    green: 'bg-green-50 text-green-600 hover:bg-green-100',
    blue: 'bg-blue-50 text-blue-600 hover:bg-blue-100',
    purple: 'bg-purple-50 text-purple-600 hover:bg-purple-100',
    orange: 'bg-orange-50 text-orange-600 hover:bg-orange-100',
  };

  return (
    <Link
      to={to}
      className={`block bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all ${colorClasses[color]}`}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-white">{' '}
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Link>
  );
}
