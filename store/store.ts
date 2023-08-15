import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      isCart: false,
      isCartActive: (data: any) => set({ isCart: data }),
      singleProduct: false,
      setSingleProduct: (data: any) => set({ singleProduct: data }),
      cartItems: [],
      setCartItems: (data: any) => set({ cartItems: data }),
      isPaymnet: [],
      isPaymnetSuccess: (data: any) => set({ isPaymnet: data }),
      isShipping: false,
      setIsShipping: (data: any) => set({ isShipping: data }),
      subTotals: {},
      setSubTotal: (data: any) => set({ subTotals: data }),
      isUpdate: "",
      setIsUpdate: (data: any) => set({ isUpdate: data }),
      orderCreate: {},
      setOrderCreate: (data: any) => set({ orderCreate: data }),
      orderSuccess: false,
      setOrderSuccess: (data: any) => set({ orderSuccess: data }),
      userItem: {},
      setUserItem: (data: any) => set({ userItem: data }),
    }),
    {
      name: "mtlStorage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
