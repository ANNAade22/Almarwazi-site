"use client";
import { useEffect, useRef, useState } from "react";
import { Shield, GraduationCap, BookOpen, Layers } from "lucide-react";
import { universityContent } from "@/lib/universityContent";
import SectionHeading from "../ui/SectionHeading";

const icons = [Shield, GraduationCap, BookOpen, Layers];

export default function TrustHighlightsSection() {
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
    <section ref={sectionRef} className="py-14 md:py-16 bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="لماذا تثق بنا"
          title="مقومات الجامعة"
          subtitle="أسس علمية راسخة وبيئة تعليمية تحترم القيم الإسلامية"
          variant="light"
          className={`mb-10 md:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {universityContent.trustHighlights.map((item, index) => {
            const Icon = icons[index] || Shield;
            return (
              <div
                key={item.title}
                className={`rounded-2xl border border-white/15 bg-white/5 p-6 hover:bg-white/10 transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${120 + index * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-accent-light" />
                </div>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
