"use client";
import Link from "next/link";
import SpotlightCard from "../ui/SpotlightCard";
import { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "@react-spring/web";

const courses = [
  {
    title: "الدراسات الإسلامية",
    description: "دراسة شاملة للمبادئ الإسلامية والتاريخ والفقه.",
  },
  {
    title: "اللغة العربية",
    description:
      "إتقان اللغة العربية الفصحى والمعاصرة من خلال أساليب التعلم المتكاملة.",
  },
  {
    title: "علوم القرآن",
    description: "دراسة متعمقة في التفسير والتجويد والحفظ.",
  },
  {
    title: "علوم القرآن",
    description: "دراسة متعمقة في التفسير والتجويد والحفظ.",
  },
  {
    title: "علوم القرآن",
    description: "دراسة متعمقة في التفسير والتجويد والحفظ.",
  },
  {
    title: "علوم القرآن",
    description: "دراسة متعمقة في التفسير والتجويد والحفظ.",
  },
];

export default function CoursesSection() {
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
        threshold: 0.2,
        rootMargin: "50px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const headerAnimation = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    delay: 100,
    config: { tension: 280, friction: 60 },
  });

  return (
    <section
      ref={sectionRef}
      className="pt-0 pb-12 sm:pb-16 md:pb-20 lg:pb-24 xl:pb-32 bg-gray-50"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <animated.div
          style={headerAnimation}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 sm:mb-6">
            البرامج المميزة
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-lg md:max-w-2xl mx-auto px-4">
            اكتشف مجموعتنا الواسعة من البرامج المصممة لتزويدك بالمعرفة والمهارات
            اللازمة للنجاح.
          </p>
        </animated.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {courses.map((course, index) => (
            <animated.div
              key={index}
              style={useSpring({
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(40px)",
                delay: 200 + index * 100,
                config: { tension: 280, friction: 60 },
              })}
            >
              <SpotlightCard className="group transition-all duration-300 hover:shadow-xl">
                <div className="relative z-10 text-center p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-primary">
                    {course.title}
                  </h3>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </SpotlightCard>
            </animated.div>
          ))}
        </div>
        <animated.div
          style={useSpring({
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(40px)",
            delay: 800,
            config: { tension: 280, friction: 60 },
          })}
          className="text-center mt-8 sm:mt-12 lg:mt-16"
        >
          <Link
            href="/courses"
            className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg text-sm sm:text-base lg:text-lg font-medium hover:bg-primary/90 transition-colors inline-block"
          >
            عرض جميع البرامج
          </Link>
        </animated.div>
      </div>
    </section>
  );
}
