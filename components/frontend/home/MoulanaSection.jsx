import React from "react";
import {
  FaBookOpen,
  FaAward,
  FaUsers,
  FaGlobeAmericas,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const MoulanaSection = () => {
  const { t, language } = useLanguage();

  const achievements = [
    {
      icon: FaBookOpen,
      title: language === "ur" ? "50+ کتابیں تصنیف" : "50+ Books Authored",
      description:
        language === "ur"
          ? "اسلامی علوم میں متعدد کتابوں کی تصنیف"
          : "Authored numerous books on Islamic sciences",
    },
    {
      icon: FaUsers,
      title: language === "ur" ? "10,000+ طلباء" : "10,000+ Students",
      description:
        language === "ur"
          ? "دنیا بھر میں ہزاروں طلباء کی تربیت"
          : "Trained thousands of students worldwide",
    },
    {
      icon: FaGlobeAmericas,
      title: language === "ur" ? "30+ سال تجربہ" : "30+ Years Experience",
      description:
        language === "ur"
          ? "اسلامی تعلیم میں تین دہائیوں کا تجربہ"
          : "Three decades of experience in Islamic education",
    },
    {
      icon: FaAward,
      title: language === "ur" ? "متعدد اعزازات" : "Multiple Awards",
      description:
        language === "ur"
          ? "اسلامی خدمات کے لیے مختلف اعزازات"
          : "Various honors for Islamic services",
    },
  ];

  const qualifications = [
    language === "ur"
      ? "دارالعلوم دیوبند سے فراغت"
      : "Graduate from Darul Uloom Deoband",
    language === "ur"
      ? "تفسیر و حدیث میں تخصص"
      : "Specialization in Tafseer and Hadith",
    language === "ur" ? "عربی ادب میں ماہر" : "Expert in Arabic Literature",
    language === "ur"
      ? "اسلامی فقہ کے عالم"
      : "Scholar of Islamic Jurisprudence",
    language === "ur"
      ? "کئی زبانوں پر عبور"
      : "Proficient in Multiple Languages",
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
            {t("aboutMoulana")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Moulana Profile */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-8 text-white shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                <FaBookOpen className="h-16 w-16 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-2">{t("moulanaName")}</h3>
              <p className="text-amber-200 text-lg font-medium">
                {t("moulanaTitle")}
              </p>
              <div className="flex items-center justify-center mt-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className="h-5 w-5 text-amber-300 fill-current"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-emerald-100 leading-relaxed text-lg">
                {language === "ur"
                  ? " مفتی حبیب اللہ قاسمی ایک معروف اسلامی عالم اور مصنف ہیں جنہوں نے اپنی زندگی اسلامی علوم کی تعلیم اور تبلیغ کے لیے وقف کی ہے۔ وہ مکتبہ حبیب الامت کے بانی ہیں اور اس کے ذریعے لاکھوں مسلمانوں تک اسلامی علم پہنچانے کا کام کر رہے ہیں۔"
                  : "Mufti Habibullah Qasmi is a renowned Islamic scholar and author who has dedicated his life to teaching and propagating Islamic knowledge. He is the founder of Maqtaba Hibibul Ummat and through this platform, he is working to bring Islamic knowledge to millions of Muslims."}
              </p>

              <p className="text-emerald-100 leading-relaxed">
                {language === "ur"
                  ? "آپ کی تصنیفات اور تعلیمات نے دنیا بھر کے مسلمانوں کو متاثر کیا ہے۔ آپ کا مقصد یہ ہے کہ ہر مسلمان تک صحیح اسلامی علم پہنچے اور وہ اپنی زندگی کو اسلامی تعلیمات کے مطابق گزار سکے۔"
                  : "His writings and teachings have influenced Muslims around the world. His goal is to ensure that correct Islamic knowledge reaches every Muslim so they can live their lives according to Islamic teachings."}
              </p>
            </div>
          </div>

          {/* Qualifications & Background */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl border-2 border-emerald-100">
              <h4 className="text-2xl font-bold text-emerald-900 mb-6 flex items-center">
                <FaAward className="h-6 w-6 text-amber-500 mr-3" />
                {language === "ur"
                  ? "تعلیمی اہلیت"
                  : "Educational Qualifications"}
              </h4>
              <ul className="space-y-3">
                {qualifications.map((qualification, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-emerald-700">{qualification}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-xl">
              <h4 className="text-2xl font-bold mb-6 flex items-center">
                <FaHeart className="h-6 w-6 text-white mr-3" />
                {language === "ur" ? "پیغام" : "Message"}
              </h4>
              <blockquote className="text-amber-100 italic text-lg leading-relaxed">
                {language === "ur"
                  ? '"علم حاصل کرنا ہر مسلمان مرد اور عورت پر فرض ہے۔ میری دعا ہے کہ یہ مکتبہ ہر مسلمان کے لیے علم کا ذریعہ بنے اور ہم سب مل کر اسلامی تعلیمات کو آگے بڑھائیں۔"'
                  : '"Seeking knowledge is obligatory upon every Muslim man and woman. My prayer is that this library becomes a source of knowledge for every Muslim and together we advance Islamic teachings."'}
              </blockquote>
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-emerald-700 text-sm">
                  {achievement.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Contact Moulana Section */}
        <div className="mt-16 bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 rounded-3xl p-12 shadow-2xl text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            {language === "ur" ? "مولانا سے رابطہ" : "Connect with Moulana"}
          </h3>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            {language === "ur"
              ? "اسلامی مسائل کے حل کے لیے یا علمی رہنمائی کے لیے مولانا سے رابطہ کریں"
              : "Contact Moulana for Islamic guidance or scholarly consultation"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
              {language === "ur" ? "سوال بھیجیں" : "Send Question"}
            </button>
            <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300">
              {language === "ur" ? "کتابیں دیکھیں" : "View Books"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoulanaSection;
