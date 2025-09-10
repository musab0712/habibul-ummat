"use client";

import AdminLayout from "@/components/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";

export default function ContactAdmin() {
  const [formData, setFormData] = useState({
    address: { english: "", urdu: "" },
    phoneNumbers: { primary: "", secondary: "" },
    email: "",
    description: { english: "", urdu: "" },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const response = await fetch("/api/contact");
      const data = await response.json();

      if (data.success && data.data) {
        setFormData(data.data);
      } else {
        setMessage({
          text: "Failed to fetch contact information",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "Network error. Please try again.", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          text: "Contact information saved successfully!",
          type: "success",
        });
        setFormData(data.data);
      } else {
        setMessage({
          text: data.error || "Failed to save contact information",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({ text: "Network error. Please try again.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Contact Information Admin
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage your contact details
              </p>
            </div>

            {message.text && (
              <div
                className={`mb-6 p-4 rounded-md ${
                  message.type === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {message.text}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <div className="grid grid-cols-1 gap-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Address Information
                </h2>

                <div>
                  <label
                    htmlFor="address.english"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address (English)
                  </label>
                  <textarea
                    id="address.english"
                    name="address.english"
                    rows={3}
                    value={formData.address.english}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="address.urdu"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address (Urdu)
                  </label>
                  <textarea
                    id="address.urdu"
                    name="address.urdu"
                    rows={3}
                    value={formData.address.urdu}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                    required
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2 md:col-span-2">
                  Phone Numbers
                </h2>

                <div>
                  <label
                    htmlFor="phoneNumbers.primary"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Primary Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumbers.primary"
                    name="phoneNumbers.primary"
                    value={formData.phoneNumbers.primary}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumbers.secondary"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Secondary Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phoneNumbers.secondary"
                    name="phoneNumbers.secondary"
                    value={formData.phoneNumbers.secondary || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                  Description
                </h2>

                <div>
                  <label
                    htmlFor="description.english"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description (English)
                  </label>
                  <textarea
                    id="description.english"
                    name="description.english"
                    rows={4}
                    value={formData.description.english}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="description.urdu"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Description (Urdu)
                  </label>
                  <textarea
                    id="description.urdu"
                    name="description.urdu"
                    rows={4}
                    value={formData.description.urdu}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-right"
                    required
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
