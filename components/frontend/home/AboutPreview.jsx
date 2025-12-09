"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaUser,
  FaArrowRight,
  FaSpinner,
  FaHistory,
  FaHeart,
} from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { useLanguage } from "../../../context/LanguageContext";

const AboutPreview = () => {
  const { language } = useLanguage();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/about");
      const result = await response.json();

      if (result.success && result.data) {
        setAboutData(result.data);
      } else {
        setError("Failed to fetch about data");
      }
    } catch (err) {
      setError("Error fetching about data");
      console.error("Error fetching about data:", err);
    } finally {
      setLoading(false);
    }
  };

  // Function to truncate text for preview
  const truncateText = (text, maxLength = 200) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
              {language === "ur" ? "تعارف" : "About"}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"></div>
          </div>
          <div className="flex justify-center items-center py-12">
            <FaSpinner className="h-12 w-12 text-emerald-600 animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-emerald-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchAboutData}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              {language === "ur" ? "دوبارہ کوشش کریں" : "Try Again"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  const displayContent =
    aboutData?.content?.[language] ||
    (language === "ur"
      ? "مفتی حبیب اللہ قاسمی ایک ممتاز عالم دین، محقق، اور روحانی مربی ہیں جنہوں نے اپنی زندگی اسلامی علوم کی تعلیم اور تبلیغ کے لیے وقف کی ہے۔"
      : "Mufti Habibullah Qasmi is a renowned Islamic scholar, researcher, and spiritual mentor who has dedicated his life to teaching and propagating Islamic knowledge.");

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full mb-6 shadow-xl">
            <FaUser className="h-10 w-10 text-amber-300" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
            {language === "ur" ? "تعارف" : "About"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* About Content - Left Column */}
          <div className="flex flex-col space-y-6">
            {/* Biography Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-emerald-100 flex-1 flex flex-col">
              <h3 className="text-2xl font-bold text-emerald-900 mb-4">
                {language === "ur"
                  ? "مفتی حبیب اللہ قاسمی"
                  : "Mufti Habibullah Qasmi"}
              </h3>
              <div className="flex-1 flex items-start">
                <p className="text-emerald-700 leading-relaxed text-lg">
                  {truncateText(displayContent, 300)}
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-xl p-4 text-white text-center flex flex-col items-center justify-center">
                <FaHistory className="h-6 w-6 text-amber-300 mb-2" />
                <div className="text-xl font-bold">50+</div>
                <div className="text-emerald-100 text-xs mt-1">
                  {language === "ur" ? "سال تجربہ" : "Years Experience"}
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white text-center flex flex-col items-center justify-center">
                <FaHeart className="h-6 w-6 text-white mb-2" />
                <div className="text-xl font-bold">80+</div>
                <div className="text-amber-100 text-xs mt-1">
                  {language === "ur" ? "کتابیں" : "Books Authored"}
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white text-center flex flex-col items-center justify-center">
                <FiTarget className="h-6 w-6 text-amber-300 mb-2" />
                <div className="text-xl font-bold">5000+</div>
                <div className="text-emerald-100 text-xs mt-1">
                  {language === "ur" ? "طلباء" : "Students"}
                </div>
              </div>
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl p-4 text-white text-center flex flex-col items-center justify-center">
                <FiTarget className="h-6 w-6 text-white mb-2" />
                <div className="text-xl font-bold">80+</div>
                <div className="text-amber-100 text-xs mt-1">
                  {language === "ur" ? "خلفاء" : "Khulfa"}
                </div>
              </div>
            </div>
          </div>

          {/* Mission & Vision - Right Column */}
          <div className="flex flex-col space-y-6">
            {/* Mission Card */}
            <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-6 text-white shadow-2xl flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <FiTarget className="h-6 w-6 text-amber-300 mr-3" />
                <h3 className="text-xl font-bold">
                  {language === "ur" ? "ہمارا مشن" : "Our Mission"}
                </h3>
              </div>
              <div className="flex-1 flex items-start">
                <p className="text-emerald-100 leading-relaxed">
                  {language === "ur"
                    ? "قرآن و سنت کی اصل تعلیمات کو عام کرنا اور امت مسلمہ کو صحیح اسلامی علم سے روشناس کرانا۔ ہر مسلمان تک اسلامی علم کی رسائی کو آسان بنانا۔"
                    : "To spread the authentic teachings of Quran and Sunnah and familiarize the Muslim Ummah with correct Islamic knowledge. To make Islamic knowledge accessible to every Muslim."}
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-2xl flex-1 flex flex-col">
              <div className="flex items-center mb-4">
                <FaHeart className="h-6 w-6 text-white mr-3" />
                <h3 className="text-xl font-bold">
                  {language === "ur" ? "ہمارا ویژن" : "Our Vision"}
                </h3>
              </div>
              <div className="flex-1 flex items-start">
                <p className="text-amber-100 leading-relaxed">
                  {language === "ur"
                    ? "ایک ایسی عالمی برادری تشکیل دینا جو اسلامی علم سے آراستہ ہو اور اسلامی اقدار پر عمل پیرا ہو۔ ہر گھر کو علم کی روشنی سے منور کرنا۔"
                    : "To build a global community that is adorned with Islamic knowledge and practices Islamic values. To illuminate every home with the light of knowledge."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Read More Button */}
        <div className="text-center">
          <Link
            href={`/${language}/about`}
            className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>
              {language === "ur" ? "مکمل تعارف پڑھیں" : "Read Full Biography"}
            </span>
            <FaArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Empty State */}
        {!aboutData && !loading && (
          <div className="text-center py-12">
            <FaUser className="h-16 w-16 text-emerald-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">
              {language === "ur" ? "تعارف دستیاب نہیں" : "About Not Available"}
            </h3>
            <p className="text-emerald-600">
              {language === "ur"
                ? "جلد ہی تعارف شامل کیا جائے گا"
                : "About information will be added soon"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutPreview;
