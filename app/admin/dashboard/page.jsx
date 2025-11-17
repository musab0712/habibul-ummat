// app/admin/dashboard/page.js
"use client";
import AdminLayout from "@/components/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiHome,
  FiBook,
  FiInfo,
  FiMail,
  FiFileText,
  FiVideo,
  FiSliders,
  FiImage,
  FiUsers,
  FiMessageCircle,
  FiBarChart3,
  FiCalendar,
  FiSettings,
} from "react-icons/fi";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalBooks: 0,
    totalFatwas: 0,
    totalVideos: 0,
    totalPhotos: 0,
    pendingContacts: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const dashboardItems = [
    {
      icon: <FiMail className="h-8 w-8" />,
      text: "Contact Data",
      path: "/admin/contacts",
      description: "Manage contact form submissions",
      count: stats.totalContacts,
      color: "bg-blue-500",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      icon: <FiBook className="h-8 w-8" />,
      text: "Maktaba",
      path: "/admin/maktaba",
      description: "Manage library and books",
      count: stats.totalBooks,
      color: "bg-green-500",
      textColor: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      icon: <FiFileText className="h-8 w-8" />,
      text: "Fatwa",
      path: "/admin/fatwa",
      description: "Manage fatwa section",
      count: stats.totalFatwas,
      color: "bg-purple-500",
      textColor: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      icon: <FiVideo className="h-8 w-8" />,
      text: "Videos",
      path: "/admin/videos",
      description: "Manage video content",
      count: stats.totalVideos,
      color: "bg-red-500",
      textColor: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      icon: <FiImage className="h-8 w-8" />,
      text: "Photos",
      path: "/admin/photos",
      description: "Manage photo gallery",
      count: stats.totalPhotos,
      color: "bg-amber-500",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      icon: <FiSliders className="h-8 w-8" />,
      text: "Sliders",
      path: "/admin/slider",
      description: "Manage homepage sliders",
      count: 0,
      color: "bg-indigo-500",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
    {
      icon: <FiInfo className="h-8 w-8" />,
      text: "About",
      path: "/admin/about",
      description: "Manage about section",
      count: 0,
      color: "bg-emerald-500",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
    {
      icon: <FiInfo className="h-8 w-8" />,
      text: "Trust",
      path: "/admin/trust",
      description: "Manage trust information",
      count: 0,
      color: "bg-cyan-500",
      textColor: "text-cyan-600",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200",
    },
    {
      icon: <FiInfo className="h-8 w-8" />,
      text: "Khanaqah",
      path: "/admin/khanaqah",
      description: "Manage khanaqah section",
      count: 0,
      color: "bg-orange-500",
      textColor: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
    },
    {
      icon: <FiInfo className="h-8 w-8" />,
      text: "Jamia",
      path: "/admin/jamia",
      description: "Manage jamia information",
      count: 0,
      color: "bg-pink-500",
      textColor: "text-pink-600",
      bgColor: "bg-pink-50",
      borderColor: "border-pink-200",
    },
  ];

  useEffect(() => {
    // Redirect if not authenticated
    // if (!isAuthenticated) {
    //   router.push("/admin/login");
    //   return;
    // }

    // Fetch dashboard statistics
    fetchDashboardStats();
    fetchRecentActivities();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // In a real application, you would fetch these from your API
      // For now, we'll use mock data
      setStats({
        totalContacts: "15+",
        totalBooks: "20+",
        totalFatwas: "15+",
        totalVideos: "23+",
        totalPhotos: "25+",
        pendingContacts: "11+",
      });
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentActivities = async () => {
    // Mock recent activities
    setRecentActivities([
      {
        id: 1,
        action: "New contact message",
        user: "John Doe",
        time: "2 minutes ago",
        type: "contact",
      },
      {
        id: 2,
        action: "Book added to Maktaba",
        user: "Admin",
        time: "1 hour ago",
        type: "book",
      },
      {
        id: 3,
        action: "Fatwa published",
        user: "Mufti Saheb",
        time: "3 hours ago",
        type: "fatwa",
      },
      {
        id: 4,
        action: "New video uploaded",
        user: "Media Team",
        time: "5 hours ago",
        type: "video",
      },
      {
        id: 5,
        action: "Photo gallery updated",
        user: "Admin",
        time: "1 day ago",
        type: "photo",
      },
    ]);
  };

  const handleCardClick = (path) => {
    router.push(path);
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "contact":
        return <FiMail className="h-4 w-4 text-blue-500" />;
      case "book":
        return <FiBook className="h-4 w-4 text-green-500" />;
      case "fatwa":
        return <FiFileText className="h-4 w-4 text-purple-500" />;
      case "video":
        return <FiVideo className="h-4 w-4 text-red-500" />;
      case "photo":
        return <FiImage className="h-4 w-4 text-amber-500" />;
      default:
        return <FiInfo className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gray-50">
          {/* Main Content */}
          <div className="">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                      Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">Welcome back, Admin!</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Last login</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Contacts Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FiMail className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Contacts
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalContacts}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                        {stats.pendingContacts} pending
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Books Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FiBook className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Books
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalBooks}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total Fatwas Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FiFileText className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Total Fatwas
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalFatwas}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Media Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                        <FiVideo className="h-6 w-6 text-amber-600" />
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">
                        Media Files
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stats.totalVideos + stats.totalPhotos}
                      </p>
                      <p className="text-xs text-gray-500">
                        {stats.totalVideos} videos, {stats.totalPhotos} photos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Access Grid */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Quick Access
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {dashboardItems.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleCardClick(item.path)}
                      className={`${item.bgColor} ${item.borderColor} border-2 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 group`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-lg ${item.color} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}
                        >
                          <div className={item.textColor}>{item.icon}</div>
                        </div>
                        {item.count > 0 && (
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${item.textColor} ${item.bgColor}`}
                          >
                            {item.count}
                          </span>
                        )}
                      </div>
                      <h3
                        className={`font-bold text-lg mb-2 ${item.textColor}`}
                      >
                        {item.text}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                      <div className="mt-4 flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                        Manage section
                        <svg
                          className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="flex-shrink-0">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500">
                          by {activity.user}
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
