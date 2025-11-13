/**
 * Types and Interfaces - Migrated from Web App
 * @module models
 */

// ==================== USER TYPES ====================
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture?: string;
  total_points: number;
  level: number;
}

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  bio?: string;
  profile_picture?: string;
  total_points: number;
  level: number;
  total_co2_saved: number;
  streak_days: number;
  last_activity_date?: string;
  daily_co2_goal: number;
  notifications_enabled: boolean;
  created_at: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name: string;
  last_name: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  tokens: {
    refresh: string;
    access: string;
  };
}

// ==================== MEAL TYPES ====================
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Meal {
  id: number;
  username: string;
  meal_type: MealType;
  meal_type_display: string;
  description: string;
  ingredients?: Record<string, number>; // {ingredient: quantity_in_kg}
  total_co2: number;
  meal_date: string;
  is_vegetarian: boolean;
  is_vegan: boolean;
  created_at: string;
}

export interface CreateMealData {
  meal_type: MealType;
  description: string;
  ingredients: Record<string, number>;
  meal_date: string;
}

// ==================== TRANSPORT TYPES ====================
export type TransportType =
  | 'car'
  | 'electric_car'
  | 'bus'
  | 'metro'
  | 'train'
  | 'motorcycle'
  | 'bike'
  | 'walk'
  | 'scooter'
  | 'plane';

export interface Transport {
  id: number;
  username: string;
  transport_type: TransportType;
  transport_type_display: string;
  distance_km: number;
  origin?: string;
  destination?: string;
  total_co2: number;
  trip_date: string;
  created_at: string;
}

export interface CreateTransportData {
  transport_type: TransportType;
  distance_km: number;
  origin?: string;
  destination?: string;
  trip_date: string;
}

// ==================== DASHBOARD TYPES ====================
export interface DailySummary {
  date: string;
  total_co2: number;
  meals_co2: number;
  transport_co2: number;
  energy_co2: number;
  rating: 'excellent' | 'good' | 'average' | 'high';
  message: string;
  color: string;
}

export interface WeeklySummary {
  week_start: string;
  week_end: string;
  total_co2: number;
  daily_average: number;
  meals_co2: number;
  transport_co2: number;
  energy_co2: number;
  daily_breakdown: DailySummary[];
}

export interface DashboardStats {
  daily: DailySummary;
  weekly: WeeklySummary;
  total_meals: number;
  total_transports: number;
  total_co2_saved: number;
  eco_tips: EcoTip[];
}

export interface EcoTip {
  category: string;
  tip: string;
}

// ==================== API RESPONSE TYPES ====================
export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

// ==================== SOCIAL TYPES ====================
export interface LeaderboardEntry {
  user_id: number;
  username: string;
  profile_picture?: string;
  total_co2_saved: number;
  total_points: number;
  level: number;
  rank: number;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  category: string;
  points: number;
  unlocked: boolean;
  unlocked_at?: string;
}

export interface Friend {
  id: number;
  username: string;
  profile_picture?: string;
  total_co2_saved: number;
  total_points: number;
  level: number;
  friends_since: string;
}

// ==================== FORM TYPES ====================
export interface FormErrors {
  [key: string]: string;
}
