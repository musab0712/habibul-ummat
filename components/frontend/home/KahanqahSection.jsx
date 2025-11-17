"use client";
import React from "react";
import Link from "next/link";
import { FaMosque, FaPrayingHands, FaBook, FaUsers } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const KahanqahSection = () => {
  const { language } = useLanguage();

  const kahanqahFeatures = [
    {
      icon: FaPrayingHands,
      title: language === "ur" ? "ذکر و عبادت" : "Zikr & Worship",
      description:
        language === "ur"
          ? "روزانہ ذکر و اذکار کی محافل"
          : "Daily gatherings for remembrance and worship",
    },
    {
      icon: FaBook,
      title: language === "ur" ? "روحانی تعلیم" : "Spiritual Education",
      description:
        language === "ur"
          ? "تصوف اور تزکیہ نفس کی تعلیمات"
          : "Teachings of Sufism and soul purification",
    },
    {
      icon: FaUsers,
      title: language === "ur" ? "بیعت و رہنمائی" : "Guidance & Pledge",
      description:
        language === "ur"
          ? "مرشد کامل کی زیر نگرانی بیعت"
          : "Spiritual pledge under perfect guide's supervision",
    },
    {
      icon: FaMosque,
      title: language === "ur" ? "روحانی ماحول" : "Spiritual Environment",
      description:
        language === "ur"
          ? "پرسکون اور روحانی ماحول"
          : "Peaceful and spiritual environment",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-emerald-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-6">
            <FaMosque className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "ur" ? "روحانی خانقاہ" : "Spiritual Kahanqah"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "تزکیہ نفس، تصوف، اور روحانی تربیت کا مرکز جہاں طالبان حق اپنا روحانی سفر شروع کرتے ہیں"
              : "Center for soul purification, Sufism, and spiritual training where truth seekers begin their spiritual journey"}
          </p>
        </div>

        {/* Kahanqah Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {kahanqahFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Spiritual Statistics */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-8 lg:p-12 text-white shadow-2xl mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                100+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "روزانہ ذاکرین" : "Daily Participants"}
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                50+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "بیعت یافتہ" : "Spiritual Disciples"}
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                7
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "روزانہ محافل" : "Daily Gatherings"}
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                15+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "سالوں سے" : "Years Serving"}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-8">
              {language === "ur"
                ? "خانقاہ میں آئیں اور اپنے روحانی سفر کا آغاز کریں۔ ذکر و عبادت کی برکات سے اپنی زندگی کو منور کریں۔"
                : "Visit the Kahanqah and begin your spiritual journey. Illuminate your life with the blessings of remembrance and worship."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${language}/khanaqah`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {language === "ur" ? "خانقاہ کے بارے میں" : "About Kahanqah"}
              </Link>
              {/* <button className="bg-white text-emerald-600 hover:bg-emerald-50 border-2 border-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                {language === "ur" ? "روحانی مشورہ" : "Spiritual Consultation"}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KahanqahSection;
