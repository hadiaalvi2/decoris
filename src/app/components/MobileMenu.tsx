
"use client";

import { useState } from "react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="md:hidden">
      <button onClick={toggleMenu} className="p-4 focus:outline-none">
        <svg
          className="w-6 h-6"
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
        <div className="absolute top-0 left-0 w-full h-full bg-white z-50 flex flex-col items-center justify-center space-y-4">
          <button onClick={toggleMenu} className="absolute top-4 right-4 p-4 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <a href="#" className="text-2xl font-semibold text-gray-800 hover:text-gray-600">INTERIOR</a>
          <a href="#" className="text-2xl font-semibold text-gray-800 hover:text-gray-600">OUTDOOR</a>
          <a href="#" className="text-2xl font-semibold text-gray-800 hover:text-gray-600">FURNITURE</a>
          <a href="#" className="text-2xl font-semibold text-gray-800 hover:text-gray-600">DECOR</a>
          <a href="#" className="text-2xl font-semibold text-gray-800 hover:text-gray-600">LIFESTYLE</a>
          <a href="#" className="text-2xl font-semibold text-gray-800 hover:text-gray-600">OTHER</a>
          <a href="#" className="text-2xl font-semibold text-gray-800 hover:text-gray-600">ABOUT</a>
          <a href="#" className="text-2xl font-semibold text-gray-800 hover:text-gray-600">SHIPPING</a>
          <a href="#" className="text-2xl font-semibold text-gray-800 hover:text-gray-600">CONTACT</a>
        </div>
      )}
    </div>
  );
}
