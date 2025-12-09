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
      title: language === "ur" ? "فلاحی خدمات" : "Welfare Services",
      description:
        language === "ur"
          ? "غریبوں، یتیموں، مسکینوں اور بیواؤں کی مدد"
          : "Helping the poor, orphans, the needy and widows",
    },
    {
      icon: FaShieldAlt,
      title: language === "ur" ? "قیام مکاتب " : "Establishment of Makatib",
      description:
        language === "ur"
          ? "غریب دیہی علاقوں میں مکاتب کا قیام "
          : "Establishment of Makatib in poor rural areas",
    },
    {
      icon: FaUsers,
      title: language === "ur" ? "نظم قربانی" : "Arrangements of Qurbani",
      description:
        language === "ur"
          ? "غریب، یتیم، مسکین اور بیواؤں کے لیے قربانی کی فراہمی"
          : "Providing Qurbani for the Poor, Orphans, Needy and Widows",
    },
    {
      icon: FaChartLine,
      title: language === "ur" ? "نظم افطاری" : "Arrangements of Iftar",
      description:
        language === "ur"
          ? "غریبوں، مسکینوں کے لیے افطاری کا انتظام و اہتمام"
          : "Organizing and arranging for the poor and needy Iftar meals",
    },
    {
      icon: FaShieldAlt,
      title: language === "ur" ? "مکمل شفافیت" : "Construction of Mosques",
      description:
        language === "ur"
          ? "غریب دیہی علاقوں میں مساجد کی تعمیر"
          : "Construction of mosques in poor rural areas ",
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
            {language === "ur" ? "الحبیب ٹرسٹ" : "Al-Habib Trust"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "الحبیب ٹرسٹ ۲۰۱۴ سے اسلامی تعلیم اور فلاح و بہبود کی خدمات فراہم کر رہا ہے"
              : "Al-Habib Trust has been providing Islamic education and welfare services since 2014"}
          </p>
        </div>

        {/* Trust Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
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
                1000+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "طلباء" : "Students"}
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                5000+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "خاندان" : "Families"}
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                10+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "منصوبے" : "Projects"}
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                12+
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
