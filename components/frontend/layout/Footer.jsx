"use client";
import React from "react";
import Link from "next/link";
import {
  FaBookOpen,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaHome,
  FaUser,
  FaGraduationCap,
  FaHandHoldingHeart,
  FaQuran,
  FaMicrophone,
  FaPhotoVideo,
  FaDonate,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const Footer = () => {
  const { language } = useLanguage();

  const translations = {
    en: {
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
    },
    ur: {
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
    },
  };

  const t = translations[language];

  const quickLinks = [
    // { name: { en: "Home", ur: "ہوم" }, href: "/", icon: FaHome },
    // { name: { en: "About", ur: "تعارف" }, href: "/about", icon: FaUser },
    { name: { en: "Fatwa", ur: "فتویٰ" }, href: "/fatwa", icon: FaQuran },
    {
      name: { en: "Maktab", ur: "مکتب" },
      href: "/maktab",
      icon: FaGraduationCap,
    },
    {
      name: { en: "Jamia", ur: "جامعہ" },
      href: "/jamia",
      icon: FaGraduationCap,
    },
    { name: { en: "Contact", ur: "رابطہ" }, href: "/contact", icon: FaPhone },
  ];

  const services = [
    { name: { en: "Islamic Fatwa", ur: "اسلامی فتاویٰ" }, icon: FaQuran },
    { name: { en: "Spiritual Guidance", ur: "روحانی رہنمائی" }, icon: FaHeart },
    {
      name: { en: "Educational Lectures", ur: "تعلیمی لیکچرز" },
      icon: FaMicrophone,
    },
    // {
    //   name: { en: "Online Classes", ur: "آن لائن کلاسیز" },
    //   icon: FaGraduationCap,
    // },
    // { name: { en: "Media Library", ur: "میڈیا لائبریری" }, icon: FaPhotoVideo },
    {
      name: { en: "Community Service", ur: "کمیونٹی سروس" },
      icon: FaHandHoldingHeart,
    },
  ];

  const socialLinks = [
    {
      icon: FaFacebookF,
      href: "#",
      color: "hover:bg-blue-600",
      label: "Facebook",
    },
    {
      icon: FaTwitter,
      href: "#",
      color: "hover:bg-blue-400",
      label: "Twitter",
    },
    { icon: FaYoutube, href: "#", color: "hover:bg-red-600", label: "YouTube" },
    {
      icon: FaInstagram,
      href: "#",
      color: "hover:bg-pink-600",
      label: "Instagram",
    },
    {
      icon: FaWhatsapp,
      href: "#",
      color: "hover:bg-green-500",
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Scholar Information */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative group">
                <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                <FaBookOpen className="h-12 w-12 text-amber-300 relative z-10 transform group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center z-20">
                  <div className="w-2 h-2 bg-emerald-800 rounded-full"></div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-amber-300">
                  {language === "ur"
                    ? "مفتی حبیب اللہ قاسمی"
                    : "Mufti Habibullah Qasmi"}
                </h3>
                <p className="text-amber-200 font-medium">
                  {language === "ur"
                    ? "عالم دین و محقق"
                    : "Islamic Scholar & Researcher"}
                </p>
              </div>
            </div>

            <p className="text-emerald-100 mb-6 leading-relaxed text-justify">
              {language === "ur"
                ? "ایک ممتاز عالم دین، محقق، اور روحانی مربی جن کی خدمات علم و روحانیت کے میدان میں نمایاں ہیں۔ قرآن و سنت کی تعلیمات کو عام کرنے اور امت مسلمہ کی رہنمائی کے لیے وقف۔"
                : "A renowned Islamic scholar, researcher, and spiritual mentor dedicated to spreading the teachings of Quran and Sunnah, providing guidance to the Muslim Ummah through authentic Islamic knowledge and spiritual wisdom."}
            </p>

            <div className="flex items-center space-x-3 text-amber-300 p-4 bg-emerald-800/50 rounded-xl border border-emerald-700/30">
              <FaHeart className="h-5 w-5 text-amber-400 animate-pulse" />
              <span className="font-semibold text-sm">{t.servingUmmah}</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-amber-300 border-b border-amber-400/30 pb-2">
              {t.quickLinks}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <li key={index}>
                    <Link
                      href={`/${language}${link.href}`}
                      className="flex items-center space-x-3 text-emerald-100 hover:text-amber-300 transition-all duration-200 group py-2"
                    >
                      <Icon className="h-4 w-4 text-amber-400 transform group-hover:scale-110 transition-transform" />
                      <span className="font-medium group-hover:translate-x-1 transition-transform duration-200">
                        {link.name[language]}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Services & Activities */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-amber-300 border-b border-amber-400/30 pb-2">
              {t.services}
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <li key={index}>
                    <div className="flex items-center space-x-3 text-emerald-100 group py-2">
                      <Icon className="h-4 w-4 text-amber-400 flex-shrink-0" />
                      <span className="font-medium text-sm">
                        {service.name[language]}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Donate Button */}
            {/* <div className="mt-6 p-4 bg-amber-500/10 border border-amber-400/20 rounded-xl">
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2">
                <FaDonate className="h-4 w-4" />
                <span>{t.donate}</span>
              </button>
            </div> */}
          </div>
        </div>

        {/* Contact Information & Social Links */}
        <div className="border-t border-emerald-700 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Email */}
            <div className="flex items-center space-x-4 p-4 bg-emerald-800/30 rounded-xl border border-emerald-700/30 hover:border-amber-400/30 transition-all duration-300">
              <div className="flex-shrink-0">
                <FaEnvelope className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <p className="font-semibold text-amber-300 text-sm">
                  {t.emailUs}
                </p>
                <p className="text-emerald-100 text-sm">
                  muftihabibullahqasmi6400@gmail.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center space-x-4 p-4 bg-emerald-800/30 rounded-xl border border-emerald-700/30 hover:border-amber-400/30 transition-all duration-300">
              <div className="flex-shrink-0">
                <FaPhone className="h-8 w-8 text-amber-300" />
              </div>
              <div>
                <p className="font-semibold text-amber-300 text-sm">
                  {t.callUs}
                </p>
                <p className="text-emerald-100 font-medium">9936368546</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center space-x-4 p-4 bg-emerald-800/30 rounded-xl border border-emerald-700/30 hover:border-amber-400/30 transition-all duration-300">
              <div className="flex-shrink-0">
                <FaMapMarkerAlt className="h-8 w-8 text-amber-300" />
              </div>
              <div>
                <p className="font-semibold text-amber-300 text-sm">
                  {t.visitUs}
                </p>
                <p className="text-emerald-100 font-medium text-sm">
                  {language === "ur"
                    ? " جامعہ اسلامیہ دار العلوم مھذب پور ،سنجر پور،اعظم گڈھ یوپی انڈیا, پن کوڈ: 223227"
                    : "Jamia Islamia Darul Uloom Muhajjabpur, Sanjarpur, Azamgarh, UP, India, 223227"}
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="p-4 bg-emerald-800/30 rounded-xl border border-emerald-700/30">
              <p className="font-semibold text-amber-300 text-sm mb-3">
                {t.followUs}
              </p>
              <div className="flex space-x-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${social.color} text-white border border-emerald-600/50`}
                      aria-label={social.label}
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center lg:text-left">
              <p className="text-emerald-200 font-medium">
                © {new Date().getFullYear()}{" "}
                {language === "ur"
                  ? "مفتی حبیب اللہ قاسمی"
                  : "Mufti Habibullah Qasmi"}
                . {t.allRights}
              </p>
            </div>

            <div className="text-center">
              <p className="text-amber-300 font-semibold text-sm italic">
                {t.quranVerse}
              </p>
            </div>

            <div className="text-center lg:text-right">
              <p className="text-emerald-200 text-sm">
                {language === "ur"
                  ? "علم نافع سے آراستہ"
                  : "Enriched with Beneficial Knowledge"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
