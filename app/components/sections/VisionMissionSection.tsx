"use client";
import { useEffect, useRef, useState } from "react";
import { Compass, Flag } from "lucide-react";
import { universityContent } from "@/lib/universityContent";
import SectionHeading from "../ui/SectionHeading";

export default function VisionMissionSection() {
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
      { threshold: 0.15, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      icon: Compass,
      label: "الرؤية",
      text: universityContent.vision,
    },
    {
      icon: Flag,
      label: "الرسالة",
      text: universityContent.mission,
    },
  ];

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-[#e3fae5]">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="رؤيتها ورسالتها"
          title="ما نطمح إليه ونعمل من أجله"
          className={`mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        />

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`relative bg-white rounded-2xl p-8 md:p-10 border border-primary/10 shadow-sm hover:shadow-md transition-all duration-700 overflow-hidden ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 120}ms` }}
              >
                <span className="absolute top-0 right-0 h-full w-1.5 bg-accent" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3.5 bg-primary rounded-xl">
                    <Icon className="w-7 h-7 text-accent-light" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">{card.label}</h3>
                </div>
                <p className="text-lg text-gray-700 leading-loose">{card.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
