"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FaHome,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaFileAlt,
  FaGraduationCap,
  FaHeart,
  FaBuilding,
  FaVolumeUp,
  FaImage,
  FaPhone,
  FaBookOpen,
} from "react-icons/fa";
import { useLanguage } from "../../../context/LanguageContext";

const Header = () => {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    {
      id: "home",
      label: language === "ur" ? "ہوم" : "Home",
      icon: FaHome,
      href: "/",
    },
    {
      id: "about",
      label: language === "ur" ? "ہمارے بارے میں" : "About",
      icon: FaInfoCircle,
      href: "/about",
    },
    {
      id: "fatwa",
      label: language === "ur" ? "شرعی مسائل" : "Fatwa",
      icon: FaFileAlt,
      href: "/fatwa",
    },
    {
      id: "maktab",
      label: language === "ur" ? "مكتبه" : "Maktaba",
      icon: FaGraduationCap,
      href: "/maktab",
    },
    {
      id: "jamia",
      label:
        language === "ur" ? "دار العلوم مہذب پور" : "Darul Uloom Muhajjabpur",
      icon: FaBuilding,
      href: "/jamia",
    },
    {
      id: "trust",
      label: language === "ur" ? "الحبیب ٹرسٹ" : "Al-Habib Trust",
      icon: FaHeart,
      href: "/trust",
    },
    {
      id: "khanaqah",
      label: language === "ur" ? "خانقاہ" : "Khanqaah",
      icon: FaHeart,
      href: "/khanaqah",
    },
    {
      id: "media",
      label: language === "ur" ? "میڈیا" : "Media",
      icon: FaVolumeUp,
      href: "/media",
      dropdown: [
        // {
        //   id: "audio",
        //   label: language === "ur" ? "آڈیو" : "Audio",
        //   icon: FaVolumeUp,
        //   href: "/audio",
        // },
        {
          id: "video",
          label: language === "ur" ? "ویڈیو" : "Video",
          icon: FaVolumeUp,
          href: "/videos",
        },
        {
          id: "gallery",
          label: language === "ur" ? "گیلری" : "Gallery",
          icon: FaImage,
          href: "/gallery",
        },
      ],
    },
    {
      id: "contact",
      label: language === "ur" ? "ہم سے رابطہ کریں" : "Contact",
      icon: FaPhone,
      href: "/contact",
    },
  ];

  const isActiveLink = (href) => {
    if (href === "/") {
      return pathname === `/${language}` || pathname === `/`;
    }
    return pathname.includes(href);
  };

  const toggleDropdown = (itemId) => {
    setOpenDropdown(openDropdown === itemId ? null : itemId);
  };

  const handleLanguageChange = (newLang) => {
    console.log("Changing language to:", newLang);

    // Update the language in context
    setLanguage(newLang);

    // Update the URL to reflect language change with proper navigation
    const currentPath = pathname;
    let newPath;

    if (currentPath.startsWith("/en") || currentPath.startsWith("/ur")) {
      // Replace the language part of the path
      newPath = currentPath.replace(/^\/(en|ur)/, `/${newLang}`);
    } else {
      // If no language in path (shouldn't happen but just in case)
      newPath = `/${newLang}${currentPath === "/" ? "" : currentPath}`;
    }

    console.log("Navigating to:", newPath);

    // Use router.push for proper navigation
    router.push(newPath);
  };

  const handleNavClick = (href) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  return (
    <header className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-800 shadow-2xl sticky top-0 z-50 border-b border-emerald-600/30">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center py-3 ${
            language === "ur" ? "justify-start" : "justify-between"
          }`}
        >
          <div
            className={`flex items-center space-x-4 ${
              language === "ur" ? "" : ""
            }`}
          >
            {/* Language Toggle */}
            <div className="flex items-center bg-emerald-600/80 backdrop-blur-sm rounded-xl p-1 border border-emerald-500/30">
              <button
                onClick={() => handleLanguageChange("en")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  language === "en"
                    ? "bg-amber-500 text-white shadow-lg transform scale-105"
                    : "text-amber-100 hover:text-white hover:bg-emerald-500/50"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageChange("ur")}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  language === "ur"
                    ? "bg-amber-500 text-white shadow-lg transform scale-105"
                    : "text-amber-100 hover:text-white hover:bg-emerald-500/50"
                }`}
              >
                اردو
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav
              className={`hidden xl:flex space-x-1 ${
                language === "ur" ? "" : ""
              }`}
              ref={dropdownRef}
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const hasDropdown = item.dropdown && item.dropdown.length > 0;
                const isActive = isActiveLink(item.href);

                if (hasDropdown) {
                  return (
                    <div key={item.id} className="relative">
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium group ${
                          language === "ur" ? "" : ""
                        } ${
                          isActive
                            ? "bg-amber-500 text-white shadow-lg transform scale-105"
                            : "text-amber-100 hover:bg-emerald-600/80 hover:text-white hover:shadow-md"
                        }`}
                      >
                        <Icon className="h-4 w-4 transform group-hover:scale-110 transition-transform" />
                        <span className="font-semibold">{item.label}</span>
                        <FaChevronDown
                          className={`h-3 w-3 transition-transform duration-300 ${
                            openDropdown === item.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {openDropdown === item.id && (
                        <div
                          className={`absolute top-full mt-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl border border-emerald-100/50 py-3 min-w-[180px] z-50 ${
                            language === "ur" ? "right-0" : "left-0"
                          }`}
                        >
                          {item.dropdown.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon;
                            return (
                              <Link
                                key={dropdownItem.id}
                                href={`/${language}${dropdownItem.href}`}
                                className={`w-full flex items-center space-x-3 px-4 py-3 text-emerald-800 hover:bg-amber-50 transition-all duration-200 group ${
                                  language === "ur" ? "" : ""
                                }`}
                                onClick={() => setOpenDropdown(null)}
                              >
                                <DropdownIcon className="h-4 w-4 text-emerald-600 transform group-hover:scale-110 transition-transform" />
                                <span className="font-medium">
                                  {dropdownItem.label}
                                </span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={`/${language}${item.href}`}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 text-sm font-medium group ${
                      language === "ur" ? "" : ""
                    } ${
                      isActive
                        ? "bg-amber-500 text-white shadow-lg transform scale-105"
                        : "text-amber-100 hover:bg-emerald-600/80 hover:text-white hover:shadow-md"
                    }`}
                    onClick={() => handleNavClick(item.href)}
                  >
                    <Icon className="h-4 w-4 transform group-hover:scale-110 transition-transform" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-3 rounded-xl bg-emerald-600/50 text-amber-100 hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-lg"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-emerald-700/95 backdrop-blur-sm rounded-xl mb-4 shadow-2xl border border-emerald-600/30">
            <div className="py-3 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const hasDropdown = item.dropdown && item.dropdown.length > 0;
                const isActive = isActiveLink(item.href);

                if (hasDropdown) {
                  return (
                    <div key={item.id}>
                      <button
                        onClick={() => toggleDropdown(item.id)}
                        className={`w-full flex items-center justify-between px-5 py-4 transition-all duration-300 rounded-lg mx-2 ${
                          language === "ur" ? "" : ""
                        } ${
                          isActive
                            ? "bg-amber-500 text-white shadow-lg"
                            : "text-amber-100 hover:bg-emerald-600"
                        }`}
                      >
                        <div
                          className={`flex items-center space-x-3 ${
                            language === "ur" ? "" : ""
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-semibold">{item.label}</span>
                        </div>
                        {hasDropdown && (
                          <FaChevronDown
                            className={`h-4 w-4 transition-transform duration-300 ${
                              openDropdown === item.id ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>

                      {hasDropdown && openDropdown === item.id && (
                        <div className="bg-emerald-800/80 py-2 mx-2 rounded-lg">
                          {item.dropdown.map((dropdownItem) => {
                            const DropdownIcon = dropdownItem.icon;
                            return (
                              <Link
                                key={dropdownItem.id}
                                href={`/${language}${dropdownItem.href}`}
                                className={`w-full flex items-center space-x-3 px-10 py-3 text-amber-100 hover:bg-emerald-700/50 transition-all duration-200 rounded-md ${
                                  language === "ur" ? "" : ""
                                }`}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setOpenDropdown(null);
                                }}
                              >
                                <DropdownIcon className="h-4 w-4" />
                                <span>{dropdownItem.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.id}
                    href={`/${language}${item.href}`}
                    className={`w-full flex items-center space-x-3 px-5 py-4 transition-all duration-300 rounded-lg mx-2 ${
                      language === "ur" ? "" : ""
                    } ${
                      isActive
                        ? "bg-amber-500 text-white shadow-lg"
                        : "text-amber-100 hover:bg-emerald-600"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
