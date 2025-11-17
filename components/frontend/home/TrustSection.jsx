"use client";
import React from "react";
import Link from "next/link";
import {
  FaHandHoldingHeart,
  FaShieldAlt,
  FaUsers,
  FaChartLine,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const TrustSection = () => {
  const { language } = useLanguage();

  const trustHighlights = [
    {
      icon: FaHandHoldingHeart,
      title: language === "ur" ? "خیراتی خدمات" : "Charitable Services",
      description:
        language === "ur"
          ? "غریب طلباء اور ضرورت مند خاندانوں کی مدد"
          : "Support for poor students and needy families",
    },
    {
      icon: FaShieldAlt,
      title: language === "ur" ? "مکمل شفافیت" : "Complete Transparency",
      description:
        language === "ur"
          ? "تمام معاملات میں شفافیت اور احتساب"
          : "Transparency and accountability in all matters",
    },
    {
      icon: FaUsers,
      title: language === "ur" ? "اجتماعی قیادت" : "Collective Leadership",
      description:
        language === "ur"
          ? "تجربہ کار ٹرسٹیوں کی اجتماعی قیادت"
          : "Collective leadership of experienced trustees",
    },
    {
      icon: FaChartLine,
      title: language === "ur" ? "پائیدار اثر" : "Sustainable Impact",
      description:
        language === "ur"
          ? "۱۵ سال سے مسلسل خدمت اور اثر"
          : "15 years of continuous service and impact",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-emerald-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-6">
            <FaHandHoldingHeart className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "ur" ? "خیراتی ٹرسٹ" : "Charitable Trust"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "مفتی حبیب اللہ قاسمی ٹرسٹ ۲۰۰۵ سے اسلامی تعلیم اور فلاح و بہبود کی خدمات فراہم کر رہا ہے"
              : "Mufti Habibullah Qasmi Trust has been providing Islamic education and welfare services since 2005"}
          </p>
        </div>

        {/* Trust Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustHighlights.map((highlight, index) => {
            const IconComponent = highlight.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 text-sm">{highlight.description}</p>
              </div>
            );
          })}
        </div>

        {/* Impact Statistics */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 lg:p-12 text-white shadow-2xl mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                500+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "طلباء" : "Students"}
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                1000+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "خاندان" : "Families"}
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                50+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "منصوبے" : "Projects"}
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                15+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "سالوں سے" : "Years"}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              {language === "ur"
                ? "ہمارے ساتھ مل کر معاشرے کی بہتری کے لیے کام کریں۔ آپ کا ہر تعاون کسی نہ کسی کی زندگی بدل سکتا ہے۔"
                : "Join us in working for betterment of society. Your every contribution can change someone's life."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${language}/trust`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {language === "ur" ? "ٹرسٹ کے بارے میں" : "About Trust"}
              </Link>
              {/* <button className="bg-white text-emerald-600 hover:bg-emerald-50 border-2 border-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                {language === "ur" ? "عطیہ دیں" : "Donate Now"}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
