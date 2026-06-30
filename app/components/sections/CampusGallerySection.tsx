"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { universityContent } from "@/lib/universityContent";
import SectionHeading from "../ui/SectionHeading";

const galleryImages = [
  "/about01.jpg",
  "/about02.jpg",
  "/about03.jpg",
  "/about04.jpg",
  "/about05.jpg",
  "/about06.jpg",
];

export default function CampusGallerySection() {
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
    <section ref={sectionRef} className="py-10 md:py-14 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="تعريفها وتأسيسها"
            title={universityContent.nameShort}
            className={`mb-4 md:mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          />

          <p
            className={`text-center max-w-2xl mx-auto text-sm md:text-base text-gray-700 leading-relaxed mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            {universityContent.introductionShort}
          </p>

          <div
            className={`flex flex-wrap justify-center gap-3 mb-8 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "250ms" }}
          >
            <Link
              href="/about"
              className="px-7 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors text-sm sm:text-base"
            >
              اعرف المزيد
            </Link>
            <Link
              href="/album"
              className="px-7 py-3 bg-transparent text-primary border border-primary/30 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors text-sm sm:text-base"
            >
              ألبوم الجامعة
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
            {galleryImages.map((src, index) => (
              <Link
                key={src}
                href="/album"
                className={`group relative aspect-[4/3] overflow-hidden rounded-lg transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${200 + index * 70}ms` }}
              >
                <Image
                  src={src}
                  alt={`${universityContent.nameShort} - صورة ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
