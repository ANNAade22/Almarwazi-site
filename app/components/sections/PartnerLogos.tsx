"use client";
import { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";

// Array of partner universities/brands
const partners = [
  { name: "جامعة الأزهر", nameEn: "Al-Azhar University", id: 1 },
  { name: "جامعة أم القرى", nameEn: "Umm Al-Qura University", id: 2 },
  { name: "جامعة المدينة", nameEn: "Al-Madinah University", id: 3 },
  { name: "جامعة دار السلام", nameEn: "Dar Al-Salam University", id: 4 },
];

export default function PartnerLogos() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    delay: 200,
    config: { tension: 280, friction: 60 },
  });

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 relative"
      style={{ backgroundColor: "#e3fae5" }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <animated.div
            style={fadeIn}
            className="text-center mb-12 md:mb-16 relative"
          >
            {/* Decorative top accent */}
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
              <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-primary relative inline-block">
              جامعاتنا الشريكة
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full opacity-30"></div>
            </h2>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mt-6">
              Our Partner Universities
            </p>
          </animated.div>

          {/* Partner Logos Grid */}
          <animated.div style={fadeIn}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {partners.map((partner, index) => (
                <animated.div
                  key={partner.id}
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0.9)",
                    transition: `all 0.5s ease ${index * 0.1}s`,
                  }}
                  className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-green-100 hover:border-green-300 overflow-hidden"
                >
                  {/* Gradient Background on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    {/* Icon/Logo Placeholder */}
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <span className="text-2xl font-bold text-white">
                        {partner.name.charAt(0)}
                      </span>
                    </div>

                    {/* Arabic Name */}
                    <h3 className="text-lg md:text-xl font-bold text-primary mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {partner.name}
                    </h3>

                    {/* English Name */}
                    <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                      {partner.nameEn}
                    </p>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-green-200 to-transparent opacity-50 rounded-bl-full"></div>
                </animated.div>
              ))}
            </div>
          </animated.div>
        </div>
      </div>
    </section>
  );
}
