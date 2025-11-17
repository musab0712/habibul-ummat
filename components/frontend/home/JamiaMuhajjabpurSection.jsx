"use client";
import React from "react";
import Link from "next/link";
import { FaUniversity, FaGraduationCap, FaBook, FaUsers } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const JamiaMuhajjabpurSection = () => {
  const { language } = useLanguage();

  const jamiaFeatures = [
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
      icon: FaUsers,
      title: language === "ur" ? "مستقل ہاسٹل" : "Permanent Hostel",
      description:
        language === "ur"
          ? "طلباء کے لیے رہائشی سہولیات"
          : "Residential facilities for students",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-emerald-50 to-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-6">
            <FaUniversity className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {language === "ur" ? "جامعہ محجب پور" : "Jamia Muhajjabpur"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {language === "ur"
              ? "اسلامی علوم و فنون کا عظیم مرکز جہاں علم و عمل کی روشنی پھیلتی ہے"
              : "The great center of Islamic sciences and arts where the light of knowledge and practice spreads"}
          </p>
        </div>

        {/* Jamia Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {jamiaFeatures.map((feature, index) => {
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

        {/* Statistics */}
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
                25+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "اساتذہ" : "Teachers"}
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                1000+
              </div>
              <div className="text-emerald-100">
                {language === "ur" ? "فارغ التحصیل" : "Graduates"}
              </div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-amber-300 mb-2">
                35+
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
                ? "جامعہ محجب پور میں داخلے کے لیے درخواستیں موصول ہو رہی ہیں۔ اپنے بچوں کو اسلامی تعلیم سے آراستہ کریں۔"
                : "Applications are being received for admission to Jamia Muhajjabpur. Adorn your children with Islamic education."}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href={`/${language}/jamia`}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {language === "ur"
                  ? " جامعہ کے بارے میں"
                  : "About Jamia Muhajjabpur"}
              </Link>
              {/* <button className="bg-white text-emerald-600 hover:bg-emerald-50 border-2 border-emerald-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300">
                {language === "ur" ? "داخلہ فارم" : "Admission Form"}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JamiaMuhajjabpurSection;
