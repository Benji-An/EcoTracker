/**
 * Servicios de comidas
 */
import apiClient from './client';
import type { Meal, CreateMealData } from '../types';

export const mealsAPI = {
  /**
   * Obtener lista de comidas del usuario
   */
  list: async (params?: { date?: string; meal_type?: string }): Promise<{
    count: number;
    meals: Meal[];
  }> => {
    const response = await apiClient.get('/meals/', { params });
    return response.data;
  },

  /**
   * Crear nueva comida
   */
  create: async (data: CreateMealData): Promise<{
    message: string;
    meal: Meal;
    co2_emitted: number;
  }> => {
    const response = await apiClient.post('/meals/create/', data);
    return response.data;
  },

  /**
   * Obtener detalle de una comida
   */
  get: async (id: number): Promise<Meal> => {
    const response = await apiClient.get(`/meals/${id}/`);
    return response.data;
  },

  /**
   * Eliminar una comida
   */
  delete: async (id: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/meals/${id}/delete/`);
    return response.data;
  },
};
