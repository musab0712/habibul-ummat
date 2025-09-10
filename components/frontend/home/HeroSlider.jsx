// pages/index.js (Debugged version with multiple fallbacks)
"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

export default function HeroSlider() {
  const [sliderImages, setSliderImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    // Fetch slider images from API
    const fetchSliderImages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/slides");
        const data = await response.json();
        if (data.success) {
          setSliderImages(data.data);
        } else {
          // Fallback data with working images
          setSliderImages([
            {
              _id: "1",
              imageUrl: "/api/placeholder/1200/800", // Use placeholder service
              title: "Welcome to our website",
              subtitle: "Discover amazing features and services",
              ctaText: "Get Started",
              ctaLink: "/services",
            },
            {
              _id: "2",
              imageUrl: "/api/placeholder/1200/800", // Use placeholder service
              title: "Summer Collection",
              subtitle: "Check out our new summer arrivals",
              ctaText: "Shop Now",
              ctaLink: "/shop",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
        // Fallback with simple colored backgrounds
        setSliderImages([
          {
            _id: "1",
            imageUrl:
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjNDI5OEY2Ii8+Cjx0ZXh0IHg9IjYwMCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2xpZGUgMTwvdGV4dD4KPHN2Zz4=",
            title: "Welcome to our website",
            subtitle: "Discover amazing features and services",
            ctaText: "Get Started",
            ctaLink: "/services",
          },
          {
            _id: "2",
            imageUrl:
              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI4MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDgwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iODAwIiBmaWxsPSIjMTA5OTY4Ii8+Cjx0ZXh0IHg9IjYwMCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iNDgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U2xpZGUgMjwvdGV4dD4KPHN2Zz4=",
            title: "Summer Collection",
            subtitle: "Check out our new summer arrivals",
            ctaText: "Shop Now",
            ctaLink: "/shop",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSliderImages();
  }, []);

  const handleImageError = (slideId) => {
    console.log(`Image failed to load for slide: ${slideId}`);
    setImageErrors((prev) => ({ ...prev, [slideId]: true }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading slider...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Debug info */}
      <div className="fixed top-0 left-0 z-50 bg-black text-white p-2 text-xs">
        Slides loaded: {sliderImages.length} | Errors:{" "}
        {Object.keys(imageErrors).length}
      </div>

      {/* Hero Slider Section */}
      <section className="relative h-screen">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="h-full w-full"
          onSwiper={(swiper) => console.log("Swiper initialized:", swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {sliderImages.map((slide, index) => (
            <SwiperSlide key={slide._id}>
              <div className="relative h-full w-full overflow-hidden">
                {/* Background color fallback */}
                <div
                  className={`absolute inset-0 ${
                    index % 2 === 0 ? "bg-blue-500" : "bg-green-500"
                  }`}
                ></div>

                {/* Try multiple image loading approaches */}
                {!imageErrors[slide._id] ? (
                  // Method 1: Next.js Image (preferred)
                  <div className="absolute inset-0">
                    <Image
                      src={slide.imageUrl}
                      alt={slide.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="100vw"
                      onError={() => handleImageError(slide._id)}
                      onLoad={() => console.log(`Image loaded: ${slide._id}`)}
                    />
                  </div>
                ) : (
                  // Method 2: Fallback with regular img
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      console.log(
                        "Fallback img also failed, using background color"
                      );
                      e.target.style.display = "none";
                    }}
                    onLoad={() =>
                      console.log(`Fallback image loaded: ${slide._id}`)
                    }
                  />
                )}

                {/* Dark overlay for better text visibility */}
                {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div> */}

                {/* Text content */}
                {/* <div className="absolute inset-0 flex items-center justify-center z-20 p-4">
                  <div className="text-white text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl lg:text-3xl mb-8 drop-shadow-md">
                      {slide.subtitle}
                    </p>
                    {slide.ctaText && (
                      <a
                        href={slide.ctaLink}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 transform hover:scale-105 shadow-lg"
                      >
                        {slide.ctaText}
                      </a>
                    )}
                  </div>
                </div> */}

                {/* Debug info for each slide */}
                {/* <div className="absolute bottom-4 left-4 z-30 bg-black bg-opacity-50 text-white p-2 text-xs rounded">
                  Slide {index + 1}: {slide._id}
                  <br />
                  Image: {slide.imageUrl.substring(0, 50)}...
                  <br />
                  Error: {imageErrors[slide._id] ? "Yes" : "No"}
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Other page content */}
      <section className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Welcome to our Website
        </h2>
        <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
          This hero section slider is managed through our admin panel where you
          can easily upload new images, set titles, subtitles, and
          call-to-action buttons for each slide.
        </p>

        {/* Debug section */}
        <div className="mt-12 p-4 bg-gray-100 rounded">
          <h3 className="font-bold mb-4">Debug Information:</h3>
          <pre className="text-xs bg-white p-2 rounded overflow-auto">
            {JSON.stringify(
              {
                slidesCount: sliderImages.length,
                imageErrors,
                firstSlideUrl: sliderImages[0]?.imageUrl,
              },
              null,
              2
            )}
          </pre>
        </div>
      </section>
    </div>
  );
}
