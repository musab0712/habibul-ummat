// app/components/Sidebar.js
"use client";

import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiBook,
  FiInfo,
  FiMail,
  FiFileText,
  FiLogOut,
  FiMenu,
  FiX,
  FiVideo,
  FiSliders,
  FiImage,
  FiSettings,
} from "react-icons/fi";
import { useState } from "react";

export default function Sidebar() {
  const { logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: <FiHome />, text: "Dashboard", path: "/admin/dashboard" },
    { icon: <FiHome />, text: "Home", path: "/admin/home" },
    { icon: <FiBook />, text: "Maktaba", path: "/admin/maktaba" },
    { icon: <FiInfo />, text: "About", path: "/admin/about" },
    { icon: <FiMail />, text: "Contact", path: "/admin/contact" },
    { icon: <FiInfo />, text: "Trust", path: "/admin/trust" },
    { icon: <FiFileText />, text: "Fatwa", path: "/admin/fatwa" },
    { icon: <FiInfo />, text: "Khanaqah", path: "/admin/khanaqah" },
    { icon: <FiSliders />, text: "Sliders", path: "/admin/slider" },
    { icon: <FiInfo />, text: "Jamia", path: "/admin/jamia" },
    { icon: <FiImage />, text: "Photos", path: "/admin/photos" },
    { icon: <FiVideo />, text: "Videos", path: "/admin/videos" },
    { icon: <FiSettings />, text: "Settings", path: "/admin/settings" },
  ];

  const handleNavigation = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } 
        lg:translate-x-0 transition duration-200 ease-in-out z-40
        w-64 bg-gray-800 text-white flex flex-col
      `}
      >
        <div className="flex items-center justify-center h-16 px-4 bg-gray-900">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav className="flex-1 overflow-y-auto pt-5 pb-4">
          <div className="px-4 space-y-2">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center w-full px-4 py-3 text-left rounded-lg transition-colors
                  ${
                    pathname === item.path
                      ? "bg-blue-700 text-white"
                      : "text-gray-300 hover:bg-gray-700"
                  }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.text}
              </button>
            ))}
          </div>
        </nav>

        <div className="flex-shrink-0 flex bg-gray-700 px-4 py-2">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-left text-gray-300 hover:bg-gray-600 rounded-lg"
          >
            <span className="mr-3">
              <FiLogOut />
            </span>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
