/**
 * StatsCard - Tarjeta de estadística individual
 */
interface StatsCardProps {
  label: string;
  value: string | number;
  suffix?: string;
  color?: 'green' | 'blue' | 'purple' | 'orange' | 'red';
}

export default function StatsCard({ label, value, suffix = '', color = 'green' }: StatsCardProps) {
  const colorClasses = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <div className={`text-2xl font-bold ${colorClasses[color]}`}>
        {value}{suffix && <span className="text-lg ml-1">{suffix}</span>}
      </div>
    </div>
  );
}
