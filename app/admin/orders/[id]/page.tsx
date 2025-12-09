import { AdminOrderDetailPage } from "@/components/pages/admin/order-detail/orderDetail";

export default function Page({ params }: { params: { id: number } }) {
  return <AdminOrderDetailPage orderId={params.id} />;
}
