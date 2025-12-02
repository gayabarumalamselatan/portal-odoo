import { AdminOrderDetailPage } from "@/components/pages/admin-order-detail"

export default function Page({ params }: { params: { id: string } }) {
  return <AdminOrderDetailPage orderId={params.id} />
}
