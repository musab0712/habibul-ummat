"use client";
import React from "react";

const TopBar = () => {
  return (
    <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 border-b border-emerald-700/30 py-3 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-700/10 via-transparent to-transparent"></div>

      <div className="max-w-8xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
          {/* English Name - Left aligned on desktop, centered on mobile */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <h3 className="text-2xl lg:text-3xl font-bold text-amber-300 tracking-wide drop-shadow-lg">
              Mufti Habibullah Qasmi
            </h3>
            <p className="text-emerald-200 text-sm mt-1 font-light tracking-wider">
              Islamic Scholar & Researcher
            </p>
          </div>

          {/* Center Logo/Image */}
          <div className="flex justify-center order-1 lg:order-2">
            <div className="relative group">
              <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
              <img
                src="/bismillah.png"
                alt="Mufti Habibullah Qasmi"
                width={180}
                height={90}
                className="relative z-10 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Urdu Name - Right aligned on desktop, centered on mobile */}
          <div className="text-center lg:text-right order-3">
            <h3 className="text-2xl lg:text-3xl font-bold text-amber-300 tracking-wide drop-shadow-lg">
              مفتی حبیب اللہ قاسمی
            </h3>
            <p className="text-emerald-200 text-sm mt-1 font-light tracking-wider">
              عالم دین و محقق
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
