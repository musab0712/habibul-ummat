"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBook,
  FaDownload,
  FaArrowRight,
  FaCalendar,
  FaSpinner,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const LatestBooks = () => {
  const { language } = useLanguage();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestBooks();
  }, []);

  const fetchLatestBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/books");
      const result = await response.json();

      if (result.success) {
        // Get latest 6 books
        const latestBooks = result.data.slice(0, 6);
        setBooks(latestBooks);
      } else {
        setError("Failed to fetch books");
      }
    } catch (err) {
      setError("Error fetching books");
      console.error("Error fetching books:", err);
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

  const handleReadBook = (pdfUrl, bookTitle) => {
    window.open(pdfUrl, "_blank");
  };

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
              {language === "ur" ? "تازہ ترین کتابیں" : "Latest Books"}
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
              onClick={fetchLatestBooks}
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
            {language === "ur" ? "تازہ ترین کتابیں" : "Latest Books"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "ہماری تازہ ترین اسلامی کتابوں کا مجموعہ دریافت کریں"
              : "Discover our latest collection of Islamic books and literature"}
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-2xl shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-2xl group overflow-hidden"
            >
              {/* Book Cover */}
              <div className="h-72 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
                {book.coverImage ? (
                  <img
                    src={book.coverImage}
                    alt={language === "ur" ? book.titleUrdu : book.titleEnglish}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaBook className="h-16 w-16 text-emerald-200" />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  {language === "ur" ? "نیا" : "New"}
                </div>
              </div>

              {/* Book Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-emerald-900 mb-3 line-clamp-2">
                  {language === "ur" ? book.titleUrdu : book.titleEnglish}
                </h3>

                {/* Bilingual Title */}
                <p className="text-emerald-600 text-sm mb-4 line-clamp-2">
                  {language === "ur" ? book.titleEnglish : book.titleUrdu}
                </p>

                {/* Upload Date */}
                <div className="flex items-center text-emerald-500 text-sm mb-4">
                  <FaCalendar className="h-4 w-4 mr-2" />
                  <span>{formatDate(book.uploadDate)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() =>
                      handleReadBook(
                        book.pdfUrl,
                        language === "ur" ? book.titleUrdu : book.titleEnglish
                      )
                    }
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group/btn"
                  >
                    <FaBook className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                    {language === "ur" ? "پڑھیں" : "Read"}
                  </button>
                  <button
                    onClick={() => window.open(book.pdfUrl, "_blank")}
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

        {/* View All Books Button */}
        <div className="text-center">
          <Link
            href={`/${language}/maktab`}
            className="inline-flex items-center bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
          >
            <span>
              {language === "ur" ? "تمام کتابیں دیکھیں" : "View All Books"}
            </span>
            <FaArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Empty State */}
        {books.length === 0 && !loading && (
          <div className="text-center py-12">
            <FaBook className="h-16 w-16 text-emerald-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-emerald-900 mb-2">
              {language === "ur"
                ? "ابھی تک کوئی کتابیں نہیں"
                : "No Books Available"}
            </h3>
            <p className="text-emerald-600">
              {language === "ur"
                ? "جلد ہی نئی کتابیں شامل کی جائیں گی"
                : "New books will be added soon"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestBooks;
