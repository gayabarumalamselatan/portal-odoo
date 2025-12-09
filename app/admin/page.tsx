import { ProtectedRoute } from "@/components/auth/protected-route";
import { AdminDashboardPageWrapper } from "@/components/pages/admin/dashboard/dashboardWrapper";

export default function Page() {
  return (
    <ProtectedRoute>
      <AdminDashboardPageWrapper />
    </ProtectedRoute>
  );
}
