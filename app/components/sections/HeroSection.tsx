"use client";
import Image from "next/image";
import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState, useRef } from "react";
import CountUp from "../ui/CountUp";
import { universityContent } from "@/lib/universityContent";

interface StatItem {
  number: number;
  label: string;
  suffix?: string;
}

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const heroImages = [
    "/heroPic0.jpg",
    "/heroPic1.jpg",
    "/heroPic2.jpg",
    "/heroPic3.jpg",
  ];

  const stats: StatItem[] = [
    { number: universityContent.stats.graduates, label: "عدد الخريجين", suffix: "+" },
    { number: universityContent.stats.enrolled, label: "عدد المقيدين" },
    { number: universityContent.stats.staff, label: "عدد الموظفين" },
    { number: universityContent.stats.campuses, label: "عدد الكمبسات" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setScrollY(scrollPosition * 0.15);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const imageAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.9)",
    delay: 150,
    config: { tension: 380, friction: 20 },
  });

  const titleAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(30px)",
    delay: 200,
    config: { tension: 280, friction: 60 },
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-150px)] overflow-hidden"
      style={{ marginTop: "0", paddingTop: "0" }}
    >
      <div className="absolute inset-0">
        <animated.div
          style={{
            ...imageAnimation,
            transform:
              scrollY > 0 ? `translateY(${scrollY}px) scale(1.1)` : "scale(1)",
          }}
          className="relative h-full w-full"
        >
          <div className="relative h-full w-full overflow-hidden">
            {heroImages.map((imageSrc, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={imageSrc}
                  alt={`${universityContent.name} - صورة ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </animated.div>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-[#e3fae5] to-transparent"></div>
      </div>

      <div className="relative z-10 min-h-[calc(100vh-80px)] md:min-h-[calc(100vh-150px)] flex flex-col items-center justify-center text-center px-4 sm:px-8 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto w-full">
          <animated.div style={titleAnimation} className="mb-10 sm:mb-14">
            <span className="inline-block mb-5 px-4 py-1.5 rounded-full border border-accent-light/50 text-accent-light text-xs sm:text-sm font-semibold tracking-wide">
              تأسست عام {universityContent.founded}م — مقديشو، الصومال
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-5 sm:mb-7 drop-shadow-lg leading-snug">
              {universityContent.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/85 font-medium mb-8 sm:mb-10">
              {universityContent.tagline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/contact"
                className="inline-block px-8 sm:px-10 py-3 sm:py-3.5 bg-accent text-white font-bold rounded-lg text-base sm:text-lg hover:bg-accent-light transition-colors shadow-lg"
              >
                سجل الآن
              </Link>
              <Link
                href="/courses"
                className="inline-block px-8 sm:px-10 py-3 sm:py-3.5 border border-white/40 text-white font-semibold rounded-lg text-base sm:text-lg hover:bg-white/10 transition-colors"
              >
                البرامج الدراسية
              </Link>
            </div>
          </animated.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 px-2 sm:px-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 lg:p-6 border border-white/15"
              >
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-accent-light mb-1 drop-shadow">
                  <CountUp
                    from={0}
                    to={stat.number}
                    separator=","
                    direction="up"
                    duration={2.5}
                    startWhen={isVisible}
                    className="count-up-text"
                  />
                  {stat.suffix || (stat.number >= 1000 ? "+" : "")}
                </div>
                <div className="text-xs sm:text-sm text-white/75 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {heroImages.length > 1 && (
        <>
          <button
            onClick={goToPreviousImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
