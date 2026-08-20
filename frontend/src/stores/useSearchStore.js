import { create } from 'zustand';
import searchService from '../services/searchService';

export const useSearchStore = create((set) => ({
  entities: [],
  query: '',
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,

  setQuery: (query) => set({ query }),
  clearQuery: () => set({ query: '' }),

  fetchSearchEntities: async () => {
    set({ status: 'loading', error: null });
    try {
      const data = await searchService.getAllEntities();
      set({ entities: data, status: 'succeeded' });
    } catch (err) {
      set({ error: err.message || 'Virhe hakuhakemiston noudossa', status: 'failed' });
    }
  },
}));