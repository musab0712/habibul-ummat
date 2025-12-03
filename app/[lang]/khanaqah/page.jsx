"use client";
import React, { useState, useEffect } from "react";
import {
  FaMosque,
  FaPrayingHands,
  FaBook,
  FaUsers,
  FaSpinner,
  FaHeart,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const KahanqahPage = () => {
  const { language } = useLanguage();
  const [kahanqahData, setKahanqahData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchKahanqahData();
  }, []);

  const fetchKahanqahData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/khanaqah");
      const result = await response.json();

      if (result.success) {
        setKahanqahData(result.data);
      } else {
        setError("Failed to fetch kahanqah data");
      }
    } catch (err) {
      setError("Error fetching kahanqah data");
      console.error("Error fetching kahanqah data:", err);
    } finally {
      setLoading(false);
    }
  };

  const spiritualActivities = [
    {
      icon: FaPrayingHands,
      title: language === "ur" ? "ذکر و اذکار" : "Zikr & Remembrance",
      description:
        language === "ur"
          ? "روزانہ ذکر و اذکار کے اجتماعات"
          : "Daily gatherings for remembrance of Allah",
    },
    {
      icon: FaBook,
      title: language === "ur" ? "درس قرآن" : "Quran Teaching",
      description:
        language === "ur"
          ? "قرآن کریم کی تعلیم و تفسیر"
          : "Quran teaching and interpretation",
    },
    {
      icon: FaUsers,
      title: language === "ur" ? "بیعت و اصلاح" : "Spiritual Guidance",
      description:
        language === "ur"
          ? "بیعت اور روحانی اصلاح کے لیے رہنمائی"
          : "Guidance for spiritual pledge and reformation",
    },
    {
      icon: FaHeart,
      title: language === "ur" ? "تصوف کی تعلیم" : "Sufism Education",
      description:
        language === "ur"
          ? "تصوف اور تزکیہ نفس کی تعلیمات"
          : "Teachings of Sufism and soul purification",
    },
  ];

  const dailySchedule = [
    {
      time: language === "ur" ? "فجر" : "Fajr",
      activity: language === "ur" ? "نماز فجر اور ذکر" : "Fajr Prayer & Zikr",
    },
    {
      time: language === "ur" ? "صبح" : "Morning",
      activity: language === "ur" ? "درس قرآن" : "Quran Teaching",
    },
    {
      time: language === "ur" ? "ظہر" : "Zuhr",
      activity: language === "ur" ? "نماز ظہر اور وعظ" : "Zuhr Prayer & Sermon",
    },
    {
      time: language === "ur" ? "عصر" : "Asr",
      activity: language === "ur" ? "نماز عصر اور ذکر" : "Asr Prayer & Zikr",
    },
    {
      time: language === "ur" ? "مغرب" : "Maghrib",
      activity:
        language === "ur" ? "نماز مغرب اور دعا" : "Maghrib Prayer & Dua",
    },
    {
      time: language === "ur" ? "عشاء" : "Isha",
      activity:
        language === "ur"
          ? "نماز عشاء اور روحانی محفل"
          : "Isha Prayer & Spiritual Gathering",
    },
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
          h2: "text-4xl font-bold mt-10 mb-5 text-emerald-800 ",
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
            <FaMosque className="h-10 w-10 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ur" ? "خانقاہ" : "Kahanqah"}
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "روحانی تربیت، ذکر و عبادت، اور تصوف کی تعلیمات کا مرکز"
              : "Center for spiritual training, remembrance, and Sufi teachings"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchKahanqahData}
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
                          // className="prose prose-lg max-w-none text-right"
                          // dir="rtl"
                          style={{ fontFamily: "Noto Nastaliq Urdu, serif" }}
                          dangerouslySetInnerHTML={{
                            __html:
                              lexicalJsonToHtml(kahanqahData?.content?.urdu) ||
                              `<h2>ہماری خانقاہ کے بارے میں</h2>
                              <p>مفتی حبیب اللہ قاسمی کی خانقاہ ایک روحانی تربیت گاہ ہے جہاں طالبان حق کو تصوف، تزکیہ نفس، اور روحانی تعلیمات سے آراستہ کیا جاتا ہے۔ یہاں روزانہ ذکر و اذکار، درس قرآن، اور روحانی محافل کا اہتمام کیا جاتا ہے۔</p>
                              <p>خانقاہ میں بیعت کے ذریعے روحانی رہنمائی فراہم کی جاتی ہے اور طالبان کو اسلامی تعلیمات کے مطابق اپنی زندگی گزارنے کی تربیت دی جاتی ہے۔</p>
                              <h3>خانقاہ کے اہم مقاصد</h3>
                              <ul>
                                <li>تزکیہ نفس اور روحانی تربیت</li>
                                <li>قرآن و سنت کی روشنی میں رہنمائی</li>
                                <li>ذکر و عبادت کی محافل کا انعقاد</li>
                                <li>معاشرے کی روحانی اصلاح</li>
                              </ul>`,
                          }}
                        />
                      ) : (
                        <div
                          className="prose prose-lg max-w-none"
                          dangerouslySetInnerHTML={{
                            __html:
                              lexicalJsonToHtml(
                                kahanqahData?.content?.english
                              ) ||
                              `<h2>About Our Kahanqah</h2>
                              <p>Mufti Habibullah Qasmi's Kahanqah is a spiritual training center where seekers of truth are adorned with Sufism, soul purification, and spiritual teachings. Daily gatherings for remembrance, Quran teaching, and spiritual sessions are organized here.</p>
                              <p>The Kahanqah provides spiritual guidance through bay'ah (pledge) and trains seekers to live their lives according to Islamic teachings.</p>
                              <h3>Key Objectives of Kahanqah</h3>
                              <ul>
                                <li>Soul purification and spiritual training</li>
                                <li>Guidance in the light of Quran and Sunnah</li>
                                <li>Organizing gatherings for remembrance and worship</li>
                                <li>Spiritual reformation of society</li>
                              </ul>`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Spiritual Activities Grid */}
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">
                {language === "ur" ? "روحانی سرگرمیاں" : "Spiritual Activities"}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {spiritualActivities.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105 text-center"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-emerald-900 mb-2">
                        {activity.title}
                      </h3>
                      <p className="text-emerald-700 text-sm">
                        {activity.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Daily Schedule & Benefits Grid */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Daily Schedule */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaClock className="h-6 w-6 text-amber-300 mr-3" />
                  {language === "ur" ? "روزانہ پروگرام" : "Daily Schedule"}
                </h3>
                <div className="space-y-4">
                  {dailySchedule.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-emerald-500/30 rounded-xl"
                    >
                      <span className="font-bold text-amber-300">
                        {schedule.time}
                      </span>
                      <span className="text-emerald-100">
                        {schedule.activity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spiritual Benefits */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaStar className="h-6 w-6 text-white mr-3" />
                  {language === "ur" ? "روحانی فوائد" : "Spiritual Benefits"}
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-amber-100">
                      {language === "ur"
                        ? "قلب کی صفائی اور تزکیہ نفس"
                        : "Heart purification and soul cleansing"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-amber-100">
                      {language === "ur"
                        ? "اللہ سے قربت کا حصول"
                        : "Achieving closeness to Allah"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-amber-100">
                      {language === "ur"
                        ? "نفسانی بیماریوں سے شفا"
                        : "Healing from spiritual diseases"}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-amber-100">
                      {language === "ur"
                        ? "روحانی سکون و اطمینان"
                        : "Spiritual peace and satisfaction"}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Spiritual Journey & Guidance */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center mb-6">
                  <FaPrayingHands className="h-8 w-8 text-amber-300 mr-3" />
                  <h3 className="text-2xl font-bold">
                    {language === "ur" ? "روحانی سفر" : "Spiritual Journey"}
                  </h3>
                </div>
                <p className="text-emerald-100 leading-relaxed text-lg">
                  {language === "ur"
                    ? "خانقاہ میں روحانی سفر کا آغاز بیعت سے ہوتا ہے جس کے بعد مرشد کامل کی نگرانی میں طالب روحانی مراحل طے کرتا ہے۔ یہ سفر تزکیہ نفس، تصفیہ قلب، اور تجلیہ روح پر مشتمل ہے۔"
                    : "The spiritual journey in Kahanqah begins with bay'ah (pledge), after which the seeker progresses through spiritual stages under the supervision of a perfect guide. This journey includes soul purification, heart cleansing, and spiritual enlightenment."}
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center mb-6">
                  <FaBook className="h-8 w-8 text-white mr-3" />
                  <h3 className="text-2xl font-bold">
                    {language === "ur" ? "رہنمائی" : "Guidance"}
                  </h3>
                </div>
                <p className="text-amber-100 leading-relaxed text-lg">
                  {language === "ur"
                    ? "مفتی حبیب اللہ قاسمی مرشد کامل کی حیثیت سے طالبان حق کو قرآن و سنت کی روشنی میں روحانی رہنمائی فراہم کرتے ہیں۔ آپ کی رہنمائی میں سینکڑوں افراد نے روحانی کمال حاصل کیا ہے۔"
                    : "Mufti Habibullah Qasmi, as a perfect spiritual guide, provides spiritual guidance to truth seekers in the light of Quran and Sunnah. Hundreds of individuals have achieved spiritual perfection under his guidance."}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">
                {language === "ur"
                  ? "روحانی سفر کا آغاز کریں"
                  : "Begin Your Spiritual Journey"}
              </h2>
              <p className="text-emerald-100 text-lg mb-6 max-w-2xl mx-auto">
                {language === "ur"
                  ? "خانقاہ میں آئیں اور اپنے روحانی سفر کا آغاز کریں۔ ذکر و عبادت کی برکات سے اپنی زندگی کو منور کریں۔"
                  : "Visit the Kahanqah and begin your spiritual journey. Illuminate your life with the blessings of remembrance and worship."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                  {language === "ur" ? "دعوت اسلامی" : "Islamic Invitation"}
                </button>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                  {language === "ur"
                    ? "روحانی مشورہ"
                    : "Spiritual Consultation"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KahanqahPage;
