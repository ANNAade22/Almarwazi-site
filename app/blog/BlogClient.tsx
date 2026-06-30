"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  image: string;
  created_at: string;
  status: string;
}

export default function BlogClient() {
  const [activeCategory, setActiveCategory] = useState("الكل");
  const posts: Post[] = [];
  const categories = ["الكل"];

  const filteredPosts =
    activeCategory === "الكل"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <main dir="rtl" className="pt-20">
      <section className="bg-[#e3fae5] py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold text-primary text-center mb-6">
            المدونة
          </h1>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl text-gray-700 mb-8">
              آخر الأخبار والمقالات من جامعة المروزي
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex justify-center mb-12 overflow-x-auto pb-2">
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

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                لا توجد منشورات في هذه الفئة حالياً
              </p>
            </div>
          ) : (
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {post.category || "عام"}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {new Date(post.created_at).toLocaleDateString("ar-SA")}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-700 mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 text-sm font-medium">
                        {post.author}
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
          )}
        </div>
      </section>
    </main>
  );
}
