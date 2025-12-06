"use client";
import React, { useState, useEffect } from "react";
import {
  FaBalanceScale,
  FaDownload,
  FaSearch,
  FaSpinner,
  FaCalendar,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const FatwaPageClient = () => {
  const { language } = useLanguage();
  const [fatwas, setFatwas] = useState([]);
  const [filteredFatwas, setFilteredFatwas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllFatwas();
  }, []);

  useEffect(() => {
    filterFatwas();
  }, [searchTerm, fatwas]);

  const fetchAllFatwas = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/fatwa");
      const result = await response.json();

      if (result.success) {
        setFatwas(result.data);
        setFilteredFatwas(result.data);
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

  const filterFatwas = () => {
    if (!searchTerm.trim()) {
      setFilteredFatwas(fatwas);
      return;
    }

    const filtered = fatwas.filter(
      (fatwa) =>
        fatwa.titleEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fatwa.titleUrdu.includes(searchTerm) ||
        fatwa.titleUrdu.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFatwas(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ur" ? "ur-PK" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleReadFatwa = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="h-12 w-12 text-emerald-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
            <FaBalanceScale className="h-10 w-10 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ur" ? "فتاویٰ" : "Fatwa"}
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "معاصر مسائل کے شرعی حل اور مفتی صاحب کے فتاویٰ"
              : "Contemporary Islamic rulings and fatwas by Mufti Sahib"}
          </p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-emerald-100">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 h-5 w-5" />
              <input
                type="text"
                placeholder={
                  language === "ur" ? "فتاویٰ تلاش کریں..." : "Search fatwas..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-emerald-50 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-semibold">
                {filteredFatwas.length}{" "}
                {language === "ur" ? "فتاویٰ" : "Fatwas"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fatwas Grid - same style as BooksPageClient */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchAllFatwas}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              {language === "ur" ? "دوبارہ کوشش کریں" : "Try Again"}
            </button>
          </div>
        ) : filteredFatwas.length === 0 ? (
          <div className="text-center py-16">
            <FaBalanceScale className="h-20 w-20 text-emerald-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">
              {language === "ur" ? "کوئی فتاویٰ نہیں ملا" : "No Fatwas Found"}
            </h3>
            <p className="text-emerald-600 text-lg">
              {language === "ur"
                ? "براہ کرم اپنی تلاش کی اصطلاح تبدیل کریں"
                : "Please try different search terms"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFatwas.map((fatwa) => (
              <div
                key={fatwa._id}
                className="group relative h-[450px] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
              >
                {/* Cover */}
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
                      <FaBalanceScale className="h-20 w-20 text-emerald-200" />
                    </div>
                  )}
                </div>

                <h1 className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-2 px-4 text-sm font-semibold line-clamp-1">
                  {language === "ur" ? fatwa.titleUrdu : fatwa.titleEnglish}
                </h1>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {language === "ur" ? fatwa.titleUrdu : fatwa.titleEnglish}
                    </h3>

                    <p className="text-emerald-100 text-xs mb-4 line-clamp-1">
                      {language === "ur" ? fatwa.titleEnglish : fatwa.titleUrdu}
                    </p>

                    <div className="flex items-center justify-center text-emerald-200 text-xs mb-4">
                      <FaCalendar className="h-3 w-3 mr-1" />
                      <span>{formatDate(fatwa.uploadDate)}</span>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <button
                        onClick={() => handleReadFatwa(fatwa.pdfUrl)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg font-semibold transition-all duration-300 text-sm flex items-center justify-center"
                      >
                        <FaBalanceScale className="h-4 w-4 mr-1" />
                        {language === "ur" ? "مطالعہ کریں" : "Read"}
                      </button>
                      <button
                        onClick={() => window.open(fatwa.pdfUrl, "_blank")}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-3 rounded-lg font-semibold transition-all duration-300 text-sm flex items-center justify-center"
                      >
                        <FaDownload className="h-4 w-4 mr-1" />
                        {language === "ur" ? "ڈاؤن لوڈ کریں" : "Download"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FatwaPageClient;
