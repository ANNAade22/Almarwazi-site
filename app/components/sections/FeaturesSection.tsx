"use client";
import { useEffect, useRef, useState } from "react";
import { BookMarked, GraduationCap, Languages, Users, MonitorSmartphone } from "lucide-react";
import { universityContent } from "@/lib/universityContent";
import SectionHeading from "../ui/SectionHeading";

const featureIcons = [BookMarked, GraduationCap, Languages, Users, MonitorSmartphone];

export default function FeaturesSection() {
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

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="ميزاتها وخصوصياتها"
          title="لماذا جامعة المروزي"
          subtitle="مقومات تميز الجامعة في تدريس العلوم الشرعية واللغة العربية"
          className={`mb-12 md:mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {universityContent.features.map((feature, index) => {
            const Icon = featureIcons[index] || BookMarked;
            return (
              <div
                key={index}
                className={`group flex flex-col gap-4 bg-sand rounded-2xl p-7 border border-primary/10 hover:border-accent/40 hover:shadow-md transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${150 + index * 80}ms` }}
              >
                <div className="inline-flex w-12 h-12 items-center justify-center bg-primary/10 rounded-xl group-hover:bg-primary transition-colors">
                  <Icon className="w-6 h-6 text-primary group-hover:text-accent-light transition-colors" />
                </div>
                <p className="text-gray-700 leading-relaxed font-medium">{feature}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
