// pages/admin.js (Admin panel with MongoDB integration)
"use client";
import AdminLayout from "@/components/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [sliderData, setSliderData] = useState({
    image: null,
    preview: null,
  });
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [existingSlides, setExistingSlides] = useState([]);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/slides");
      const data = await response.json();
      if (data.success) {
        setExistingSlides(data.data);
      }
    } catch (error) {
      console.error("Error fetching slides:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSliderData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSliderData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sliderData.image) {
      setMessage({ text: "Please select an image", type: "error" });
      return;
    }

    setIsUploading(true);
    setMessage({ text: "", type: "" });

    const formData = new FormData();
    formData.append("image", sliderData.image);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setMessage({
          text: "Slider image uploaded successfully!",
          type: "success",
        });

        // Reset form
        setSliderData({
          image: null,
          preview: null,
        });
        document.getElementById("image-upload").value = "";

        // Refresh slides list
        fetchSlides();
      } else {
        setMessage({
          text: data.error || "Error uploading image",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text: "Error uploading image. Please try again.",
        type: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteSlide = async (id) => {
    if (confirm("Are you sure you want to delete this slide?")) {
      try {
        const response = await fetch(`/api/slides/${id}`, {
          method: "DELETE",
        });

        const data = await response.json();

        if (data.success) {
          setMessage({
            text: "Slide deleted successfully!",
            type: "success",
          });
          fetchSlides();
        } else {
          setMessage({
            text: data.error || "Error deleting slide",
            type: "error",
          });
        }
      } catch (error) {
        setMessage({
          text: "Error deleting slide. Please try again.",
          type: "error",
        });
      }
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white shadow rounded-lg p-6 md:p-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Hero Slider Admin Panel
              </h1>

              {message.text && (
                <div
                  className={`mb-6 p-4 rounded-md ${
                    message.type === "error"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Slide Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={sliderData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter title for the slide"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subtitle"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Slide Subtitle
                    </label>
                    <input
                      type="text"
                      id="subtitle"
                      name="subtitle"
                      value={sliderData.subtitle}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter subtitle for the slide"
                    />
                  </div>
                </div> */}

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="ctaText"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Button Text
                    </label>
                    <input
                      type="text"
                      id="ctaText"
                      name="ctaText"
                      value={sliderData.ctaText}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter call-to-action button text"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="ctaLink"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Button Link
                    </label>
                    <input
                      type="text"
                      id="ctaLink"
                      name="ctaLink"
                      value={sliderData.ctaLink}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter URL for the button link"
                    />
                  </div>
                </div> */}

                <div>
                  <label
                    htmlFor="image-upload"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Slide Image
                  </label>
                  <input
                    type="file"
                    id="image-upload"
                    name="image"
                    onChange={handleImageChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    accept="image/*"
                    required
                  />
                  {sliderData.preview && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-500 mb-2">
                        Image Preview:
                      </p>
                      <img
                        src={sliderData.preview}
                        alt="Preview"
                        className="max-w-full h-48 object-cover rounded-md border border-gray-300"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isUploading}
                    className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isUploading ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isUploading ? "Uploading..." : "Upload Slide"}
                  </button>
                </div>
              </form>

              <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Current Slides
                </h2>
                {existingSlides.length === 0 ? (
                  <div className="bg-gray-50 p-4 rounded-md text-center">
                    <p className="text-gray-500">
                      No slides found. Upload some to get started.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {existingSlides.map((slide) => (
                      <div
                        key={slide._id}
                        className="border border-gray-200 rounded-md p-4"
                      >
                        <img
                          src={slide.imageUrl}
                          alt={slide.title}
                          className="w-full h-40 object-cover rounded-md mb-3"
                        />
                        {/* <h3 className="font-semibold text-lg">{slide.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">
                          {slide.subtitle}
                        </p> */}
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-xs text-gray-500">
                            {new Date(slide.createdAt).toLocaleDateString()}
                          </span>
                          <button
                            onClick={() => handleDeleteSlide(slide._id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
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
