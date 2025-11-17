"use client";

import { useState, useEffect } from "react";
import {
  FaPlay,
  FaSpinner,
  FaYoutube,
  FaClock,
  FaCalendar,
  FaImage,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

export default function VideoPage() {
  const { language } = useLanguage();
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [thumbnailErrors, setThumbnailErrors] = useState({});

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/videos");

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const videosData = await response.json();
      setVideos(videosData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to get YouTube thumbnail with fallbacks
  const getYouTubeThumbnail = (youtubeId, quality = "maxres") => {
    const qualities = {
      maxres: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      sd: `https://img.youtube.com/vi/${youtubeId}/sddefault.jpg`,
      hq: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`,
      mq: `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`,
      default: `https://img.youtube.com/vi/${youtubeId}/default.jpg`,
    };

    return qualities[quality] || qualities.default;
  };

  // Handle thumbnail loading errors
  const handleThumbnailError = (videoId, youtubeId, currentQuality) => {
    const qualityOrder = ["maxres", "sd", "hq", "mq", "default"];
    const currentIndex = qualityOrder.indexOf(currentQuality);

    if (currentIndex < qualityOrder.length - 1) {
      const nextQuality = qualityOrder[currentIndex + 1];
      setThumbnailErrors((prev) => ({
        ...prev,
        [videoId]: nextQuality,
      }));
    }
  };

  const openModal = (video, index) => {
    setSelectedVideo(video);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

  const navigateVideo = (direction) => {
    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === videos.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setSelectedVideo(videos[newIndex]);
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return language === "ur"
      ? date.toLocaleDateString("ur-PK", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedVideo) {
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "ArrowLeft") {
          navigateVideo("prev");
        } else if (e.key === "ArrowRight") {
          navigateVideo("next");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedVideo, currentIndex]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="h-12 w-12 text-emerald-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchVideos}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              {language === "ur" ? "دوبارہ کوشش کریں" : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
            <FaYoutube className="h-10 w-10 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ur" ? "ویڈیوز" : "Videos"}
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "مفتی حبیب اللہ قاسمی کے خطابات، تقاریر اور روحانی تعلیمات کی ویڈیوز"
              : "Videos of Mufti Habibullah Qasmi's speeches, lectures, and spiritual teachings"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {videos.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-xl border-2 border-emerald-100 p-12">
            <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <FaYoutube className="h-12 w-12 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">
              {language === "ur" ? "ابھی تک کوئی ویڈیوز نہیں" : "No Videos Yet"}
            </h3>
            <p className="text-emerald-700 text-lg max-w-md mx-auto">
              {language === "ur"
                ? "جلد ہی نئی ویڈیوز اپ لوڈ کی جائیں گی۔ براہ کرم بعد میں چیک کریں۔"
                : "New videos will be uploaded soon. Please check back later."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, index) => {
              const currentQuality = thumbnailErrors[video._id] || "maxres";
              const thumbnailUrl = getYouTubeThumbnail(
                video.youtubeId,
                currentQuality
              );

              return (
                <div
                  key={video._id}
                  className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-emerald-300 hover:scale-105 cursor-pointer group"
                  onClick={() => openModal(video, index)}
                >
                  {/* Video Thumbnail */}
                  <div className="relative h-48 w-full overflow-hidden bg-emerald-50">
                    <img
                      src={thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      onError={() =>
                        handleThumbnailError(
                          video._id,
                          video.youtubeId,
                          currentQuality
                        )
                      }
                    />
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                        <FaPlay className="h-6 w-6 text-emerald-600 ml-1" />
                      </div>
                    </div>
                    {/* YouTube Badge */}
                    <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center">
                      <FaYoutube className="h-3 w-3 mr-1" />
                      YouTube
                    </div>
                    {/* Fallback Icon for failed thumbnails */}
                    {currentQuality === "default" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-emerald-100">
                        <FaImage className="h-12 w-12 text-emerald-400" />
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <h3 className="font-semibold text-emerald-900 line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors duration-300">
                      {video.title}
                    </h3>

                    {/* Video Metadata */}
                    <div className="flex items-center justify-between text-sm text-emerald-600">
                      <div className="flex items-center">
                        <FaCalendar className="h-3 w-3 mr-1" />
                        <span>{formatDate(video.createdAt)}</span>
                      </div>
                      <div className="flex items-center">
                        <FaClock className="h-3 w-3 mr-1" />
                        <span>
                          {language === "ur" ? "تازہ ترین" : "Latest"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-4xl w-10/12 h-10/12"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 z-10 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full p-3 transition-all duration-300 shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation buttons */}
            {videos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateVideo("prev");
                  }}
                  className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full p-4 transition-all duration-300 shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateVideo("next");
                  }}
                  className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full p-4 transition-all duration-300 shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Video Player */}
            <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative pt-[56.25%] h-0">
                {" "}
                {/* 16:9 Aspect Ratio */}
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  className="absolute top-0 left-0 w-full h-full rounded-t-2xl"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={selectedVideo.title}
                />
              </div>

              {/* Video Info */}
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white p-6">
                <h2 className="text-xl font-semibold mb-3">
                  {selectedVideo.title}
                </h2>

                <div className="flex items-center justify-between text-sm text-emerald-200">
                  <div className="flex items-center">
                    <FaCalendar className="h-4 w-4 mr-2" />
                    <span>{formatDate(selectedVideo.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <FaYoutube className="h-4 w-4 mr-2 text-red-500" />
                    <span>YouTube</span>
                  </div>
                </div>

                {/* Navigation Info */}
                <div className="mt-4 pt-4 border-t border-emerald-600 flex justify-between items-center">
                  <span className="text-emerald-200 text-sm">
                    {currentIndex + 1} {language === "ur" ? "of" : "of"}{" "}
                    {videos.length}
                  </span>
                  <a
                    href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center"
                  >
                    <FaYoutube className="h-4 w-4 mr-2" />
                    {language === "ur"
                      ? "یوٹیوب پر دیکھیں"
                      : "Watch on YouTube"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
