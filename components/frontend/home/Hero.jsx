import React from "react";
import { FaBookOpen, FaUsers, FaGlobeAmericas, FaHeart } from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const Hero = () => {
  const { t, language } = useLanguage();

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30V0c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-full mb-8 shadow-xl">
            <FaBookOpen className="h-10 w-10 text-amber-300" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-emerald-900 mb-6 leading-tight">
            مکتبہ حبیب الامت
          </h1>
          <h2 className="text-3xl md:text-4xl font-semibold text-emerald-800 mb-4">
            {t("heroTitle")}
          </h2>
          <p className="text-xl md:text-2xl text-emerald-700 max-w-4xl mx-auto leading-relaxed">
            {t("heroSubtitle")}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: FaBookOpen,
              title: t("freeBooks"),
              description: t("freeBooksDesc"),
            },
            {
              icon: FaGlobeAmericas,
              title: t("globalAccess"),
              description: t("globalAccessDesc"),
            },
            {
              icon: FaUsers,
              title: t("communityDriven"),
              description: t("communityDrivenDesc"),
            },
            {
              icon: FaHeart,
              title: t("loveUmmah"),
              description: t("loveUmmahDesc"),
            },
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-emerald-100 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <IconComponent className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="text-emerald-700 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 shadow-2xl max-w-4xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              "{t("seekKnowledge")}"
            </h3>
            <p className="text-emerald-100 text-lg mb-6">{t("joinMission")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-amber-300 font-bold text-2xl">1000+</span>
                <p className="text-emerald-100">{t("booksAvailable")}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-amber-300 font-bold text-2xl">50+</span>
                <p className="text-emerald-100">{t("categories")}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                <span className="text-amber-300 font-bold text-2xl">24/7</span>
                <p className="text-emerald-100">{t("freeAccess")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
