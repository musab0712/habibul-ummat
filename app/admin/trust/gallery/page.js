"use client";

import AdminLayout from "@/components/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";

export default function GalleryAdmin() {
  const [formData, setFormData] = useState({
    title: "",
    file: null,
  });
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("/api/trust-gallery");
      if (response.ok) {
        const imagesData = await response.json();
        setImages(imagesData);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      const file = files[0];
      setFormData({
        ...formData,
        file: file,
      });

      // Create preview
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewUrl(e.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setIsError(false);
    setMessage("");

    if (!formData.file) {
      setIsError(true);
      setMessage("Please select an image to upload");
      setIsUploading(false);
      return;
    }

    try {
      // First upload to Cloudinary
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", formData.file);
      cloudinaryData.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
      );
      cloudinaryData.append("folder", "gallery-images");
      cloudinaryData.append("resource_type", "image");
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: cloudinaryData,
        }
      );

      const cloudinaryResult = await cloudinaryResponse.json();

      if (!cloudinaryResponse.ok) {
        throw new Error(
          cloudinaryResult.error.message || "Cloudinary upload failed"
        );
      }

      // Then save to our database
      const response = await fetch("/api/trust-gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          imageUrl: cloudinaryResult.secure_url,
          publicId: cloudinaryResult.public_id,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage("Image uploaded successfully!");
        setFormData({
          title: "",
          file: null,
        });
        setPreviewUrl(null);
        fetchImages();
      } else {
        setIsError(true);
        setMessage(result.error || "Something went wrong");
      }
    } catch (error) {
      setIsError(true);
      setMessage(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      const response = await fetch(`/api/trust-gallery/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Image deleted successfully!");
        fetchImages();
      } else {
        const data = await response.json();
        setIsError(true);
        setMessage(data.error || "Failed to delete image");
      }
    } catch (error) {
      setIsError(true);
      setMessage("Failed to connect to server");
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gray-100 py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              Trust Gallery Admin Panel
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Upload New Image
                </h2>

                {message && (
                  <div
                    className={`mb-4 p-3 rounded-md ${
                      isError
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  {/* <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div> */}

                  {/* <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div> */}

                  <div>
                    <label
                      htmlFor="file"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Image
                    </label>
                    <input
                      type="file"
                      id="file"
                      name="file"
                      onChange={handleChange}
                      required
                      accept="image/*"
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>

                  {previewUrl && (
                    <div>
                      <p className="block text-sm font-medium text-gray-700">
                        Preview
                      </p>
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mt-2 max-h-40 rounded-md object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={isUploading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                    >
                      {isUploading ? "Uploading..." : "Upload Image"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Image List */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Uploaded Images ({images.length})
                </h2>

                {images.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No images uploaded yet.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Preview
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Title
                          </th>
                          {/* <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Category
                      </th> */}
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Date
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {images.map((image) => (
                          <tr key={image._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <img
                                src={image.imageUrl}
                                alt={image.title}
                                className="h-12 w-12 object-cover rounded"
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {image.title}
                              </div>
                              {/* {image.description && (
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {image.description}
                            </div>
                          )} */}
                            </td>
                            {/* <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                            {image.category || "Uncategorized"}
                          </span>
                        </td> */}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(image.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleDelete(image._id)}
                                className="text-red-600 hover:text-red-900 px-2 py-1 rounded hover:bg-red-50"
                                title="Delete image"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
