import { LanguageProvider } from "../../context/LanguageContext";
import TopBar from "../../components/frontend/layout/Topbar";
import Header from "../../components/frontend/layout/Header";
import Footer from "../../components/frontend/layout/Footer";
import DirectionHandler from "@/components/frontend/layout/DirectionHandler";

export const metadata = {
  title: "Mufti Habibullah Qasmi - Islamic Scholar",
  description:
    "Official website of Mufti Habibullah Qasmi - Islamic scholar, researcher, and spiritual guide",
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params;

  return (
    <LanguageProvider initialLanguage={lang}>
      <DirectionHandler />
      <div className="min-h-screen flex flex-col">
        <TopBar />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
