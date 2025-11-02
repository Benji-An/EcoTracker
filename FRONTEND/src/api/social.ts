import api from './client';

// Types
export interface Friend {
  id: number;
  friend: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
    level: number;
    total_points: number;
  };
  friendship_date: string;
}

export interface FriendRequest {
  id: number;
  from_user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
    level: number;
    total_points: number;
  };
  to_user: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_picture: string | null;
    level: number;
    total_points: number;
  };
  status: string;
  created_at: string;
}

export interface LeaderboardEntry {
  id: number;
  rank: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  level: number;
  total_points: number;
  total_co2_saved: number;
  streak_days: number;
  achievements_count: number;
}

export interface LeaderboardResponse {
  leaderboard: LeaderboardEntry[];
  current_user_rank: number | null;
  total_users?: number;
  total_friends?: number;
}

export interface Achievement {
  id: number;
  achievement_id: number;
  achievement_name: string;
  achievement_icon: string;
  achievement_description: string;
  achievement_points: number;
  achievement_category: string;
  progress: number;
  is_unlocked: boolean;
  unlocked_at: string | null;
}

export interface AchievementsResponse {
  achievements: Achievement[];
  total_unlocked: number;
  total_achievements: number;
  completion_percentage: number;
  total_points: number;
}

export interface SearchUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture: string | null;
  level: number;
  total_points: number;
}

// Friend APIs
export const getFriends = async (): Promise<Friend[]> => {
  const response = await api.get('/social/friends/');
  return response.data.results || response.data;
};

export const getFriendRequests = async (): Promise<FriendRequest[]> => {
  const response = await api.get('/social/friends/requests/');
  return response.data.results || response.data;
};

export const sendFriendRequest = async (toUserId: number): Promise<FriendRequest> => {
  const response = await api.post('/social/friends/request/', {
    to_user_id: toUserId,
  });
  return response.data;
};

export const acceptFriendRequest = async (requestId: number): Promise<FriendRequest> => {
  const response = await api.post(`/social/friends/request/${requestId}/accept/`);
  return response.data;
};

export const rejectFriendRequest = async (requestId: number): Promise<FriendRequest> => {
  const response = await api.post(`/social/friends/request/${requestId}/reject/`);
  return response.data;
};

export const removeFriend = async (friendshipId: number): Promise<void> => {
  await api.delete(`/social/friends/${friendshipId}/`);
};

export const searchUsers = async (query: string): Promise<SearchUser[]> => {
  const response = await api.get(`/social/users/search/?q=${encodeURIComponent(query)}`);
  return response.data.results || response.data;
};

// Leaderboard APIs
export const getGlobalLeaderboard = async (limit: number = 100): Promise<LeaderboardResponse> => {
  const response = await api.get(`/social/leaderboard/global/?limit=${limit}`);
  return response.data;
};

export const getFriendsLeaderboard = async (): Promise<LeaderboardResponse> => {
  const response = await api.get('/social/leaderboard/friends/');
  return response.data;
};

// Achievement APIs
export const getAllAchievements = async (category?: string): Promise<Achievement[]> => {
  const url = category 
    ? `/social/achievements/?category=${category}` 
    : '/social/achievements/';
  const response = await api.get(url);
  return response.data.results || response.data;
};

export const getUnlockedAchievements = async (): Promise<AchievementsResponse> => {
  const response = await api.get('/social/achievements/unlocked/');
  return response.data;
};

export const checkAchievements = async (): Promise<any> => {
  const response = await api.post('/social/achievements/check/');
  return response.data;
};
