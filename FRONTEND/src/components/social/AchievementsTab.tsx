/**
 * AchievementsTab - Logros del usuario
 */
import { Award, Lock, UtensilsCrossed, Car, Leaf, Users, Zap, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import type { Achievement } from '../../api/social';

interface AchievementsTabProps {
  achievements: Achievement[];
}

export default function AchievementsTab({ achievements }: AchievementsTabProps) {
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      meals: 'bg-green-100 text-green-700',
      transport: 'bg-blue-100 text-blue-700',
      co2: 'bg-purple-100 text-purple-700',
      social: 'bg-orange-100 text-orange-700',
      streak: 'bg-red-100 text-red-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getCategoryIcon = (category: string): LucideIcon => {
    const icons: Record<string, LucideIcon> = {
      meals: UtensilsCrossed,
      transport: Car,
      co2: Leaf,
      social: Users,
      streak: Zap,
    };
    return icons[category] || Trophy;
  };

  // Separar logros desbloqueados y bloqueados
  const unlockedAchievements = achievements.filter((a) => a.is_unlocked);
  const lockedAchievements = achievements.filter((a) => !a.is_unlocked);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="w-5 h-5 text-green-600" />
          Mis Logros ({unlockedAchievements.length}/{achievements.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {achievements.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <Award className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No hay logros disponibles</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Logros desbloqueados */}
            {unlockedAchievements.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                  Desbloqueados
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {unlockedAchievements.map((achievement) => {
                    const IconComponent = getCategoryIcon(achievement.achievement_category);
                    return (
                      <div
                        key={achievement.id}
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 shadow-sm"
                      >
                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                        </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1">{achievement.achievement_name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {achievement.achievement_description}
                        </p>
                        <div className="flex items-center gap-2">{' '}
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(
                              achievement.achievement_category
                            )}`}
                          >
                            {achievement.achievement_category}
                          </span>
                          <span className="text-xs text-green-600 font-bold">
                            +{achievement.achievement_points} pts
                          </span>
                        </div>
                        {achievement.unlocked_at && (
                          <p className="text-xs text-gray-600 mt-2">
                            Desbloqueado: {new Date(achievement.unlocked_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                  })}
                </div>
              </div>
            )}

            {/* Logros bloqueados */}
            {lockedAchievements.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">
                  Por desbloquear
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {lockedAchievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-start gap-3 p-4 bg-gray-100 rounded-lg border border-gray-200 opacity-60"
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <Lock className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1">{achievement.achievement_name}</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {achievement.achievement_description}
                        </p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full font-medium ${getCategoryColor(
                              achievement.achievement_category
                            )}`}
                          >
                            {achievement.achievement_category}
                          </span>
                          <span className="text-xs text-gray-600 font-bold">
                            +{achievement.achievement_points} pts
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
