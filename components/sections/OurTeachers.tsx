"use client";
import { useRef, useEffect, useState } from "react";

const teachers = [
  { name: "د.عبد القادر حسين", image: "/img1.jpg" },
  { name: "Prof. Michael Chen", image: "/img2.jpg" },
  { name: "Dr. Emily Rodriguez", image: "/img3.jpg" },
  { name: "Prof. David Kim", image: "/img4.jpg" },
  { name: "Dr. Lisa Thompson", image: "/img1.jpg" },
  { name: "Prof. James Wilson", image: "/img2.jpg" },
];

const OurTeachers = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative py-16 bg-[#e3fae5]">
      {/* Gradient background instead of WebGL */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#e3fae5]/50 to-[#e3fae5] opacity-70"></div>

      <div className="container mx-auto px-4 relative">
        <h2
          className={`text-4xl font-bold text-center text-primary mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          أساتذتنا الكرام
        </h2>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className={`relative group w-[150px] sm:w-[200px] md:w-[250px] transition-all duration-700 hover:scale-105 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={teacher.image}
                  alt={teacher.name}
                  className="w-full h-[180px] sm:h-[220px] md:h-[250px] object-cover"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="text-sm sm:text-base font-semibold text-primary">
                  {teacher.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeachers;
