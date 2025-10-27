"use client";
import Logo from "../Logo";
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
      <div
        className="mx-4 my-2"
        style={{
          background: "transparent",
          borderRadius: "50px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Logo />
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-reverse space-x-8">
              <Link
                href="/"
                className={`font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive("/")
                    ? "text-primary"
                    : "text-gray-700 hover:text-[#93a694]"
                }`}
                style={
                  isActive("/")
                    ? {
                        background: "transparent",
                        borderRadius: "50px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(15px)",
                        WebkitBackdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }
                    : {}
                }
              >
                الرئيسية
              </Link>
              <Link
                href="/about"
                className={`font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive("/about")
                    ? "text-primary"
                    : "text-gray-700 hover:text-[#93a694]"
                }`}
                style={
                  isActive("/about")
                    ? {
                        background: "transparent",
                        borderRadius: "50px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(15px)",
                        WebkitBackdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }
                    : {}
                }
              >
                عن الجامعة
              </Link>
              <Link
                href="/courses"
                className={`font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive("/courses")
                    ? "text-primary"
                    : "text-gray-700 hover:text-[#93a694]"
                }`}
                style={
                  isActive("/courses")
                    ? {
                        background: "transparent",
                        borderRadius: "50px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(15px)",
                        WebkitBackdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }
                    : {}
                }
              >
                الدورات
              </Link>
              <Link
                href="/blog"
                className={`font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive("/blog")
                    ? "text-primary"
                    : "text-gray-700 hover:text-[#93a694]"
                }`}
                style={
                  isActive("/blog")
                    ? {
                        background: "transparent",
                        borderRadius: "50px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(15px)",
                        WebkitBackdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }
                    : {}
                }
              >
                المدونة
              </Link>
              <Link
                href="/contact"
                className={`font-medium py-2 px-3 rounded-lg transition-all duration-300 ${
                  isActive("/contact")
                    ? "text-primary"
                    : "text-gray-700 hover:text-[#93a694]"
                }`}
                style={
                  isActive("/contact")
                    ? {
                        background: "transparent",
                        borderRadius: "50px",
                        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(15px)",
                        WebkitBackdropFilter: "blur(15px)",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                      }
                    : {}
                }
              >
                اتصل بنا
              </Link>
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-reverse space-x-4">
              <Link
                href="/contact"
                className="px-5 py-2.5 text-primary rounded-lg font-medium transition-all duration-300"
                style={{
                  background: "transparent",
                  borderRadius: "50px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(15px)",
                  WebkitBackdropFilter: "blur(15px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
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
      <div
        className="mx-4 mb-2"
        style={{
          background: "transparent",
          borderRadius: "50px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <div className="container mx-auto px-4">
          {isMenuOpen ? (
            <nav
              className="lg:hidden flex flex-col space-y-3 py-4 text-right rounded-lg mx-2 mb-2"
              style={{
                background: "transparent",
                borderRadius: "50px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(15px)",
                WebkitBackdropFilter: "blur(15px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              <Link
                href="/"
                className={`font-medium py-3 ${
                  isActive("/") ? "text-primary font-semibold" : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <Link
                href="/about"
                className={`font-medium py-3 ${
                  isActive("/about")
                    ? "text-primary font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                عن الجامعة
              </Link>
              <Link
                href="/courses"
                className={`font-medium py-3 ${
                  isActive("/courses")
                    ? "text-primary font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                الدورات
              </Link>
              <Link
                href="/blog"
                className={`font-medium py-3 ${
                  isActive("/blog")
                    ? "text-primary font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                المدونة
              </Link>
              <Link
                href="/contact"
                className={`font-medium py-3 ${
                  isActive("/contact")
                    ? "text-primary font-semibold"
                    : "text-gray-700"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                اتصل بنا
              </Link>
              <Link
                href="/contact"
                className="inline-block px-5 py-2.5 text-primary rounded-lg font-medium transition-all duration-300 text-center mt-4"
                style={{
                  background: "transparent",
                  borderRadius: "50px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(15px)",
                  WebkitBackdropFilter: "blur(15px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
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
