"use client";

import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/service/order.service";

export type OrderStatus =
  | "DITERIMA"
  | "VALIDASI"
  | "BILLING"
  | "PROSES"
  | "SELESAI"
  | "REVISI";

export interface AdminOrder {
  id: number;
  company_name: string;
  pic_email: string;
  status: OrderStatus;
  created_at: string;
}

// fetcher
const fetchOrders = async (): Promise<AdminOrder[]> => {
  const res = await orderService.getOrder(); // GET /api/order
  return res.data.data;
};

export const useDashboard = () => {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: fetchOrders,
  });
};
