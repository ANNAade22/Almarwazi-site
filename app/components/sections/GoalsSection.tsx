"use client";
import { useEffect, useRef, useState } from "react";
import { universityContent } from "@/lib/universityContent";
import SectionHeading from "../ui/SectionHeading";

export default function GoalsSection() {
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-[#e3fae5]">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="أهدافها وغاياتها"
          title="ما نسعى لتحقيقه"
          subtitle="ستة أهداف راسخة توجّه مسيرة الجامعة التعليمية والبحثية"
          className={`mb-10 md:mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-6xl mx-auto">
          {universityContent.goals.map((goal, index) => (
            <div
              key={index}
              className={`flex gap-4 bg-white rounded-xl p-5 border border-primary/10 hover:border-accent/40 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${100 + index * 70}ms` }}
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary text-accent-light flex items-center justify-center font-bold text-sm">
                {index + 1}
              </span>
              <p className="text-gray-700 leading-relaxed font-medium pt-1">{goal}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
