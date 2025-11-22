"use client";
import React, { useState, useEffect } from "react";
import {
  FaUniversity,
  FaGraduationCap,
  FaBook,
  FaUsers,
  FaSpinner,
  FaAward,
  FaClock,
  FaGlobe,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const JamiaMuhajjabpurPage = () => {
  const { language } = useLanguage();
  const [jamiaData, setJamiaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJamiaData();
  }, []);

  const fetchJamiaData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/jamia");
      const result = await response.json();

      if (result.success) {
        setJamiaData(result.data);
      } else {
        setError("Failed to fetch jamia data");
      }
    } catch (err) {
      setError("Error fetching jamia data");
      console.error("Error fetching jamia data:", err);
    } finally {
      setLoading(false);
    }
  };

  const academicPrograms = [
    {
      icon: FaBook,
      title: language === "ur" ? "حفظ قرآن" : "Quran Memorization",
      description:
        language === "ur"
          ? "قرآن کریم کے حفظ کا خصوصی پروگرام"
          : "Special program for Quran memorization",
    },
    {
      icon: FaGraduationCap,
      title: language === "ur" ? "عالمیت کورس" : "Alimiyat Course",
      description:
        language === "ur"
          ? "آٹھ سالہ عالمیت کا مکمل کورس"
          : "Complete eight-year Alimiyat course",
    },
    {
      icon: FaUniversity,
      title: language === "ur" ? "تخصص فی الفقہ" : "Specialization in Fiqh",
      description:
        language === "ur"
          ? "فقہ اسلامی میں تخصص کا پروگرام"
          : "Specialization program in Islamic jurisprudence",
    },
    {
      icon: FaAward,
      title: language === "ur" ? "دورہ حدیث" : "Daura-e-Hadith",
      description:
        language === "ur"
          ? "حدیث نبوی کی اعلیٰ تعلیم"
          : "Advanced studies in Prophetic traditions",
    },
  ];

  const facilities = [
    {
      icon: FaUsers,
      title: language === "ur" ? "ہاسٹل" : "Hostel",
      description:
        language === "ur"
          ? "طلباء کے لیے آرام دہ رہائشی سہولیات"
          : "Comfortable residential facilities for students",
    },
    {
      icon: FaBook,
      title: language === "ur" ? "لائبریری" : "Library",
      description:
        language === "ur"
          ? "اسلامی علوم کی وسیع لائبریری"
          : "Extensive library of Islamic sciences",
    },
    {
      icon: FaGlobe,
      title: language === "ur" ? "کمپیوٹر لیب" : "Computer Lab",
      description:
        language === "ur"
          ? "جدید کمپیوٹر لیبارٹری"
          : "Modern computer laboratory",
    },
    {
      icon: FaAward,
      title: language === "ur" ? "کھیل کے میدان" : "Sports Ground",
      description:
        language === "ur"
          ? "طلباء کے لیے کھیل کی سہولیات"
          : "Sports facilities for students",
    },
  ];

  // Enhanced Lexical JSON to HTML converter function
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
            h1: "text-5xl font-bold mt-12 mb-6 text-gray-900 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent",
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
              ? '<div class="absolute -bottom-2 left-0 w-20 h-1 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>'
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
          return `<li class="text-lg leading-relaxed hover:text-emerald-600 transition-colors duration-200">${
            node.children?.map(renderNode).join("") || ""
          }</li>`;
        }

        // Handle quote nodes
        if (node.type === "quote") {
          return `<blockquote class="mb-8 pl-6 py-4 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-lg italic text-xl text-gray-700 font-medium">${
            node.children?.map(renderNode).join("") || ""
          }</blockquote>`;
        }

        // Handle link nodes
        if (node.type === "link") {
          const href = node.url || "#";
          return `<a href="${href}" class="text-emerald-600 hover:text-emerald-800 underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium" target="_blank" rel="noopener noreferrer">${
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
            <FaUniversity className="h-10 w-10 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ur" ? "جامعه مھذب پور" : "Jamia Muhajjabpur"}
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "اسلامی علوم و فنون کا عظیم مرکز جہاں علم و عمل کی روشنی پھیلتی ہے"
              : "The great center of Islamic sciences and arts where the light of knowledge and practice spreads"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchJamiaData}
              className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              {language === "ur" ? "دوبارہ کوشش کریں" : "Try Again"}
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Enhanced Content Section */}
            <div className="">
              <div className="container mx-auto px-6 py-8">
                {/* Content Card */}
                <div className="max-w-5xl mx-auto">
                  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    <div className="p-8 md:p-12 lg:p-16">
                      {language === "ur" ? (
                        <div
                          //   className="prose prose-lg max-w-none text-right"
                          //   dir="rtl"
                          style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
                          dangerouslySetInnerHTML={{
                            __html:
                              lexicalJsonToHtml(jamiaData?.content?.urdu) ||
                              `<h2>جامعہ محجب پور کے بارے میں</h2>
                              <p>جامعہ محجب پور ایک عظیم اسلامی تعلیمی ادارہ ہے جس کی بنیاد ۱۹۸۵ میں رکھی گئی۔ یہ ادارہ اسلامی علوم و فنون کی تعلیم و تربیت کا مرکز ہے جہاں طلباء کو قرآن، حدیث، فقہ، تفسیر اور دیگر اسلامی علوم کی اعلیٰ تعلیم دی جاتی ہے۔</p>
                              <p>جامعہ کا مقصد ایسے علما تیار کرنا ہے جو دین کی صحیح تعلیمات کو عام کر سکیں اور معاشرے کی روحانی و اخلاقی اصلاح کر سکیں۔ یہاں نہ صرف علمی بلکہ اخلاقی و روحانی تربیت پر بھی خصوصی توجہ دی جاتی ہے۔</p>
                              <h3>جامعہ کے اہم مقاصد</h3>
                              <ul>
                                <li>قرآن و سنت کی تعلیمات کو عام کرنا</li>
                                <li>مستقبل کے علما و داعیان کو تیار کرنا</li>
                                <li>معاشرے کی اخلاقی و روحانی اصلاح</li>
                                <li>اسلامی علوم کو جدید تقاضوں کے مطابق پیش کرنا</li>
                              </ul>`,
                          }}
                        />
                      ) : (
                        <div
                          className="prose prose-lg max-w-none"
                          dangerouslySetInnerHTML={{
                            __html:
                              lexicalJsonToHtml(jamiaData?.content?.english) ||
                              `<h2>About Jamia Muhajjabpur</h2>
                              <p>Jamia Muhajjabpur is a great Islamic educational institution founded in 1985. This institution is a center for education and training in Islamic sciences and arts where students receive advanced education in Quran, Hadith, Fiqh, Tafseer, and other Islamic sciences.</p>
                              <p>The aim of Jamia is to produce scholars who can spread the correct teachings of religion and bring about spiritual and moral reformation in society. Here, special attention is given not only to academic but also to moral and spiritual training.</p>
                              <h3>Key Objectives of Jamia</h3>
                              <ul>
                                <li>To spread the teachings of Quran and Sunnah</li>
                                <li>To prepare future scholars and preachers</li>
                                <li>Moral and spiritual reformation of society</li>
                                <li>Presenting Islamic sciences according to modern requirements</li>
                              </ul>`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Academic Programs Grid */}
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">
                {language === "ur" ? "تعلیمی پروگرام" : "Academic Programs"}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {academicPrograms.map((program, index) => {
                  const IconComponent = program.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105 text-center"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-emerald-900 mb-2">
                        {program.title}
                      </h3>
                      <p className="text-emerald-700 text-sm">
                        {program.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Facilities & Statistics Grid */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Facilities */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaUniversity className="h-6 w-6 text-amber-300 mr-3" />
                  {language === "ur" ? "سہولیات" : "Facilities"}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {facilities.map((facility, index) => {
                    const IconComponent = facility.icon;
                    return (
                      <div
                        key={index}
                        className="bg-emerald-500/30 rounded-xl p-4 text-center"
                      >
                        <IconComponent className="h-8 w-8 text-amber-300 mx-auto mb-2" />
                        <h4 className="font-bold text-white text-sm">
                          {facility.title}
                        </h4>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaAward className="h-6 w-6 text-white mr-3" />
                  {language === "ur"
                    ? "جامعہ کے اعداد و شمار"
                    : "Jamia Statistics"}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      500+
                    </div>
                    <div className="text-amber-100 text-sm">
                      {language === "ur" ? "طلباء" : "Students"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      25+
                    </div>
                    <div className="text-amber-100 text-sm">
                      {language === "ur" ? "اساتذہ" : "Teachers"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      1000+
                    </div>
                    <div className="text-amber-100 text-sm">
                      {language === "ur" ? "فارغ التحصیل" : "Graduates"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      35+
                    </div>
                    <div className="text-amber-100 text-sm">
                      {language === "ur" ? "سالوں سے" : "Years"}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center mb-6">
                  <FaGraduationCap className="h-8 w-8 text-amber-300 mr-3" />
                  <h3 className="text-2xl font-bold">
                    {language === "ur" ? "ہمارا مشن" : "Our Mission"}
                  </h3>
                </div>
                <p className="text-emerald-100 leading-relaxed text-lg">
                  {language === "ur"
                    ? "قرآن و سنت کی اصل تعلیمات کو عام کرنا اور ایسے علما تیار کرنا جو دین کی صحیح تصویر پیش کر سکیں۔ ہمارا مقصد طلباء میں علمی صلاحیتوں کے ساتھ ساتھ اخلاقی و روحانی قدروں کو بھی پروان چڑھانا ہے۔"
                    : "To spread the authentic teachings of Quran and Sunnah and produce scholars who can present the correct picture of religion. Our aim is to develop both academic capabilities and moral-spiritual values in students."}
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center mb-6">
                  <FaGlobe className="h-8 w-8 text-white mr-3" />
                  <h3 className="text-2xl font-bold">
                    {language === "ur" ? "ہمارا ویژن" : "Our Vision"}
                  </h3>
                </div>
                <p className="text-amber-100 leading-relaxed text-lg">
                  {language === "ur"
                    ? "ایسے تعلیمی ادارے کا قیام جو اسلامی علوم کے ساتھ ساتھ جدید علوم سے بھی آراستہ ہو۔ ہم ایک ایسی نسل تیار کرنا چاہتے ہیں جو دین و دنیا دونوں میں کامیاب ہو۔"
                    : "To establish an educational institution that is adorned with both Islamic sciences and modern knowledge. We want to prepare a generation that succeeds in both religion and worldly life."}
                </p>
              </div>
            </div>

            {/* Admission Information */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">
                {language === "ur"
                  ? "داخلہ کی معلومات"
                  : "Admission Information"}
              </h2>
              <p className="text-emerald-100 text-lg mb-6 max-w-2xl mx-auto">
                {language === "ur"
                  ? "جامعہ محجب پور میں داخلے کے لیے درخواستیں موصول ہو رہی ہیں۔ ہر سال مارچ کے مہینے میں نئے طلباء کے داخلے کا پروگرام ہوتا ہے۔"
                  : "Applications are being received for admission to Jamia Muhajjabpur. The admission program for new students takes place every year in the month of March."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                  {language === "ur" ? "داخلہ فارم" : "Admission Form"}
                </button>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                  {language === "ur" ? "مزید معلومات" : "More Information"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JamiaMuhajjabpurPage;
