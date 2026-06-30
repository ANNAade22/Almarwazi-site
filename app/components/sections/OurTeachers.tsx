"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardFooter } from "@heroui/card";
import { universityContent } from "@/lib/universityContent";
import SectionHeading from "../ui/SectionHeading";

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
    <section ref={containerRef} className="relative py-16 md:py-20 lg:py-24 bg-[#e3fae5]">
      <div className="container mx-auto px-4 relative">
        <SectionHeading
          eyebrow="أساتذتنا الكرام"
          title="نخبة من أهل العلم"
          subtitle="أكثر معلميها من خريجي الجامعة الإسلامية بالمدينة المنورة"
          className={`mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {universityContent.teachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className={`transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
                    alt={teacher.name || `أستاذ ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-90" />
                </div>
                <CardFooter className="justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small mx-1 z-10">
                  <div className="flex flex-col items-center text-center w-full">
                    <p className="text-white text-sm font-semibold">
                      {teacher.name || "—"}
                    </p>
                    {teacher.title ? (
                      <p className="text-white/80 text-tiny">{teacher.title}</p>
                    ) : null}
                  </div>
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
