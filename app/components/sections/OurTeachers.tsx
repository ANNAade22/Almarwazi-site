"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardFooter } from "@heroui/card";

const teachers = [
  { name: "د.عبد القادر حسين", image: "/tea1.jpg", title: "أستاذ الفقه" },
  { name: "Prof. Michael Chen", image: "/tea2.jpg", title: "Computer Science" },
  { name: "Dr. Emily Rodriguez", image: "/tea3.jpg", title: "Physics" },
  { name: "Prof. David Kim", image: "/tea4.jpg", title: "Mathematics" },
  { name: "Dr. Lisa Thompson", image: "/tea5.jpg", title: "Biology" },
  { name: "Prof. James Wilson", image: "/tea6.jpg", title: "History" },
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
    <section ref={containerRef} className="relative py-12 md:py-16 lg:py-20 bg-[#e3fae5]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#e3fae5]/50 to-[#e3fae5] opacity-70"></div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 relative">
          {/* Decorative top accent */}
          <div className={`flex items-center justify-center mb-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
            <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
          </div>

          <h2
            className={`text-4xl font-bold text-primary relative inline-block transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
          >
            أساتذتنا الكرام
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full opacity-30"></div>
          </h2>
          <p className={`text-lg md:text-xl text-gray-700 leading-relaxed mt-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
            Our Distinguished Teachers
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {teachers.map((teacher, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
                }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <Card
                isFooterBlurred
                radius="lg"
                className="border-none group overflow-hidden bg-transparent"
              >
                <div className="relative h-[220px] sm:h-[260px] md:h-[300px]">
                  <Image
                    src={teacher.image}
                    alt={teacher.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-90" />
                </div>
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">
                  <div className="flex flex-col">
                    <p className="text-white text-sm font-semibold">
                      {teacher.name}
                    </p>
                    <p className="text-white/80 text-tiny">{teacher.title}</p>
                  </div>
                  <button className="text-tiny text-white bg-black/20 hover:bg-black/30 transition-colors px-3 py-1 rounded-lg">
                    الملف الشخصي
                  </button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTeachers;
