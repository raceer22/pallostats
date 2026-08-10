import { create } from 'zustand'

const useUIStore = create((set) => ({
  searchQuery: '',

  actions: {
    setSearchQuery: (query) => set({ searchQuery: query})
  }
}))

export const useSearchQuery = () => useUIStore((state) => state.searchQuery)
export const useUIActions = () => useUIStore((state) => state.actions)