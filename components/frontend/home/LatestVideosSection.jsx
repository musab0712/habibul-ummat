"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaPlay,
  FaYoutube,
  FaArrowRight,
  FaSpinner,
  FaCalendar,
  FaImage,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const LatestVideosSection = () => {
  const { language } = useLanguage();
  const [latestVideos, setLatestVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [thumbnailErrors, setThumbnailErrors] = useState({});

  useEffect(() => {
    fetchLatestVideos();
  }, []);

  const fetchLatestVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/videos?limit=6");

      if (response.ok) {
        const videos = await response.json();
        setLatestVideos(videos.slice(0, 6)); // Get latest 6 videos
      }
    } catch (error) {
      console.error("Error fetching latest videos:", error);
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

  const openModal = (video) => {
    setSelectedVideo(video);
  };

  const closeModal = () => {
    setSelectedVideo(null);
  };

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

  return (
    <section className="bg-gradient-to-br from-emerald-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-6">
            <FaYoutube className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "ur" ? "تازہ ترین ویڈیوز" : "Latest Videos"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "مفتی حبیب اللہ قاسمی کے تازہ ترین خطابات اور روحانی تعلیمات"
              : "Latest speeches and spiritual teachings of Mufti Habibullah Qasmi"}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="h-8 w-8 text-emerald-600 animate-spin" />
          </div>
        ) : latestVideos.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-lg border-2 border-emerald-100 p-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <FaYoutube className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">
              {language === "ur" ? "ابھی تک کوئی ویڈیوز نہیں" : "No Videos Yet"}
            </h3>
            <p className="text-emerald-700 text-lg">
              {language === "ur"
                ? "جلد ہی نئی ویڈیوز اپ لوڈ کی جائیں گی"
                : "New videos will be uploaded soon"}
            </p>
          </div>
        ) : (
          <>
            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {latestVideos.map((video) => {
                const currentQuality = thumbnailErrors[video._id] || "maxres";
                const thumbnailUrl = getYouTubeThumbnail(
                  video.youtubeId,
                  currentQuality
                );

                return (
                  <div
                    key={video._id}
                    className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-emerald-300 group cursor-pointer"
                    onClick={() => openModal(video)}
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
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                          <FaPlay className="h-5 w-5 text-emerald-600 ml-0.5" />
                        </div>
                      </div>
                      {/* YouTube Badge */}
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                        <FaYoutube className="h-3 w-3 inline mr-1" />
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
                      <div className="flex items-center text-sm text-emerald-600">
                        <FaCalendar className="h-3 w-3 mr-2" />
                        <span>{formatDate(video.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Link
                href={`/${language}/videos`}
                className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>
                  {language === "ur"
                    ? "مکمل ویڈیو لائبریری"
                    : "View Full Video Library"}
                </span>
                <FaArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </div>
          </>
        )}

        {/* Video Modal for Homepage */}
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

              {/* Video Player */}
              <div className="bg-black rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative pt-[56.25%] h-0">
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
    </section>
  );
};

export default LatestVideosSection;
