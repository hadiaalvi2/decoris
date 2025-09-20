"use client";

import { useState } from "react";
import Image from "next/image";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      {/* Grid Icon Button - Only visible on mobile */}
      <button 
        onClick={toggleMenu} 
        className="p-1 focus:outline-none"
        aria-label="Toggle menu"
      >
        <Image
          src="/assets/grid.svg"
          alt="Menu"
          width={18}
          height={18}
          className="sm:w-5 sm:h-5 opacity-100 hover:opacity-80 transition-opacity"
        />
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-3 sm:px-4 sm:py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/grid.svg"
                alt="Grid"
                width={18}
                height={18}
                className="opacity-100 sm:w-5 sm:h-5"
              />
              <Image
                src="/assets/Decoris P.svg"
                alt="Decoris Logo"
                width={70}
                height={14}
                className="opacity-60 sm:w-20 sm:h-4"
              />
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Image src="/assets/profile.svg" alt="Profile" width={14} height={16} className="opacity-60 sm:w-4 sm:h-5" />
              <Image src="/assets/favourite.svg" alt="Favourites" width={18} height={16} className="opacity-60 sm:w-5 sm:h-5" />
              <Image src="/assets/BAG.svg" alt="Bag" width={14} height={16} className="opacity-60 sm:w-4 sm:h-5" />
            </div>
          </div>

          {/* Back Arrow */}
          <div className="px-3 py-2 sm:px-4 border-b border-gray-100">
            <button 
              onClick={toggleMenu}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <svg 
                width="16" 
                height="16" 
                className="sm:w-5 sm:h-5 mr-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 px-3 py-4 sm:px-4 sm:py-6 overflow-y-auto">
            <nav className="space-y-4 sm:space-y-6">
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1 border-b border-gray-100 pb-3">INTERIOR</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1 border-b border-gray-100 pb-3">OUTDOOR</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1 border-b border-gray-100 pb-3">FURNITURE</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1 border-b border-gray-100 pb-3">DECOR</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1 border-b border-gray-100 pb-3">LIFESTYLE</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1 border-b border-gray-100 pb-3">OTHER</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1 border-b border-gray-100 pb-3">ABOUT</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1 border-b border-gray-100 pb-3">SHIPPING</a>
              <a href="#" className="block text-xs sm:text-sm font-normal text-gray-800 hover:text-gray-600 tracking-widest py-1">CONTACT</a>
            </nav>
          </div>

          {/* Footer */}
          <div className="px-3 py-4 sm:px-4 sm:py-6 border-t border-gray-200 mt-auto">
            <div className="flex justify-between items-center text-xs text-gray-500 mb-2">
              <span>TERMS</span>
              <span>PRIVACY</span>
            </div>
            <p className="text-xs text-gray-400 text-center">© COPYRIGHT 2021 DECORIS LIMITED. ALL RIGHTS RESERVED.</p>
          </div>
        </div>
      )}
    </div>
  );
}