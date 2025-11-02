import api from './client';

export interface DashboardSummary {
  total_co2: number;
  today_co2: number;
  total_meals: number;
  total_transports: number;
  vegan_meals: number;
  vegetarian_meals: number;
  level: number;
  total_points: number;
  streak_days: number;
}

export interface CO2ByDay {
  date: string;
  co2: number;
}

export interface MealsByType {
  veganas: number;
  vegetarianas: number;
  omnívoras: number;
}

export interface TransportByType {
  type: string;
  count: number;
}

export interface CategoryStat {
  category: string;
  count: number;
  co2: number;
}

export interface DashboardCharts {
  co2_by_day: CO2ByDay[];
  meals_by_type: MealsByType;
  transports_by_type: TransportByType[];
  category_stats: CategoryStat[];
}

export interface DashboardStats {
  summary: DashboardSummary;
  charts: DashboardCharts;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get('/dashboard/stats/');
  return response.data;
};

export interface EcoTip {
  id: number;
  title: string;
  description: string;
  category: 'meals' | 'transport' | 'energy' | 'water' | 'waste' | 'general';
  icon: string;
  created_at?: string;
}

export const getRandomEcoTip = async (category?: string): Promise<EcoTip> => {
  const params = category ? { category } : {};
  const response = await api.get('/dashboard/eco-tip/', { params });
  return response.data;
};

