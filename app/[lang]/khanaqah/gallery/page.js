"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaImages,
  FaSpinner,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { useLanguage } from "../../../../context/LanguageContext";

export default function GalleryPage() {
  const { language } = useLanguage();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/khanaqah-gallery");

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const imagesData = await response.json();
      setImages(imagesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "ArrowLeft") {
          navigateImage("prev");
        } else if (e.key === "ArrowRight") {
          navigateImage("next");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, currentIndex]);

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
              onClick={fetchImages}
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
            <FaImages className="h-10 w-10 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ur" ? "گیلری" : "Jamia Gallery"}
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "مفتی حبیب اللہ قاسمی کی خدمات، تقاریب اور یادگار لمحات کی تصاویر"
              : "Photos of Mufti Habibullah Qasmi's services, events, and memorable moments"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {images.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-xl border-2 border-emerald-100 p-12">
            <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <FaImages className="h-12 w-12 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">
              {language === "ur" ? "ابھی تک کوئی تصاویر نہیں" : "No Images Yet"}
            </h3>
            <p className="text-emerald-700 text-lg max-w-md mx-auto">
              {language === "ur"
                ? "جلد ہی نئی تصاویر اپ لوڈ کی جائیں گی۔ براہ کرم بعد میں چیک کریں۔"
                : "New images will be uploaded soon. Please check back later."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div
                key={image._id}
                className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-emerald-300 hover:scale-105 cursor-pointer group "
                onClick={() => openModal(image, index)}
              >
                <div className="relative h-60 w-full">
                  <Image
                    src={image.imageUrl}
                    alt={image.title || "Gallery image"}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                {/* {(image.title || image.description) && (
                  <div className="p-4">
                    {image.title && (
                      <h3 className="font-medium text-gray-900 truncate">
                        {image.title}
                      </h3>
                    )}
                    {image.description && (
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {image.description}
                      </p>
                    )}
                  </div>
                )} */}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-6xl w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full p-3 transition-all duration-300 shadow-lg"
            >
              <FaTimes className="h-6 w-6" />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full p-4 transition-all duration-300 shadow-lg"
                >
                  <FaArrowLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full p-4 transition-all duration-300 shadow-lg"
                >
                  <FaArrowRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="flex justify-center items-center h-full">
              <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] bg-black rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title || "Gallery image"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Image info */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white p-6 rounded-b-2xl mt-4">
              {selectedImage.title && (
                <h2 className="text-xl font-semibold mb-2">
                  {selectedImage.title}
                </h2>
              )}
              {selectedImage.description && (
                <p className="text-emerald-100">{selectedImage.description}</p>
              )}
              <div className="mt-4 text-sm text-emerald-200 flex justify-between items-center">
                <span>
                  {currentIndex + 1} {language === "ur" ? "of" : "of"}{" "}
                  {images.length}
                </span>
                <button
                  onClick={() => {
                    // Download functionality can be added here
                    const link = document.createElement("a");
                    link.href = selectedImage.imageUrl;
                    link.download = selectedImage.title || "image";
                    link.click();
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                >
                  {language === "ur" ? "ڈاؤن لوڈ کریں" : "Download"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
