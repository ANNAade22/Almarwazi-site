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
            <animated.div
              style={buttonAnimation}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <Link
                href="/about"
                className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors text-center"
              >
                تعرف علي الجامعة
              </Link>
            </animated.div>
          </div>
        </div>
      </div>
    </section>
  );
}
