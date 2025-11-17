"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaImages, FaArrowRight, FaSpinner } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const LatestPhotosSection = () => {
  const { language } = useLanguage();
  const [latestImages, setLatestImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestImages();
  }, []);

  const fetchLatestImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/gallery?limit=6");

      if (response.ok) {
        const images = await response.json();
        setLatestImages(images.slice(0, 6)); // Get latest 6 images
      }
    } catch (error) {
      console.error("Error fetching latest images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-gradient-to-br from-emerald-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-6">
            <FaImages className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "ur" ? "تازہ ترین تصاویر" : "Latest Photos"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "مفتی حبیب اللہ قاسمی کی تازہ ترین تقاریب، خدمات اور یادگار لمحات"
              : "Latest events, services, and memorable moments of Mufti Habibullah Qasmi"}
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="h-8 w-8 text-emerald-600 animate-spin" />
          </div>
        ) : latestImages.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-lg border-2 border-emerald-100 p-12">
            <div className="w-20 h-20 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <FaImages className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">
              {language === "ur" ? "ابھی تک کوئی تصاویر نہیں" : "No Images Yet"}
            </h3>
            <p className="text-emerald-700 text-lg">
              {language === "ur"
                ? "جلد ہی نئی تصاویر اپ لوڈ کی جائیں گی"
                : "New images will be uploaded soon"}
            </p>
          </div>
        ) : (
          <>
            {/* Photos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">
              {latestImages.map((image, index) => (
                <div
                  key={image._id}
                  className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-emerald-300 hover:scale-105 cursor-pointer group "
                  //   onClick={() => openModal(image, index)}
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
                  {(image.title || image.description) && (
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
                  )}
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Link
                href={`/${language}/gallery`}
                className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <span>
                  {language === "ur"
                    ? "مکمل گیلری دیکھیں"
                    : "View Full Gallery"}
                </span>
                <FaArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default LatestPhotosSection;
