/**
 * Social Page - Ranking, logros y amigos
 */
import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { 
  getGlobalLeaderboard, 
  getAllAchievements, 
  getFriends,
  type LeaderboardEntry,
  type Achievement,
  type Friend
} from '../api/social';

// Components
import Navbar from '../components/nav/Navbar';
import TabNavigation from '../components/social/TabNavigation';
import LeaderboardTab from '../components/social/LeaderboardTab';
import AchievementsTab from '../components/social/AchievementsTab';
import FriendsTab from '../components/social/FriendsTab';

export default function Social() {
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSocialData();
  }, []);

  const loadSocialData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Cargar datos reales desde la API
      const [leaderboardData, achievementsData, friendsData] = await Promise.all([
        getGlobalLeaderboard(100),
        getAllAchievements(),
        getFriends(),
      ]);

      setLeaderboard(leaderboardData.leaderboard);
      setAchievements(achievementsData);
      setFriends(friendsData);
    } catch (error) {
      console.error('Error al cargar datos sociales:', error);
      setError('No se pudieron cargar los datos. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderActiveTab = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-200 rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando...</p>
            </div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="text-red-600 mb-2 text-4xl">⚠️</div>
            <p className="text-gray-900 font-semibold mb-2">Error al cargar datos</p>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
              onClick={loadSocialData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'leaderboard':
        return <LeaderboardTab leaderboard={leaderboard} currentUserId={1} />;
      case 'achievements':
        return <AchievementsTab achievements={achievements} />;
      case 'friends':
        return <FriendsTab friends={friends} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e8f5e9' }}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-green-600" />
            Social
          </h1>
          <p className="text-gray-600 mt-2">
            Compite, desbloquea logros y conecta con la comunidad eco
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Tab Content */}
        {renderActiveTab()}
      </div>
    </div>
  );
}
