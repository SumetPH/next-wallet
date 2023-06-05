import { create } from "zustand";

interface DrawerStore {
  drawer: boolean;
  setDrawer: (value: boolean) => void;
}

export const useDrawerStore = create<DrawerStore>((set) => ({
  drawer: false,
  setDrawer: (value) => set((state) => ({ drawer: value })),
}));
