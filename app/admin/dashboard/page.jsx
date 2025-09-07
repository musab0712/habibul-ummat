// app/admin/page.js
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Books
              </h2>
              <p className="text-3xl font-bold text-blue-600 mt-2">142</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700">
                New Messages
              </h2>
              <p className="text-3xl font-bold text-green-600 mt-2">23</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-700">
                Fatwa Requests
              </h2>
              <p className="text-3xl font-bold text-purple-600 mt-2">17</p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Recent Activity
            </h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-3">
                <p className="text-sm text-gray-600">
                  New book added: "Introduction to Islamic Law"
                </p>
                <p className="text-xs text-gray-400">2 hours ago</p>
              </li>
              <li className="py-3">
                <p className="text-sm text-gray-600">
                  User inquiry about prayer times
                </p>
                <p className="text-xs text-gray-400">5 hours ago</p>
              </li>
              <li className="py-3">
                <p className="text-sm text-gray-600">
                  Fatwa response published
                </p>
                <p className="text-xs text-gray-400">Yesterday</p>
              </li>
            </ul>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
