"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FooterSection from "../FooterSection";

// Deanship data - matching the dropdown menu
const deanships = [
  {
    id: "admission-registration",
    icon: "📝",
    title: "عمادة القبول والتسجيل",
    titleEn: "Deanship of Admission and Registration",
    description: "تُعنى بقبول الطلاب وتسجيلهم في البرامج الأكاديمية المختلفة، وإدارة سجلاتهم الأكاديمية",
    responsibilities: [
      "قبول الطلاب الجدد",
      "التسجيل الأكاديمي",
      "إصدار الوثائق والشهادات",
      "إدارة السجلات الأكاديمية",
    ],
    email: "admission@marwazi.edu",
    phone: "+966 12 345 6789",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    id: "student-affairs",
    icon: "👥",
    title: "عمادة شؤون الطلاب",
    titleEn: "Deanship of Student Affairs",
    description: "ترعى الطلاب وتوفر لهم الخدمات والأنشطة اللازمة لتطوير مهاراتهم",
    responsibilities: [
      "الأنشطة الطلابية",
      "الإرشاد الأكاديمي",
      "الخدمات الطلابية",
      "الأندية الطلابية",
    ],
    email: "students@marwazi.edu",
    phone: "+966 12 345 6792",
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: "libraries",
    icon: "📚",
    title: "عمادة المكتبات",
    titleEn: "Deanship of Libraries",
    description: "تدير المكتبات الجامعية وتوفر المصادر العلمية للطلاب والباحثين",
    responsibilities: [
      "إدارة المكتبات الجامعية",
      "توفير المراجع والكتب",
      "الخدمات الإلكترونية",
      "البحث والاستعارة",
    ],
    email: "library@marwazi.edu",
    phone: "+966 12 345 6793",
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    id: "scientific-research",
    icon: "🔬",
    title: "عمادة البحث العلمي",
    titleEn: "Deanship of Scientific Research",
    description: "تدعم وتشجع البحث العلمي والابتكار في مختلف المجالات الأكاديمية",
    responsibilities: [
      "دعم المشاريع البحثية",
      "تمويل الأبحاث العلمية",
      "نشر الأبحاث في المجلات العلمية",
      "تنظيم الندوات البحثية",
    ],
    email: "research@marwazi.edu",
    phone: "+966 12 345 6791",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    id: "development-quality",
    icon: "⭐",
    title: "عمادة التطوير والجودة",
    titleEn: "Deanship of Development and Quality",
    description: "تعمل على تطوير البرامج الأكاديمية وتحسين جودة التعليم وضمان التميز",
    responsibilities: [
      "تطوير المناهج الدراسية",
      "ضمان الجودة الأكاديمية",
      "التقييم والاعتماد",
      "تحسين الخدمات التعليمية",
    ],
    email: "development@marwazi.edu",
    phone: "+966 12 345 6796",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    id: "postgraduate-studies",
    icon: "🎓",
    title: "عمادة الدراسات العليا",
    titleEn: "Deanship of Postgraduate Studies",
    description: "تشرف على برامج الماجستير والدكتوراه وتطوير البحث العلمي في الجامعة",
    responsibilities: [
      "إدارة برامج الماجستير والدكتوراه",
      "الإشراف على الأبحاث العلمية",
      "تنظيم المؤتمرات العلمية",
      "متابعة الطلاب الباحثين",
    ],
    email: "graduate@marwazi.edu",
    phone: "+966 12 345 6790",
    gradient: "from-purple-400 to-violet-500",
  },
];

export default function DeanshipsPage() {
  const [selectedDeanship, setSelectedDeanship] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle hash-based scrolling from navigation dropdown
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash) {
      // Wait for content to render
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);

  const openModal = (deanship: any) => {
    setSelectedDeanship(deanship);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDeanship(null);
  };

  return (
    <main dir="rtl" className="pt-20 bg-[#e3fae5]">
      {/* Hero Section */}
      <section id="overview" className="relative py-16 md:py-20 lg:py-32 bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              العمادات
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
              وحدات إدارية متخصصة لخدمة الطلاب والمجتمع الأكاديمي
            </p>
            <p className="text-base sm:text-lg text-white/80">
              University Deanships - Specialized Administrative Units
            </p>
          </div>
        </div>

        {/* Animated Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/70 text-sm font-medium">استكشف العمادات</span>
            <svg
              className="w-6 h-6 text-white/90"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="about-deanships" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
              <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              نبذة عن العمادات
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              العمادات هي الوحدات الإدارية المتخصصة في الجامعة التي تعمل على تقديم الخدمات
              الأكاديمية والإدارية للطلاب وأعضاء هيئة التدريس والمجتمع. تلعب العمادات دوراً
              محورياً في تحقيق رسالة الجامعة وأهدافها الاستراتيجية.
            </p>
            <p className="text-base text-gray-600">
              Deanships are specialized administrative units at the university that provide
              academic and administrative services to students, faculty, and the community.
            </p>
          </div>
        </div>
      </section>

      {/* Deanships Grid */}
      <section id="deanships-list" ref={sectionRef} className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {deanships.map((deanship, index) => (
                <div
                  key={deanship.id}
                  id={deanship.id}
                  onClick={() => openModal(deanship)}
                  className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 border-2 border-transparent hover:border-green-300 overflow-hidden scroll-mt-24"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: `all 0.6s ease ${index * 0.1}s`,
                  }}
                >
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                    <div className={`w-full h-full bg-gradient-to-bl ${deanship.gradient} rounded-bl-full`}></div>
                  </div>

                  {/* Icon */}
                  <div className="relative mb-4">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${deanship.gradient} text-white text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                      {deanship.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-green-600 transition-colors duration-300 leading-tight">
                      {deanship.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{deanship.titleEn}</p>
                    <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                      {deanship.description}
                    </p>
                  </div>

                  {/* Click indicator */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                      اضغط للمزيد
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </span>
                  </div>

                  {/* Decorative Bottom Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${deanship.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section id="contact-info" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
              <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              للتواصل مع العمادات
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              يمكنكم التواصل مع أي عمادة من خلال الضغط على البطاقة أعلاه للحصول على معلومات الاتصال والمسؤوليات التفصيلية
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-gray-700 font-medium">info@marwazi.edu</span>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-gray-700 font-medium">+966 12 345 6789</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Deanship Details */}
      {isModalOpen && selectedDeanship && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-red-500 transition-colors shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header with gradient */}
            <div className={`bg-gradient-to-br ${selectedDeanship.gradient} p-8 text-white rounded-t-2xl`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl">
                  {selectedDeanship.icon}
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{selectedDeanship.title}</h2>
                  <p className="text-white/90 text-lg">{selectedDeanship.titleEn}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 bg-gradient-to-b from-green-400 to-blue-500 rounded-full"></span>
                  نبذة عن العمادة
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedDeanship.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></span>
                  المسؤوليات والمهام
                </h3>
                <ul className="space-y-3">
                  {selectedDeanship.responsibilities.map((resp: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${selectedDeanship.gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5`}>
                        {index + 1}
                      </div>
                      <span className="text-gray-700 text-lg">{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Information */}
              <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  معلومات الاتصال
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">البريد الإلكتروني</p>
                      <a href={`mailto:${selectedDeanship.email}`} className="text-primary font-medium hover:underline">
                        {selectedDeanship.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">الهاتف</p>
                      <a href={`tel:${selectedDeanship.phone}`} className="text-primary font-medium hover:underline">
                        {selectedDeanship.phone}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterSection />
    </main>
  );
}

