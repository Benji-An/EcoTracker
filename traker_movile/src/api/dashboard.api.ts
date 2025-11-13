/**
 * Dashboard API - Servicios de estadísticas
 * @module api/dashboard
 */
import apiClient from './client';
import type { DashboardStats, EcoTip } from '../models';

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

export interface DashboardStatsResponse {
  summary: DashboardSummary;
  charts: DashboardCharts;
}

export const dashboardAPI = {
  /**
   * Obtener estadísticas del dashboard
   */
  getStats: async (): Promise<DashboardStatsResponse> => {
    const response = await apiClient.get('/dashboard/stats/');
    return response.data;
  },

  /**
   * Obtener tip ecológico aleatorio
   */
  getRandomEcoTip: async (category?: string): Promise<EcoTip> => {
    const params = category ? { category } : {};
    const response = await apiClient.get('/dashboard/eco-tip/', { params });
    return response.data;
  },
};

export default dashboardAPI;
