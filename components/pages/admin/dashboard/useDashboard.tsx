"use client";

import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/service/order.service";
import { getAdminStatusByRole } from "@/utils/fetchrole.cookies";
import { OrderStatus } from "@/types/order";

export interface AdminOrder {
  id: number;
  company_name: string;
  pic_email: string;
  status: OrderStatus;
  created_date: string;
}

// fetcher
const fetchOrders = async (): Promise<AdminOrder[]> => {
  const status = getAdminStatusByRole();
  const query = status ? `search=${status}` : "";
  const res = await orderService.getOrder(query);
  return res.data.data;
};

export const useDashboard = () => {
  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: fetchOrders,
  });
};
