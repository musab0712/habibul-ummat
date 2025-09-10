"use client";

import AdminLayout from "@/components/AdminLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState, useEffect } from "react";

export default function AdminPage() {
  const [formData, setFormData] = useState({
    title: "",
    youtubeUrl: "",
    published: false,
  });
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch("/api/videos?all=true");
      if (response.ok) {
        const videosData = await response.json();
        setVideos(videosData);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const extractYoutubeId = (url) => {
    // Handle various YouTube URL formats
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError(false);
    setMessage("");

    const youtubeId = extractYoutubeId(formData.youtubeUrl);
    if (!youtubeId) {
      setIsError(true);
      setMessage(
        "Invalid YouTube URL. Please provide a valid YouTube video URL."
      );
      return;
    }

    try {
      const response = await fetch("/api/videos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          youtubeId,
          thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Video uploaded successfully!");
        setFormData({
          title: "",
          youtubeUrl: "",
          published: false,
        });
        fetchVideos(); // Refresh the video list
      } else {
        setIsError(true);
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setIsError(true);
      setMessage("Failed to connect to server");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this video?")) {
      return;
    }

    try {
      const response = await fetch(`/api/videos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Video deleted successfully!");
        fetchVideos(); // Refresh the video list
      } else {
        const data = await response.json();
        setIsError(true);
        setMessage(data.error || "Failed to delete video");
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
              YouTube Video Admin Panel
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upload Form */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Upload New Video
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
                      Title *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
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

                  <div>
                    <label
                      htmlFor="youtubeUrl"
                      className="block text-sm font-medium text-gray-700"
                    >
                      YouTube URL *
                    </label>
                    <input
                      type="url"
                      id="youtubeUrl"
                      name="youtubeUrl"
                      value={formData.youtubeUrl}
                      onChange={handleChange}
                      required
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

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

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="published"
                      name="published"
                      checked={formData.published}
                      onChange={handleChange}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="published"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Publish immediately
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Upload Video
                    </button>
                  </div>
                </form>
              </div>

              {/* Video List */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  Uploaded Videos
                </h2>

                {videos.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">
                    No videos uploaded yet.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {videos.map((video) => (
                      <div
                        key={video._id}
                        className="border border-gray-200 rounded-lg p-4 flex justify-between items-start"
                      >
                        <div className="flex space-x-4">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-24 h-16 object-cover rounded"
                          />
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {video.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {video.youtubeId}
                            </p>
                            <span
                              className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
                                video.published
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {video.published ? "Published" : "Draft"}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDelete(video._id)}
                          className="text-red-600 hover:text-red-800 p-2"
                          title="Delete video"
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
