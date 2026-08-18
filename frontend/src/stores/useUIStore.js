import { create } from 'zustand'

const useUIStore = create((set) => ({
  searchQuery: '',
  searchData: [],
  actions: {
    setSearchQuery: (query) => set({ searchQuery: query}),
    setSearchData: (data) => set({ searchData: data})
  }
}))

export const useSearchQuery = () => useUIStore((state) => state.searchQuery)
export const useSearchData = () => useUIStore((state) => state.searchData)
export const useUIActions = () => useUIStore((state) => state.actions)