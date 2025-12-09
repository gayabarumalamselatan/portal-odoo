import { create } from "zustand";
import { IOrder } from "@/types/order";

interface OrderState {
  data: IOrder;
  setField: <K extends keyof IOrder>(field: K, value: IOrder[K]) => void;
  setAll: (data: Partial<IOrder>) => void;
  reset: () => void;
}

const initialState: IOrder = {
  company_name: "",
  npwp_number: "",
  employees_amount: "",
  pic_name: "",
  pic_phone: "",
  pic_email: "",
  license_type: "professional",
  user_amount: "",
  notes: "",
  status: "DITERIMA",
};

export const useOrderStore = create<OrderState>((set) => ({
  data: initialState,

  setField: (field, value) =>
    set((state) => ({
      data: {
        ...state.data,
        [field]: value,
      },
    })),

  setAll: (data) =>
    set((state) => ({
      data: {
        ...state.data,
        ...data,
      },
    })),

  reset: () => set({ data: initialState }),
}));
