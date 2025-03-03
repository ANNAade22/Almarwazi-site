"use client";
import { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import FooterSection from "@/components/sections/FooterSection";

export default function AboutPage() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fadeIn = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(40px)",
    config: { tension: 280, friction: 60 },
  });

  return (
    <main dir="rtl">
      <section className="bg-[#e3fae5] py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-primary text-center mb-12">
            عن جامعة المروزي
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              جامعة المروزي هي مؤسسة تعليمية رائدة تأسست بهدف توفير تعليم عالي
              الجودة يستند إلى المبادئ والقيم الإسلامية. نحن نسعى جاهدين لتطوير
              جيل من القادة المتميزين الذين يجمعون بين المعرفة الأكاديمية والقيم
              الأخلاقية.
            </p>
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="py-16">
        <div className="container mx-auto px-6">
          <animated.div style={fadeIn}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">
                  رؤيتنا ورسالتنا
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  رؤيتنا هي أن نكون مؤسسة تعليمية رائدة عالمياً تجمع بين التميز
                  الأكاديمي والقيم الإسلامية، ونسعى لتخريج قادة يساهمون في تنمية
                  مجتمعاتهم وبناء مستقبل أفضل.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  رسالتنا هي توفير بيئة تعليمية متميزة تشجع على الإبداع
                  والابتكار، وتعزز القيم الأخلاقية والروحية، وتمكن الطلاب من
                  اكتساب المعرفة والمهارات اللازمة للنجاح في حياتهم المهنية
                  والشخصية.
                </p>
              </div>
              <div className="relative h-[400px] rounded-xl overflow-hidden">
                <Image
                  src="/campus-life.jpg"
                  alt="حرم جامعة المروزي"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </animated.div>
        </div>
      </section>

      <section className="py-16 bg-[#e3fae5]">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary mb-12 text-center">
            قيمنا الأساسية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-4">
                التميز الأكاديمي
              </h3>
              <p className="text-gray-700">
                نسعى دائماً لتحقيق أعلى معايير الجودة في التعليم والبحث العلمي.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-4">
                الأخلاق والقيم
              </h3>
              <p className="text-gray-700">
                نلتزم بتعزيز القيم الإسلامية والأخلاقية في جميع جوانب الحياة
                الجامعية.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-bold text-primary mb-4">
                الابتكار والإبداع
              </h3>
              <p className="text-gray-700">
                نشجع على التفكير النقدي والإبداعي وتطوير حلول مبتكرة للتحديات
                المعاصرة.
              </p>
            </div>
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
