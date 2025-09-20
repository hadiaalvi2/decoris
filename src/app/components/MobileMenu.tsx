"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-2 sm:p-4 focus:outline-none">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <img
                src="/assets/grid.svg"
                alt="Grid"
                width={18}
                height={18}
                className="opacity-100 sm:w-5 sm:h-5"
              />
              <img
                src="/assets/Decoris P.svg"
                alt="Decoris Logo"
                width={70}
                height={14}
                className="opacity-60 sm:w-20 sm:h-4"
              />
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <img src="/assets/profile.svg" alt="Profile" width={14} height={16} className="opacity-60 sm:w-4 sm:h-5" />
              <img src="/assets/favourite.svg" alt="Favourites" width={18} height={16} className="opacity-60 sm:w-5 sm:h-5" />
              <img src="/assets/BAG.svg" alt="Bag" width={14} height={16} className="opacity-60 sm:w-4 sm:h-5" />
            </div>
          </div>

          {/* Menu Items */}
          <div className="flex-1 px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto">
            <nav className="space-y-4 sm:space-y-6">
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1">INTERIOR</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1">OUTDOOR</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1">FURNITURE</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1">DECOR</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1">LIFESTYLE</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1">OTHER</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1">ABOUT</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1">SHIPPING</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1">CONTACT</a>
            </nav>
          </div>

          {/* Footer */}
          <div className="px-3 py-4 sm:px-4 sm:py-6 border-t border-gray-200 mt-auto">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>EUROS | ENGLISH</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">© COPYRIGHT 2021 DECORIS ARTFUL UK. SOUTH KENSINGTON.</p>
          </div>
        </div>
      )}
    </div>
  );
}