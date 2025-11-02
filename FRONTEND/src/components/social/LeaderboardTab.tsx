/**
 * LeaderboardTab - Ranking de usuarios por CO2 ahorrado
 */
import { Trophy, Leaf, TrendingUp, Medal } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import type { LeaderboardEntry } from '../../api/social';

interface LeaderboardTabProps {
  leaderboard: LeaderboardEntry[];
  currentUserId?: number;
}

export default function LeaderboardTab({ leaderboard, currentUserId }: LeaderboardTabProps) {
  const getMedalColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-500';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-500';
    return null;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'text-yellow-600';
    if (rank === 2) return 'text-gray-400';
    if (rank === 3) return 'text-orange-600';
    return 'text-gray-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-green-600" />
          Ranking Global
        </CardTitle>
      </CardHeader>
      <CardContent>
        {leaderboard.length === 0 ? (
          <div className="text-center py-8 text-gray-600">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No hay usuarios en el ranking aún</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry) => {
              const medalColor = getMedalColor(entry.rank);
              const isCurrentUser = entry.id === currentUserId;

              return (
                <div
                  key={entry.id}
                  className={`
                    flex items-center gap-4 p-4 rounded-lg border transition-all
                    ${
                      isCurrentUser
                        ? 'bg-green-50 border-green-600 shadow-md'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }
                  `}
                >
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 text-center">
                    {medalColor ? (
                      <Medal className={`w-8 h-8 mx-auto ${medalColor}`} />
                    ) : (
                      <span className={`text-2xl font-bold ${getRankColor(entry.rank)}`}>
                        #{entry.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <img
                    src={
                      entry.profile_picture ||
                      `https://ui-avatars.com/api/?name=${entry.username}&background=00c853&color=fff`
                    }
                    alt={entry.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
                  />

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {entry.username}
                      {isCurrentUser && (
                        <span className="ml-2 text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                          Tú
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-600">Nivel {entry.level}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-green-600 font-bold">
                      <Leaf className="w-4 h-4" />
                      <span>{entry.total_co2_saved.toFixed(1)} kg</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <TrendingUp className="w-3 h-3" />
                      <span>{entry.total_points} pts</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
