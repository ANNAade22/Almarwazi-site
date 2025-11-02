"use client";
import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect, useRef } from "react";
import Masonry from "../ui/Masonry";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2, // Triggers when 20% of the section is visible
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

  const masonryFade = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(60px)",
    delay: 400,
    config: { tension: 280, friction: 60 },
  });

  const images = [
    { id: 1, height: 500, image: "/about01.jpg" },
    { id: 2, height: 400, image: "/about02.jpg" },
    { id: 3, height: 550, image: "/about03.jpg" },
    { id: 4, height: 450, image: "/about04.jpg" },
    { id: 5, height: 480, image: "/about05.jpg" },
    { id: 6, height: 420, image: "/about06.jpg" },
    { id: 7, height: 520, image: "/about07.jpg" },
    { id: 8, height: 460, image: "/about08.jpg" },
    { id: 9, height: 510, image: "/about09.jpg" },
    { id: 10, height: 430, image: "/about10.jpg" },
    { id: 11, height: 490, image: "/about11.jpg" },
    { id: 12, height: 440, image: "/about12.jpg" },
    { id: 13, height: 530, image: "/about13.jpg" },
  ];

  return (
    <section
      ref={sectionRef}
      className="pt-12 sm:pt-16 md:pt-20 pb-12 md:pb-20 lg:pb-24 xl:pb-32 relative"
      style={{ backgroundColor: "#e3fae5" }}
    >
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-6xl">
            {/* Images Section */}
            <animated.div
              style={masonryFade}
              className="w-full max-w-6xl overflow-hidden"
            >
              <div className="max-h-[400px] sm:max-h-[600px] md:max-h-[700px] lg:max-h-[800px] xl:max-h-[900px] overflow-hidden rounded-xl">
                <Masonry data={images} />
              </div>
            </animated.div>

            {/* Overlay Content centered over images */}
            <animated.div
              style={fadeIn}
              className="absolute inset-0 flex items-center justify-center p-4 pointer-events-none"
            >
              <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-center px-4 py-6 sm:py-8 bg-white/80 backdrop-blur-md rounded-xl shadow-lg pointer-events-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-primary">
                  البوم الجامعة
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 leading-relaxed">
                  جامعة المروزي ملتزمة بتقديم تعليم عالي الجودة يستند إلى
                  المبادئ والقيم الإسلامية. مهمتنا هي إعداد الطلاب ليصبحوا قادة
                  في مجالاتهم مع الحفاظ على أسس أخلاقية قوية.
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-6 sm:mb-8 leading-relaxed">
                  مع مرافق حديثة وأعضاء هيئة تدريس ذوي خبرة، نوفر بيئة مواتية
                  للتعلم والنمو الشخصي.
                </p>
                <Link
                  href="/about"
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors inline-block text-sm sm:text-base lg:text-lg"
                >
                  اكتشف المزيد
                </Link>
              </div>
            </animated.div>
          </div>
        </div>
      </div>
    </section>
  );
}
