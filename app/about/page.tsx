"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import FooterSection from "../FooterSection";
import BranchLocations from "../components/sections/BranchLocations";
import { BookOpen, Target, Award, Users, Building2, Lightbulb, ClipboardList } from "lucide-react";
import { universityContent } from "@/lib/universityContent";

export default function AboutPage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Handle hash navigation with smooth scroll

  // Handle hash navigation with smooth scroll
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

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
              {universityContent.name}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
              {universityContent.tagline}
            </p>
          </div>
        </div>

        {/* Animated Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/70 text-sm font-medium">اكتشف المزيد</span>
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

      {/* 1. كلمة رئيس الجامعة */}
      <section
        id="president-message"
        ref={(el) => { if (el) sectionsRef.current[0] = el; }}
        className="py-12 md:py-16 lg:py-20 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 relative">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
                <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary relative inline-block mb-4">
                كلمة رئيس الجامعة
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full opacity-30"></div>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mt-4">Message from the President</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative h-[400px] rounded-2xl overflow-hidden">
                  <Image
                    src={universityContent.presidentMessage.image}
                    alt={universityContent.presidentMessage.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-3 bg-primary/10 rounded-lg">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      {universityContent.presidentMessage.excerpt}
                    </p>
                  </div>
                </div>
                <div className="pt-4 pr-16">
                  <p className="text-primary font-bold text-xl">{universityContent.presidentMessage.name}</p>
                  <p className="text-gray-600">{universityContent.presidentMessage.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. نشأة الجامعة */}
      <section
        id="establishment"
        ref={(el) => { if (el) sectionsRef.current[1] = el; }}
        className="py-12 md:py-16 lg:py-20 bg-[#e3fae5]"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 relative">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
                <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary relative inline-block mb-4">
                نشأة الجامعة
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full opacity-30"></div>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mt-4">University Establishment</p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-xl md:text-2xl font-bold text-primary mb-4">
                    تأسست جامعة الإمام محمد بن نصر المروزي
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p>{universityContent.introduction}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. الرسالة والرؤية */}
      <section
        id="mission-vision"
        ref={(el) => { if (el) sectionsRef.current[2] = el; }}
        className="py-12 md:py-16 lg:py-20 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 relative">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
                <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary relative inline-block mb-4">
                الرسالة والرؤية
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full opacity-30"></div>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mt-4">Mission & Vision</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* الرؤية */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary">الرؤية</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {universityContent.vision}
                </p>
              </div>

              {/* الرسالة */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-blue-100 hover:border-blue-300 transition-all duration-300 hover:shadow-xl group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary">الرسالة</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {universityContent.mission}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. الأهداف العامة للجامعة */}
      <section
        id="goals"
        ref={(el) => { if (el) sectionsRef.current[3] = el; }}
        className="py-12 md:py-16 lg:py-20 bg-[#e3fae5]"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 relative">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
                <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary relative inline-block mb-4">
                الأهداف العامة للجامعة
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full opacity-30"></div>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mt-4">University General Goals</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {universityContent.goals.map((goal, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-green-200 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-primary">هدف {index + 1}</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{goal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. الميزات والخصائص */}
      <section
        id="features"
        ref={(el) => { if (el) sectionsRef.current[4] = el; }}
        className="py-12 md:py-16 lg:py-20 bg-[#e3fae5]"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 relative">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
                <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary relative inline-block mb-4">
                الميزات والخصائص
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full opacity-30"></div>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mt-4">Features & Characteristics</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {universityContent.features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-green-300 overflow-hidden"
                >
                  <div className="relative mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 text-white font-bold shadow-lg">
                      ✓
                    </div>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. شروط القبول */}
      <section
        id="admission"
        ref={(el) => { if (el) sectionsRef.current[5] = el; }}
        className="py-12 md:py-16 lg:py-20 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 relative">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
                <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary relative inline-block mb-4">
                شروط القبول
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full opacity-30"></div>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mt-4">Admission Requirements</p>
            </div>

            <div className="bg-[#e3fae5] rounded-2xl p-8 md:p-12">
              <ul className="space-y-4">
                {universityContent.admissionRequirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-4 text-lg text-gray-700">
                    <ClipboardList className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. المبادئ الأساسية */}
      <section
        id="principles"
        ref={(el) => { if (el) sectionsRef.current[6] = el; }}
        className="py-12 md:py-16 lg:py-20 bg-white"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 relative">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
                <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary relative inline-block mb-4">
                المبادئ الأساسية
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full opacity-30"></div>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mt-4">Core Principles</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "الجودة والتميز",
                  desc: "نلتزم بتقديم تعليم عالي الجودة يتوافق مع المعايير العالمية",
                  color: "from-green-400 to-blue-500"
                },
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  title: "الأصالة والمعاصرة",
                  desc: "نجمع بين الأصالة الإسلامية والمعرفة المعاصرة",
                  color: "from-blue-400 to-purple-500"
                },
                {
                  icon: <Lightbulb className="w-8 h-8" />,
                  title: "الابتكار والإبداع",
                  desc: "نشجع التفكير النقدي والإبداعي وحل المشكلات",
                  color: "from-purple-400 to-pink-500"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "المسؤولية المجتمعية",
                  desc: "نعمل على خدمة المجتمع والمساهمة في تنميته",
                  color: "from-orange-400 to-red-500"
                },
              ].map((principle, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border-2 border-gray-100 hover:border-green-300 transition-all duration-300 hover:shadow-xl overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${principle.color} opacity-10 rounded-bl-full`}></div>

                  <div className="relative">
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${principle.color} text-white mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                      {principle.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-3">{principle.title}</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">{principle.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. الهيكل الإداري */}
      <section
        id="structure"
        ref={(el) => { if (el) sectionsRef.current[7] = el; }}
        className="py-12 md:py-16 lg:py-20 bg-[#e3fae5]"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12 relative">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-green-400"></div>
                <div className="mx-4 w-3 h-3 rotate-45 bg-gradient-to-br from-green-400 to-blue-500"></div>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-blue-400"></div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary relative inline-block mb-4">
                الهيكل الإداري
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-blue-500 to-green-500 rounded-full opacity-30"></div>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mt-4">Administrative Structure</p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
              <div className="space-y-6">
                {[
                  { position: "رئيس الجامعة", name: "د. عبد الله المروزي" },
                  { position: "نائب الرئيس للشؤون الأكاديمية", name: "د. محمد أحمد" },
                  { position: "نائب الرئيس للشؤون الإدارية", name: "د. عمر حسن" },
                  { position: "عميد الطلاب", name: "د. أحمد خالد" },
                  { position: "عميد البحث العلمي", name: "د. سارة علي" },
                ].map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-1">{member.position}</h3>
                      <p className="text-gray-700">{member.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. كمبسات الجامعة على الخريطة */}
      <BranchLocations showMap={true} />

      <FooterSection />
    </main>
  );
}
