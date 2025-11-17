"use client";
import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import Hero from "@/components/frontend/home/Hero";
import About from "@/components/frontend/home/About";
import MoulanaSection from "@/components/frontend/home/MoulanaSection";
import LatestBooks from "@/components/frontend/home/LatestBooks";
import AboutPreview from "@/components/frontend/home/AboutPreview";
import LatestPhotosSection from "@/components/frontend/home/LatestPhotosSection";
import LatestVideosSection from "@/components/frontend/home/LatestVideosSection";
import LatestFatwa from "@/components/frontend/home/LatestFatwa";
import TrustSection from "@/components/frontend/home/TrustSection";
import KahanqahSection from "@/components/frontend/home/KahanqahSection";
import JamiaMuhajjabpurSection from "@/components/frontend/home/JamiaMuhajjabpurSection";
import HeroSlider from "@/components/frontend/home/HeroSlider";

export default function HomePage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50 to-green-100">
      <HeroSlider />
      <Hero />
      <AboutPreview />
      {/* Features Section */}
      {/* <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-amber-600">📚</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">
                {language === "ur" ? "علمی خدمات" : "Academic Services"}
              </h3>
              <p className="text-emerald-600">
                {language === "ur"
                  ? "فقہ اور حدیث پر تحقیقی کام اور درسی خدمات"
                  : "Research work on Fiqh and Hadith with teaching services"}
              </p>
            </div>

            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-amber-600">🎤</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">
                {language === "ur" ? "لیکچرز" : "Lectures"}
              </h3>
              <p className="text-emerald-600">
                {language === "ur"
                  ? "دینی اور سماجی موضوعات پر علمی لیکچرز"
                  : "Educational lectures on religious and social topics"}
              </p>
            </div>

            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-emerald-100 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-amber-600">🤲</span>
              </div>
              <h3 className="text-xl font-bold text-emerald-800 mb-3">
                {language === "ur" ? "روحانی رہنمائی" : "Spiritual Guidance"}
              </h3>
              <p className="text-emerald-600">
                {language === "ur"
                  ? "تصوف اور روحانی ترقی کی راہنمائی"
                  : "Guidance on Sufism and spiritual development"}
              </p>
            </div>
          </div>
        </div>
      </section> */}
      {/* <MoulanaSection /> */}
      {/* <About /> */}
      <JamiaMuhajjabpurSection />
      <LatestBooks />
      <LatestFatwa />
      <TrustSection />
      <LatestVideosSection />
      <LatestPhotosSection />
      <KahanqahSection />
    </div>
  );
}
