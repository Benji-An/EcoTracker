/**
 * Transport API - Servicios de transporte
 * @module api/transport
 */
import apiClient from './client';
import type { Transport, CreateTransportData } from '../models';

export const transportAPI = {
  /**
   * Obtener lista de transportes del usuario
   */
  list: async (params?: { date?: string; transport_type?: string }): Promise<{
    count: number;
    transports: Transport[];
  }> => {
    const response = await apiClient.get('/transport/', { params });
    return response.data;
  },

  /**
   * Crear nuevo transporte
   */
  create: async (data: CreateTransportData): Promise<{
    message: string;
    transport: Transport;
    co2_emitted: number;
  }> => {
    const response = await apiClient.post('/transport/create/', data);
    return response.data;
  },

  /**
   * Obtener detalle de un transporte
   */
  get: async (id: number): Promise<Transport> => {
    const response = await apiClient.get(`/transport/${id}/`);
    return response.data;
  },

  /**
   * Eliminar un transporte
   */
  delete: async (id: number): Promise<{ message: string }> => {
    const response = await apiClient.delete(`/transport/${id}/delete/`);
    return response.data;
  },
};

export default transportAPI;
