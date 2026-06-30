"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { universityContent } from "@/lib/universityContent";
import SectionHeading from "../ui/SectionHeading";

export default function PresidentMessageSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { presidentMessage } = universityContent;

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
    <section ref={sectionRef} className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div
          className={`max-w-6xl mx-auto grid md:grid-cols-5 gap-8 md:gap-12 items-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="md:col-span-2 relative h-72 md:h-96 rounded-2xl overflow-hidden border border-primary/10">
            <Image
              src={presidentMessage.image}
              alt={presidentMessage.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="md:col-span-3">
            <SectionHeading
              eyebrow="كلمة رئيس الجامعة"
              title="رسالة من القيادة الأكاديمية"
              align="start"
              className="mb-6"
            />
            <p className="text-lg text-gray-700 leading-loose mb-6">
              {presidentMessage.excerpt}
            </p>
            <div className="mb-8">
              <p className="text-primary font-bold text-xl">{presidentMessage.name}</p>
              <p className="text-gray-500">{presidentMessage.title}</p>
            </div>
            <Link
              href="/about#president-message"
              className="inline-flex items-center gap-2 text-accent font-semibold hover:text-accent-light transition-colors"
            >
              اقرأ الكلمة كاملة
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
