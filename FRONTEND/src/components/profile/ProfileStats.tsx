/**
 * ProfileStats - Estadísticas del usuario
 */
import { Leaf, Award, TrendingUp } from 'lucide-react';
import { Card } from '../ui/card';
import type { UserProfile } from '../../types';

interface ProfileStatsProps {
  profile: UserProfile;
}

export default function ProfileStats({ profile }: ProfileStatsProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4 mb-6">
      <Card padding="md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-50 rounded-lg">
            <Leaf className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">CO2 Ahorrado</p>
            <p className="text-2xl font-bold text-gray-900">
              {profile.total_co2_saved?.toFixed(2) || '0.00'} kg
            </p>
          </div>
        </div>
      </Card>

      <Card padding="md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-50 rounded-lg">
            <Award className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Puntos Totales</p>
            <p className="text-2xl font-bold text-gray-900">
              {profile.total_points || 0}
            </p>
          </div>
        </div>
      </Card>

      <Card padding="md">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Nivel</p>
            <p className="text-2xl font-bold text-gray-900">
              {profile.level || 1}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
