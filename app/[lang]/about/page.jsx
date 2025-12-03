// app/[lang]/about/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaHistory,
  FaHeart,
  FaAward,
  FaGlobe,
  FaSpinner,
  FaBook,
  FaGraduationCap,
} from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { useLanguage } from "../../../context/LanguageContext";

const AboutPage = () => {
  const { language } = useLanguage();
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/about");
      const result = await response.json();

      if (result.success) {
        setAboutData(result.data);
      } else {
        setError("Failed to fetch about data");
      }
    } catch (err) {
      setError("Error fetching about data");
      console.error("Error fetching about data:", err);
    } finally {
      setLoading(false);
    }
  };

  const achievements = [
    {
      icon: FaBook,
      title: language === "ur" ? "50+ کتابیں تصنیف" : "50+ Books Authored",
      description:
        language === "ur"
          ? "اسلامی علوم میں متعدد کتابوں کی تصنیف"
          : "Authored numerous books on Islamic sciences",
    },
    {
      icon: FaGraduationCap,
      title: language === "ur" ? "30+ سال تجربہ" : "30+ Years Experience",
      description:
        language === "ur"
          ? "اسلامی تعلیم میں تین دہائیوں کا تجربہ"
          : "Three decades of experience in Islamic education",
    },
    {
      icon: FaGlobe,
      title: language === "ur" ? "عالمی سطح پر خدمات" : "Global Services",
      description:
        language === "ur"
          ? "دنیا بھر میں اسلامی علم کی تبلیغ"
          : "Propagation of Islamic knowledge worldwide",
    },
    {
      icon: FaAward,
      title: language === "ur" ? "متعدد اعزازات" : "Multiple Awards",
      description:
        language === "ur"
          ? "اسلامی خدمات کے لیے مختلف اعزازات"
          : "Various honors for Islamic services",
    },
  ];

  const qualifications = [
    language === "ur"
      ? "دارالعلوم دیوبند سے فراغت"
      : "Graduate from Darul Uloom Deoband",
    language === "ur"
      ? "تفسیر و حدیث میں تخصص"
      : "Specialization in Tafseer and Hadith",
    language === "ur" ? "عربی ادب میں ماہر" : "Expert in Arabic Literature",
    language === "ur"
      ? "اسلامی فقہ کے عالم"
      : "Scholar of Islamic Jurisprudence",
    language === "ur"
      ? "کئی زبانوں پر عبور"
      : "Proficient in Multiple Languages",
    language === "ur"
      ? "تصنیف و تالیف کا وسیع تجربہ"
      : "Extensive experience in writing and compilation",
  ];

  // Enhanced Lexical JSON to HTML converter function
  // Put this function in app/[lang]/about/page.jsx (replace existing lexicalJsonToHtml)

  function lexicalJsonToHtml(jsonString) {
    if (!jsonString) return "";
    // If caller passed already-parsed object, accept it
    let state;
    try {
      state =
        typeof jsonString === "string" ? JSON.parse(jsonString) : jsonString;
    } catch (error) {
      console.error("lexicalJsonToHtml: invalid JSON", error);
      return "";
    }

    // helper: escape text to avoid XSS
    function escapeHtml(unsafe = "") {
      return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }
    // helper: return tailwind alignment class for block format string
    function getAlignmentClass(format) {
      if (!format) return "";
      if (format === "center") return "text-center";
      if (format === "right") return "text-right";
      if (format === "justify") return "text-justify";
      if (format === "left") return "text-left";
      return "";
    }
    // helper: sanitize style string and keep only allowed declarations (currently only font-size)
    function sanitizeStyle(styleString = "") {
      if (!styleString || typeof styleString !== "string") return "";
      // split declarations, keep only font-size declarations
      const parts = styleString
        .split(";")
        .map((s) => s.trim())
        .filter(Boolean);
      const kept = parts.filter((decl) => {
        // allow only font-size (px, em, rem, %). adjust if you want more.
        return /^font-size\s*:\s*[\d.]+(px|em|rem|%)$/i.test(decl);
      });
      return kept.join("; ");
    }
    // render functions for node types
    function renderNode(node) {
      if (!node || typeof node !== "object") return "";

      // ---------- Paragraph ----------
      if (node.type === "paragraph") {
        const alignClass = getAlignmentClass(node.format);
        const baseClasses = "mb-6 text-gray-700 leading-relaxed text-lg";
        const classes = alignClass
          ? `${baseClasses} ${alignClass}`
          : baseClasses;
        const inner = (node.children || []).map(renderNode).join("");
        return `<p class="${classes}">${inner}</p>`;
      }

      // ---------- Heading ----------
      if (node.type === "heading") {
        const level = node.tag || "h2";
        const validTags = ["h1", "h2", "h3", "h4", "h5", "h6"];
        const headingTag = validTags.includes(level) ? level : "h2";

        const tailwindClasses = {
          h1: "text-5xl font-bold mt-12 mb-6 text-emerald-800 ",
          h2: "text-4xl font-bold mt-10 mb-5 text-emerald-800",
          h3: "text-3xl font-bold mt-8 mb-4 text-emerald-800 ",
          h4: "text-2xl font-bold mt-6 mb-3 text-emerald-800 ",
          h5: "text-xl font-bold mt-4 mb-2 text-emerald-800 ",
          h6: "text-lg font-bold mt-3 mb-2 text-emerald-800 ",
        };

        const alignClass = getAlignmentClass(node.format);
        const baseClasses = tailwindClasses[headingTag] || tailwindClasses.h2;
        const classes = alignClass
          ? `${baseClasses} ${alignClass}`
          : baseClasses;

        const inner = (node.children || []).map(renderNode).join("");
        return `<${headingTag} class="${classes}">${inner}</${headingTag}>`;
      }

      // ---------- List ----------
      if (node.type === "list") {
        // node.tag might be "ol" or "ul" in some serialization or node.listType — fallback
        const listTag =
          node.tag === "ol" || node.tag === "number" ? "ol" : "ul";
        const listClasses =
          listTag === "ol"
            ? "mb-6 pl-8 space-y-2 list-decimal text-gray-700"
            : "mb-6 pl-8 space-y-2 list-disc text-gray-700";
        const inner = (node.children || []).map(renderNode).join("");
        return `<${listTag} class="${listClasses}">${inner}</${listTag}>`;
      }

      // ---------- List Item ----------
      if (node.type === "listitem") {
        const inner = (node.children || []).map(renderNode).join("");
        return `<li class="text-lg leading-relaxed hover:text-emerald-600 transition-colors duration-200">${inner}</li>`;
      }

      // ---------- Quote ----------
      if (node.type === "quote") {
        const inner = (node.children || []).map(renderNode).join("");
        return `<blockquote class="mb-8 pl-6 py-4 border-l-4 border-emerald-500 bg-emerald-50 rounded-r-lg italic text-xl text-gray-700 font-medium">${inner}</blockquote>`;
      }

      // ---------- Link ----------
      if (node.type === "link" || node.type === "link-node") {
        const href = node.url || node.href || "#";
        const inner = (node.children || []).map(renderNode).join("");
        return `<a href="${escapeHtml(
          href
        )}" class="text-emerald-600 hover:text-emerald-800 underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium" target="_blank" rel="noopener noreferrer">${inner}</a>`;
      }

      // ---------- Text Node ----------
      if (node.type === "text") {
        let text = node.text || "";

        // formatting bitmask (common Lexical format)
        // 1 -> bold, 2 -> italic, 4 -> underline, 8 -> strikethrough
        const applyFormatting = (innerText) => {
          let out = innerText;
          if (node.format) {
            // Important: keep order so nested tags render correctly
            if (node.format & 1)
              out = `<strong class="font-bold text-gray-900">${out}</strong>`;
            if (node.format & 2) out = `<em class="italic">${out}</em>`;
            if (node.format & 4)
              out = `<u class="underline decoration-2">${out}</u>`;
            if (node.format & 8)
              out = `<s class="line-through opacity-75">${out}</s>`;
          }
          return out;
        };

        // Escape raw text first
        const escaped = escapeHtml(text);

        // If there's an inline style stored (e.g. "font-size:18px;"), sanitize and keep only allowed props
        const rawStyle = node.style || node.getStyle || "";
        const styleStr = typeof rawStyle === "string" ? rawStyle : "";

        const allowedStyle = sanitizeStyle(styleStr); // e.g. "font-size:18px"
        if (allowedStyle) {
          const innerFormatted = applyFormatting(escaped);
          // Inline style attribute (ensure the semicolon at end)
          const styleAttr = allowedStyle.trim().endsWith(";")
            ? allowedStyle
            : allowedStyle + ";";
          return `<span style="${escapeHtml(
            styleAttr
          )}">${innerFormatted}</span>`;
        } else {
          // No allowed inline style, just return formatted text
          return applyFormatting(escaped);
        }
      }

      // ---------- Fallback: if node has children, render them ----------
      if (node.children && Array.isArray(node.children)) {
        return node.children.map(renderNode).join("");
      }

      return "";
    } // end renderNode

    // Build final HTML
    try {
      if (state.root && Array.isArray(state.root.children)) {
        return state.root.children.map(renderNode).join("");
      }
      return "";
    } catch (err) {
      console.error("lexicalJsonToHtml: error rendering", err);
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
            <FaUser className="h-10 w-10 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ur" ? "تعارف" : "About"}
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "مفتی حبیب اللہ قاسمی کی زندگی، خدمات اور کارناموں کے بارے میں مکمل معلومات"
              : "Complete information about Mufti Habibullah Qasmi's life, services, and achievements"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchAboutData}
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
                              lexicalJsonToHtml(aboutData?.content?.urdu) ||
                              `<h2>مفتی حبیب اللہ قاسمی کے بارے میں</h2>
                              <p>مفتی حبیب اللہ قاسمی ایک ممتاز عالم دین، محقق، اور روحانی مربی ہیں جنہوں نے اپنی زندگی اسلامی علوم کی تعلیم اور تبلیغ کے لیے وقف کی ہے۔ آپ نے دارالعلوم دیوبند سے فراغت حاصل کی اور تین دہائیوں سے زائد عرصے سے اسلامی تعلیم و تبلیغ کے میدان میں خدمات انجام دے رہے ہیں۔</p>
                              <p>آپ کی تصنیفات اور تعلیمات نے دنیا بھر کے مسلمانوں کو متاثر کیا ہے۔ آپ کا مقصد یہ ہے کہ ہر مسلمان تک صحیح اسلامی علم پہنچے اور وہ اپنی زندگی کو اسلامی تعلیمات کے مطابق گزار سکے۔</p>
                              <p>مفتی صاحب نے متعدد کتابیں تصنیف کی ہیں جو اسلامی علوم کے مختلف شعبوں پر محیط ہیں۔ آپ کے فتاویٰ اور علمی کاموں کو عالمی سطح پر سراہا گیا ہے۔</p>
                              <h3>تعلیمی خدمات</h3>
                              <ul>
                                <li>دارالعلوم دیوبند سے فراغت</li>
                                <li>تفسیر و حدیث میں تخصص</li>
                                <li>عربی ادب میں ماہر</li>
                                <li>اسلامی فقہ کے عالم</li>
                              </ul>`,
                          }}
                        />
                      ) : (
                        <div
                          className="prose prose-lg max-w-none"
                          dangerouslySetInnerHTML={{
                            __html:
                              lexicalJsonToHtml(aboutData?.content?.english) ||
                              `<h2>About Mufti Habibullah Qasmi</h2>
                              <p>Mufti Habibullah Qasmi is a renowned Islamic scholar, researcher, and spiritual mentor who has dedicated his life to teaching and propagating Islamic knowledge. He graduated from Darul Uloom Deoband and has been serving in the field of Islamic education and propagation for over three decades.</p>
                              <p>His writings and teachings have influenced Muslims around the world. His goal is to ensure that correct Islamic knowledge reaches every Muslim so they can live their lives according to Islamic teachings.</p>
                              <p>Mufti Sahib has authored numerous books covering various fields of Islamic sciences. His fatwas and scholarly works have been appreciated globally.</p>
                              <h3>Educational Services</h3>
                              <ul>
                                <li>Graduate from Darul Uloom Deoband</li>
                                <li>Specialization in Tafseer and Hadith</li>
                                <li>Expert in Arabic Literature</li>
                                <li>Scholar of Islamic Jurisprudence</li>
                              </ul>`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualifications & Message Grid */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Qualifications */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaGraduationCap className="h-6 w-6 text-amber-300 mr-3" />
                  {language === "ur"
                    ? "تعلیمی اہلیت"
                    : "Educational Qualifications"}
                </h3>
                <ul className="space-y-3">
                  {qualifications.map((qualification, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-emerald-100">{qualification}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Message */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <FaHeart className="h-6 w-6 text-white mr-3" />
                  {language === "ur" ? "پیغام" : "Message"}
                </h3>
                <blockquote className="text-amber-100 italic text-lg leading-relaxed">
                  {language === "ur"
                    ? '"علم حاصل کرنا ہر مسلمان مرد اور عورت پر فرض ہے۔ میری دعا ہے کہ ہم سب مل کر اسلامی تعلیمات کو آگے بڑھائیں اور امت مسلمہ کو علم کی روشنی سے منور کریں۔"'
                    : '"Seeking knowledge is obligatory upon every Muslim man and woman. My prayer is that we all work together to advance Islamic teachings and illuminate the Muslim Ummah with the light of knowledge."'}
                </blockquote>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center mb-6">
                  <FiTarget className="h-8 w-8 text-amber-300 mr-3" />
                  <h3 className="text-2xl font-bold">
                    {language === "ur" ? "ہمارا مشن" : "Our Mission"}
                  </h3>
                </div>
                <p className="text-emerald-100 leading-relaxed text-lg">
                  {language === "ur"
                    ? "قرآن و سنت کی اصل تعلیمات کو عام کرنا اور امت مسلمہ کو صحیح اسلامی علم سے روشناس کرانا۔ ہر مسلمان تک اسلامی علم کی رسائی کو آسان بنانا، چاہے وہ کہیں بھی ہو اور اس کے اقتصادی حالات کیسے بھی ہوں۔ مستند اسلامی علم کو جدید ذرائع کے ذریعے ہر گھر تک پہنچانا۔"
                    : "To spread the authentic teachings of Quran and Sunnah and familiarize the Muslim Ummah with correct Islamic knowledge. To make Islamic knowledge accessible to every Muslim, regardless of their geographical location or economic circumstances. To deliver authentic Islamic knowledge to every home through modern means."}
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center mb-6">
                  <FaHeart className="h-8 w-8 text-white mr-3" />
                  <h3 className="text-2xl font-bold">
                    {language === "ur" ? "ہمارا ویژن" : "Our Vision"}
                  </h3>
                </div>
                <p className="text-amber-100 leading-relaxed text-lg">
                  {language === "ur"
                    ? "ایسی عالمی برادری تشکیل دینا جو اسلامی علم سے آراستہ ہو اور اسلامی اقدار پر عمل پیرا ہو۔ ہر گھر کو علم کی روشنی سے منور کرنا۔ ایسا معاشرہ تعمیر کرنا جہاں ہر فرد اسلامی تعلیمات کے مطابق زندگی گزار سکے۔"
                    : "To build a global community that is adorned with Islamic knowledge and practices Islamic values. To illuminate every home with the light of knowledge. To build a society where every individual can live according to Islamic teachings."}
                </p>
              </div>
            </div>

            {/* Achievements Grid */}
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">
                {language === "ur"
                  ? "کارنامے اور خدمات"
                  : "Achievements & Services"}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105 text-center"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-emerald-900 mb-2">
                        {achievement.title}
                      </h3>
                      <p className="text-emerald-700 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">
                {language === "ur"
                  ? "علم کا سفر جاری رکھیں"
                  : "Continue Your Journey of Knowledge"}
              </h2>
              <p className="text-emerald-100 text-lg mb-6 max-w-2xl mx-auto">
                {language === "ur"
                  ? "مفتی صاحب کی کتابیں پڑھیں، لیکچرز سنیں اور اسلامی علم سے اپنی زندگی کو روشن کریں۔"
                  : "Read Mufti Sahib's books, listen to his lectures, and illuminate your life with Islamic knowledge."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                  {language === "ur" ? "کتابیں دیکھیں" : "View Books"}
                </button>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                  {language === "ur" ? "لیکچرز سنیں" : "Listen Lectures"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutPage;
