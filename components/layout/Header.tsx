"use client";
import Logo from "../ui/Logo";
import Link from "next/link";
import { useState } from "react";
// import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" dir="rtl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-reverse space-x-8">
            <Link
              href="/"
              className="font-medium text-gray-700 hover:text-[#93a694] py-2"
            >
              الرئيسية
            </Link>
            <Link
              href="/about"
              className="font-medium text-gray-700 hover:text-[#93a694] py-2"
            >
              عن الجامعة
            </Link>
            <Link
              href="/courses"
              className="font-medium text-gray-700 hover:text-[#93a694] py-2"
            >
              الدورات
            </Link>
            <Link
              href="/blog"
              className="font-medium text-gray-700 hover:text-[#93a694] py-2"
            >
              المدونة
            </Link>
            <Link
              href="/contact"
              className="font-medium text-gray-700 hover:text-[#93a694] py-2"
            >
              اتصل بنا
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-reverse space-x-4">
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              سجل الآن
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-3 mt-4 text-right">
              <Link
                href="/"
                className="font-medium text-gray-700 hover:text-[#93a694] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                href="/about"
                className="font-medium text-gray-700 hover:text-[#93a694] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                عن الجامعة
              </Link>
              <Link
                href="/courses"
                className="font-medium text-gray-700 hover:text-[#93a694] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                الدورات
              </Link>
              <Link
                href="/blog"
                className="font-medium text-gray-700 hover:text-[#93a694] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                المدونة
              </Link>
              <Link
                href="/contact"
                className="font-medium text-gray-700 hover:text-[#93a694] py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                اتصل بنا
              </Link>
              <div className="flex justify-end">
                <Link
                  href="/contact"
                  className="inline-block px-5 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  سجل الآن
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
