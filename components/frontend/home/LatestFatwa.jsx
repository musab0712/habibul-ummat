"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBalanceScale,
  FaDownload,
  FaArrowRight,
  FaCalendar,
  FaSpinner,
  FaQuestionCircle,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const LatestFatwa = () => {
  const { language } = useLanguage();
  const [fatwas, setFatwas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestFatwas();
  }, []);

  const fetchLatestFatwas = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/fatwa");
      const result = await response.json();

      if (result.success) {
        // Get latest 6 fatwas
        const latestFatwas = result.data.slice(0, 6);
        setFatwas(latestFatwas);
      } else {
        setError("Failed to fetch fatwas");
      }
    } catch (err) {
      setError("Error fetching fatwas");
      console.error("Error fetching fatwas:", err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ur" ? "ur-PK" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleReadFatwa = (pdfUrl, fatwaTitle) => {
    window.open(pdfUrl, "_blank");
  };

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
              {language === "ur" ? "تازہ ترین فتاویٰ" : "Latest Fatwas"}
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchLatestFatwas}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              {language === "ur" ? "دوبارہ کوشش کریں" : "Try Again"}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full mb-6 shadow-xl">
            <FaBalanceScale className="h-10 w-10 text-amber-300" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
            {language === "ur" ? "تازہ ترین فتاویٰ" : "Latest Fatwas"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "معاصر مسائل کے شرعی حل اور مفتی صاحب کے تازہ ترین فتاویٰ"
              : "Contemporary Islamic rulings and latest fatwas by Mufti Sahib"}
          </p>
        </div>

        {/* Fatwas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {fatwas.map((fatwa) => (
            <div
              key={fatwa._id}
              className="bg-white rounded-2xl shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-2xl group overflow-hidden"
            >
              {/* Fatwa Cover */}
              <div className="h-48 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
                {fatwa.coverImage ? (
                  <img
                    src={fatwa.coverImage}
                    alt={
                      language === "ur" ? fatwa.titleUrdu : fatwa.titleEnglish
                    }
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaBalanceScale className="h-16 w-16 text-emerald-200" />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {language === "ur" ? "نیا" : "New"}
                </div>
              </div>

              {/* Fatwa Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-900 mb-3 line-clamp-2">
                  {language === "ur" ? fatwa.titleUrdu : fatwa.titleEnglish}
                </h3>

                {/* Bilingual Title */}
                <p className="text-emerald-600 text-sm mb-4 line-clamp-2">
                  {language === "ur" ? fatwa.titleEnglish : fatwa.titleUrdu}
                </p>

                {/* Upload Date */}
                <div className="flex items-center text-emerald-500 text-sm mb-4">
                  <FaCalendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(fatwa.uploadDate)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() =>
                      handleReadFatwa(
                        fatwa.pdfUrl,
                        language === "ur" ? fatwa.titleUrdu : fatwa.titleEnglish
                      )
                    }
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group/btn"
                  >
                    <FaBalanceScale className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    {language === "ur" ? "مطالعہ کریں" : "Read"}
                  </button>
                  <button
                    onClick={() => window.open(fatwa.pdfUrl, "_blank")}
                    className="bg-amber-500 hover:bg-amber-600 text-white p-3 rounded-xl transition-all duration-300 flex items-center justify-center group/download"
                    title={language === "ur" ? "ڈاؤن لوڈ کریں" : "Download"}
                  >
                    <FaDownload className="h-4 w-4 group-hover/download:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Fatwas Button */}
        <div className="text-center">
          <Link
            href={`/${language}/fatwa`}
            className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>
              {language === "ur" ? "تمام فتاویٰ دیکھیں" : "View All Fatwas"}
            </span>
            <FaArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Ask Question Button */}
        {/* <div className="text-center mt-8">
          <Link
            href={`/${language}/contact`}
            className="inline-flex items-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <FaQuestionCircle className="h-5 w-5 mr-2" />
            <span>{language === "ur" ? "سوال پوچھیں" : "Ask a Question"}</span>
          </Link>
        </div> */}

        {/* Empty State */}
        {fatwas.length === 0 && !loading && (
          <div className="text-center py-12">
            <FaBalanceScale className="h-16 w-16 text-emerald-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">
              {language === "ur"
                ? "ابھی تک کوئی فتاویٰ نہیں"
                : "No Fatwas Available"}
            </h3>
            <p className="text-emerald-600">
              {language === "ur"
                ? "جلد ہی نئے فتاویٰ شامل کیے جائیں گے"
                : "New fatwas will be added soon"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestFatwa;
