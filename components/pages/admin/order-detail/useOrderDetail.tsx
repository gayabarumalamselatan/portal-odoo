"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { orderService } from "@/service/order.service";
import { OrderStatus } from "@/types/order";

export function useAdminOrderDetail(orderId: number) {
  const queryClient = useQueryClient();

  const orderQuery = useQuery({
    queryKey: ["order-detail", orderId],
    queryFn: async () => {
      const res = await orderService.getOrderById(orderId);
      return res.data.data;
    },
    enabled: !!orderId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: (payload: { status: OrderStatus; admin_comment?: string }) =>
      orderService.updateOrderStatus(orderId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order-detail", orderId],
      });
    },
  });

  return {
    order: orderQuery.data,
    isLoading: orderQuery.isLoading,
    updateStatus: updateStatusMutation.mutate,
    updating: updateStatusMutation.isPending,
  };
}
