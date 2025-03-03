"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FooterSection from "@/components/sections/FooterSection";

const blogPosts = [
  {
    id: 1,
    title: "أهمية التعليم الإسلامي في العصر الحديث",
    excerpt:
      "يناقش هذا المقال أهمية الحفاظ على القيم الإسلامية في التعليم المعاصر وكيفية تحقيق التوازن بين العلوم الحديثة والتعاليم الإسلامية.",
    image: "/img1.jpg",
    date: "15 مارس 2023",
    author: "د. محمد أحمد",
    category: "تعليم",
  },
  {
    id: 2,
    title: "تحديات الطلاب المسلمين في الغرب",
    excerpt:
      "استكشاف التحديات التي يواجهها الطلاب المسلمون في الدول الغربية وكيفية الحفاظ على الهوية الإسلامية.",
    image: "/img2.jpg",
    date: "22 أبريل 2023",
    author: "د. فاطمة علي",
    category: "مجتمع",
  },
  {
    id: 3,
    title: "دور التكنولوجيا في تطوير التعليم الإسلامي",
    excerpt:
      "كيف يمكن الاستفادة من التقنيات الحديثة في تطوير وتحسين طرق تدريس العلوم الإسلامية وجعلها أكثر جاذبية للأجيال الجديدة.",
    image: "/img3.jpg",
    date: "10 مايو 2023",
    author: "د. عبدالله محمود",
    category: "تكنولوجيا",
  },
  {
    id: 4,
    title: "تجربتي كطالب في جامعة المروزي",
    excerpt:
      "قصة نجاح أحد خريجي الجامعة وكيف ساهمت دراسته في تشكيل مساره المهني وتحقيق طموحاته.",
    image: "/img4.jpg",
    date: "5 يونيو 2023",
    author: "أحمد الصالح",
    category: "قصص نجاح",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("الكل");

  const categories = ["الكل", "تعليم", "مجتمع", "تكنولوجيا", "قصص نجاح"];

  const filteredPosts =
    activeCategory === "الكل"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <main dir="rtl">
      <section className="bg-[#e3fae5] py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-primary text-center mb-12">
            المدونة
          </h1>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700">
              آخر الأخبار والمقالات من جامعة المروزي
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-12 overflow-x-auto">
            <div className="flex space-x-reverse space-x-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                    <span className="text-gray-600 text-sm">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">
                      بواسطة: {post.author}
                    </span>
                    <Link
                      href={`/blog/${post.id}`}
                      className="text-primary font-medium hover:underline"
                    >
                      اقرأ المزيد
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
