"use client";
import Link from "next/link";
import Image from "next/image";
import { useSpring, animated } from "@react-spring/web";
import { useEffect, useState, useRef } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

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

  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    delay: 50,
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
    // Update the section className
    <section
      ref={sectionRef}
      className="bg-white text-primary py-32 overflow-hidden min-h-screen flex items-center"
      style={{ backgroundColor: "white" }}
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row-reverse items-center">
          <div className="md:w-1/2 h-[500px] overflow-hidden">
            <animated.div
              style={{
                ...imageAnimation,
                transform:
                  scrollY > 0
                    ? `translateY(${scrollY}px) scale(1.1)`
                    : "scale(1)",
              }}
              className="relative h-[600px] w-full"
            >
              <Image
                src="/campus-life.jpg" // Update this path to match your image location
                alt="Almarwazi University Campus"
                fill
                className="object-cover rounded-lg shadow-lg"
                priority
              />
            </animated.div>
          </div>
          <div className="md:w-1/2 mb-10 md:mb-0 text-right">
            <animated.div style={fadeIn}>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                مرحبًا بكم في جامعة المروزي
              </h1>
              <p className="text-xl mb-8 font-arabic text-gray-700">
                رسالة الجامعة: الكتاب والسنه علي فهم سلف الامة بالفصحى العربيه
              </p>
            </animated.div>
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="w-full lg:w-1/2 text-right mb-8 lg:mb-0">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight mb-6">
                    {/* Your heading */}
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-xl">
                    {/* Your paragraph */}
                  </p>
                  {/* Buttons with better spacing for mobile */}
                  <div className="flex flex-wrap gap-4 justify-start">
                    <Link
                      href="/courses"
                      className="px-6 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90 transition-colors"
                    >
                      {/* Button text */}
                    </Link>
                    {/* Other buttons */}
                  </div>
                </div>
                {/* Image with responsive sizing */}
                <div className="w-full lg:w-1/2 px-4 lg:px-0">
                  <img
                    src="/hero-image.jpg"
                    alt="University students"
                    className="w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
