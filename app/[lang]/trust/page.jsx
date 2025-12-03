"use client";
import React, { useState, useEffect } from "react";
import {
  FaHandHoldingHeart,
  FaUsers,
  FaBalanceScale,
  FaShieldAlt,
  FaSpinner,
  FaGlobe,
  FaRibbon,
  FaChartLine,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const TrustPage = () => {
  const { language } = useLanguage();
  const [trustData, setTrustData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrustData();
  }, []);

  const fetchTrustData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/trust");
      const result = await response.json();

      if (result.success) {
        setTrustData(result.data);
      } else {
        setError("Failed to fetch trust data");
      }
    } catch (err) {
      setError("Error fetching trust data");
      console.error("Error fetching trust data:", err);
    } finally {
      setLoading(false);
    }
  };

  const trustFeatures = [
    {
      icon: FaShieldAlt,
      title: language === "ur" ? "شفافیت" : "Transparency",
      description:
        language === "ur"
          ? "ہمارے تمام معاملات مکمل شفافیت کے ساتھ پیش کیے جاتے ہیں"
          : "All our affairs are conducted with complete transparency",
    },
    {
      icon: FaBalanceScale,
      title: language === "ur" ? "امانت داری" : "Trustworthiness",
      description:
        language === "ur"
          ? "خدا کے عطا کردہ مال میں مکمل امانت داری"
          : "Complete trustworthiness in God-given wealth",
    },
    {
      icon: FaUsers,
      title: language === "ur" ? "اجتماعیت" : "Collective Leadership",
      description:
        language === "ur"
          ? "تجربہ کار ٹرسٹیوں کی اجتماعی قیادت"
          : "Collective leadership of experienced trustees",
    },
    {
      icon: FaChartLine,
      title: language === "ur" ? "پائیداری" : "Sustainability",
      description:
        language === "ur"
          ? "مستقل اور پائیدار فلاحی خدمات"
          : "Permanent and sustainable welfare services",
    },
  ];

  const trustObjectives = [
    {
      icon: FaHandHoldingHeart,
      title: language === "ur" ? "تعلیمی اسکالرشپ" : "Educational Scholarships",
      description:
        language === "ur"
          ? "غریب طلباء کو تعلیمی اسکالرشپ فراہم کرنا"
          : "Providing educational scholarships to poor students",
    },
    {
      icon: FaRibbon,
      title: language === "ur" ? "غربا کی مدد" : "Help for the Poor",
      description:
        language === "ur"
          ? "غریب اور ضرورت مند خاندانوں کی مدد"
          : "Assistance to poor and needy families",
    },
    {
      icon: FaGlobe,
      title: language === "ur" ? "عالمی خدمات" : "Global Services",
      description:
        language === "ur"
          ? "دنیا بھر میں اسلامی تعلیمات کی تبلیغ"
          : "Propagation of Islamic teachings worldwide",
    },
    {
      icon: FaShieldAlt,
      title: language === "ur" ? "وقف کی بحالی" : "Waqf Restoration",
      description:
        language === "ur"
          ? "اسلامی وقف کی بحالی اور جدید نظام"
          : "Restoration and modernization of Islamic waqf system",
    },
  ];

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
          h1: "text-5xl font-bold mt-12 mb-6 text-emerald-800 text-center",
          h2: "text-4xl font-bold mt-10 mb-5 text-emerald-800 text-center",
          h3: "text-3xl font-bold mt-8 mb-4 text-emerald-800 text-center",
          h4: "text-2xl font-bold mt-6 mb-3 text-emerald-800 text-center",
          h5: "text-xl font-bold mt-4 mb-2 text-emerald-800 text-center",
          h6: "text-lg font-bold mt-3 mb-2 text-emerald-800 text-center",
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
            <FaHandHoldingHeart className="h-10 w-10 text-amber-300" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {language === "ur" ? "ٹرسٹ" : "Trust"}
          </h1>
          <p className="text-xl text-emerald-100 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "خیراتی ٹرسٹ کے مقاصد، خدمات اور کارناموں کے بارے میں مکمل معلومات"
              : "Complete information about the charitable trust's objectives, services, and achievements"}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {error ? (
          <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8">
            <p className="text-red-600 text-lg">{error}</p>
            <button
              onClick={fetchTrustData}
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
                              lexicalJsonToHtml(trustData?.content?.urdu) ||
                              `<h2>ہمارے ٹرسٹ کے بارے میں</h2>
                              <p>مفتی حبیب اللہ قاسمی ٹرسٹ ایک رجسٹرڈ خیراتی ادارہ ہے جو ۲۰۰۵ سے اسلامی تعلیم، فلاح و بہبود، اور انسانیت کی خدمت کے میدان میں سرگرم عمل ہے۔ ہمارا ٹرسٹ مکمل شفافیت، امانت داری، اور اسلامی اصولوں کے مطابق کام کرتا ہے۔</p>
                              <p>ہمارا بنیادی مقصد غریب اور مستحق طلباء کو تعلیمی اسکالرشپ فراہم کرنا، غریب خاندانوں کی مالی مدد کرنا، اور اسلامی تعلیمات کی تبلیغ و اشاعت کرنا ہے۔</p>
                              <h3>ٹرسٹ کی بنیادیں</h3>
                              <ul>
                                <li>مکمل شفافیت اور احتساب</li>
                                <li>اجتماعی قیادت اور مشاورت</li>
                                <li>اسلامی اصولوں پر عملدرآمد</li>
                                <li>غربا اور یتامیٰ کی خاص دیکھ بھال</li>
                              </ul>`,
                          }}
                        />
                      ) : (
                        <div
                          className="prose prose-lg max-w-none"
                          dangerouslySetInnerHTML={{
                            __html:
                              lexicalJsonToHtml(trustData?.content?.english) ||
                              `<h2>About Our Trust</h2>
                              <p>Mufti Habibullah Qasmi Trust is a registered charitable organization that has been actively working in the fields of Islamic education, welfare, and humanitarian services since 2005. Our trust operates with complete transparency, trustworthiness, and in accordance with Islamic principles.</p>
                              <p>Our primary objectives include providing educational scholarships to poor and deserving students, offering financial assistance to needy families, and propagating Islamic teachings worldwide.</p>
                              <h3>Foundation Principles</h3>
                              <ul>
                                <li>Complete transparency and accountability</li>
                                <li>Collective leadership and consultation</li>
                                <li>Implementation of Islamic principles</li>
                                <li>Special care for the poor and orphans</li>
                              </ul>`,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Features Grid */}
            <div>
              <h2 className="text-3xl font-bold text-emerald-900 mb-8 text-center">
                {language === "ur" ? "ٹرسٹ کی خصوصیات" : "Trust Features"}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {trustFeatures.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-2xl p-6 shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105 text-center"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-emerald-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-emerald-700 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Objectives & Impact Grid */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Objectives */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaHandHoldingHeart className="h-6 w-6 text-amber-300 mr-3" />
                  {language === "ur" ? "ہمارے مقاصد" : "Our Objectives"}
                </h3>
                <ul className="space-y-4">
                  {trustObjectives.map((objective, index) => {
                    const IconComponent = objective.icon;
                    return (
                      <li key={index} className="flex items-start">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">
                            {objective.title}
                          </h4>
                          <p className="text-emerald-100 text-sm mt-1">
                            {objective.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Impact Statistics */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-2xl">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <FaChartLine className="h-6 w-6 text-white mr-3" />
                  {language === "ur" ? "ہمارا اثر" : "Our Impact"}
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
                      1000+
                    </div>
                    <div className="text-amber-100 text-sm">
                      {language === "ur" ? "خاندان" : "Families"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      50+
                    </div>
                    <div className="text-amber-100 text-sm">
                      {language === "ur" ? "منصوبے" : "Projects"}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      15+
                    </div>
                    <div className="text-amber-100 text-sm">
                      {language === "ur" ? "سالوں سے" : "Years"}
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-white/10 rounded-xl">
                  <p className="text-amber-100 text-sm italic">
                    {language === "ur"
                      ? "ہماری تمام خدمات مکمل شفافیت کے ساتھ پیش کی جاتی ہیں"
                      : "All our services are delivered with complete transparency"}
                  </p>
                </div>
              </div>
            </div>

            {/* Governance & Team */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center mb-6">
                  <FaUsers className="h-8 w-8 text-amber-300 mr-3" />
                  <h3 className="text-2xl font-bold">
                    {language === "ur" ? "گورننس" : "Governance"}
                  </h3>
                </div>
                <p className="text-emerald-100 leading-relaxed text-lg">
                  {language === "ur"
                    ? "ہمارا ٹرسٹ تجربہ کار ٹرسٹیوں کے اجتماعی فیصلوں سے چلتا ہے۔ تمام مالی معاملات مکمل شفافیت کے ساتھ پیش کیے جاتے ہیں اور سالانہ آڈٹ ہوتا ہے۔"
                    : "Our trust is governed by collective decisions of experienced trustees. All financial matters are presented with complete transparency and undergo annual audit."}
                </p>
              </div>

              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="flex items-center mb-6">
                  <FaShieldAlt className="h-8 w-8 text-white mr-3" />
                  <h3 className="text-2xl font-bold">
                    {language === "ur" ? "ٹرسٹی بورڈ" : "Trustee Board"}
                  </h3>
                </div>
                <p className="text-amber-100 leading-relaxed text-lg">
                  {language === "ur"
                    ? "ہمارے بورڈ میں معزز علما، تجربہ کار منتظمین، اور معاشرتی کارکن شامل ہیں جو اجتماعی طور پر ٹرسٹ کے معاملات چلاتے ہیں۔"
                    : "Our board includes respected scholars, experienced administrators, and social workers who collectively manage the trust's affairs."}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl font-bold mb-4">
                {language === "ur" ? "ہمارا ساتھ دیں" : "Support Our Cause"}
              </h2>
              <p className="text-emerald-100 text-lg mb-6 max-w-2xl mx-auto">
                {language === "ur"
                  ? "ہمارے ساتھ مل کر غریب طلباء کی تعلیم اور ضرورت مند خاندانوں کی مدد کریں۔ آپ کا ہر تعاون کسی نہ کسی کی زندگی بدل سکتا ہے۔"
                  : "Join us in supporting poor students' education and helping needy families. Your every contribution can change someone's life."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
                  {language === "ur" ? "عطیہ دیں" : "Donate Now"}
                </button>
                <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                  {language === "ur" ? "رکن بنیں" : "Become Member"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrustPage;
