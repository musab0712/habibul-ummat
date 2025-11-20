// components/frontend/TestFont.js
"use client";
import { useLanguage } from "@/context/LanguageContext";

export default function TestFont() {
  const { language } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50 bg-black text-white p-4 rounded-lg text-sm">
      <div>Current Language: {language}</div>
      <div>Direction: {language === "ur" ? "RTL" : "LTR"}</div>
      <div className="mt-2 border-t pt-2">
        <div className="urdu-text">اردو فونٹ ٹیسٹ</div>
        <div className="english-text">English Font Test</div>
      </div>
    </div>
  );
}
