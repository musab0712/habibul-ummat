"use client";
import React, { useState, useEffect } from "react";
import { FaUniversity, FaSpinner } from "react-icons/fa";
import { useLanguage } from "../../../../context/LanguageContext";

const JamiaDepartmentPage = () => {
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
        const baseClasses = "mb-6 text-gray-700 leading-10 text-lg";
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
          h2: "text-4xl font-bold mt-10 mb-5 text-emerald-800 ",
          h3: "text-3xl font-bold mt-8 mb-4 text-emerald-800 ",
          h4: "text-2xl font-bold mt-6 mb-3 text-emerald-800 ",
          h5: "text-xl font-bold mt-4 mb-2 text-emerald-800 ",
          h6: "text-lg font-bold mt-3 mb-2 text-emerald-800",
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
            <FaUniversity className="h-10 w-10 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ur"
              ? "جامعہ اسلامیہ دار العلوم مہذب پور"
              : "Jamia Islamia Darul Uloom Muhajjabpur"}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default JamiaDepartmentPage;
