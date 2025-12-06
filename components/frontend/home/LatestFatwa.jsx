"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBalanceScale,
  FaDownload,
  FaArrowRight,
  FaCalendar,
  FaSpinner,
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
        const latestFatwas = result.data.slice(0, 8);
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

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-emerald-50">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-emerald-50">
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
            {language === "ur" ? "تازہ ترین فتاویٰ" : "Latest Fatwas"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "معاصر مسائل کے شرعی حل اور تازہ ترین فتاویٰ"
              : "Discover the latest Islamic rulings and fatwas"}
          </p>
        </div>

        {/* Grid same as LatestBooks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8">
          {fatwas.map((fatwa) => (
            <div
              key={fatwa._id}
              className="group relative h-[500px] sm:h-[450px] rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl cursor-pointer"
            >
              <div className="w-full h-11/12">
                {fatwa.coverImage ? (
                  <img
                    src={fatwa.coverImage}
                    alt={
                      language === "ur" ? fatwa.titleUrdu : fatwa.titleEnglish
                    }
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                    <FaBalanceScale className="h-16 w-16 text-emerald-200" />
                  </div>
                )}
              </div>

              <h1 className="left-0 right-0 bg-black/70 text-white text-center py-2 px-4 text-sm font-semibold line-clamp-1">
                {language === "ur" ? fatwa.titleUrdu : fatwa.titleEnglish}
              </h1>
              {/* Mobile-only button */}
              <button
                onClick={() => window.open(fatwa.pdfUrl, "_blank")}
                className="md:hidden absolute bottom-10 left-1/2 -translate-x-1/2 z-20
             bg-emerald-600 hover:bg-emerald-700 text-white 
             text-xs font-semibold px-4 py-2 rounded-lg shadow-lg"
              >
                {language === "ur" ? "مطالعہ کریں" : "Read Fatwa"}
              </button>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60  pointer-events-none md:pointer-events-auto flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-center px-4">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-3">
                    {language === "ur" ? fatwa.titleUrdu : fatwa.titleEnglish}
                  </h3>
                  <p className="text-emerald-100 text-xs mb-3 line-clamp-1">
                    {language === "ur" ? fatwa.titleEnglish : fatwa.titleUrdu}
                  </p>
                  <div className="flex items-center justify-center text-emerald-200 text-xs mb-4">
                    <FaCalendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(fatwa.uploadDate)}</span>
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    <button
                      onClick={() => window.open(fatwa.pdfUrl, "_blank")}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300"
                    >
                      {language === "ur" ? "مطالعہ کریں" : "Read"}
                    </button>
                    <button
                      onClick={() => window.open(fatwa.pdfUrl, "_blank")}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-300"
                    >
                      {language === "ur" ? "ڈاؤن لوڈ کریں" : "Download"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
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
