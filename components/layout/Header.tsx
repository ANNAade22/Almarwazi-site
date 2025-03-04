"use client";
import Logo from "../ui/Logo";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50" dir="rtl">
      <div className="bg-gradient-to-b from-white via-white to-[#e3fae5]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-reverse space-x-8">
              <Link
                href="/"
                className={`font-medium py-2 border-b-2 ${
                  isActive("/")
                    ? "text-primary border-primary"
                    : "text-gray-700 hover:text-[#93a694] border-transparent"
                }`}
              >
                الرئيسية
              </Link>
              <Link
                href="/about"
                className={`font-medium py-2 border-b-2 ${
                  isActive("/about")
                    ? "text-primary border-primary"
                    : "text-gray-700 hover:text-[#93a694] border-transparent"
                }`}
              >
                عن الجامعة
              </Link>
              <Link
                href="/courses"
                className={`font-medium py-2 border-b-2 ${
                  isActive("/courses")
                    ? "text-primary border-primary"
                    : "text-gray-700 hover:text-[#93a694] border-transparent"
                }`}
              >
                الدورات
              </Link>
              <Link
                href="/blog"
                className={`font-medium py-2 border-b-2 ${
                  isActive("/blog")
                    ? "text-primary border-primary"
                    : "text-gray-700 hover:text-[#93a694] border-transparent"
                }`}
              >
                المدونة
              </Link>
              <Link
                href="/contact"
                className={`font-medium py-2 border-b-2 ${
                  isActive("/contact")
                    ? "text-primary border-primary"
                    : "text-gray-700 hover:text-[#93a694] border-transparent"
                }`}
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
              className="lg:hidden text-gray-700 focus:outline-none p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
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
        </div>
      </div>

      {/* Lower section */}
      <div className="bg-[#e3fae5] shadow-sm">
        <div className="container mx-auto px-4">
          {isMenuOpen ? (
            <nav className="lg:hidden flex flex-col space-y-3 py-4 text-right">
              <Link
                href="/"
                className={`font-medium py-3 border-b border-gray-100 ${
                  isActive("/") ? "text-primary font-semibold" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              {/* Other links with similar padding and border */}
              {/* ... */}
              <Link
                href="/contact"
                className="inline-block px-5 py-2.5 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors text-center mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                سجل الآن
              </Link>
            </nav>
          ) : (
            <div className="h-2"></div>
          )}
        </div>
      </div>
    </header>
  );
}
