"use client";

import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/service/order.service";
import { ITracking } from "@/types/order";

export const useOrderTracking = (id?: number) => {
  const fetchOrderById = async (id: number): Promise<ITracking> => {
    console.log("ids", id);
    const res = await orderService.getOrderById(id);
    console.log("res", res);
    return res.data.data;
  };

  console.log("asd", id);

  const { data, isLoading, isError } = useQuery({
    queryKey: [id],
    queryFn: () => fetchOrderById(id as number),
    enabled: !!id,
  });
  console.log("r", data);
  return {
    data,
    isLoading,
    isError,
  };
};
