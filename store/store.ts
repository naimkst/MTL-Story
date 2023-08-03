import { create } from "zustand";

export const useStore = create((set) => ({
  isCart: false,
  isCartActive: (data: any) => set({ isCart: data }),
  // removeAllBears: () => set({ blog: 0 }),
}));
