import endpoint from "@/constant/endpoint.constant";
import { IOrder, UpdateOrderStatusPayload } from "@/types/order";
import instance from "@/utils/instance";

export const orderService = {
  addOrder: (payload: IOrder) => instance.post(endpoint.ORDER, payload),
  getOrderById: (id: number) => instance.get(`${endpoint.ORDER}/${id}`),
  getOrder: (params?: string) => instance.get(`${endpoint.ORDER}?${params}`),
  updateOrderStatus: (id: number, payload: UpdateOrderStatusPayload) =>
    instance.patch(`${endpoint.ORDER}/${id}`, payload),
};
