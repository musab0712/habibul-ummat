// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";

// export default function GalleryPage() {
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch("/api/gallery");

//       if (!response.ok) {
//         throw new Error("Failed to fetch images");
//       }

//       const imagesData = await response.json();
//       setImages(imagesData);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const openModal = (image, index) => {
//     setSelectedImage(image);
//     setCurrentIndex(index);
//   };

//   const closeModal = () => {
//     setSelectedImage(null);
//   };

//   const navigateImage = (direction) => {
//     let newIndex;
//     if (direction === "prev") {
//       newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
//     } else {
//       newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
//     }
//     setCurrentIndex(newIndex);
//     setSelectedImage(images[newIndex]);
//   };

//   // Handle keyboard navigation
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (selectedImage) {
//         if (e.key === "Escape") {
//           closeModal();
//         } else if (e.key === "ArrowLeft") {
//           navigateImage("prev");
//         } else if (e.key === "ArrowRight") {
//           navigateImage("next");
//         }
//       }
//     };

//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [selectedImage, currentIndex]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading images...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center">
//           <div className="text-red-500 text-xl mb-4">Error</div>
//           <p className="text-gray-600">{error}</p>
//           <button
//             onClick={fetchImages}
//             className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl font-bold text-gray-900">Image Gallery</h1>
//           <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
//             Browse through our collection of images. Click on any image to view
//             it in full size.
//           </p>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         {images.length === 0 ? (
//           <div className="text-center py-12">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-24 w-24 mx-auto text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={1.5}
//                 d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//               />
//             </svg>
//             <p className="mt-4 text-gray-500 text-xl">
//               No images available yet. Check back soon!
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {images.map((image, index) => (
//               <div
//                 key={image._id}
//                 className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
//                 onClick={() => openModal(image, index)}
//               >
//                 <div className="relative h-60 w-full">
//                   <Image
//                     src={image.imageUrl}
//                     alt={image.title || "Gallery image"}
//                     fill
//                     className="object-cover"
//                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
//                   />
//                 </div>
//                 {(image.title || image.description) && (
//                   <div className="p-4">
//                     {image.title && (
//                       <h3 className="font-medium text-gray-900 truncate">
//                         {image.title}
//                       </h3>
//                     )}
//                     {image.description && (
//                       <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//                         {image.description}
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </main>

//       {/* Image Modal */}
//       {selectedImage && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
//           onClick={closeModal}
//         >
//           <div
//             className="relative max-w-6xl w-full max-h-full"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close button */}
//             <button
//               onClick={closeModal}
//               className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-colors"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             {/* Navigation buttons */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigateImage("prev");
//                   }}
//                   className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-colors"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 19l-7-7 7-7"
//                     />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     navigateImage("next");
//                   }}
//                   className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full p-3 hover:bg-opacity-75 transition-colors"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </button>
//               </>
//             )}

//             {/* Image */}
//             <div className="flex justify-center items-center h-full">
//               <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
//                 <Image
//                   src={selectedImage.imageUrl}
//                   alt={selectedImage.title || "Gallery image"}
//                   fill
//                   className="object-contain"
//                   sizes="100vw"
//                 />
//               </div>
//             </div>

//             {/* Image info */}
//             <div className="bg-white p-4 rounded-b-lg">
//               {selectedImage.title && (
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   {selectedImage.title}
//                 </h2>
//               )}
//               {selectedImage.description && (
//                 <p className="text-gray-600 mt-2">
//                   {selectedImage.description}
//                 </p>
//               )}
//               <div className="mt-4 text-sm text-gray-500">
//                 {currentIndex + 1} of {images.length}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaImages,
  FaSpinner,
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

export default function GalleryPage() {
  const { language } = useLanguage();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/gallery");

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const imagesData = await response.json();
      setImages(imagesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === "prev") {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    }
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === "Escape") {
          closeModal();
        } else if (e.key === "ArrowLeft") {
          navigateImage("prev");
        } else if (e.key === "ArrowRight") {
          navigateImage("next");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, currentIndex]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center py-20">
            <FaSpinner className="h-12 w-12 text-emerald-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchImages}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              {language === "ur" ? "دوبارہ کوشش کریں" : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Enhanced Hero Section */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
            <FaImages className="h-10 w-10 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ur" ? "گیلری" : "Gallery"}
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "مفتی حبیب اللہ قاسمی کی خدمات، تقاریب اور یادگار لمحات کی تصاویر"
              : "Photos of Mufti Habibullah Qasmi's services, events, and memorable moments"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {images.length === 0 ? (
          <div className="text-center bg-white rounded-2xl shadow-xl border-2 border-emerald-100 p-12">
            <div className="w-24 h-24 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <FaImages className="h-12 w-12 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-900 mb-4">
              {language === "ur" ? "ابھی تک کوئی تصاویر نہیں" : "No Images Yet"}
            </h3>
            <p className="text-emerald-700 text-lg max-w-md mx-auto">
              {language === "ur"
                ? "جلد ہی نئی تصاویر اپ لوڈ کی جائیں گی۔ براہ کرم بعد میں چیک کریں۔"
                : "New images will be uploaded soon. Please check back later."}
            </p>
          </div>
        ) : (
          // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          //   {images.map((image, index) => (
          //     <div
          //       key={image._id}
          //       className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-emerald-300 hover:scale-105 cursor-pointer group"
          //       onClick={() => openModal(image, index)}
          //     >
          //       <div className="relative h-60 w-full overflow-hidden">
          //         <Image
          //           src={image.imageUrl}
          //           alt={image.title || "Gallery image"}
          //           fill
          //           className="object-cover group-hover:scale-110 transition-transform duration-300"
          //           sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          //         />
          //         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          //           <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          //             <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
          //               <FaImages className="h-6 w-6 text-emerald-600" />
          //             </div>
          //           </div>
          //         </div>
          //       </div>
          //       {(image.title || image.description) && (
          //         <div className="p-4">
          //           {image.title && (
          //             <h3 className="font-semibold text-emerald-900 truncate">
          //               {image.title}
          //             </h3>
          //           )}
          //           {image.description && (
          //             <p className="text-emerald-700 text-sm mt-1 line-clamp-2">
          //               {image.description}
          //             </p>
          //           )}
          //         </div>
          //       )}
          //     </div>
          //   ))}
          // </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <div
                key={image._id}
                className="bg-white rounded-2xl shadow-lg border-2 border-emerald-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-emerald-300 hover:scale-105 cursor-pointer group "
                onClick={() => openModal(image, index)}
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
        )}
      </div>

      {/* Enhanced Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative max-w-6xl w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full p-3 transition-all duration-300 shadow-lg"
            >
              <FaTimes className="h-6 w-6" />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("prev");
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full p-4 transition-all duration-300 shadow-lg"
                >
                  <FaArrowLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage("next");
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-emerald-600 hover:bg-emerald-700 rounded-full p-4 transition-all duration-300 shadow-lg"
                >
                  <FaArrowRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Image */}
            <div className="flex justify-center items-center h-full">
              <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] bg-black rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title || "Gallery image"}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>

            {/* Image info */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white p-6 rounded-b-2xl mt-4">
              {selectedImage.title && (
                <h2 className="text-xl font-semibold mb-2">
                  {selectedImage.title}
                </h2>
              )}
              {selectedImage.description && (
                <p className="text-emerald-100">{selectedImage.description}</p>
              )}
              <div className="mt-4 text-sm text-emerald-200 flex justify-between items-center">
                <span>
                  {currentIndex + 1} {language === "ur" ? "of" : "of"}{" "}
                  {images.length}
                </span>
                <button
                  onClick={() => {
                    // Download functionality can be added here
                    const link = document.createElement("a");
                    link.href = selectedImage.imageUrl;
                    link.download = selectedImage.title || "image";
                    link.click();
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300"
                >
                  {language === "ur" ? "ڈاؤن لوڈ کریں" : "Download"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
