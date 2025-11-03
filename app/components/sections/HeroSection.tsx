"use client";
import Link from "next/link";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState, useRef } from "react";
import CountUp from "../ui/CountUp";
import { GraduationCap, Users, Building2, UserCheck } from "lucide-react";

interface StatItem {
  number: number;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Array of hero images - you can add more images here
  const heroImages = [
    "/heroPic0.jpg",
    "/heroPic1.jpg",
    "/heroPic2.jpg",
    "/heroPic3.jpg",
  ];

  const stats: StatItem[] = [
    {
      number: 15000,
      label: "عدد الخريجين",
      icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      number: 450,
      label: "عدد المقيدين",
      icon: <Users className="w-8 h-8 text-green-500" />,
      color: "from-green-500 to-green-600",
    },
    {
      number: 8,
      label: "عدد الموظفين",
      icon: <Building2 className="w-8 h-8 text-purple-500" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      number: 1200,
      label: "عدد الفروع",
      icon: <UserCheck className="w-8 h-8 text-orange-500" />,
      color: "from-orange-500 to-orange-600",
    },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollPosition = window.scrollY;
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setScrollY(scrollPosition * 0.15); // Adjust the multiplier for scroll speed
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Auto-play image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Function to manually change image
  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? heroImages.length - 1 : prevIndex - 1
    );
  };

  const fadeInFromRight = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(100px)",
    delay: 50,
    config: { tension: 380, friction: 40 },
  });

  const fadeInFromLeft = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateX(0)" : "translateX(-100px)",
    delay: 100,
    config: { tension: 380, friction: 40 },
  });

  const imageAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "scale(1)" : "scale(0.9)",
    delay: 150,
    config: { tension: 380, friction: 20 },
  });

  const buttonAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    delay: 250,
    config: { tension: 380, friction: 40 },
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden"
      style={{ marginTop: "0", paddingTop: "0" }}
    >
      {/* Full Background Image Carousel */}
      <div className="absolute inset-0">
        <animated.div
          style={{
            ...imageAnimation,
            transform:
              scrollY > 0 ? `translateY(${scrollY}px) scale(1.1)` : "scale(1)",
          }}
          className="relative h-full w-full"
        >
          {/* Image Container with Transition */}
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
                  alt={`جامعة الإمام محمد بن نصر المروزي - صورة ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </animated.div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        {/* Gradient transition to AboutSection */}
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 md:h-24 bg-gradient-to-t from-[#e3fae5] to-transparent"></div>
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-8 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Statistics Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12 lg:mb-16 px-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center bg-white/15 backdrop-blur-sm rounded-lg p-3 sm:p-4 lg:p-6 border border-white/30 shadow-xl"
              >
                <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
                  <CountUp
                    from={0}
                    to={stat.number}
                    separator=","
                    direction="up"
                    duration={2.5}
                    startWhen={isVisible}
                    className="count-up-text"
                  />
                  {stat.number >= 1000 && "+"}
                </div>
                <div className="text-xs sm:text-sm text-blue-100 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Carousel Navigation */}
      {heroImages.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
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

          {/* Dots Indicator */}
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
