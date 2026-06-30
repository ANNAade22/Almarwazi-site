"use client";
import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";
import { useState, useEffect, useRef } from "react";
import Masonry from "../ui/Masonry";
import { universityContent } from "@/lib/universityContent";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
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
      className="py-12 md:py-16 lg:py-20 relative"
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
              <div className="max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl text-center px-6 py-8 sm:py-10 bg-white/85 backdrop-blur-md rounded-2xl shadow-xl pointer-events-auto">
                <span className="text-sm font-semibold tracking-wide text-accent mb-3 block">
                  تعريفها وتأسيسها
                </span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-primary">
                  {universityContent.nameShort}
                </h2>
                <span className="mx-auto block h-1 w-16 rounded-full bg-accent mb-5" />
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-7 leading-relaxed">
                  {universityContent.introduction}
                </p>
                <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                  <Link
                    href="/about"
                    className="px-7 sm:px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors inline-block text-sm sm:text-base"
                  >
                    اكتشف المزيد
                  </Link>
                  <Link
                    href="/album"
                    className="px-7 sm:px-8 py-3 bg-transparent text-primary border border-primary/30 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors inline-block text-sm sm:text-base"
                  >
                    البوم الجامعة
                  </Link>
                </div>
              </div>
            </animated.div>
          </div>
        </div>
      </div>
    </section>
  );
}
