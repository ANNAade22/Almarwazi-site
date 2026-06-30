"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, FileText } from "lucide-react";
import { universityContent } from "@/lib/universityContent";
import SectionHeading from "../ui/SectionHeading";

export default function AdmissionSection() {
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
    <section ref={sectionRef} className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <SectionHeading
              eyebrow="شروط القبول"
              title="كيف تنضم إلى الجامعة"
              subtitle="خطوات واضحة للتسجيل في برامج البكالوريوس والدراسات العليا"
              align="start"
              className="mb-8"
            />

            <ul className="space-y-4">
              {universityContent.admissionRequirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-lg leading-relaxed">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`bg-sand rounded-2xl p-8 md:p-10 border border-primary/10 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ transitionDelay: "150ms" }}
          >
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-6">
              <FileText className="w-6 h-6 text-accent-light" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-3">ابدأ تسجيلك الآن</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              فريق عمادة القبول والتسجيل جاهز لمساعدتك في إتمام طلب الالتحاق والإجابة على
              استفساراتك حول البرامج والكليات.
            </p>
            <div className="space-y-3 mb-8 text-sm text-gray-600">
              <p>
                <span className="font-semibold text-primary">الهاتف: </span>
                {universityContent.contact.primaryPhone}
              </p>
              <p>
                <span className="font-semibold text-primary">البريد: </span>
                {universityContent.contact.email}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-block px-7 py-3.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-light transition-colors"
              >
                سجل الآن
              </Link>
              <Link
                href="/courses"
                className="inline-block px-7 py-3.5 border border-primary/30 text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors"
              >
                استعرض البرامج
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
