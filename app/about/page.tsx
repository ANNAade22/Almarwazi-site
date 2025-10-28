"use client";
import { useEffect, useState, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import FooterSection from "../FooterSection";

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
    <main dir="rtl" className="pt-20">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full"></div>
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-primary mb-6">
                    رؤيتنا ورسالتنا
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    رؤيتنا هي أن نكون مؤسسة تعليمية رائدة عالمياً تجمع بين
                    التميز الأكاديمي والقيم الإسلامية، ونسعى لتخريج قادة يساهمون
                    في تنمية مجتمعاتهم وبناء مستقبل أفضل.
                  </p>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                    رسالتنا هي توفير بيئة تعليمية متميزة تشجع على الإبداع
                    والابتكار، وتعزز القيم الأخلاقية والروحية، وتمكن الطلاب من
                    اكتساب المعرفة والمهارات اللازمة للنجاح في حياتهم المهنية
                    والشخصية.
                  </p>
                </div>
              </div>
              {/* Multiple Images Layout */}
              <div className="relative">
                {/* Main Large Image */}
                <div className="relative h-[300px] rounded-2xl overflow-hidden group mb-6">
                  <Image
                    src="/about01.jpg"
                    alt="حرم جامعة المروزي"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">حرم جامعي متميز</h3>
                    <p className="text-white/90">بيئة تعليمية ملهمة ومتطورة</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full">
                    <span className="text-primary font-semibold text-sm">
                      جامعة المروزي
                    </span>
                  </div>
                </div>

                {/* Smaller Images Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Image 1 */}
                  <div className="relative h-[120px] rounded-xl overflow-hidden group">
                    <Image
                      src="/about02.jpg"
                      alt="مكتبة الجامعة"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-medium">
                        مكتبة الجامعة
                      </p>
                    </div>
                  </div>

                  {/* Image 2 */}
                  <div className="relative h-[120px] rounded-xl overflow-hidden group">
                    <Image
                      src="/about03.jpg"
                      alt="قاعات الدراسة"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-medium">
                        قاعات الدراسة
                      </p>
                    </div>
                  </div>

                  {/* Image 3 */}
                  <div className="relative h-[120px] rounded-xl overflow-hidden group">
                    <Image
                      src="/about04.jpg"
                      alt="المختبرات"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-medium">
                        المختبرات
                      </p>
                    </div>
                  </div>

                  {/* Image 4 */}
                  <div className="relative h-[120px] rounded-xl overflow-hidden group">
                    <Image
                      src="/about05.jpg"
                      alt="المرافق الرياضية"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-medium">
                        المرافق الرياضية
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary/20 rounded-full"></div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-secondary/30 rounded-full"></div>
                <div className="absolute top-1/2 -right-4 w-4 h-4 bg-primary/15 rounded-full"></div>
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
