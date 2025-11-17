"use client";
import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaDownload,
  FaSearch,
  FaFilter,
  FaSpinner,
  FaCalendar,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const BooksPage = () => {
  const { language } = useLanguage();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAllBooks();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [searchTerm, books]);

  const fetchAllBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/books");
      const result = await response.json();

      if (result.success) {
        setBooks(result.data);
        setFilteredBooks(result.data);
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

  const filterBooks = () => {
    if (!searchTerm.trim()) {
      setFilteredBooks(books);
      return;
    }

    const filtered = books.filter(
      (book) =>
        book.titleEnglish.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.titleUrdu.includes(searchTerm) ||
        book.titleUrdu.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === "ur" ? "ur-PK" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleReadBook = (pdfUrl) => {
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ur" ? "کتب خانہ" : "Library"}
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "اسلامی علم کے وسیع ذخیرے سے مستفید ہوں"
              : "Explore our comprehensive collection of Islamic knowledge"}
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
                  language === "ur" ? "کتابیں تلاش کریں..." : "Search books..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-emerald-50 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg"
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-semibold">
                {filteredBooks.length} {language === "ur" ? "کتابیں" : "Books"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchAllBooks}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              {language === "ur" ? "دوبارہ کوشش کریں" : "Try Again"}
            </button>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <FaBook className="h-20 w-20 text-emerald-300 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">
              {language === "ur" ? "کوئی کتابیں نہیں ملیں" : "No Books Found"}
            </h3>
            <p className="text-emerald-600 text-lg">
              {language === "ur"
                ? "براہ کرم اپنی تلاش کی اصطلاح تبدیل کریں"
                : "Please try different search terms"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:shadow-2xl group overflow-hidden"
              >
                {/* Book Cover */}
                <div className="h-56 bg-gradient-to-br from-emerald-600 to-emerald-800 relative overflow-hidden">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={
                        language === "ur" ? book.titleUrdu : book.titleEnglish
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FaBook className="h-20 w-20 text-emerald-200" />
                    </div>
                  )}
                </div>

                {/* Book Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-emerald-900 mb-2 line-clamp-2 h-14">
                    {language === "ur" ? book.titleUrdu : book.titleEnglish}
                  </h3>

                  {/* Bilingual Title */}
                  <p className="text-emerald-600 text-sm mb-3 line-clamp-2 h-10">
                    {language === "ur" ? book.titleEnglish : book.titleUrdu}
                  </p>

                  {/* Upload Date */}
                  <div className="flex items-center text-emerald-500 text-xs mb-4">
                    <FaCalendar className="h-3 w-3 mr-1" />
                    <span>{formatDate(book.uploadDate)}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleReadBook(book.pdfUrl)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center text-sm group/btn"
                    >
                      <FaBook className="h-3 w-3 mr-1 group-hover/btn:scale-110 transition-transform" />
                      {language === "ur" ? "پڑھیں" : "Read"}
                    </button>
                    <button
                      onClick={() => window.open(book.pdfUrl, "_blank")}
                      className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-lg transition-all duration-300 flex items-center justify-center group/download"
                      title={language === "ur" ? "ڈاؤن لوڈ کریں" : "Download"}
                    >
                      <FaDownload className="h-3 w-3 group-hover/download:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 py-12 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {language === "ur"
              ? "علم کا سفر جاری رکھیں"
              : "Continue Your Journey of Knowledge"}
          </h2>
          <p className="text-emerald-100 text-lg mb-6 max-w-2xl mx-auto">
            {language === "ur"
              ? "ہماری تمام کتابیں مفت میں دستیاب ہیں۔ علم حاصل کرتے رہیں اور دوسروں تک پہنچائیں۔"
              : "All our books are available for free. Keep learning and sharing knowledge with others."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
