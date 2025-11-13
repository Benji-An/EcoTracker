/**
 * Auth Context - Gestión de autenticación con Zustand
 * @module context/AuthContext
 */
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../api/auth.api';
import type { User, UserProfile } from '../models';

interface AuthState {
  user: User | null;
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (username: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
  updateProfile: (data: FormData) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  /**
   * Iniciar sesión
   */
  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.login({ username, password });

      // Guardar tokens en AsyncStorage
      await AsyncStorage.setItem('access_token', response.tokens.access);
      await AsyncStorage.setItem('refresh_token', response.tokens.refresh);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));

      // Cargar perfil completo
      const profile = await authAPI.getProfile();

      set({
        user: response.user,
        profile,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al iniciar sesión';
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  /**
   * Registrar nuevo usuario
   */
  register: async (data: any) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authAPI.register(data);

      // Guardar tokens en AsyncStorage
      await AsyncStorage.setItem('access_token', response.tokens.access);
      await AsyncStorage.setItem('refresh_token', response.tokens.refresh);
      await AsyncStorage.setItem('user', JSON.stringify(response.user));

      // Cargar perfil completo
      const profile = await authAPI.getProfile();

      set({
        user: response.user,
        profile,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al registrarse';
      set({
        error: errorMessage,
        isLoading: false,
        isAuthenticated: false,
      });
      throw error;
    }
  },

  /**
   * Cerrar sesión
   */
  logout: async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      set({
        user: null,
        profile: null,
        isAuthenticated: false,
        error: null,
      });
    }
  },

  /**
   * Cargar usuario desde AsyncStorage al iniciar la app
   */
  loadUser: async () => {
    set({ isLoading: true });
    try {
      const token = await AsyncStorage.getItem('access_token');
      const userStr = await AsyncStorage.getItem('user');

      if (token && userStr) {
        const user = JSON.parse(userStr);
        
        // Intentar obtener perfil actualizado
        try {
          const profile = await authAPI.getProfile();
          set({
            user,
            profile,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          // Si falla, usar datos guardados
          set({
            user,
            profile: null,
            isAuthenticated: true,
            isLoading: false,
          });
        }
      } else {
        set({
          user: null,
          profile: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } catch (error) {
      console.error('Error al cargar usuario:', error);
      set({
        user: null,
        profile: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  /**
   * Actualizar perfil
   */
  updateProfile: async (data: FormData) => {
    set({ isLoading: true, error: null });
    try {
      const updatedProfile = await authAPI.updateProfile(data);
      
      // Actualizar user en AsyncStorage
      const updatedUser = {
        ...get().user!,
        first_name: updatedProfile.first_name,
        last_name: updatedProfile.last_name,
        profile_picture: updatedProfile.profile_picture,
      };
      
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));

      set({
        user: updatedUser,
        profile: updatedProfile,
        isLoading: false,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Error al actualizar perfil';
      set({
        error: errorMessage,
        isLoading: false,
      });
      throw error;
    }
  },

  /**
   * Limpiar error
   */
  clearError: () => {
    set({ error: null });
  },
}));

export default useAuthStore;
