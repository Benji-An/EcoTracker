/**
 * FriendsTab - Lista de amigos y sugerencias
 */
import { useState } from 'react';
import { Users, UserPlus, TrendingUp, Search, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { searchUsers, sendFriendRequest, type SearchUser } from '../../api/social';
import type { Friend } from '../../api/social';
import { useToast } from '../../context/ToastContext';

interface FriendsTabProps {
  friends: Friend[];
  onFriendAdded?: () => void;
}

export default function FriendsTab({ friends, onFriendAdded }: FriendsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchUser[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sendingRequestTo, setSendingRequestTo] = useState<number | null>(null);
  const toast = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.warning('Ingresa un nombre de usuario para buscar');
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchUsers(searchQuery);
      setSearchResults(results);
      if (results.length === 0) {
        toast.info('No se encontraron usuarios');
      }
    } catch (error) {
      toast.error('Error al buscar usuarios');
      console.error(error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSendRequest = async (userId: number) => {
    setSendingRequestTo(userId);
    try {
      await sendFriendRequest(userId);
      toast.success('¡Solicitud de amistad enviada! 🤝');
      // Remover de resultados después de enviar solicitud
      setSearchResults(prev => prev.filter(user => user.id !== userId));
      if (onFriendAdded) {
        onFriendAdded();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Error al enviar solicitud');
    } finally {
      setSendingRequestTo(null);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  // Verificar si un usuario ya es amigo
  const isAlreadyFriend = (userId: number) => {
    return friends.some(f => f.friend.id === userId);
  };
  return (
    <div className="space-y-6">
      {/* Lista de amigos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-green-600" />
            Mis Amigos ({friends.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {friends.length === 0 ? (
            <div className="text-center py-8 text-gray-600">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="mb-2">Aún no tienes amigos</p>
              <p className="text-sm">¡Comienza a conectar con otros eco-guerreros!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {friends.map((friendEntry) => {
                const friend = friendEntry.friend;
                return (
                  <div
                    key={friendEntry.id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-all"
                  >
                    {/* Avatar */}
                    <img
                      src={
                        friend.profile_picture ||
                        `https://ui-avatars.com/api/?name=${friend.username}&background=00c853&color=fff`
                      }
                      alt={friend.username}
                      className="w-14 h-14 rounded-full object-cover border-2 border-green-200"
                    />

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{friend.username}</h3>
                      <p className="text-sm text-gray-600">Nivel {friend.level}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Amigos desde: {new Date(friendEntry.friendship_date).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-1 text-xs text-gray-600">
                        <TrendingUp className="w-3 h-3" />
                        <span>{friend.total_points} pts</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Búsqueda de amigos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-green-600" />
            Buscar Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Buscador */}
          <div className="flex gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar por nombre de usuario..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {isSearching ? 'Buscando...' : 'Buscar'}
            </button>
          </div>

          {/* Resultados de búsqueda */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Resultados ({searchResults.length})
              </h4>
              {searchResults.map((user) => {
                const isFriend = isAlreadyFriend(user.id);
                return (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 bg-white"
                  >
                    {/* Avatar */}
                    <img
                      src={
                        user.profile_picture ||
                        `https://ui-avatars.com/api/?name=${user.username}&background=00c853&color=fff`
                      }
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover border-2 border-green-200"
                    />

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {user.username}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs text-gray-500">Nivel {user.level}</p>
                    </div>

                    {/* Action Button */}
                    <div>
                      {isFriend ? (
                        <span className="text-sm text-gray-500 px-4 py-2">
                          Ya es amigo
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSendRequest(user.id)}
                          disabled={sendingRequestTo === user.id}
                          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          <UserPlus className="w-4 h-4" />
                          {sendingRequestTo === user.id ? 'Enviando...' : 'Agregar'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mensaje cuando no hay resultados */}
          {!isSearching && searchQuery && searchResults.length === 0 && (
            <div className="text-center py-6 text-gray-600">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">No se encontraron usuarios</p>
            </div>
          )}

          {/* Mensaje inicial */}
          {!searchQuery && searchResults.length === 0 && (
            <div className="text-center py-6 text-gray-600">
              <Search className="w-10 h-10 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Busca usuarios para agregarlos como amigos</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
