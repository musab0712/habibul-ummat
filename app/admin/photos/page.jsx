import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";

export default function page() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <h1>Admin Photos Us</h1>
      </AdminLayout>
    </ProtectedRoute>
  );
}
