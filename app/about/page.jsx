// app/about/page.js
"use client";

import { useState, useEffect } from "react";
import {
  FiGlobe,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiUsers,
  FiTarget,
  FiHeart,
  FiAward,
} from "react-icons/fi";

function lexicalJsonToHtml(jsonString) {
  if (!jsonString) return "";
  try {
    const state = JSON.parse(jsonString);

    const renderNode = (node) => {
      // Handle paragraph nodes
      if (node.type === "paragraph") {
        return `<p class="mb-6 text-gray-700 leading-relaxed text-lg">${
          node.children?.map(renderNode).join("") || ""
        }</p>`;
      }

      // Handle heading nodes
      if (node.type === "heading") {
        const level = node.tag || "h2";
        const validTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
        const headingTag = validTags.includes(level) ? level : "h2";

        const tailwindClasses = {
          h1: "text-5xl font-bold mt-12 mb-6 text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent",
          h2: "text-4xl font-bold mt-10 mb-5 text-gray-900 relative",
          h3: "text-3xl font-bold mt-8 mb-4 text-gray-800",
          h4: "text-2xl font-bold mt-6 mb-3 text-gray-800",
          h5: "text-xl font-bold mt-4 mb-2 text-gray-700",
          h6: "text-lg font-bold mt-3 mb-2 text-gray-700",
        };

        const classes = tailwindClasses[headingTag] || tailwindClasses.h2;

        // Add decorative line for h2
        const decoration =
          headingTag === "h2"
            ? '<div class="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>'
            : "";

        return `<${headingTag} class="${classes}">${
          node.children?.map(renderNode).join("") || ""
        }${decoration}</${headingTag}>`;
      }

      // Handle list nodes
      if (node.type === "list") {
        const listTag = node.tag === "ol" ? "ol" : "ul";
        const listClasses =
          listTag === "ol"
            ? "mb-6 pl-8 space-y-2 list-decimal text-gray-700"
            : "mb-6 pl-8 space-y-2 list-disc text-gray-700";

        return `<${listTag} class="${listClasses}">${
          node.children?.map(renderNode).join("") || ""
        }</${listTag}>`;
      }

      // Handle list item nodes
      if (node.type === "listitem") {
        return `<li class="text-lg leading-relaxed hover:text-blue-600 transition-colors duration-200">${
          node.children?.map(renderNode).join("") || ""
        }</li>`;
      }

      // Handle quote nodes
      if (node.type === "quote") {
        return `<blockquote class="mb-8 pl-6 py-4 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg italic text-xl text-gray-700 font-medium">${
          node.children?.map(renderNode).join("") || ""
        }</blockquote>`;
      }

      // Handle link nodes
      if (node.type === "link") {
        const href = node.url || "#";
        return `<a href="${href}" class="text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium" target="_blank" rel="noopener noreferrer">${
          node.children?.map(renderNode).join("") || ""
        }</a>`;
      }

      // Handle text nodes with formatting
      if (node.type === "text") {
        let text = node.text || "";

        if (node.format) {
          if (node.format & 1)
            text = `<strong class="font-bold text-gray-900">${text}</strong>`;
          if (node.format & 2) text = `<em class="italic">${text}</em>`;
          if (node.format & 4)
            text = `<u class="underline decoration-2">${text}</u>`;
          if (node.format & 8)
            text = `<s class="line-through opacity-75">${text}</s>`;
        }

        return text;
      }

      if (node.children && Array.isArray(node.children)) {
        return node.children.map(renderNode).join("");
      }

      return "";
    };

    if (
      state.root &&
      state.root.children &&
      Array.isArray(state.root.children)
    ) {
      return state.root.children.map(renderNode).join("");
    }

    return "";
  } catch (error) {
    console.error("Error parsing Lexical JSON:", error);
    return "";
  }
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [activeLang, setActiveLang] = useState("english");
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch("/api/about");
        if (response.ok) {
          const result = await response.json();
          if (result.success) {
            setAboutData(result.data);
          }
        }
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Parallax Effect */}
      <div className="relative w-full h-screen overflow-hidden">
        {aboutData?.heroImage ? (
          <>
            <img
              src={aboutData.heroImage}
              alt="About Us"
              className={`w-full h-full object-cover transition-all duration-1000 transform ${
                imageLoaded ? "scale-100 opacity-100" : "scale-110 opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 relative">
            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
              <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse delay-300"></div>
              <div className="absolute bottom-20 left-32 w-12 h-12 bg-white rounded-full animate-pulse delay-700"></div>
              <div className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-6 animate-fadeInUp">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                {aboutData?.metaTags?.title || "About Our Company"}
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light leading-relaxed max-w-3xl mx-auto">
              {aboutData?.metaTags?.description ||
                "Discover our story, values, and commitment to excellence"}
            </p>
            <div className="flex justify-center space-x-4">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Language Selector - Floating */}
      <div className="sticky top-4 z-50 flex justify-end px-6 -mt-20 mb-16">
        <div className="inline-flex rounded-full shadow-lg bg-white/90 backdrop-blur-md p-1 border border-white/20">
          <button
            onClick={() => setActiveLang("english")}
            className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
              activeLang === "english"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiGlobe className="inline mr-2" />
            English
          </button>
          <button
            onClick={() => setActiveLang("urdu")}
            className={`px-6 py-3 text-sm font-semibold rounded-full transition-all duration-300 ${
              activeLang === "urdu"
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <FiGlobe className="inline mr-2" />
            اردو
          </button>
        </div>
      </div>

      {/* Content Section with Enhanced Design */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6 py-16">
          {/* Content Card */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-8 md:p-12 lg:p-16">
                {activeLang === "english" ? (
                  <div
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{
                      __html:
                        lexicalJsonToHtml(aboutData?.content?.english) ||
                        `<h2>Welcome to Our Organization</h2>
                <p>We are a dedicated team committed to excellence in everything we do. Our journey began with a simple vision: to create meaningful impact through innovation and dedication.</p>
                <p>Since our founding, we have grown into a trusted partner for businesses and individuals alike, delivering exceptional results that exceed expectations.</p>
                <h3>Our Mission</h3>
                <p>To provide outstanding services while maintaining the highest standards of integrity and professionalism.</p>
                <h3>Our Values</h3>
                <ul>
                  <li>Excellence in everything we do</li>
                  <li>Integrity in all our relationships</li>
                  <li>Innovation to stay ahead of the curve</li>
                  <li>Commitment to our community</li>
                </ul>`,
                    }}
                  />
                ) : (
                  <div
                    className="prose prose-lg max-w-none text-right"
                    dir="rtl"
                    style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
                    dangerouslySetInnerHTML={{
                      __html:
                        lexicalJsonToHtml(aboutData?.content?.urdu) ||
                        `<h2>ہماری تنظیم میں خوش آمدید</h2>
                <p>ہم ایک پرعزم ٹیم ہیں جو ہر کام میں بہترین کارکردگی کے لیے پرعزم ہیں۔ ہمارا مشن بہترین خدمات فراہم کرنا اور اپنے کلائنٹس کے ساتھ پائیدار تعلقات استوار کرنا ہے۔</p>
                <p>اپنی بنیاد کے بعد سے، ہم نے ایک قابل اعتماد شریک کے طور پر ترقی کی ہے، جو کاروبار اور افراد کے لیے بہترین نتائج فراہم کرتے ہیں۔</p>
                <h3>ہمارا مشن</h3>
                <p>اعلیٰ ترین معیار کی دیانتداری اور پیشہ ورانہ صلاحیات کو برقرار رکھتے ہوئے بہترین خدمات فراہم کرنا۔</p>
                <h3>ہمارے اقدار</h3>
                <ul>
                  <li>ہر کام میں بہترین کارکردگی</li>
                  <li>تمام رشتوں میں دیانتداری</li>
                  <li>آگے رہنے کے لیے جدت</li>
                  <li>اپنی کمیونٹی کے لیے عہد</li>
                </ul>`,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 animate-countUp">
                500+
              </div>
              <div className="text-blue-100 font-medium">Happy Clients</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 animate-countUp">15+</div>
              <div className="text-blue-100 font-medium">Years Experience</div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 animate-countUp">
                1000+
              </div>
              <div className="text-blue-100 font-medium">
                Projects Completed
              </div>
            </div>
            <div className="text-white">
              <div className="text-4xl font-bold mb-2 animate-countUp">50+</div>
              <div className="text-blue-100 font-medium">Team Members</div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Contact Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to start your journey with us? We'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiMapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Our Location
              </h3>
              <p className="text-gray-600 leading-relaxed">
                123 Business District
                <br />
                Innovation Plaza
                <br />
                City, Country 12345
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiPhone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Call Us</h3>
              <p className="text-gray-600 leading-relaxed">
                Main: +1 (555) 123-4567
                <br />
                Support: +1 (555) 123-4568
                <br />
                24/7 Available
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiMail className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Email Us</h3>
              <p className="text-gray-600 leading-relaxed">
                info@company.com
                <br />
                support@company.com
                <br />
                careers@company.com
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <FiClock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Business Hours
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Monday - Friday: 9AM - 6PM
                <br />
                Saturday: 10AM - 4PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who trust us with their most
            important projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300">
              Contact Us Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
              View Our Portfolio
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out forwards;
        }

        .animate-countUp {
          animation: countUp 0.8s ease-out forwards;
        }

        .prose h2::after {
          content: "";
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 80px;
          height: 4px;
          background: linear-gradient(to right, #3b82f6, #8b5cf6);
          border-radius: 2px;
        }
      `}</style>
    </>
  );
}
