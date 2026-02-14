"use client";
import { useState } from "react";
import FooterSection from "../FooterSection";

// Album categories
const categories = [
  { id: "all", name: "الكل", nameEn: "All" },
  { id: "campus", name: "الحرم الجامعي", nameEn: "Campus" },
  { id: "events", name: "الفعاليات", nameEn: "Events" },
  { id: "graduation", name: "التخرج", nameEn: "Graduation" },
  { id: "classes", name: "الفصول الدراسية", nameEn: "Classes" },
  { id: "activities", name: "الأنشطة", nameEn: "Activities" },
];

interface GalleryItem {
  id: number;
  type: "image" | "video";
  category: string;
  src: string;
  title: string;
  titleEn: string;
  description: string;
  thumbnail?: string;
}

// Gallery items (photos and videos)
const galleryItems: GalleryItem[] = [
  {
    id: 1,
    type: "image",
    category: "campus",
    src: "/images/campus1.jpg",
    title: "المبنى الرئيسي",
    titleEn: "Main Building",
    description: "مبنى الجامعة الرئيسي الحديث",
  },
  {
    id: 2,
    type: "image",
    category: "events",
    src: "/images/event1.jpg",
    title: "ملتقى العلماء",
    titleEn: "Scholars Conference",
    description: "ملتقى العلماء السنوي",
  },
  {
    id: 3,
    type: "video",
    category: "graduation",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/images/graduation1.jpg",
    title: "حفل التخرج 2024",
    titleEn: "Graduation Ceremony 2024",
    description: "حفل تخرج الدفعة الخامسة عشر",
  },
  {
    id: 4,
    type: "image",
    category: "classes",
    src: "/images/class1.jpg",
    title: "قاعة المحاضرات",
    titleEn: "Lecture Hall",
    description: "قاعة محاضرات حديثة ومجهزة",
  },
  {
    id: 5,
    type: "image",
    category: "activities",
    src: "/images/activity1.jpg",
    title: "النشاط الرياضي",
    titleEn: "Sports Activities",
    description: "الأنشطة الرياضية للطلاب",
  },
  {
    id: 6,
    type: "image",
    category: "campus",
    src: "/images/library.jpg",
    title: "المكتبة المركزية",
    titleEn: "Central Library",
    description: "مكتبة الجامعة الضخمة",
  },
  {
    id: 7,
    type: "image",
    category: "events",
    src: "/images/event2.jpg",
    title: "مؤتمر علمي",
    titleEn: "Scientific Conference",
    description: "المؤتمر العلمي الدولي",
  },
  {
    id: 8,
    type: "video",
    category: "campus",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    thumbnail: "/images/campus-tour.jpg",
    title: "جولة في الحرم الجامعي",
    titleEn: "Campus Tour",
    description: "جولة افتراضية في الحرم الجامعي",
  },
  {
    id: 9,
    type: "image",
    category: "activities",
    src: "/images/cultural.jpg",
    title: "النشاط الثقافي",
    titleEn: "Cultural Activities",
    description: "الأنشطة الثقافية والفنية",
  },
];

export default function AlbumPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter items based on selected category
  const filteredItems =
    selectedCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  // Open modal with selected item
  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <main dir="rtl" className="pt-20 bg-[#e3fae5]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 lg:py-32 bg-gradient-to-br from-primary to-primary/90 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              البوم الجامعة
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed mb-4">
              لحظات مميزة من مسيرة جامعة المروزي
            </p>
            <p className="text-base sm:text-lg text-white/80">
              University Album - Special Moments from Marwazi University
            </p>
          </div>
        </div>

        {/* Animated Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex flex-col items-center gap-2 animate-bounce">
            <span className="text-white/70 text-sm font-medium">
              استكشف الألبوم
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

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-bold transition-all duration-300 ${selectedCategory === category.id
                      ? "bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                    }`}
                >
                  <span className="block text-base">{category.name}</span>
                  <span className="block text-xs opacity-75">
                    {category.nameEn}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            {filteredItems.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-500">
                  لا توجد عناصر في هذه الفئة
                </p>
                <p className="text-lg text-gray-400 mt-2">
                  No items in this category
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    onClick={() => openModal(item)}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 opacity-0 animate-fadeInUp"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    {/* Image/Video Thumbnail */}
                    <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
                      {item.type === "video" ? (
                        <>
                          <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                            <div className="text-6xl">🎥</div>
                          </div>
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <svg
                                className="w-8 h-8 text-primary ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                          <span className="text-6xl">📷</span>
                        </div>
                      )}

                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs font-bold rounded-full">
                          {item.type === "video" ? "فيديو" : "صورة"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {item.type === "video" ? "Video" : "Photo"}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-green-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.titleEn}
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Decorative corner */}
                    <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-400/20 to-transparent rounded-br-full"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal for viewing full content */}
      {isModalOpen && selectedItem && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 left-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-gray-800 hover:text-red-500 transition-colors shadow-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content */}
            <div className="p-8">
              {selectedItem.type === "video" ? (
                <div className="aspect-video w-full mb-6">
                  <iframe
                    className="w-full h-full rounded-xl"
                    src={selectedItem.src}
                    title={selectedItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl mb-6 flex items-center justify-center">
                  <span className="text-8xl">📷</span>
                </div>
              )}

              <div className="text-right">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white text-sm font-bold rounded-full">
                    {selectedItem.type === "video" ? "فيديو" : "صورة"}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-primary mb-3">
                  {selectedItem.title}
                </h2>
                <p className="text-xl text-gray-600 mb-4">
                  {selectedItem.titleEn}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <FooterSection />

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInUp {
          animation-name: fadeInUp;
          animation-duration: 0.6s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
      `}</style>
    </main>
  );
}
