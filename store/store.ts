import { create } from "zustand";

export const useStore = create((set) => ({
  isCart: false,
  isCartActive: (data: any) => set({ isCart: data }),
  isPaymnet: [],
  isPaymnetSuccess: (data: any) => set({ isPaymnet: data }),
  isShipping: false,
  setIsShipping: (data: any) => set({ isShipping: data }),
  subTotals: {},
  setSubTotal: (data: any) => set({ subTotals: data }),
  // removeAllBears: () => set({ blog: 0 }),
}));
