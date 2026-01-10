import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';
type Density = 'comfortable' | 'compact';

interface UIState {
  theme: Theme;
  density: Density;
  toggleTheme: () => void;
  toggleDensity: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: 'light',
      density: 'comfortable',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleDensity: () => set((state) => ({ density: state.density === 'comfortable' ? 'compact' : 'comfortable' })),
    }),
    { name: 'ui-preferences' }
  )
);