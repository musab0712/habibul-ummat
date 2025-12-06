// app/admin/fatwa/page.jsx
"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/AdminLayout";
import {
  FiSave,
  FiTrash2,
  FiEdit,
  FiPlus,
  FiUpload,
  FiImage,
  FiFileText,
  FiX,
} from "react-icons/fi";

export default function FatwaAdmin() {
  const [fatwas, setFatwas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingFatwa, setEditingFatwa] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titleEnglish: "",
    titleUrdu: "",
    pdfUrl: "",
    coverImage: "",
  });

  useEffect(() => {
    loadFatwas();
  }, []);

  const loadFatwas = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/fatwa");
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setFatwas(result.data);
        }
      }
    } catch (error) {
      console.error("Error loading fatwas:", error);
      setMessage("Error loading fatwas");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const url = editingFatwa
        ? `/api/fatwa/${editingFatwa._id}`
        : "/api/fatwa";
      const method = editingFatwa ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(
          editingFatwa
            ? "Fatwa updated successfully!"
            : "Fatwa added successfully!"
        );
        resetForm();
        loadFatwas();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error saving fatwa:", error);
      setMessage("Error saving fatwa");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this fatwa?")) return;

    try {
      const response = await fetch(`/api/fatwa/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Fatwa deleted successfully!");
        loadFatwas();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting fatwa:", error);
      setMessage("Error deleting fatwa");
    }
  };

  const handleEdit = (fatwa) => {
    setEditingFatwa(fatwa);
    setFormData({
      titleEnglish: fatwa.titleEnglish || "",
      titleUrdu: fatwa.titleUrdu || "",
      pdfUrl: fatwa.pdfUrl || "",
      coverImage: fatwa.coverImage || "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      titleEnglish: "",
      titleUrdu: "",
      pdfUrl: "",
      coverImage: "",
    });
    setEditingFatwa(null);
    setShowForm(false);
  };

  const validatePdfFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);

        if (
          uint8Array[0] === 0x25 && // %
          uint8Array[1] === 0x50 && // P
          uint8Array[2] === 0x44 && // D
          uint8Array[3] === 0x46 // F
        ) {
          resolve(true);
        } else {
          reject(new Error("File is not a valid PDF"));
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file.slice(0, 4));
    });
  };

  // SAME PATTERN AS BOOKS (50MB + /api/upload/pdf)
  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("Please upload a PDF file");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setMessage("PDF must be under 50MB");
      return;
    }

    try {
      setMessage("Uploading PDF...");

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const res = await fetch("/api/upload/pdf", {
        method: "POST",
        body: uploadFormData,
      });

      const data = await res.json();

      if (!data.success) throw new Error(data.error);

      setFormData((prev) => ({
        ...prev,
        pdfUrl: data.pdfUrl,
      }));

      setMessage("PDF uploaded successfully");
    } catch (err) {
      console.error("PDF upload error:", err);
      setMessage(err.message || "Error uploading PDF");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Image size should be less than 5MB");
      return;
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setMessage("Please upload a valid image file (JPG, PNG, or WebP)");
      return;
    }

    try {
      setMessage("Uploading image...");

      const uploadFormData = new FormData();
      uploadFormData.append("file", file);
      uploadFormData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      uploadFormData.append("folder", "fatwa-covers");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: uploadFormData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Upload failed");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, coverImage: data.secure_url }));
      setMessage("Image uploaded successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      setMessage("Error uploading image. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading fatwas...</span>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="px-6 py-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">
              Fatwa Management
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <FiPlus className="mr-2" />
              Add New Fatwa
            </button>
          </div>

          {message && (
            <div
              className={`p-3 mb-4 rounded-md ${
                message.includes("Error")
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-green-100 text-green-700 border border-green-200"
              }`}
            >
              {message}
            </div>
          )}

          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {editingFatwa ? "Edit Fatwa" : "Add New Fatwa"}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      English Title
                    </label>
                    <input
                      type="text"
                      value={formData.titleEnglish || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          titleEnglish: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Urdu Title
                    </label>
                    <input
                      type="text"
                      value={formData.titleUrdu || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, titleUrdu: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PDF File
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.pdfUrl ? (
                      <span className="text-sm text-green-600 font-medium">
                        ✓ PDF uploaded successfully
                      </span>
                    ) : (
                      <label className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center">
                        <FiUpload className="mr-2" />
                        Upload PDF
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={handlePdfUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cover Image (Optional)
                  </label>
                  <div className="flex items-center space-x-4">
                    {formData.coverImage ? (
                      <div className="flex items-center space-x-4">
                        <img
                          src={formData.coverImage}
                          alt="Cover preview"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <span className="text-sm text-green-600 font-medium">
                          ✓ Image uploaded
                        </span>
                      </div>
                    ) : (
                      <label className="cursor-pointer bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors flex items-center">
                        <FiImage className="mr-2" />
                        Upload Cover Image
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || !formData.pdfUrl}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <FiSave className="mr-2" />
                    {isSaving
                      ? "Saving..."
                      : editingFatwa
                      ? "Update Fatwa"
                      : "Add Fatwa"}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cover
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      English Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Urdu Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Upload Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fatwas.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No fatwa found. Add your first fatwa!
                      </td>
                    </tr>
                  ) : (
                    fatwas.map((fatwa) => (
                      <tr key={fatwa._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {fatwa.coverImage ? (
                            <img
                              src={fatwa.coverImage}
                              alt={fatwa.titleEnglish}
                              className="w-12 h-16 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-12 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                              <FiFileText className="text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {fatwa.titleEnglish}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          dir="rtl"
                        >
                          {fatwa.titleUrdu}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(fatwa.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {/* <button
                            onClick={() => handleEdit(fatwa)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <FiEdit />
                          </button> */}
                          <button
                            onClick={() => handleDelete(fatwa._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
