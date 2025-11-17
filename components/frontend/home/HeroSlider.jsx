"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/slides");
        const result = await response.json();

        if (result.success) {
          setSlides(result.data);
        } else {
          // Fallback with sample data matching your Slide model
          setSlides([
            {
              _id: "1",
              imageUrl: "/slider-1.png",
              publicId: "slide1",
              createdAt: new Date(),
            },
            {
              _id: "2",
              imageUrl: "/slider-1.png",
              publicId: "slide2",
              createdAt: new Date(),
            },
            {
              _id: "3",
              imageUrl: "/slider-3.png",
              publicId: "slide3",
              createdAt: new Date(),
            },
            {
              _id: "4",
              imageUrl: "/slider-4.jpg",
              publicId: "slide4",
              createdAt: new Date(),
            },
            {
              _id: "5",
              imageUrl: "/slider-5.jpg",
              publicId: "slide5",
              createdAt: new Date(),
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching slides:", error);
        // Minimal fallback matching Slide model structure
        setSlides([
          {
            _id: "fallback1",
            imageUrl: "/images/default-slide.jpg",
            publicId: "default-slide",
            createdAt: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const handleImageError = (slideId) => {
    setImageErrors((prev) => ({ ...prev, [slideId]: true }));
  };

  if (loading) {
    return (
      <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-r from-emerald-100 to-blue-100 animate-pulse flex items-center justify-center">
        <div className="text-emerald-600 font-semibold">Loading slides...</div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="w-full h-64 md:h-80 lg:h-96 bg-gradient-to-r from-emerald-500 to-blue-600 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-2xl font-bold mb-2">No Slides Available</div>
          <p className="text-lg">Please add slides from the admin panel</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <section className="relative">
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
          className="w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide._id}>
              <div className="relative w-full h-[50vh] min-h-[420px] md:h-[70vh] lg:h-[80vh] max-h-[800px] overflow-hidden">
                {/* Background Fallback */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-blue-600"></div>

                {/* Optimized Image */}
                <div className="absolute inset-0">
                  {!imageErrors[slide._id] ? (
                    <Image
                      src={slide.imageUrl}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaUMkO0Lm6EeBzHY8pw6WPMkYjl2mGft1mCsa7gW8NvqoOTL1M1qLc5aRskjckyldkmsST/2Q=="
                      onError={() => handleImageError(slide._id)}
                    />
                  ) : (
                    // Fallback with gradient background
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-blue-700 flex items-center justify-center">
                      <div className="text-center text-white p-4">
                        <div className="text-2xl md:text-3xl font-bold mb-2">
                          Slide {index + 1}
                        </div>
                        <div className="text-lg md:text-xl">
                          Image not available
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Optional: Add overlay if you want to add text later */}
                {/* <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div> */}

                {/* Optional: Add content overlay if you extend the model later */}
                {/* <div className="absolute inset-0 z-20 flex items-center justify-center p-4 md:p-8">
                  <div className="text-white text-center max-w-4xl">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 drop-shadow-lg">
                      Your Title Here
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-4 md:mb-6 lg:mb-8 drop-shadow-md">
                      Your subtitle here
                    </p>
                  </div>
                </div> */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Styles */}
        <style jsx global>{`
          .swiper {
            width: 100%;
            height: 100%;
          }

          .swiper-slide {
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .swiper-slide img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .swiper-pagination-bullet {
            width: 8px;
            height: 8px;
            background: white;
            opacity: 0.5;
            transition: all 0.3s ease;
          }

          .swiper-pagination-bullet-active {
            opacity: 1;
            background: #10b981;
            transform: scale(1.2);
          }

          .swiper-button-next,
          .swiper-button-prev {
            color: white;
            background: rgba(16, 185, 129, 0.8);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            backdrop-filter: blur(10px);
            display: none;
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 18px;
            font-weight: bold;
          }

          @media (min-width: 1024px) {
            .swiper-button-next,
            .swiper-button-prev {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          @media (max-width: 767px) {
            .swiper-pagination {
              bottom: 20px !important;
            }

            .swiper-pagination-bullet {
              width: 6px;
              height: 6px;
            }
          }
        `}</style>
      </section>
    </div>
  );
}
