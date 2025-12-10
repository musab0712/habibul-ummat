// app/[lang]/maktaba/BooksPageClient.jsx
"use client";
import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaDownload,
  FaSearch,
  FaFilter,
  FaSpinner,
  FaCalendar,
  FaBalanceScale,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const BooksPageClient = () => {
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
            <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
              {language === "ur" ? "دوبارہ کوشش کریں" : "Try Again"}
            </button>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-16">
            <svg
              className="h-20 w-20 text-emerald-300 mx-auto mb-6"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M3 4a2 2 0 012-2h6a2 2 0 012 2v12a1 1 0 11-2 0V4H5v10a1 1 0 11-2 0V4z" />
            </svg>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="group relative h-[500px] sm:h-[450px] rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer"
              >
                {/* Book Cover - Fully Visible */}
                <div className="w-full h-11/12">
                  {book.coverImage ? (
                    <img
                      src={book.coverImage}
                      alt={
                        language === "ur" ? book.titleUrdu : book.titleEnglish
                      }
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center">
                      <svg
                        className="h-20 w-20 text-emerald-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3 4a2 2 0 012-2h6a2 2 0 012 2v12a1 1 0 11-2 0V4H5v10a1 1 0 11-2 0V4z" />
                      </svg>
                    </div>
                  )}
                </div>

                <h1 className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center py-2 px-4 text-sm font-semibold line-clamp-1">
                  {language === "ur" ? book.titleUrdu : book.titleEnglish}
                </h1>
                {/* Mobile-only button */}
                <button
                  onClick={() => window.open(book.pdfUrl, "_blank")}
                  className="md:hidden absolute bottom-10 left-1/2 -translate-x-1/2 z-20
             bg-emerald-600 hover:bg-emerald-700 text-white 
             text-xs font-semibold px-4 py-2 rounded-lg shadow-lg"
                >
                  {language === "ur" ? "مطالعہ کریں" : "Read Book"}
                </button>

                {/* Overlay - Hidden by default, shown on hover */}
                <div className="absolute inset-0 bg-black/70 pointer-events-none md:pointer-events-auto flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                      {language === "ur" ? book.titleUrdu : book.titleEnglish}
                    </h3>

                    {/* Bilingual Title */}
                    <p className="text-emerald-100 text-xs mb-4 line-clamp-1">
                      {language === "ur" ? book.titleEnglish : book.titleUrdu}
                    </p>

                    {/* Upload Date */}
                    <div className="flex items-center justify-center text-emerald-200 text-xs mb-4">
                      <svg
                        className="h-3 w-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v2h16V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h12a1 1 0 100-2H6z"
                        />
                      </svg>
                      <span>{formatDate(book.uploadDate)}</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 w-full">
                      <button
                        onClick={() => handleReadBook(book.pdfUrl)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-3 rounded-lg font-semibold transition-all duration-300 text-sm flex items-center justify-center"
                      >
                        <FaBalanceScale className="h-4 w-4 mr-1" />
                        {language === "ur" ? "پڑھیں" : "Read"}
                      </button>
                      {/* <button
                        onClick={() => window.open(book.pdfUrl, "_blank")}
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 px-3 rounded-lg font-semibold transition-all duration-300 text-sm flex items-center justify-center"
                      >
                        <svg
                          className="h-4 w-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          />
                        </svg>
                        {language === "ur" ? "ڈاؤن لوڈ کریں" : "Download"}
                      </button> */}
                    </div>
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

export default BooksPageClient;
