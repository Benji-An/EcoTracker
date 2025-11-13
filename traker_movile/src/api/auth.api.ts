/**
 * Auth API - Servicios de autenticación
 * @module api/auth
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './client';
import type {
  RegisterData,
  LoginData,
  AuthResponse,
  UserProfile,
} from '../models';

export const authAPI = {
  /**
   * Registrar nuevo usuario
   */
  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post('/users/auth/register/', data);
    return response.data;
  },

  /**
   * Iniciar sesión
   */
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post('/users/auth/login/', data);
    return response.data;
  },

  /**
   * Cerrar sesión
   */
  logout: async (): Promise<void> => {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    
    if (refreshToken) {
      try {
        await apiClient.post('/users/auth/logout/', {
          refresh: refreshToken,
        });
      } catch (error) {
        console.error('Error al invalidar token:', error);
        // Continuar con el logout local aunque falle el backend
      }
    }
    
    // Limpiar AsyncStorage
    await AsyncStorage.multiRemove([
      'access_token',
      'refresh_token',
      'user',
    ]);
  },

  /**
   * Obtener perfil del usuario autenticado
   */
  getProfile: async (): Promise<UserProfile> => {
    const response = await apiClient.get('/users/profile/');
    return response.data;
  },

  /**
   * Actualizar perfil del usuario
   */
  updateProfile: async (data: FormData): Promise<UserProfile> => {
    const response = await apiClient.put('/users/profile/update/', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.profile;
  },
};

export default authAPI;
