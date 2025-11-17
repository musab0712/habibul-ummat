"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations = {
  en: {
    home: "Home",
    about: "About",
    servingUmmah: "Serving the Ummah with Knowledge & Spirituality",
    quickLinks: "Quick Links",
    services: "Services & Activities",
    contactInfo: "Contact Information",
    followUs: "Follow Us",
    allRights: "All rights reserved",
    emailUs: "Email Us",
    callUs: "Call Us",
    visitUs: "Visit Us",
    globalReach: "Global Reach",
    servingMuslims: "Serving Muslims Worldwide",
    quranVerse: "Read! In the name of your Lord who created - [Quran 96:1]",
    donate: "Support Our Mission",
    //homepage translations can be added here
    heroTitle: "Maktaba Habibul Ummat",
    heroSubtitle: "Your gateway to authentic Islamic knowledge",
    freeBooks: "Free Books",
    freeBooksDesc: "Access thousands of Islamic books completely free",
    globalAccess: "Global Access",
    globalAccessDesc: "Available to Muslims worldwide, anytime",
    communityDriven: "Community Driven",
    communityDrivenDesc: "Built by the community, for the community",
    loveUmmah: "Love for Ummah",
    loveUmmahDesc: "Serving the Muslim Ummah with pure intentions",
    seekKnowledge: "Seek knowledge from the cradle to the grave",
    joinMission: "Join our mission to spread beneficial knowledge",
    booksAvailable: "Books Available",
    categories: "Categories",
    freeAccess: "Free Access",
    // about section translations can be added here
    aboutMission: "About Our Mission",
    missionText:
      "Maqtaba Hibibul Ummat is dedicated to preserving, sharing, and promoting Islamic knowledge through digital accessibility, making authentic Islamic literature available to Muslims worldwide.",
    ourMission: "Our Mission",
    ourVision: "Our Vision",
    authenticContent: "Authentic Content",
    authenticContentDesc:
      "All books and materials are carefully verified for authenticity and accuracy by Islamic scholars",
    globalReach: "Global Reach",
    globalReachDesc:
      "Serving Muslims worldwide with multilingual support and cultural sensitivity",
    communityFocus: "Community Focus",
    communityFocusDesc:
      "Built by the community, for the community, with continuous feedback and improvement",

    // Moulana Section
    aboutMoulana: "About Our Respected Moulana",
    moulanaName: "Mufti Habibullah Qasmi",
    moulanaTitle: "Founder & Chief Scholar",
  },
  ur: {
    home: "ہوم",
    about: "تعارف",
    servingUmmah: "علم و روحانیت کے ساتھ امت کی خدمت",
    quickLinks: "فوری لنکس",
    services: "خدمات و سرگرمیاں",
    contactInfo: "رابطہ کی معلومات",
    followUs: "ہمیں فالو کریں",
    allRights: "جملہ حقوق محفوظ ہیں",
    emailUs: "ایمیل کریں",
    callUs: "فون کریں",
    visitUs: "ملاقات کریں",
    globalReach: "عالمی رسائی",
    servingMuslims: "دنیا بھر کے مسلمانوں کی خدمت",
    quranVerse: "اقرأ باسم ربك الذي خلق - [القرآن 96:1]",
    donate: "ہمارے مشن کو سپورٹ کریں",
    //homepage translations can be added here
    heroTitle: "مکتبہ حبیب الامت",
    heroSubtitle: "اصلی اسلامی علم تک آپ کی راہ",
    freeBooks: "مفت کتابیں",
    freeBooksDesc: "ہزاروں اسلامی کتابوں تک مفت رسائی",
    globalAccess: "عالمی رسائی",
    globalAccessDesc: "دنیا بھر کے مسلمانوں کے لیے ہر وقت دستیاب",
    communityDriven: "کمیونٹی کی طرف سے",
    communityDrivenDesc: "کمیونٹی کی طرف سے، کمیونٹی کے لیے بنایا گیا",
    loveUmmah: "امت سے محبت",
    loveUmmahDesc: "خالص نیتوں کے ساتھ امت مسلمہ کی خدمت",
    seekKnowledge: "گہوارے سے لے کر قبر تک علم حاصل کرو",
    joinMission: "نفع بخش علم پھیلانے کے ہمارے مشن میں شامل ہوں",
    booksAvailable: "دستیاب کتابیں",
    categories: "اقسام",
    freeAccess: "مفت رسائی",
    // about section translations can be added here
    // About
    aboutMission: "ہمارے مشن کے بارے میں",
    missionText:
      "مکتبہ حبیب الامت ڈیجیٹل رسائی کے ذریعے اسلامی علم کو محفوظ کرنے، بانٹنے اور فروغ دینے کے لیے وقف ہے، دنیا بھر کے مسلمانوں کے لیے مستند اسلامی ادب کو دستیاب بناتا ہے۔",
    ourMission: "ہمارا مشن",
    ourVision: "ہماری ویژن",
    authenticContent: "مستند مواد",
    authenticContentDesc:
      "تمام کتابیں اور مواد کو اسلامی علماء کے ذریعے احتیاط سے تصدیق کیا جاتا ہے",
    globalReach: "عالمی رسائی",
    globalReachDesc:
      "کثیر لسانی سپورٹ اور ثقافتی حساسیت کے ساتھ دنیا بھر کے مسلمانوں کی خدمت",
    communityFocus: "کمیونٹی فوکس",
    communityFocusDesc:
      "کمیونٹی کے ذریعے، کمیونٹی کے لیے، مسلسل فیڈبیک اور بہتری کے ساتھ",

    // Moulana Section
    aboutMoulana: "ہمارے محترم مولانا کے بارے میں",
    moulanaName: "مفتي حبيبلله قسم",
    moulanaTitle: "بانی اور چیف اسکالر",
  },
};

export const LanguageProvider = ({ children, initialLanguage = "en" }) => {
  const [language, setLanguageState] = useState(initialLanguage);

  // Sync with URL on initial load
  useEffect(() => {
    const pathLang = window.location.pathname.split("/")[1];
    if (pathLang === "en" || pathLang === "ur") {
      setLanguageState(pathLang);
    }
  }, []);

  // Load language from localStorage on initial render (client-side only)
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language");
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ur")) {
      setLanguageState(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const setLanguage = (newLang) => {
    console.log("Setting language in context:", newLang);
    setLanguageState(newLang);
    localStorage.setItem("preferred-language", newLang);
  };

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
