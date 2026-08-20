import { create } from 'zustand'

const useLeagueStore = create((set) => ({
  currentLeague: null,

  actions: {
    setCurrentLeague: (leagueData) => set({ currentLeague: leagueData})
  }
}))

export const useCurrentLeague = () => useLeagueStore((state) => state.currentLeague)
export const useLeagueActions = () => useLeagueStore((state) => state.actions)