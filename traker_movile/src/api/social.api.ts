/**
 * Social API - Servicios de red social
 * @module api/social
 */
import apiClient from './client';
import type { LeaderboardEntry, Achievement, Friend } from '../models';

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  current_user_rank: number | null;
  total_users?: number;
  total_friends?: number;
}

export interface AchievementsResponse {
  achievements: Achievement[];
  total_unlocked: number;
  total_achievements: number;
  completion_percentage: number;
  total_points: number;
}

export interface FriendRequest {
  id: number;
  from_user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
    level: number;
    total_points: number;
  };
  to_user: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
    level: number;
    total_points: number;
  };
  status: string;
  created_at: string;
}

export const socialAPI = {
  /**
   * Obtener leaderboard global
   */
  getLeaderboard: async (): Promise<LeaderboardResponse> => {
    const response = await apiClient.get('/social/leaderboard/');
    return response.data;
  },

  /**
   * Obtener leaderboard de amigos
   */
  getFriendsLeaderboard: async (): Promise<LeaderboardResponse> => {
    const response = await apiClient.get('/social/leaderboard/friends/');
    return response.data;
  },

  /**
   * Obtener logros del usuario
   */
  getAchievements: async (): Promise<AchievementsResponse> => {
    const response = await apiClient.get('/social/achievements/');
    return response.data;
  },

  /**
   * Obtener lista de amigos
   */
  getFriends: async (): Promise<Friend[]> => {
    const response = await apiClient.get('/social/friends/');
    return response.data;
  },

  /**
   * Obtener solicitudes de amistad pendientes
   */
  getFriendRequests: async (): Promise<FriendRequest[]> => {
    const response = await apiClient.get('/social/friend-requests/');
    return response.data;
  },

  /**
   * Buscar usuarios
   */
  searchUsers: async (query: string): Promise<any[]> => {
    const response = await apiClient.get('/social/search-users/', {
      params: { q: query },
    });
    return response.data;
  },

  /**
   * Enviar solicitud de amistad
   */
  sendFriendRequest: async (userId: number): Promise<any> => {
    const response = await apiClient.post('/social/send-friend-request/', {
      to_user_id: userId,
    });
    return response.data;
  },

  /**
   * Aceptar solicitud de amistad
   */
  acceptFriendRequest: async (requestId: number): Promise<any> => {
    const response = await apiClient.post('/social/accept-friend-request/', {
      request_id: requestId,
    });
    return response.data;
  },

  /**
   * Rechazar solicitud de amistad
   */
  rejectFriendRequest: async (requestId: number): Promise<any> => {
    const response = await apiClient.post('/social/reject-friend-request/', {
      request_id: requestId,
    });
    return response.data;
  },
};

export default socialAPI;
