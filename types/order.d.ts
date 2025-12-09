export type OrderStatus =
  | "DITERIMA"
  | "VALIDASI"
  | "BILLING"
  | "PROSES"
  | "SELESAI"
  | "REVISI";

interface IOrder {
  company_name: string;
  npwp_number: string;
  employees_amount: string;
  pic_name: string;
  pic_phone: string;
  pic_email: string;
  license_type: "professional" | "enterprise" | "custom";
  user_amount: string;
  notes: string;
  status: OrderStatus;
}
interface ITracking extends IOrder {
  id: number;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
  admin_comment?: string;
}

export { IOrder, ITracking, OrderStatus, UpdateOrderStatusPayload };
