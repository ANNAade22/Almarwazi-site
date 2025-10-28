"use client";
import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect, useRef } from "react";

// Extend Window interface to include custom timeout property
declare global {
  interface Window {
    footerResetTimeout?: ReturnType<typeof setTimeout>;
  }
}

export default function FooterSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let wheelDelta = 0;
    let isAtBottom = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we're at the bottom of the page
      isAtBottom = currentScrollY + windowHeight >= documentHeight - 10;

      if (isAtBottom) {
        // Show footer when at bottom, but keep it hidden initially
        setShowFooter(true);
        setScrollProgress(0); // Start completely hidden
      } else {
        // Hide footer when not at bottom
        setShowFooter(false);
        setScrollProgress(0);
        wheelDelta = 0; // Reset wheel delta
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (isAtBottom && e.deltaY > 0) {
        e.preventDefault();

        // Accumulate wheel delta for smoother effect
        wheelDelta += e.deltaY;
        const maxDelta = 200; // Reduced for more responsive effect
        const progress = Math.min(wheelDelta / maxDelta, 1);

        setShowFooter(true);
        setScrollProgress(progress);

        // Clear any existing timeout
        if (window.footerResetTimeout) {
          clearTimeout(window.footerResetTimeout);
        }

        // Gradually reset the delta for smooth return - slower reset
        window.footerResetTimeout = setTimeout(() => {
          wheelDelta = Math.max(0, wheelDelta - 20); // Slower reset
          if (wheelDelta > 0) {
            const newProgress = Math.min(wheelDelta / maxDelta, 1);
            setScrollProgress(newProgress);
            // Continue the reset process
            window.footerResetTimeout = setTimeout(() => {
              wheelDelta = Math.max(0, wheelDelta - 20);
              if (wheelDelta > 0) {
                const newProgress = Math.min(wheelDelta / maxDelta, 1);
                setScrollProgress(newProgress);
              } else {
                setScrollProgress(0);
              }
            }, 100);
          } else {
            setScrollProgress(0);
          }
        }, 200); // Longer delay before starting reset
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      if (window.footerResetTimeout) {
        clearTimeout(window.footerResetTimeout);
      }
    };
  }, []);

  // Keep the intersection observer for the fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    config: { tension: 280, friction: 60 },
  });

  const slideIn = useSpring({
    transform: showFooter
      ? `translateY(${(1 - scrollProgress) * 100}%)`
      : "translateY(100%)",
    config: {
      tension: 500,
      friction: 15,
      mass: 0.3,
    },
  });

  return (
    <>
      {/* Spacer to prevent content from going behind fixed footer */}
      <div className="h-[500px] bg-primary"></div>
      
      <animated.footer
        ref={sectionRef}
        style={slideIn}
        className="fixed bottom-0 left-0 right-0 bg-primary text-white z-50"
      >
        <animated.div
          style={fadeIn}
          className="container mx-auto px-6 font-arabic"
        >
        <div className="py-8 sm:py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 text-right">
          {/* About Section */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">
              جامعة المروزي
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base lg:text-lg">
              رسالة الجامعة: الكتاب والسنه علي فهم سلف الامة بالفصحى العربيه
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">
              روابط سريعة
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-right text-sm sm:text-base lg:text-lg">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  عن الجامعة
                </Link>
              </li>
              <li>
                <Link
                  href="/courses"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  البرامج الدراسية
                </Link>
              </li>
              <li>
                <Link
                  href="/admission"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  القبول والتسجيل
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  الأخبار والفعاليات
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">
              معلومات الاتصال
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-300 text-right text-sm sm:text-base lg:text-lg">
              <li>مقديشوا, الصومال</li>
              <li>هاتف: 966-11-000-0000+</li>
              <li>البريد الإلكتروني: info@almarwazi.edu</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-4 sm:mb-6">
              تواصل معنا
            </h3>
            <div className="flex justify-start gap-4 sm:gap-6">
              <Link
                href="#"
                className="text-gray-300 hover:text-secondary transition-colors transform hover:scale-110 duration-200"
              >
                <span className="sr-only">WhatsApp</span>
                <svg
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-secondary transition-colors transform hover:scale-110 duration-200"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-300 hover:text-secondary transition-colors transform hover:scale-110 duration-200"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-4 sm:py-6 lg:py-8 text-center text-gray-300 text-sm sm:text-base lg:text-lg">
          <p>جميع الحقوق محفوظة لجامعة المروزي ©{new Date().getFullYear()}</p>
        </div>
      </animated.div>
    </animated.footer>
    </>
  );
}
