"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FooterSection from "../FooterSection";

// Course categories
const categories = [
  { id: "all", name: "جميع البرامج", nameEn: "All Programs" },
  { id: "bachelor", name: "بكالوريوس", nameEn: "Bachelor" },
  { id: "master", name: "ماجستير", nameEn: "Master" },
  { id: "diploma", name: "دبلوم", nameEn: "Diploma" },
  { id: "doctorate", name: "دكتوراه", nameEn: "PhD" },
];

// Courses data
const courses = [
  {
    id: 1,
    icon: "📖",
    title: "علوم القرآن والتفسير",
    titleEn: "Quranic Sciences and Tafsir",
    category: "bachelor",
    level: "بكالوريوس",
    duration: "4 سنوات",
    description: "دراسة شاملة لعلوم القرآن الكريم وتفسيره وتاريخه وقراءاته المختلفة",
    topics: [
      "علوم القرآن",
      "التفسير وأصوله",
      "القراءات القرآنية",
      "أسباب النزول",
    ],
    requirements: "الثانوية العامة - القسم الأدبي",
    gradient: "from-blue-400 to-cyan-500",
  },
  {
    id: 2,
    icon: "⚖️",
    title: "الفقه وأصوله",
    titleEn: "Islamic Jurisprudence",
    category: "bachelor",
    level: "بكالوريوس",
    duration: "4 سنوات",
    description: "دراسة الأحكام الشرعية وأصول الفقه والقواعد الفقهية والمقاصد",
    topics: [
      "الفقه الإسلامي",
      "أصول الفقه",
      "القواعد الفقهية",
      "المقاصد الشرعية",
    ],
    requirements: "الثانوية العامة - القسم الأدبي",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    id: 3,
    icon: "📚",
    title: "الحديث النبوي وعلومه",
    titleEn: "Hadith and Its Sciences",
    category: "bachelor",
    level: "بكالوريوس",
    duration: "4 سنوات",
    description: "دراسة الحديث النبوي الشريف ومصطلحاته وعلومه ورواته",
    topics: [
      "علوم الحديث",
      "دراسة الأسانيد",
      "الجرح والتعديل",
      "مصطلح الحديث",
    ],
    requirements: "الثانوية العامة - القسم الأدبي",
    gradient: "from-purple-400 to-violet-500",
  },
  {
    id: 4,
    icon: "🕌",
    title: "العقيدة والمذاهب المعاصرة",
    titleEn: "Islamic Creed and Contemporary Ideologies",
    category: "bachelor",
    level: "بكالوريوس",
    duration: "4 سنوات",
    description: "دراسة العقيدة الإسلامية الصحيحة والمذاهب الفكرية المعاصرة",
    topics: [
      "أصول العقيدة",
      "الفرق والمذاهب",
      "الأديان المقارنة",
      "الردود العقدية",
    ],
    requirements: "الثانوية العامة - القسم الأدبي",
    gradient: "from-orange-400 to-red-500",
  },
  {
    id: 5,
    icon: "🌍",
    title: "الدعوة والثقافة الإسلامية",
    titleEn: "Islamic Da'wah and Culture",
    category: "bachelor",
    level: "بكالوريوس",
    duration: "4 سنوات",
    description: "إعداد الدعاة المؤهلين لنشر الإسلام بالحكمة والموعظة الحسنة",
    topics: [
      "أصول الدعوة",
      "وسائل الدعوة الحديثة",
      "الخطابة والإرشاد",
      "الثقافة الإسلامية",
    ],
    requirements: "الثانوية العامة - جميع الأقسام",
    gradient: "from-teal-400 to-cyan-500",
  },
  {
    id: 6,
    icon: "✍️",
    title: "اللغة العربية وآدابها",
    titleEn: "Arabic Language and Literature",
    category: "bachelor",
    level: "بكالوريوس",
    duration: "4 سنوات",
    description: "دراسة شاملة للغة العربية وقواعدها وآدابها وبلاغتها",
    topics: [
      "النحو والصرف",
      "البلاغة والأسلوب",
      "الأدب العربي",
      "فقه اللغة",
    ],
    requirements: "الثانوية العامة - القسم الأدبي",
    gradient: "from-indigo-400 to-blue-600",
  },
  {
    id: 7,
    icon: "🎓",
    title: "الفقه المقارن",
    titleEn: "Comparative Fiqh",
    category: "master",
    level: "ماجستير",
    duration: "سنتان",
    description: "دراسة متقدمة في الفقه المقارن بين المذاهب الإسلامية المختلفة",
    topics: [
      "مقارنة المذاهب الفقهية",
      "الاجتهاد المعاصر",
      "فقه النوازل",
      "البحث الفقهي",
    ],
    requirements: "بكالوريوس في الشريعة",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    id: 8,
    icon: "📝",
    title: "أصول الفقه",
    titleEn: "Principles of Islamic Jurisprudence",
    category: "master",
    level: "ماجستير",
    duration: "سنتان",
    description: "دراسة متعمقة في أصول الفقه والقواعد الأصولية والاستدلال",
    topics: [
      "مباحث الأدلة",
      "القواعد الأصولية",
      "مقاصد الشريعة",
      "نظرية الاجتهاد",
    ],
    requirements: "بكالوريوس في الشريعة",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    id: 9,
    icon: "📖",
    title: "التفسير وعلوم القرآن",
    titleEn: "Tafsir and Quranic Sciences",
    category: "master",
    level: "ماجستير",
    duration: "سنتان",
    description: "بحث متخصص في التفسير وعلوم القرآن والإعجاز القرآني",
    topics: [
      "مناهج المفسرين",
      "الإعجاز القرآني",
      "القراءات وأثرها في التفسير",
      "البحث التفسيري",
    ],
    requirements: "بكالوريوس في علوم القرآن",
    gradient: "from-cyan-400 to-blue-500",
  },
  {
    id: 10,
    icon: "🔬",
    title: "الدراسات الإسلامية المعاصرة",
    titleEn: "Contemporary Islamic Studies",
    category: "master",
    level: "ماجستير",
    duration: "سنتان",
    description: "دراسة القضايا المعاصرة من منظور إسلامي أصيل",
    topics: [
      "الفقه المعاصر",
      "الاقتصاد الإسلامي",
      "قضايا المرأة",
      "فقه الأقليات",
    ],
    requirements: "بكالوريوس في الشريعة أو الدراسات الإسلامية",
    gradient: "from-lime-400 to-green-500",
  },
  {
    id: 11,
    icon: "📜",
    title: "تحفيظ القرآن الكريم",
    titleEn: "Quran Memorization",
    category: "diploma",
    level: "دبلوم",
    duration: "سنتان",
    description: "برنامج مكثف لحفظ القرآن الكريم كاملاً مع التجويد والتلاوة",
    topics: [
      "حفظ القرآن الكريم",
      "أحكام التجويد",
      "القراءات العشر",
      "آداب التلاوة",
    ],
    requirements: "الثانوية العامة",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    id: 12,
    icon: "🎤",
    title: "الخطابة والإرشاد",
    titleEn: "Preaching and Guidance",
    category: "diploma",
    level: "دبلوم",
    duration: "سنة واحدة",
    description: "تدريب عملي على الخطابة والإمامة والإرشاد الديني",
    topics: [
      "فن الخطابة",
      "إعداد الخطب",
      "أحكام الإمامة",
      "الإرشاد النفسي",
    ],
    requirements: "الثانوية العامة",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    id: 13,
    icon: "🔍",
    title: "الفقه الإسلامي",
    titleEn: "Islamic Jurisprudence PhD",
    category: "doctorate",
    level: "دكتوراه",
    duration: "3-5 سنوات",
    description: "بحث علمي متقدم في الفقه الإسلامي ومسائله المعاصرة",
    topics: [
      "البحث الفقهي المتقدم",
      "المذاهب الفقهية",
      "فقه النوازل المعاصرة",
      "التأصيل الفقهي",
    ],
    requirements: "ماجستير في الفقه بتقدير جيد جداً",
    gradient: "from-violet-400 to-purple-500",
  },
  {
    id: 14,
    icon: "📚",
    title: "علوم القرآن والتفسير",
    titleEn: "Quranic Sciences PhD",
    category: "doctorate",
    level: "دكتوراه",
    duration: "3-5 سنوات",
    description: "بحث متخصص في علوم القرآن والدراسات القرآنية المتقدمة",
    topics: [
      "الدراسات القرآنية المتقدمة",
      "تحقيق المخطوطات",
      "الإعجاز العلمي",
      "المناهج التفسيرية",
    ],
    requirements: "ماجستير في علوم القرآن بتقدير جيد جداً",
    gradient: "from-sky-400 to-blue-500",
  },
];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
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

  // Filter courses based on selected category
  const filteredCourses =
    selectedCategory === "all"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  const openModal = (course: any) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
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
            <span className="text-white/70 text-sm font-medium">استكشف البرامج</span>
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

      {/* Category Filter */}
      <section id="categories" className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  <span className="block text-base">{category.name}</span>
                  <span className="block text-xs opacity-75">{category.nameEn}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="py-12 bg-[#e3fae5]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">14</div>
              <div className="text-gray-700 font-medium">برنامج دراسي</div>
              <div className="text-sm text-gray-500">Academic Programs</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">6</div>
              <div className="text-gray-700 font-medium">برامج بكالوريوس</div>
              <div className="text-sm text-gray-500">Bachelor Programs</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">5</div>
              <div className="text-gray-700 font-medium">برامج ماجستير</div>
              <div className="text-sm text-gray-500">Master Programs</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">2</div>
              <div className="text-gray-700 font-medium">برامج دكتوراه</div>
              <div className="text-sm text-gray-500">PhD Programs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section id="programs" ref={sectionRef} className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-500">لا توجد برامج في هذه الفئة</p>
                <p className="text-lg text-gray-400 mt-2">No programs in this category</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    onClick={() => openModal(course)}
                    className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-3 border-2 border-transparent hover:border-green-300 overflow-hidden"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                      transition: `all 0.6s ease ${index * 0.1}s`,
                    }}
                  >
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                      <div className={`w-full h-full bg-gradient-to-bl ${course.gradient} rounded-bl-full`}></div>
                    </div>

                    {/* Icon */}
                    <div className="relative mb-4">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${course.gradient} text-white text-3xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        {course.icon}
                      </div>
                    </div>

                    {/* Level Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${course.gradient}`}>
                        {course.level}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-green-600 transition-colors duration-300 leading-tight">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">{course.titleEn}</p>
                      <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      
                      {/* Duration */}
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span>{course.duration}</span>
                      </div>
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
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${course.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
                  </div>
                ))}
              </div>
            )}
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
              للتقديم على أي من البرامج الدراسية، يرجى زيارة صفحة القبول والتسجيل
              أو التواصل معنا للحصول على المزيد من المعلومات حول شروط القبول
              والمستندات المطلوبة.
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
                className="px-8 py-4 bg-white text-primary border-2 border-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300"
              >
                اتصل بنا
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Course Details */}
      {isModalOpen && selectedCourse && (
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
            <div className={`bg-gradient-to-br ${selectedCourse.gradient} p-8 text-white rounded-t-2xl`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl">
                  {selectedCourse.icon}
                </div>
                <div>
                  <span className="inline-block px-3 py-1 bg-white/30 rounded-full text-sm font-bold mb-2">
                    {selectedCourse.level}
                  </span>
                  <h2 className="text-3xl font-bold mb-2">{selectedCourse.title}</h2>
                  <p className="text-white/90 text-lg">{selectedCourse.titleEn}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 bg-gradient-to-b from-green-400 to-blue-500 rounded-full"></span>
                  نبذة عن البرنامج
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {selectedCourse.description}
                </p>
              </div>

              {/* Program Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <h4 className="font-bold text-primary">المدة الدراسية</h4>
                  </div>
                  <p className="text-gray-700 text-lg">{selectedCourse.duration}</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <h4 className="font-bold text-primary">المستوى الدراسي</h4>
                  </div>
                  <p className="text-gray-700 text-lg">{selectedCourse.level}</p>
                </div>
              </div>

              {/* Topics */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></span>
                  المواد الرئيسية
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {selectedCourse.topics.map((topic: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-50 rounded-lg p-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${selectedCourse.gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                        {index + 1}
                      </div>
                      <span className="text-gray-700">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="bg-gradient-to-br from-gray-50 to-green-50 rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                  </svg>
                  شروط القبول
                </h3>
                <p className="text-gray-700 text-lg">{selectedCourse.requirements}</p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold hover:shadow-lg transition-all duration-300"
                >
                  سجل في البرنامج
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 text-center px-6 py-3 bg-white text-primary border-2 border-primary rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300"
                >
                  استفسار
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterSection />
    </main>
  );
}
