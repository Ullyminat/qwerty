import { create } from 'zustand';
import apiClient from '../api/client';

const useCardStore = create((set) => ({
  cards: [],
  isLoading: false,
  error: null,

  fetchCards: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.get('/cards');
      set({ cards: response.data, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.error || 'Ошибка загрузки карточек', isLoading: false });
    }
  },

  createCard: async (title, content) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiClient.post('/cards', { title, content });
      set((state) => ({ 
        cards: [...state.cards, response.data],
        isLoading: false
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Ошибка создания карточки', isLoading: false });
      return false;
    }
  },

  deleteCard: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiClient.delete(`/cards/${id}`);
      set((state) => ({
        cards: state.cards.filter(card => card._id !== id),
        isLoading: false
      }));
      return true;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Ошибка удаления карточки', isLoading: false });
      return false;
    }
  }
}));

export default useCardStore;