"use client";
import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaSearch,
  FaSpinner,
  FaCalendar,
  FaRegEye,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const BooksPageClient = () => {
  const { language } = useLanguage();

  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [previewImage, setPreviewImage] = useState(null);
  const [pdfPreview, setPdfPreview] = useState(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      console.error(err);
      setError("Error fetching books");
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
        book.titleUrdu.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilteredBooks(filtered);
  };

  const handlePdfScroll = (e) => {
    const element = e.target;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;

    const progress = Math.round((scrollTop / scrollHeight) * 100);
    setReadingProgress(progress || 0);
  };

  const toggleFullscreen = () => {
    const elem = document.getElementById("pdf-reader-container");

    if (!document.fullscreenElement) {
      elem.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
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

  // const handleReadBook = (pdfUrl) => {
  //   window.open(pdfUrl, "_blank");
  // };

  const handleReadBook = (pdfUrl) => {
    setPdfPreview(pdfUrl);
  };

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-white to-emerald-50">
        <FaSpinner className="text-emerald-600 text-4xl animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-emerald-50">
      {/* ---------------- HEADER ---------------- */}

      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {language === "ur" ? "کتب خانہ" : "Library"}
          </h1>
          <p className="text-emerald-100 max-w-3xl mx-auto">
            {language === "ur"
              ? "اسلامی کتب کا مکمل ڈیجیٹل ذخیرہ"
              : "Complete digital archive of Islamic books"}
          </p>
        </div>
      </div>

      {/* ---------------- SEARCH BAR ---------------- */}

      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />
            <input
              type="text"
              placeholder={
                language === "ur" ? "کتاب تلاش کریں..." : "Search books..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-lg font-semibold">
            {filteredBooks.length} {language === "ur" ? "کتابیں" : "Books"}
          </div>
        </div>
      </div>

      {/* ---------------- BOOK GRID ---------------- */}

      <div className="max-w-7xl mx-auto px-4 py-12">
        {error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-20">
            <FaBook className="text-emerald-300 text-6xl mx-auto mb-4" />
            <h3 className="text-xl font-bold text-emerald-900">
              {language === "ur" ? "کوئی کتاب نہیں ملی" : "No Books Found"}
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition overflow-hidden"
              >
                {/* ---------------- IMAGES ---------------- */}

                <div className="grid grid-cols-2 h-[320px]">
                  {/* COVER IMAGE */}

                  <div className="relative group overflow-hidden">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                      />
                    ) : (
                      <div className="w-full h-full bg-emerald-700 flex items-center justify-center">
                        <FaBook className="text-white text-3xl" />
                      </div>
                    )}

                    {book.coverImage && (
                      <button
                        onClick={() => setPreviewImage(book.coverImage)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
                      >
                        <FaRegEye className="mr-2" />
                        {language === "ur" ? "دیکھیں" : "Preview"}
                      </button>
                    )}
                  </div>

                  {/* DETAILS IMAGE */}

                  <div className="relative group overflow-hidden">
                    {book.detailsImage ? (
                      <img
                        src={book.detailsImage}
                        alt="Details"
                        className="w-full h-full object-cover group-hover:scale-110 transition"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        {language === "ur" ? "تصویر نہیں" : "No Image"}
                      </div>
                    )}

                    {book.detailsImage && (
                      <button
                        onClick={() => setPreviewImage(book.detailsImage)}
                        className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white"
                      >
                        <FaRegEye className="mr-2" />
                        {language === "ur" ? "صفحہ دیکھیں" : "Preview"}
                      </button>
                    )}
                  </div>
                </div>

                {/* ---------------- CONTENT ---------------- */}

                <div className="p-2">
                  <h3 className="font-bold text-emerald-900 line-clamp-1 mb-2 text-center">
                    {language === "ur" ? book.titleUrdu : book.titleEnglish}
                  </h3>

                  {/* <p className="text-sm text-gray-500 line-clamp-1">
                    {language === "ur" ? book.titleEnglish : book.titleUrdu}
                  </p> */}

                  {/* <div className="flex items-center text-xs text-emerald-600 mt-2 mb-3">
                    <FaCalendar className="mr-1" />
                    {formatDate(book.uploadDate)}
                  </div> */}

                  {/* ---------------- READ BUTTON ---------------- */}

                  <button
                    onClick={() => handleReadBook(book.pdfUrl)}
                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white py-2 rounded-lg font-semibold transition shadow-md"
                  >
                    {language === "ur" ? "کتاب پڑھیں" : "Read Book"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---------------- IMAGE MODAL ---------------- */}

      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
          >
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 bg-black text-white w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            <div className="overflow-auto max-h-[90vh]">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}

      {/* ---------------- ADVANCED PDF INLINE READER ---------------- */}

      {pdfPreview && (
        <div
          onClick={() => setPdfPreview(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3"
        >
          <div
            id="pdf-reader-container"
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-xl w-full max-w-6xl h-[90vh] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* ---------- TOP BAR ---------- */}

            <div className="bg-emerald-700 text-white px-4 py-2 flex justify-between items-center">
              <span className="text-sm font-semibold">
                {language === "ur" ? "کتاب مطالعہ" : "Reading Book"}
              </span>

              <div className="flex items-center gap-2">
                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="bg-black/30 hover:bg-black/50 px-3 py-1 rounded-md text-xs"
                >
                  {isFullscreen
                    ? language === "ur"
                      ? "بند کریں"
                      : "Exit Fullscreen"
                    : language === "ur"
                      ? "فل اسکرین"
                      : "Fullscreen"}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    setPdfPreview(null);
                    setReadingProgress(0);
                  }}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-xs"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            {/* ---------- PROGRESS BAR ---------- */}

            <div className="h-1 bg-gray-200 w-full">
              <div
                className="h-1 bg-emerald-600 transition-all duration-200"
                style={{ width: `${readingProgress}%` }}
              />
            </div>

            {/* ---------- PDF SCROLL CONTAINER ---------- */}

            <div
              onScroll={handlePdfScroll}
              className="flex-1 overflow-auto bg-gray-100"
            >
              <iframe
                src={`${pdfPreview}#toolbar=0`}
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksPageClient;
