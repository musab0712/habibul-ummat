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
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titleEnglish: "",
    titleUrdu: "",
    pdfUrl: "",
    coverImage: "",
  });

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/fatwa");
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setBooks(result.data);
        }
      }
    } catch (error) {
      console.error("Error loading books:", error);
      setMessage("Error loading books");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage("");

    try {
      const url = editingBook ? `/api/fatwa/${editingBook._id}` : "/api/fatwa";
      const method = editingBook ? "PUT" : "POST";

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
          editingBook
            ? "Fatwa updated successfully!"
            : "Fatwa added successfully!"
        );
        resetForm();
        loadBooks();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error saving Fatwa:", error);
      setMessage("Error saving Fatwa");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this Fatwa?")) return;

    try {
      const response = await fetch(`/api/fatwa/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Fatwa deleted successfully!");
        loadBooks();
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error deleting Fatwa:", error);
      setMessage("Error deleting Fatwa");
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      titleEnglish: book.titleEnglish || "",
      titleUrdu: book.titleUrdu || "",
      pdfUrl: book.pdfUrl || "",
      coverImage: book.coverImage || "",
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
    setEditingBook(null);
    setShowForm(false);
  };

  const validatePdfFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        const arrayBuffer = e.target.result;
        const uint8Array = new Uint8Array(arrayBuffer);

        // Check PDF magic number (first 4 bytes should be %PDF)
        if (
          uint8Array[0] === 0x25 && // %
          uint8Array[1] === 0x50 && // P
          uint8Array[2] === 0x44 && // D
          uint8Array[3] === 0x46
        ) {
          // F
          resolve(true);
        } else {
          reject(new Error("File is not a valid PDF"));
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file.slice(0, 4)); // Read first 4 bytes
    });
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // Step 1: Validate file type by MIME type
      if (file.type !== "application/pdf") {
        setMessage("Error: Please select a PDF file");
        return;
      }

      // Step 2: Validate file size (limit to 20MB)
      if (file.size > 10 * 1024 * 1024) {
        setMessage("Error: PDF size should be less than 10MB");
        return;
      }

      // Step 3: Validate actual PDF content
      setMessage("Validating PDF file...");
      await validatePdfFile(file);

      // Step 4: Upload to Cloudinary
      setMessage("Uploading PDF...");

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      uploadData.append("folder", "Fatwa");
      uploadData.append("resource_type", "raw"); // Important: Use 'raw' for PDFs
      // uploadData.append("access_mode", "public");
      // uploadData.append("use_filename", "true");
      // uploadData.append("unique_filename", "true");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/raw/upload`,
        {
          method: "POST",
          body: uploadData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error?.message || `Upload failed: ${response.status}`
        );
      }

      const data = await response.json();

      // Step 5: Verify the uploaded file
      setMessage("Verifying upload...");

      const testResponse = await fetch(data.secure_url, {
        method: "HEAD",
        headers: {
          Accept: "application/pdf",
        },
      });

      if (!testResponse.ok) {
        throw new Error("Upload succeeded but file is not accessible");
      }

      // Check content type
      const contentType = testResponse.headers.get("content-type");
      if (!contentType || !contentType.includes("application/pdf")) {
        console.warn(
          "Warning: Content-Type is not application/pdf:",
          contentType
        );
      }
      setFormData((prev) => ({ ...prev, pdfUrl: data.secure_url }));
      setMessage("PDF uploaded successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error("PDF upload error:", error);
      setMessage(`Error: ${error.message}`);
      setTimeout(() => setMessage(""), 5000);
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

      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      formData.append("folder", "books-covers");
      uploadData.append("access_mode", "public");

      // Upload to Cloudinary
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData({ ...formData, coverImage: data.secure_url });
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
            <span className="ml-2 text-gray-600">Loading Fatwa...</span>
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
                  {editingBook ? "Edit Fatwa" : "Add New Fatwa"}
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
                      : editingBook
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
                  {books.length === 0 ? (
                    <tr>
                      <td
                        colSpan="5"
                        className="px-6 py-4 text-center text-gray-500"
                      >
                        No Fatwa found. Add your first Fatwa!
                      </td>
                    </tr>
                  ) : (
                    books.map((book) => (
                      <tr key={book._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {book.coverImage ? (
                            <img
                              src={book.coverImage}
                              alt={book.titleEnglish}
                              className="w-12 h-16 object-cover rounded-md"
                            />
                          ) : (
                            <div className="w-12 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                              <FiFileText className="text-gray-400" />
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {book.titleEnglish}
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          dir="rtl"
                        >
                          {book.titleUrdu}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(book.uploadDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(book)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            <FiEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(book._id)}
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
