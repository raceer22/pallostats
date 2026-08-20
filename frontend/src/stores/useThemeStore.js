import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  mode: localStorage.getItem('theme') || 'nord',
  toggleTheme: () =>
    set((state) => {
      const nextMode = state.mode === 'nord' ? 'gruvbox' : 'nord';
      localStorage.setItem('theme', nextMode);
      return { mode: nextMode };
    }),
  setTheme: (mode) => {
    localStorage.setItem('theme', mode);
    set({ mode });
  },
}));