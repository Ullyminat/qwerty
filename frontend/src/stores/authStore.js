import { create } from 'zustand';
import apiClient from '../api/client';

const useAuthStore = create((set) => ({
  isAuthenticated: false,
  user: null,
  isLoadingAuth: true,
  error: null,

  checkAuth: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      set({
        isAuthenticated: true,
        user: response.data,
        isLoadingAuth: false,
        error: null
      });
    } catch (error) {
      set({ 
        isAuthenticated: false, 
        user: null, 
        isLoadingAuth: false,
        error: error.message
      });
    }
  },

  login: async (email, password) => {
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      set({ 
        isAuthenticated: true, 
        user: response.data.user,
        error: null
      });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Ошибка входа' });
      return false;
    }
  },

  register: async (name, email, password) => {
    try {
      const response = await apiClient.post('/auth/register', { name, email, password });
      set({ 
        isAuthenticated: true, 
        user: response.data.user,
        error: null
      });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Ошибка регистрации' });
      return false;
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } finally {
      set({ isAuthenticated: false, user: null, error: null });
    }
  }
}));

export default useAuthStore;