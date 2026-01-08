"use client";
import { useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext";

const DirectionHandler = () => {
  const { language } = useLanguage();

  useEffect(() => {
    // Set direction on body and html tags
    const direction = language === "ur" ? "rtl" : "ltr";
    const lang = language === "ur" ? "ur" : "en";

    console.log("Setting direction:", direction, "for language:", lang);

    // Remove any existing direction attributes first
    document.documentElement.removeAttribute("dir");
    document.body.removeAttribute("dir");

    // Set new direction attributes
    document.documentElement.setAttribute("dir", direction);
    document.documentElement.setAttribute("lang", lang);
    document.body.setAttribute("dir", direction);

    // Add RTL-specific styles
    const styleId = "rtl-styles";
    let style = document.getElementById(styleId);

    if (!style) {
      style = document.createElement("style");
      style.id = styleId;
      document.head.appendChild(style);
    }

    style.textContent = `
      [dir="rtl"] {
        text-align: right;
        direction: rtl;
        font-family: var(--font-urdu), sans-serif;
      }
      [dir="rtl"] .text-left {
        text-align: right;
      }
      [dir="rtl"] .text-right {
        text-align: left;
      }
      [dir="rtl"] .text-start {
        text-align: right;
      }
      [dir="rtl"] .text-end {
        text-align: left;
      }
      [dir="rtl"] .ltr\\:text-left {
        text-align: right;
      }
      [dir="rtl"] .ltr\\:text-right {
        text-align: left;
      }
      [dir="ltr"] {
        text-align: left;
        direction: ltr;
      }
    `;

    return () => {
      // Cleanup on unmount
      if (style && style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [language]);

  return null;
};

export default DirectionHandler;
