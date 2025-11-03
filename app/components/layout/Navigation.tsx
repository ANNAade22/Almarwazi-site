"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Logo from "../Logo";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverDarkBackground, setIsOverDarkBackground] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    return pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Check if scrolled past 100px to make navbar sticky
      setIsScrolled(scrollY > 100);

      // Check if we're over the hero section (first 100vh)
      const heroSection = document.querySelector("section");
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // If hero section is still visible (top is above 100px from top of viewport)
        setIsOverDarkBackground(rect.top <= 100);
      } else {
        // If no hero section found, assume light background
        setIsOverDarkBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when mobile menu closes
  useEffect(() => {
    if (!isMenuOpen) {
      setIsAboutDropdownOpen(false);
    }
  }, [isMenuOpen]);

  // Close dropdown when on about page
  useEffect(() => {
    if (isActive("/about")) {
      setIsAboutDropdownOpen(false);
    }
  }, [pathname]);

  // Get text color based on scroll state
  const getTextColor = () => {
    return isScrolled ? "text-yellow-400" : "text-gray-800";
  };

  const getHoverColor = () => {
    return isScrolled ? "hover:text-yellow-300" : "hover:text-green-600";
  };

  const getActiveColor = () => {
    return "text-green-500";
  };

  // About page sections for dropdown
  const aboutSections = [
    { id: "president-message", label: "كلمة رئيس الجامعة", icon: "👤" },
    { id: "establishment", label: "نشأة الجامعة", icon: "🏛️" },
    { id: "mission-vision", label: "الرسالة والرؤية", icon: "🎯" },
    { id: "goals", label: "الأهداف العامة للجامعة", icon: "📋" },
    { id: "features", label: "الميزات والخصائص", icon: "⭐" },
    { id: "principles", label: "المبادئ الأساسية", icon: "💎" },
    { id: "structure", label: "الهيكل الإداري", icon: "🏢" },
  ];

  // Handle navigation to about section with smooth scroll
  const handleSectionClick = (sectionId: string) => {
    setIsAboutDropdownOpen(false);
    setIsMenuOpen(false);

    if (pathname === "/about") {
      // Already on about page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Navigate to about page with hash
      router.push(`/about#${sectionId}`);
      // Scroll after navigation completes
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <div
      className={`${
        isScrolled ? "fixed top-4 left-4 right-4 z-50" : "relative w-full z-50"
      } transition-all duration-700 ease-out`}
      style={{
        background: isScrolled
          ? "rgba(255, 255, 255, 0.15)"
          : "rgba(255, 255, 255, 0.1)",
        borderRadius: isScrolled ? "25px" : "0px",
        boxShadow: isScrolled
          ? "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)"
          : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: isScrolled
          ? "1px solid rgba(255, 255, 255, 0.3)"
          : "1px solid rgba(255, 255, 255, 0.2)",
        transform: isScrolled ? "translateY(0)" : "translateY(0)",
      }}
    >
      <div className="container mx-auto px-4 py-2" dir="rtl">
        <div className="flex justify-between items-center relative">
          {/* Logo and University Name - Left side on large screens */}
          <div className="flex items-center gap-3">
            <Logo />
            {/* University Name - Next to logo on large screens */}
            <span
              className={`hidden lg:block text-lg md:text-xl font-bold ${getTextColor()}`}
            >
              جامعة الإمام المروزي
            </span>
          </div>

          {/* University Name - Centered on mobile only */}
          <span
            className={`lg:hidden absolute left-1/2 transform -translate-x-1/2 text-lg font-bold ${getTextColor()}`}
          >
            جامعة الإمام المروزي
          </span>

          {/* Tablet Navigation */}
          <nav className="hidden lg:flex xl:hidden items-center space-x-reverse space-x-4">
            <Link
              href="/"
              className={`font-medium py-1 px-2 rounded-lg transition-all duration-300 text-sm ${
                isActive("/")
                  ? getActiveColor()
                  : `${getTextColor()} ${getHoverColor()}`
              }`}
            >
              الرئيسية
            </Link>
            <div
              className="relative inline-block"
              onMouseEnter={() =>
                !isActive("/about") && setIsAboutDropdownOpen(true)
              }
              onMouseLeave={() => setIsAboutDropdownOpen(false)}
            >
              <Link
                href="/about"
                className={`font-medium py-1 px-2 rounded-lg transition-all duration-300 text-sm ${
                  isActive("/about")
                    ? getActiveColor()
                    : `${getTextColor()} ${getHoverColor()}`
                }`}
              >
                عن الجامعة
              </Link>

              {/* Dropdown Menu - Only show when not on about page */}
              {isAboutDropdownOpen && !isActive("/about") && (
                <div
                  className="absolute top-full right-0 w-64 rounded-xl shadow-2xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                    zIndex: 9999,
                    paddingTop: "8px",
                  }}
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                >
                  <div className="py-2">
                    {aboutSections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className="w-full text-right px-4 py-3 hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-600 font-medium text-sm"
                        style={{
                          borderBottom:
                            index < aboutSections.length - 1
                              ? "1px solid rgba(0, 0, 0, 0.05)"
                              : "none",
                        }}
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/album"
              className={`font-medium py-1 px-2 rounded-lg transition-all duration-300 text-sm ${
                isActive("/album")
                  ? getActiveColor()
                  : `${getTextColor()} ${getHoverColor()}`
              }`}
            >
              الألبوم
            </Link>
            <Link
              href="/deanships"
              className={`font-medium py-1 px-2 rounded-lg transition-all duration-300 text-sm ${
                isActive("/deanships")
                  ? getActiveColor()
                  : `${getTextColor()} ${getHoverColor()}`
              }`}
            >
              العمادات
            </Link>
            <Link
              href="/courses"
              className={`font-medium py-1 px-2 rounded-lg transition-all duration-300 text-sm ${
                isActive("/courses")
                  ? getActiveColor()
                  : `${getTextColor()} ${getHoverColor()}`
              }`}
            >
              الكليات
            </Link>
            <Link
              href="/contact"
              className={`font-medium py-1 px-2 rounded-lg transition-all duration-300 text-sm ${
                isActive("/contact")
                  ? getActiveColor()
                  : `${getTextColor()} ${getHoverColor()}`
              }`}
            >
              اتصل بنا
            </Link>
          </nav>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-reverse space-x-6">
            <Link
              href="/"
              className={`font-medium py-1 px-3 rounded-lg transition-all duration-300 ${
                isActive("/")
                  ? getActiveColor()
                  : `${getTextColor()} ${getHoverColor()}`
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
            <div
              className="relative inline-block"
              onMouseEnter={() =>
                !isActive("/about") && setIsAboutDropdownOpen(true)
              }
              onMouseLeave={() => setIsAboutDropdownOpen(false)}
            >
              <Link
                href="/about"
                className={`font-medium py-1 px-3 rounded-lg transition-all duration-300 ${
                  isActive("/about")
                    ? getActiveColor()
                    : `${getTextColor()} ${getHoverColor()}`
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

              {/* Dropdown Menu - Only show when not on about page */}
              {isAboutDropdownOpen && !isActive("/about") && (
                <div
                  className="absolute top-full right-0 w-64 rounded-xl shadow-2xl"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                    zIndex: 9999,
                    paddingTop: "8px",
                  }}
                  onMouseEnter={() => setIsAboutDropdownOpen(true)}
                  onMouseLeave={() => setIsAboutDropdownOpen(false)}
                >
                  <div className="py-2">
                    {aboutSections.map((section, index) => (
                      <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className="w-full text-right px-4 py-3 hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-600 font-medium"
                        style={{
                          borderBottom:
                            index < aboutSections.length - 1
                              ? "1px solid rgba(0, 0, 0, 0.05)"
                              : "none",
                        }}
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/album"
              className={`font-medium py-1 px-3 rounded-lg transition-all duration-300 ${
                isActive("/album")
                  ? getActiveColor()
                  : `${getTextColor()} ${getHoverColor()}`
              }`}
              style={
                isActive("/album")
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
              الألبوم
            </Link>
            <Link
              href="/deanships"
              className={`font-medium py-1 px-3 rounded-lg transition-all duration-300 ${
                isActive("/deanships")
                  ? getActiveColor()
                  : `${getTextColor()} ${getHoverColor()}`
              }`}
              style={
                isActive("/deanships")
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
              العمادات
            </Link>
            <Link
              href="/courses"
              className={`font-medium py-1 px-3 rounded-lg transition-all duration-300 ${
                isActive("/courses")
                  ? getActiveColor()
                  : `${getTextColor()} ${getHoverColor()}`
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
              الكليات
            </Link>
            <Link
              href="/contact"
              className={`font-medium py-1 px-3 rounded-lg transition-all duration-300 ${
                isActive("/contact")
                  ? getActiveColor()
                  : `${getTextColor()} ${getHoverColor()}`
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

          {/* CTA Button */}
          <div className="hidden xl:flex items-center space-x-reverse space-x-4">
            <Link
              href="/contact"
              className={`px-4 py-1.5 rounded-lg font-medium transition-all duration-300 ${getTextColor()} ${getHoverColor()}`}
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
            className={`lg:hidden focus:outline-none p-2 ${getTextColor()} ${getHoverColor()}`}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="lg:hidden"
          onMouseLeave={() => setIsAboutDropdownOpen(false)}
        >
          <div className="container mx-auto px-4">
            <nav
              className="flex flex-col space-y-4 py-6 text-center rounded-2xl mx-2 mb-4"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <Link
                href="/"
                className={`font-medium py-2 ${
                  isActive("/")
                    ? `${getActiveColor()} font-semibold`
                    : getTextColor()
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                الرئيسية
              </Link>
              <div className="relative">
                <button
                  className={`font-medium py-2 w-full text-center ${
                    isActive("/about")
                      ? `${getActiveColor()} font-semibold`
                      : getTextColor()
                  }`}
                  onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
                >
                  عن الجامعة
                </button>

                {/* Mobile Dropdown Menu */}
                {isAboutDropdownOpen && (
                  <div className="mt-2 pr-4 space-y-1">
                    {aboutSections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => handleSectionClick(section.id)}
                        className="w-full text-right py-2 px-4 text-sm text-gray-600 hover:text-green-600 transition-colors"
                      >
                        {section.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="/album"
                className={`font-medium py-2 ${
                  isActive("/album")
                    ? `${getActiveColor()} font-semibold`
                    : getTextColor()
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                الألبوم
              </Link>
              <Link
                href="/deanships"
                className={`font-medium py-2 ${
                  isActive("/deanships")
                    ? `${getActiveColor()} font-semibold`
                    : getTextColor()
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                العمادات
              </Link>
              <Link
                href="/courses"
                className={`font-medium py-2 ${
                  isActive("/courses")
                    ? `${getActiveColor()} font-semibold`
                    : getTextColor()
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                الكليات
              </Link>
              <Link
                href="/contact"
                className={`font-medium py-2 ${
                  isActive("/contact")
                    ? `${getActiveColor()} font-semibold`
                    : getTextColor()
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                اتصل بنا
              </Link>
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-primary text-white rounded-lg font-medium transition-all duration-300 text-center mt-4 hover:bg-primary/90 w-fit mx-auto"
                onClick={() => setIsMenuOpen(false)}
              >
                سجل الآن
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
