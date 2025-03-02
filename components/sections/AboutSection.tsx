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
    { id: 1, height: 400, image: "/campus-life.jpg" },
    { id: 2, height: 300, image: "/img1.jpg" },
    { id: 3, height: 450, image: "/campus-life.jpg" },
    { id: 4, height: 350, image: "/img1.jpg" },
    { id: 5, height: 380, image: "/campus-life.jpg" },
    { id: 6, height: 300, image: "/img1.jpg" },
    { id: 7, height: 450, image: "/campus-life.jpg" },
    { id: 8, height: 350, image: "/img1.jpg" },
    { id: 9, height: 380, image: "/campus-life.jpg" },
    { id: 10, height: 420, image: "/img1.jpg" },
  ];

  return (
    <section ref={sectionRef} className="py-32 bg-gray-50 relative">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white to-gray-50"></div>
      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col items-center gap-12">
          {/* Images Section */}
          <animated.div
            style={masonryFade}
            className="w-full max-w-6xl overflow-hidden"
          >
            <div className="max-h-[800px] overflow-hidden rounded-xl">
              <Masonry data={images} />
            </div>
          </animated.div>

          {/* Content Section */}
          <animated.div style={fadeIn} className="max-w-3xl text-center">
            <h2 className="text-4xl font-bold mb-8 text-primary">عن جامعتنا</h2>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              جامعة المروزي ملتزمة بتقديم تعليم عالي الجودة يستند إلى المبادئ
              والقيم الإسلامية. مهمتنا هي إعداد الطلاب ليصبحوا قادة في مجالاتهم
              مع الحفاظ على أسس أخلاقية قوية.
            </p>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              مع مرافق حديثة وأعضاء هيئة تدريس ذوي خبرة، نوفر بيئة مواتية للتعلم
              والنمو الشخصي.
            </p>
            <Link
              href="/about"
              className="px-8 py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors inline-block text-lg"
            >
              اكتشف المزيد
            </Link>
          </animated.div>
        </div>
      </div>
    </section>
  );
}
