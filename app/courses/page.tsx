"use client";
import { useEffect } from "react";
import Link from "next/link";
import FooterSection from "../FooterSection";

// Colleges/Faculties data
const colleges = [
  {
    id: "postgraduate-studies",
    title: "كلية الدراسات العليا",
    titleEn: "College of Postgraduate Studies",
    description:
      "تشرف على برامج الماجستير والدكتوراه وتطوير البحث العلمي في الجامعة",
    icon: "🎓",
    gradient: "from-purple-400 to-violet-500",
  },
  {
    id: "sharia-law",
    title: "كلية الشريعة والقانون",
    titleEn: "College of Sharia and Law",
    description: "تقدم برامج أكاديمية متخصصة في الشريعة الإسلامية والقانون",
    icon: "⚖️",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    id: "dawah-religion",
    title: "كلية الدعوة وأصول الدين",
    titleEn: "College of Da'wah and Fundamentals of Religion",
    description: "تركز على إعداد الدعاة المؤهلين ودراسة أصول الدين الإسلامي",
    icon: "🕌",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    id: "education",
    title: "كلية التربية",
    titleEn: "College of Education",
    description: "تقدم برامج تربوية وتعليمية لإعداد المعلمين والتربويين",
    icon: "📚",
    gradient: "from-orange-400 to-red-500",
  },
];

export default function CoursesPage() {
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

  return (
    <main
      dir="rtl"
      className="pt-20 pb-0 mb-0 bg-[#e3fae5] min-h-screen flex flex-col"
    >
      {/* Hero Section */}
      <section
        id="overview"
        className="relative py-16 md:py-20 lg:py-32 bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              البرامج الدراسية
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
              برامج أكاديمية متميزة في الشريعة والدراسات الإسلامية
            </p>
            <p className="text-base sm:text-lg text-white/80">
              Academic Programs - Excellence in Islamic Studies
            </p>
          </div>
        </div>

        {/* Animated Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/70 text-sm font-medium">
              استكشف البرامج
            </span>
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

      {/* Colleges/Faculties Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
                <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                الكليات والعمادات
              </h2>
              <p className="text-lg text-gray-700">Colleges and Deanships</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {colleges.map((college) => (
                <div
                  key={college.id}
                  id={college.id}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border-2 border-transparent hover:border-green-300 overflow-hidden scroll-mt-24"
                >
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                    <div
                      className={`w-full h-full bg-gradient-to-bl ${college.gradient} rounded-bl-full`}
                    ></div>
                  </div>

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${college.gradient} text-white text-4xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                    >
                      {college.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-2xl font-bold text-primary mb-2 group-hover:text-green-600 transition-colors duration-300 leading-tight">
                      {college.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {college.titleEn}
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      {college.description}
                    </p>
                  </div>

                  {/* Decorative Bottom Line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${college.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Admission Info Section */}
      <section id="admission" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
              <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6">
              القبول والتسجيل
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              للتقديم على أي من البرامج الدراسية، يرجى زيارة صفحة القبول
              والتسجيل أو التواصل معنا للحصول على المزيد من المعلومات حول شروط
              القبول والمستندات المطلوبة.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                سجل الآن
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full font-bold hover:bg-primary hover:text-yellow-400  transition-all duration-300"
              >
                اتصل بنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-auto mb-0">
        <FooterSection />
      </div>
    </main>
  );
}
