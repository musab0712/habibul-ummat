//app/maktaba/page.jsx
"use client";

import { useState, useEffect } from "react";
import { FiDownload, FiEye, FiBookOpen } from "react-icons/fi";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setBooks(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const openPreview = (book) => {
    setSelectedBook(book);
    setShowPreview(true);
  };

  const downloadBook = (book) => {
    const link = document.createElement("a");
    link.href = book.pdfUrl;
    link.download = `${book.titleEnglish}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading books...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-10"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full opacity-10 animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Our Library
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Explore our collection of valuable resources and books. Download or
            read online.
          </p>
          <div className="flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 animate-bounce">
              <FiBookOpen className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="container mx-auto px-6 py-16">
        {books.length === 0 ? (
          <div className="text-center py-12">
            <FiBookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No Books Available
            </h2>
            <p className="text-gray-500">
              Check back later for new additions to our library.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Book Collection
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Browse through our carefully curated collection of books. Click
                on any book to read online or download.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {books.map((book) => (
                <div
                  key={book._id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    {book.coverImage ? (
                      <img
                        src={book.coverImage}
                        alt={book.titleEnglish}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                        <FiBookOpen className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {book.titleEnglish}
                    </h3>
                    <p
                      className="text-sm text-gray-600 mb-4 text-right"
                      dir="rtl"
                    >
                      {book.titleUrdu}
                    </p>

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => openPreview(book)}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <FiEye className="mr-1" />
                        Preview
                      </button>
                      <button
                        onClick={() => downloadBook(book)}
                        className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
                      >
                        <FiDownload className="mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl h-full max-h-screen overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedBook.titleEnglish}
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <iframe
                src={`https://docs.google.com/gview?url=${selectedBook.pdfUrl}&embedded=true`}
                className="w-full h-full border-0"
                frameBorder="0"
              ></iframe>
            </div>

            <div className="p-4 border-t flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Click the download button to save a copy
              </span>
              <button
                onClick={() => downloadBook(selectedBook)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <FiDownload className="mr-2" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
