import { create } from 'zustand';
import leaguesService from '../services/leaguesService';

export const useLeagueStore = create((set) => ({
  competitions: [],
  currentLeague: null,
  status: 'idle',
  error: null,

  fetchCompetitions: async () => {
    try {
      const data = await leaguesService.getAllCompetitions();
      set({ competitions: data });
    } catch (err) {
      set({ error: err.message || 'Virhe liigojen noudossa' });
    }
  },

  fetchLeagueDetails: async (code) => {
    set({ status: 'loading', currentLeague: null, error: null });
    try {
      const data = await leaguesService.getLeagueByCode(code);
      set({ currentLeague: data, status: 'succeeded' });
    } catch (err) {
      set({ error: err.message || 'Virhe liigan tietojen noudossa', status: 'failed' });
    }
  },
}));