import React from "react";
import {
  FaBullseye,
  FaEye,
  FaUsers,
  FaAward,
  FaBookOpen,
  FaGlobeAmericas,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const About = () => {
  const { t, language } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-6">
            {t("aboutMission")}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed">
            {t("missionText")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center mb-6">
              <FaBullseye className="h-8 w-8 text-amber-300 mr-3" />
              <h3 className="text-2xl font-bold">{t("ourMission")}</h3>
            </div>
            <p className="text-emerald-100 leading-relaxed text-lg">
              {language === "ur"
                ? "ایک جامع ڈیجیٹل اسلامی لائبریری بنانا جو مستند علم کی روشنی کا کام کرے، دنیا بھر کے مسلمانوں کو اسلامی علمی ورثے سے جوڑے۔ ہم معیاری اسلامی تعلیم کو ہر امتی کے لیے قابل رسائی بنانے کی کوشش کرتے ہیں، چاہے وہ کہیں بھی ہو اور اس کے اقتصادی حالات کیسے بھی ہوں۔"
                : "To create a comprehensive digital Islamic library that serves as a beacon of authentic knowledge, connecting Muslims across the globe with the rich heritage of Islamic scholarship. We strive to make quality Islamic education accessible to every member of our Ummah, regardless of their geographical location or economic circumstances."}
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center mb-6">
              <FaEye className="h-8 w-8 text-white mr-3" />
              <h3 className="text-2xl font-bold">{t("ourVision")}</h3>
            </div>
            <p className="text-amber-100 leading-relaxed text-lg">
              {language === "ur"
                ? "دنیا کی سب سے قابل اعتماد اور جامع اسلامی ڈیجیٹل لائبریری بننا، ایک عالمی کمیونٹی کو فروغ دینا جو مستند اسلامی علم سے بااختیار ہو۔ ہم ایک ایسے مستقبل کا تصور کرتے ہیں جہاں ہر مسلمان کو اسلامی علماء کی حکمت اور اسلامی ادب کی خوبصورتی تک فوری رسائی حاصل ہو۔"
                : "To become the world's most trusted and comprehensive Islamic digital library, fostering a global community of learners who are empowered with authentic Islamic knowledge. We envision a future where every Muslim has instant access to the wisdom of Islamic scholars and the beauty of Islamic literature."}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: FaBookOpen,
              title: t("authenticContent"),
              description: t("authenticContentDesc"),
            },
            {
              icon: FaGlobeAmericas,
              title: t("globalReach"),
              description: t("globalReachDesc"),
            },
            {
              icon: FaUsers,
              title: t("communityFocus"),
              description: t("communityFocusDesc"),
            },
          ].map((value, index) => {
            const IconComponent = value.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-xl border-2 border-emerald-100 hover:border-emerald-300 transition-all duration-300 hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-emerald-900 mb-4 text-center">
                  {value.title}
                </h3>
                <p className="text-emerald-700 text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 rounded-3xl p-12 shadow-2xl">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {language === "ur"
                ? "ہماری تنظیم کے بارے میں"
                : "About Our Organization"}
            </h3>
            <div className="w-20 h-1 bg-amber-400 mx-auto mb-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-white">
            <div>
              <h4 className="text-xl font-bold mb-4 text-amber-300">
                {language === "ur" ? "ہماری کہانی" : "Our Story"}
              </h4>
              <p className="leading-relaxed text-emerald-100 mb-6">
                {language === "ur"
                  ? "امت کی خدمت کے نیک ارادے سے قائم کیا گیا، مکتبہ حبیب الامت کی شروعات اسلامی متون کو آسان رسائی کے لیے ڈیجیٹائز کرنے کی ایک چھوٹی سی کوشش کے طور پر ہوئی۔ وقت کے ساتھ، یہ ایک جامع پلیٹ فارم میں تبدیل ہو گیا ہے جو ہزاروں مستند اسلامی کتابوں، مضامین، اور علمی کاموں کا گھر ہے۔"
                  : "Founded with the noble intention of serving the Ummah, Maqtaba Hibibul Ummat began as a small initiative to digitize Islamic texts for easier access. Over time, it has evolved into a comprehensive platform that houses thousands of authentic Islamic books, articles, and scholarly works."}
              </p>

              <h4 className="text-xl font-bold mb-4 text-amber-300">
                {language === "ur" ? "ہمارا عہد" : "Our Commitment"}
              </h4>
              <p className="leading-relaxed text-emerald-100">
                {language === "ur"
                  ? "ہم صداقت، رسائی، اور صارف کے تجربے کے اعلیٰ ترین معیارات کو برقرار رکھنے کے لیے پرعزم ہیں۔ ہماری وقف کار رضاکاروں اور علماء کی ٹیم اس بات کو یقینی بنانے کے لیے انتھک محنت کرتی ہے کہ ہر مواد ہمارے سخت معیاری رہنمائی کو پورا کرے۔"
                  : "We are committed to maintaining the highest standards of authenticity, accessibility, and user experience. Our team of dedicated volunteers and scholars work tirelessly to ensure that every piece of content meets our strict quality guidelines."}
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold mb-4 text-amber-300">
                {language === "ur" ? "ہم کیا پیش کرتے ہیں" : "What We Offer"}
              </h4>
              <ul className="space-y-3 text-emerald-100">
                {[
                  language === "ur"
                    ? "قرآن کے تراجم اور تفاسیر کا وسیع ذخیرہ"
                    : "Extensive collection of Quran translations and Tafseer",
                  language === "ur"
                    ? "تفصیلی وضاحت کے ساتھ مستند احادیث کے مجموعے"
                    : "Authentic Hadith collections with detailed explanations",
                  language === "ur"
                    ? "اسلامی فقہ اور قانونی احکام"
                    : "Islamic jurisprudence (Fiqh) and legal rulings",
                  language === "ur"
                    ? "نبی کریم ﷺ اور نیک پیشواؤں کی سوانح حیات"
                    : "Biographies of the Prophet (PBUH) and righteous predecessors",
                  language === "ur"
                    ? "معاصر اسلامی علمی کام اور تحقیق"
                    : "Contemporary Islamic scholarship and research",
                  language === "ur"
                    ? "بچوں اور بڑوں کے لیے تعلیمی وسائل"
                    : "Educational resources for children and adults",
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
